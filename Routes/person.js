const express = require("express");
const router = express.Router();
const Person = require("../Models/Person");

//route:http:localhost:5000/person/add
//method:post
//desc: create person
//access:public
router.post("/add", (req, res) => {
  const { name, age, favoriteFoods } = req.body;
  const newPerson = new Person({ name, age, favoriteFoods });
  newPerson
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ msg: err }));
});

//route:http:localhost:5000/person/addMany
//method:post
//desc: Create Many Records
//access:public
router.post("/addMany", (req, res) => {
  let arrayOfPeople = req.body;
  Person.create(arrayOfPeople)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//route:http:localhost:5000/person/findName/:personName
//method:get
//desc: Use model.find() to Search Your Database
//access:public
router.get("/findName/:personName", (req, res) => {
  Person.find({ name: req.params.personName })
    .then((person) => res.json(person))
    .catch((err) => res.json({ msg: err }));
});

//route:http:localhost:5000/person/findOneFood
//method:get
//desc: Use model.findOne() to Return a Single Matching Document from Database
//access:public
router.get("/findOneFood", async (req, res) => {
  const food = req.body.favoriteFoods;
  Person.findOne({ favoriteFoods: { $all: food } })
    .then((person) => res.json(person))
    .catch((err) => res.json({ msg: err }));
});

//route:http:localhost:5000/person/findId
//method:get
//desc: Use model.findById() to Search Database By _id
//access:public
router.get("/findId/:personId", (req, res) => {
  person = Person.findById(req.params.personId)
    .then((person) => res.json(person))
    .catch((err) => res.json({ msg: err }));
});

//route:http:localhost:5000/person/findEditSave/:personId
//method:put
//desc: Perform Classic Updates by Running Find, Edit, then Save
//access:public
router.put("/findEditSave/:personId", (req, res) => {
  Person.findById(req.params.personId, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      data.favoriteFoods.push("hamburger"),
        data.save((err, person) => {
          err ? res.json(err) : res.json(person);
        });
    }
  });
});

//ap:http:localhost:5000/person/findOneAndUpdate/:personName
//method:put
//desc: Perform New Updates on a Document Using model.findOneAndUpdate()
//access:public
router.put("/findOneAndUpdate/:personName", (req, res) => {
  Person.findOneAndUpdate(
    { name: req.params.personName },
    { $set: { age: 20 } },
    { new: true }
  )
    .then((person) => res.json(person))
    .catch((err) => res.json(err));
});

//ap:http:localhost:5000/person/findIdAndRemove/:personId
//method:delete
//desc: Delete One Document Using model.findByIdAndRemove
//access:public
router.delete("/findIdAndRemove/:personId", (req, res) => {
  Person.findByIdAndRemove(req.params.personId)
    .then((person) => res.json(person))
    .catch((err) => res.json(err));
});

//ap:http:localhost:5000/person/findAndRemove
//method:delete
//desc: Delete Many Documents with model.remove()
//access:public
router.delete("/findAndRemove", (req, res) => {
  Person.remove({ name: "Mary" })
    .then((person) => res.json(person))
    .catch((err) => res.json(err));
});

//ap:http:localhost:5000/person/queryChain
//method:get
//desc: Chain Search Query Helpers to Narrow Search Results
//access:public
router.get("/queryChain", (req, res) => {
  Person.find({ favoriteFoods: { $all: ["burrito"] } })
    .sort({ name: "asc" })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      err ? res.json(err) : res.json(data);
    });
});

module.exports = router;
