const documentHeader = document.querySelector("header");
const documentMain = document.querySelector("main");
const newBookBtn = document.querySelector("#new-book-btn");
const formModal = document.querySelector("#form-modal");
const changeStatusModal = document.querySelector("#status-form-modal");
const bookForm = document.querySelector("#book-form");
const statusForm = document.querySelector("#status-form");
const formCloseBtn = document.querySelector("#form-close");
const statusChangeClose = document.querySelector("#status-form-close");
const formSubmitBtn = document.querySelector("#submit-btn");
const bookContainer = document.querySelector("#book-container");
const noBooksYet = document.querySelector("#no-books-yet");
const deleteBookBtn = document.querySelectorAll("#delete-book");
const editBookBtn = document.querySelector("#edit-icon");
const saveChangesBtn = document.querySelector("#save-changes-btn");

const myLibrary = [];

newBookBtn.addEventListener("click", () => {
    formModal.style.display = "flex";
    documentHeader.style.opacity = "0.3";
    documentMain.style.opacity = "0.3";
})

formCloseBtn.addEventListener("click", () => {
    formModal.style.display = "none";
    documentHeader.style.opacity = "1";
    documentMain.style.opacity = "1";
})

class Book {
    constructor(author, title, pages, status) {
        this.author = author,
        this.title = title,
        this.pages = pages,
        this.status = status
    }

    updateStatus() {
        let newBookStatus = document.querySelector("#status-form input[name=read-status]:checked").value;
        this.status = newBookStatus;
    }
}

function addBookToLibrary(author, title, pages, status) {
    const newBook = new Book(author, title, pages, status);
    myLibrary.push(newBook);
}

function displayBooks() {
    bookContainer.innerHTML = "";
    myLibrary.forEach(book => {
        bookContainer.innerHTML +=
        `<article class="book-card" id="book-card">
            <h2 class="book-title">${book.title}</h2>
            <h3 class="book-author">by ${book.author}</h3>
            <p class="book-pages">${book.pages} pages</p>
            <div class="status-container">
                <p class="book-status">Status: ${book.status}</p>
                <img class="edit-icon" id="edit-icon" src="assets/pencil.svg">
            </div>
            <div class="delete-book" id="delete-book"><img src="assets/delete.svg"></div>
        </article>`
    })
}

formSubmitBtn.addEventListener("click", e => {
    e.preventDefault();
    let userAuthor = document.querySelector("#form-book-author").value;
    let userTitle = document.querySelector("#form-book-title").value;
    let userPages = document.querySelector("#form-book-pages").value;
    let userStatus = document.querySelector("input[name=read-status]:checked").value;
    addBookToLibrary(userAuthor, userTitle, userPages, userStatus);
    displayBooks();

    formModal.style.display = "none";
    documentHeader.style.opacity = "1";
    documentMain.style.opacity = "1";
    bookForm.reset();
})

bookContainer.addEventListener("click", e => {
    if (e.target.closest("#delete-book")) {
        const bookCard = e.target.closest("#book-card");
        if (bookCard) {
            const bookIndex = Array.from(bookContainer.children).indexOf(bookCard);
            myLibrary.splice(bookIndex, 1);
            bookCard.remove();
        }
        if (myLibrary.length === 0) {
            bookContainer.innerHTML =
            `<div class="no-books-yet" id="no-books-yet">
                <h2>No books added yet!</h2>
            </div>`
        }
    }
});

let currentBookIndex = null;

bookContainer.addEventListener("click", e => {
    if (e.target.closest("#edit-icon")) {
        const bookCard = e.target.closest("#book-card");
        if (bookCard) {
            currentBookIndex = Array.from(bookContainer.children).indexOf(bookCard);
            const currentStatus = myLibrary[currentBookIndex].status;
            document.querySelector(`#status-form input[value="${currentStatus}"]`).checked = true;
            changeStatusModal.style.display = "flex";
            documentHeader.style.opacity = "0.3";
            documentMain.style.opacity = "0.3";
        }
    }
});

statusChangeClose.addEventListener("click", () => {
    changeStatusModal.style.display = "none";
    documentHeader.style.opacity = "1";
    documentMain.style.opacity = "1";
})

saveChangesBtn.addEventListener("click", e => {
    e.preventDefault();
    if (currentBookIndex !== null) {
        myLibrary[currentBookIndex].updateStatus();
        displayBooks();
    }

    changeStatusModal.style.display = "none";
    documentHeader.style.opacity = "1";
    documentMain.style.opacity = "1";
})