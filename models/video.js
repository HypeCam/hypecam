const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  createdAt       : { type: Date },
  updatedAt       : { type: Date },
  title           : String,
  url             : String,
});

// CoordsSchema.pre('save', function(next) {
//   // SET createdAt AND updatedAt
//   const now = new Date();
//   this.updatedAt = now;
//   if ( !this.createdAt ) {
//     this.createdAt = now;
//   }





module.exports = mongoose.model('Videos', videoSchema);
