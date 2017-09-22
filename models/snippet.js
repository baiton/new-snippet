const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  created: Date,
  language: String,
  profile: [{type: mongoose.Schema.Types.ObjectId, ref: 'Snippet'}]
})


// Everything here should go to the bottom
const Snippet = mongoose.model('Snippet', SnippetSchema) //I will make your collection but plural!

module.exports= Snippet
