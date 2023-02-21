const path = require('path');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

console.log(process.env);

const MONGO_URL = process.env.MONGO_URL_NEW;

mongoose.connection.once('open', () => {
    console.log('MongoDB Connection ready!');
})

mongoose.connection.on('error', (err) => {
    console.error(err);
})

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}

