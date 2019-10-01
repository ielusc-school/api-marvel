const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
---------------
Person
---------------
key    | value 
---------------
name: String
age: Number
power: Number
description: String
-------------
*/

const PersonSchema = new Schema({
    name: String,
    age: Number,
    power: Number,
    description: String
});

module.exports = mongoose.model('Person', PersonSchema);