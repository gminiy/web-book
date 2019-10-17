const mongoose = require('mongoose');
const config = require('../configs/db-config');

module.exports = () => {
    mongoose.connect(config.dbURI, {useNewUrlParser: true, useFindAndModify: false});
    const db = mongoose.connection;
    
    db.on('open', () => {
        console.log('Connected to MongoDB');
    });

    db.on('error', (error) => {
        console.log(error);
        process.kill();
    });
    return db;
}