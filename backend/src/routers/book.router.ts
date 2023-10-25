import {Router} from 'express';
import { sample_books, sample_tags } from '../data';
import asyncHandler from 'express-async-handler';
import { BookModel } from '../models/book.model';
const router = Router();

router.get("/seed", asyncHandler(
 async (req, res) => {
    const booksCount = await BookModel.countDocuments();
    if(booksCount> 0){
      res.send("Seed is already done!");
      return;
    }

    await BookModel.create(sample_books);
    res.send("Seed Is Done!");
}
))


router.get("/",asyncHandler(
  async (req, res) => {
    const books = await BookModel.find();
      res.send(books);
  }
))

router.get("/search/:searchTerm", asyncHandler(
  async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, 'i');
    const books = await BookModel.find({name: {$regex:searchRegex}})
    res.send(books);
  }
))

router.get("/tags", asyncHandler(
  async (req, res) => {
    const tags = await BookModel.aggregate([
      {
        $unwind:'$tags'
      },
      {
        $group:{
          _id: '$tags',
          count: {$sum: 1}
        }
      },
      {
        $project:{
          _id: 0,
          name:'$_id',
          count: '$count'
        }
      }
    ]).sort({count: -1});

    const all = {
      name : 'ყველა',
      count: await BookModel.countDocuments()
    }

    tags.unshift(all);
    res.send(tags);
  }
))

router.get("/tag/:tagName",asyncHandler(
  async (req, res) => {
    const books = await BookModel.find({tags: req.params.tagName})
    res.send(books);
  }
))

router.get("/:bookId", asyncHandler(
  async (req, res) => {
    const book = await BookModel.findById(req.params.bookId);
    res.send(book);
  }
))


export default router;