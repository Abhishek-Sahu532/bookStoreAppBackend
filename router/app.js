const express = require("express");
const router = express.Router();
// const store = require("../schema/store");
const store = require("../schema/store");

router.get("/", async (req, res) => {
  res.status(200).send("This is the homepage");
});

router.get("/api/v1/books", async (req, res) => {
  try {
    let books = await store.find({});
    return res.status(200).send(books);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/api/v1/books/:id", async (req, res) => {
  try {
    let _id = req.params.id;
    // console.log('_id', _id)
    let bookById = await store.findById(_id, req.body);
    // console.log('bookById', bookById)
    if (!bookById) {
      return res.status(404).json({
        err: "Book not found with the given id",
      });
    }
    return res.status(200).send(bookById);
  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
});

router.post("/api/v1/books/add", async (req, res) => {
  try {
    const { name, author, genre, dateOfRelease, bookImage, rating, price } =
      req.body;
    if (!name || !author || !genre || !dateOfRelease || !rating || !price) {
      return res.status(400).json({
        err: "Provide the necessary information",
      });
    }

    let book = await store.create(
      {name,
      author,
      genre,
      dateOfRelease,
      bookImage,
      rating,
      price}
    );
    return res.status(201).send(book);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put('/api/v1/books/:id', async (req,res )=>{
    try {
        let _id = req.params.id;
        let book = await store.findByIdAndUpdate(_id, req.body);
        if(!book){
            return res.status(404).json({
                err: 'The record does not exist'
            })
        }
        return res.status(200).send(book)
    } catch (error) {
        return res.status(500).send(error);
    }
})


router.delete('/api/v1/books/:id', async (req,res)=>{
    try {
        let _id = req.params.id;
        let book = await store.findByIdAndDelete(_id, req.body);
        if(!book){
            return res.status(404).json({
                err: 'Record does not exist'
            })
        }
        return res.status(200).send(book)
    } catch (error) {
        return res.status(500).send(error);
    }
})

module.exports = router;
