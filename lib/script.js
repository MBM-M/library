const myLibrary = [];

class Book{

  constructor(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
  
  info() {
    this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`
    }
  }
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook)
}

addBookToLibrary("Crime and Punishment", "Fyodor Dostoevsky", 671, false);
addBookToLibrary("The Setting Sun", "Osamu Dazai", 192, false);
addBookToLibrary("White Nights", "Fyodor Dostoevsky", 86, true);

function displayBooks() {
  const bookList = document.querySelector("#book-list")
  bookList.innerHTML = '';

  myLibrary.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.isRead ? 'Read' : 'Not read'}</p>
    `;

    card.appendChild(createToggleReadButton(book));
    card.appendChild(createRemoveButton(book.id));
    bookList.appendChild(card);
  })
}

function createRemoveButton(bookId) {
  const btn = document.createElement("button");
  btn.textContent = "Remove";
  btn.className = "remove-book-btn";

  btn.addEventListener("click", function() {
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
      myLibrary.splice(index, 1);
      displayBooks();
    }
  });
  return btn;
}

displayBooks();

const dialog = document.querySelector("dialog");
const showBtn = document.querySelector("#new-book-btn");
const cancelBtn = document.querySelector("#cancel-dialog");

showBtn.addEventListener("click", () => {
  dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
  dialog.close();
})

newBookInfo();

function newBookInfo() {
  document.getElementById("add-book-form").addEventListener("submit", function(event) {
    event.preventDefault();

    //const formData = new FormData(this);
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("isRead").checked;

    console.log(title, author, pages, isRead);

    addBookToLibrary(title, author, pages, isRead);
    displayBooks();
    this.reset();
    dialog.close();
  })
}

Book.prototype.toggleRead = function() {
  this.isRead = !this.isRead;
}

function createToggleReadButton(book) {
  const btn = document.createElement("button");
  btn.textContent = "Toggle Read";
  btn.className = "toggle-read-btn";

  btn.addEventListener("click", function() {
    book.toggleRead();
    displayBooks();
  });
  return btn;
}

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const isRead = document.getElementById("isRead");

function validateField(field, message) {
  field.setCustomValidity("");
  if (!field.validity.valid) {
    field.setCustomValidity(message);
  }
  field.reportValidity();
}

title.addEventListener("input", () => {
  validateField(title, "Please enter a title");
})

author.addEventListener("input", () => {
  validateField(author, "Please enter an author name");
})

pages.addEventListener("input", () => {
  if (pages.value <= 0) {
    pages.setCustomValidity("Pages must be a positive number");
  } else {
    pages.setCustomValidity("");
  }
  pages.reportValidity();
})

isRead.addEventListener("change", () => {
  if (fields.isRead.required) {
    validateField(field.isRead, "Please indicate if the book is read");
  }
})