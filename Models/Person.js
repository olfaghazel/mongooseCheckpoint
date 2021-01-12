let mongoose = require("mongoose");

//Create Person
let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

module.exports = Person = mongoose.model("Person", personSchema);
