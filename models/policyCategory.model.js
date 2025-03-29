const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PolicyCategorySchema = new Schema({
    categoryName: String
});

module.exports = mongoose.model('PolicyCategory', PolicyCategorySchema);
