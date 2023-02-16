const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
   name: {
      type: String,
      requred: true,
   },
   price: {
      type: Number,
      requred: true,
   },
   image: {
      type: String,
      requred: true,
   },
});

module.exports = mongoose.model('Product', ProductSchema);
