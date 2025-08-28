// This function grabs the book list index (starts at 0), stores that index to the session storage, and then switches to the book details page.
function setSession(bookID) {
    sessionStorage.setItem('bookNum', bookID);
    window.location.href = './bookpage.html';
};




// Get the index of the json data list via the session storage.
let bookNum = sessionStorage.getItem('bookNum');

// Get all the elements that need to be filled in for the book details.
const bookImg = document.querySelector('.book-details img');
const bookTitle = document.querySelector('h3');
const bookLink = document.querySelector('.book-description a');
const bookDescript = document.getElementById('bookDescription');
const bookExcerpt = document.getElementById('bookExcerpt');

// Fetch the JSON data from the bookdetails.json file and render them dynamically on the webpage.
fetch('./bookdetails.json')
    .then(res => res.json())
    .then(data => {
        document.title = `Casey Kay Romances - ${data[bookNum].title}`
        // Rendering the book cover image, title, and order link.
        bookImg.src = data[bookNum].bookCover;
        bookTitle.innerText = `${data[bookNum].title}`;
        bookLink.innerText = `${data[bookNum].buyLinkMessage}`;

        // Pulling all the paragraphs from the json blurb data. Creating a paragraph element and then inserting the json data into the element. Appending the paragraph element into the book details container.
        data[bookNum].bookBlurb.forEach(element => {
            let descript = document.createElement('p');
            descript.textContent = element;
            bookDescript.appendChild(descript);
        });

        // Pulling all the paragraphs from the json excerpt data. Creating a paragraph element and then inserting the json data into the element. Appending the paragraph element into the book details container.
        data[bookNum].bookExcerpt.forEach(element => {
            let excerpt = document.createElement('p');
            excerpt.textContent = element;
            bookExcerpt.appendChild(excerpt);
        });
    });