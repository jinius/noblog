'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
	title: String,
	content: String,
	signature: String
});

module.exports = mongoose.model('Post', PostSchema);
