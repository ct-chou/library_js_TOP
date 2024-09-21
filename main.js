const myLibrary = []; 

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function clearBooks() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.remove())
}

function addRemoveEventListeners() {
    const removeBtns = document.querySelectorAll('.remove');
    removeBtns.forEach(removeBtn => {
        removeBtn.addEventListener('click', (e) => {
            const index = e.target.id.split('-')[1];
            console.log('clicked ' + index);
            myLibrary.splice(index, 1);
            clearBooks();
            displayBooks();
            });
    });
}

function toggleRead () {
    const toggleBtns = document.querySelectorAll('.read');
    toggleBtns.forEach(toggleBtn => {
        toggleBtn.addEventListener('click', (e) => {
            const index = e.target.id.split('-')[1];
            console.log('clicked ' + index);
            // let readStatus = myLibrary[index].read;
            // console.log('read status: ' + readStatus);
            myLibrary[index].read = !myLibrary[index].read;
            clearBooks();
            displayBooks();
        });
    });
}

function displayBooks() {
    let index = 0;
    for (let book in myLibrary) {
        let card = document.createElement('div');
        card.classList.add('card');
        for (let prop in myLibrary[book]) {
            let p = document.createElement('p');
            p.textContent = `${prop}: ${myLibrary[book][prop]}`;
            card.appendChild(p);
        }
        let removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove');
        removeBtn.setAttribute('id', 'book-' + index);
        card.appendChild(removeBtn);
        let readBtn = document.createElement('button');
        readBtn.textContent = 'Toggle read status';
        readBtn.classList.add('read');
        readBtn.setAttribute('id', 'read-' + index);
        card.append(readBtn);
        container.appendChild(card);
        index++;
    }
    addRemoveEventListeners();
    toggleRead();
}

const container = document.querySelector('#container');

// Add some books to the library
const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
const book2 = new Book('The Catcher in the Rye', 'J.D. Salinger', 277, false);
const book3 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

displayBooks();

// create dialog box form to add new book
const dialog = document.getElementById('dialog-box');
const closeBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmBtn');

const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
   dialog.showModal();
   // Clear input fields
   document.getElementById('title').value = '';
   document.getElementById('author').value = '';
   document.getElementById('pages').value = '';
   document.getElementById('read').checked = false;
   
});

closeBtn.addEventListener('click', (e) => {
    dialog.close();
});

confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    clearBooks();
    displayBooks();
    dialog.close();
});