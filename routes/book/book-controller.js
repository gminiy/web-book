const Book = require('../../model/book').Book;
const DeletedBook = require('../../model/book').DeletedBook;
const transformDate = require('../../src/transform-date');

module.exports = {
    renderUpdatePage : async (request, response, next) => {
        try {
            const bookId = request.query.id;
            const book = await Book.findById(bookId);
            const bookInfo = {
                'book': book,
                'nickname':request.user.nickname,
                'isAdmin':(request.user.authority === 'admin'),
                'publicationDate': transformDate(book.publicationDate)
            }
            response.render('update', bookInfo);
        } catch(error) {
            next(error);
        }
    },

    renderAbookPage : async (request, response, next) => {
        try {
            const bookId = request.query.id;
            const book = await Book.findById(bookId);
            const bookInfo = {
                'book': book,
                'nickname':request.user.nickname,
                'isAdmin':(request.user.authority === 'admin'),
                'publicationDate': transformDate(book.publicationDate),
                'registrationDate': transformDate(book.registrationDate)
            }
            response.render('book', bookInfo);
        } catch(error) {
            next(error);
        }
    },

    register : async (request, response, next) => {
        try {
            const info = { title, author, publisher, publicationDate, description } = request.body;
            const book = await Book.create(info);
            await book.save();
            return response.redirect('/');
        } catch(error) {
            next(error);
        }
    },

    update : async (request, response, next) => {
        try {
            const bookId = request.query.id;
            const info = { title, author, publisher, publicationDate, description } = request.body;
            info.registrationDate = Date.now();
            await Book.findByIdAndUpdate(bookId, info);
            return response.send();
        } catch(error) {
            next(error);
        }
    },

    delete : async (request, response, next) => {
        // deletedBook collection으로 document 복사 후 삭제.
        try {
            const bookId = request.query.id;
            const book = await Book.findById(bookId);
            const deletedBook = await new DeletedBook(book.toObject());
            await deletedBook.save();
            await book.remove();
            return response.send();
        } catch(error) {
            next(error);
        }
    }
}