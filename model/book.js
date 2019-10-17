const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const Book = new Schema({
    title: { 
        type: String,
        required: true,
    },
    registrationDate: { 
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        default: null
    },
    publisher: {
        type: String,
        required: true,
    },

    publicationDate: {
        type: Date,
        dafault: null
    },
    description: {
        type: String,
        dafault: null
    },
    like: {
        type: Number,
        default: 0
    },
    hate: {
        type: Number,
        default: 0
    }
});

Book.statics.create = function ({ title, author, publisher, publicationDate, description }) {
    return book = new this({ title, author, publisher, publicationDate, description });
}

exports.Book = mongoose.model('Book', Book);
exports.DeletedBook = mongoose.model('DeletedBook', Book);