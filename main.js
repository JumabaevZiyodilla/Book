const elForm = document.querySelector(".book-form");
const elList = document.querySelector(".book-list");
const elTemplate = document.querySelector(".template").content;
const elFragmentBook = document.createDocumentFragment();
const elSearchBook = document.querySelector(".book-search");
const elBookSort = document.querySelector(".book-sort");
const elToYear = document.querySelector(".book-toyear");
const elBookCountry = document.querySelector(".country-select");
const elBookAuthor = document.querySelector(".author-select");
const elBookStar = document.querySelector(".book-icon");

const countryFragment = document.createDocumentFragment();

function renderBook(kitob, regex = ""){
    elList.innerHTML = ""
    
    kitob.forEach(element => {
        const fragmentBookClone = elTemplate.cloneNode(true);

        if(regex.source != "(?:)" && regex){
            fragmentBookClone.querySelector(".book-title").innerHTML = element.title.replace(regex, `<mark class="mark">${regex.source.toLowerCase()}</mark>`);
        }else{
            fragmentBookClone.querySelector(".book-title").textContent = element.title;
        }
        fragmentBookClone.querySelector(".book-img").src = element.imageLink;
        fragmentBookClone.querySelector(".book-img").alt = element.title;
        fragmentBookClone.querySelector(".book-text").textContent = element.author;
        fragmentBookClone.querySelector(".book-year").textContent = element.year;
        fragmentBookClone.querySelector(".book-page").textContent = element.pages;
        fragmentBookClone.querySelector(".book-language").textContent = element.language;
        fragmentBookClone.querySelector(".book-link").textContent = "Wikipedia";
        fragmentBookClone.querySelector(".book-link").href = element.link;
        fragmentBookClone.querySelector(".book-country").textContent = element.country;
        elFragmentBook.appendChild(fragmentBookClone)
    });
    elList.appendChild(elFragmentBook);
};

function sortBooks(sortArray, selectValue) {
    if(selectValue == "a-z"){
        sortArray.sort((a,b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
    }else if(selectValue == "z-a"){
        sortArray.sort((a,b) => b.title.charCodeAt(0) - a.title.charCodeAt(0));
    }else if(selectValue == "min-page"){
        sortArray.sort((a,b) => a.pages - b.pages);
    }else if(selectValue == "max-page"){
        sortArray.sort((a,b) => b.pages - a.pages);
    }else if(selectValue == "min-year"){
        sortArray.sort((a,b) => a.year - b.year);
    }else if(selectValue == "max-year"){
        sortArray.sort((a,b) => b.year - a.year);
    }
};

let categoriesCountry = new Set();
let categoriesAuthor = new Set();

function renderCategories(categories){
    books.forEach(element => categories.add(element.language));
}
function renderCategoriesAuthor(author){
    books.forEach(element => author.add(element.author));
}
renderCategories(categoriesCountry);
renderCategoriesAuthor(categoriesAuthor);

function renderCountry (array,select){
    array.forEach(element => {
        const countrySearch = document.createElement("option");
        countrySearch.value = element;
        countrySearch.textContent = element;
        countryFragment.appendChild(countrySearch);
    });
    select.appendChild(countryFragment);
};
renderCountry(categoriesCountry,elBookCountry);
renderCountry(categoriesAuthor,elBookAuthor);


elForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    let elSearchBookValue = elSearchBook.value.trim();
    const regexTitle = new RegExp(elSearchBookValue, "gi");
    
    let searchBook = books.filter(element => {
        return element.title.match(regexTitle) && Number(elToYear.value) <= element.year && (elBookCountry.value == "all" || element.language == elBookCountry.value) && (elBookAuthor.value == "all" || element.author == elBookAuthor.value);
    });

    if(searchBook.length > 0){
        sortBooks(searchBook, elBookSort.value);
        renderBook(searchBook,regexTitle);
    }else{
        elList.innerHTML = `NOT FOUND 404`;
    }
});
renderBook(books);