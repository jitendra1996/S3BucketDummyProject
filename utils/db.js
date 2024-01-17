const mongoose = require('mongoose');

const mongooseConnect = async (cb,dbPath) => {
    try {
        const result = await mongoose.connect(dbPath);
        console.log("Connected to database");
        cb();
    } catch (error) {
        console.log(error);
    }
};

module.exports = mongooseConnect;