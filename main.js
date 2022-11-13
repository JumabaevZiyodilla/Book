const elForm = document.querySelector(".book-form");
const elList = document.querySelector(".book-list");
const elTemplate = document.querySelector(".template").content;
const elFragmentBook = document.createDocumentFragment();
const elSearchBook = document.querySelector(".book-search");

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
}

elForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    let elSearchBookValue = elSearchBook.value.trim();
    const regexTitle = new RegExp(elSearchBookValue, "gi");
    console.log(regexTitle);

    let searchBook = books.filter(element => {
        return element.title.match(regexTitle)
    })

    if(searchBook.length > 0){
        renderBook(searchBook,regexTitle);
    }else{
        elList.innerHTML = `NOT FOUND 404`;
    }
})
renderBook(books);