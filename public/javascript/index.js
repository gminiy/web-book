const postButton = document.querySelector('.header_register-post');
const books = document.getElementsByClassName('book');
const pageNumbers = document.querySelectorAll('.page_number');

if (postButton) {
    postButton.addEventListener('click', () => window.location.href = '/post')
}

for(book of books) {
    book.addEventListener('click', function () {
        const bookID = this.id;
        window.location.href = `/book?id=${bookID}`
    });
}

pageNumbers.forEach((pageNumber) => {
    pageNumber.addEventListener('click', () => {
        const page = event.target.innerText;
        window.location.href = `?page=${page}`
    });
});