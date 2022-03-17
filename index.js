const booksList = document.querySelector('.books-container');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const formSubmit = document.querySelector('.book-form');

let booksArray = [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static addBook = () => {
    let booksCode = '';
    booksArray.forEach((element, index) => {
      const { title, author } = element;
      if (index % 2 === 0) {
        booksCode += `
        <div class="book changeColor">
            <div class="sub-book">
              <p>${title}</p>
              <p>${author}</p>
            </div>
            <button type="submit" class="delete" onclick='removeBook("${title}")'>Remove</button>
        </div>
            `;
      } else {
        booksCode += `
        <div class="book">
          <div class="sub-book">
            <p>${title}</p>
            <p>${author}</p>
          </div>
          <button type="submit" class="delete" onclick='removeBook("${title}")'>Remove</button>
        </div>
            `;
      }
    });
    booksList.innerHTML = booksCode;
    localStorage.setItem('booksData', JSON.stringify(booksArray));
  };

  static deleteBook = (el) => {
    if (el.classList.contains('delete')) {
      el.parentElement.remove();
    }
  };
}

window.removeBook = (title) => {
  document.querySelector('.books-container').addEventListener('click', (e) => {
    Book.deleteBook(e.target);
  });
  booksArray = booksArray.filter((elem) => elem.title !== title);
  Book.addBook();
};

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('booksData') === null) {
    booksArray = [
      {
        title: 'Book one',
        author: 'Kait',
      },
      {
        title: 'Book two',
        author: 'Cham',
      },
    ];
  } else {
    booksArray = JSON.parse(localStorage.getItem('booksData'));
  }
  Book.addBook();
});

formSubmit.addEventListener('submit', (event) => {
  if (title.value === '' || author.value === '') {
    event.preventDefault();
  } else {
    event.preventDefault();
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const book = new Book(bookTitle, bookAuthor);
    booksArray.push(book);
    localStorage.setItem('booksData', JSON.stringify(booksArray));
    title.value = '';
    author.value = '';
  }
});
