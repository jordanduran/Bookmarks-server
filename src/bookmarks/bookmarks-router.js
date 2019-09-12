const uuid = require('uuid/v4');
const logger = require('../logger');
const store = require('../store');
const {isWebUri} = require('valid-url');
const express = require('express');
const bookmarkRouter = express.Router();
const bodyParser = express.json();

bookmarkRouter
  .route('/bookmarks')
  .get((req,res)=>{
    res.json(store.bookmarks);
  })
  .post(bodyParser, (req,res)=>{
    for (const field of ['title','url','rating']){
      if (!req.body[field]){
        const message = `${field} is required`;
        logger.error(message)
        return res.status(400).send(message);
      }
    }
    const { title,url,description,rating } = req.body;

    if(!Number.isInteger(rating) || rating < 0 || rating > 5){
      logger.error(`Invalid rating ${rating}`);
      return res.status(400).send(`rating must be number from 0 to 5`)
    }

    if(!isWebUri(url)){
      logger.error(`Invalid url ${url}`);
      return res.status(400).send(`must be a valid url`);
    }

    const bookmark = {id: uuid(), title, url, description, rating};

    store.bookmarks.push(bookmark);

    logger.info(`Bookmark ${bookmark} created`);
    res
      .status(201)
      .location(`http://localhost:${PORT}/bookmarks/${bookmark.id}`)
      .json(bookmark);
  })
 bookmarkRouter
  .route('/bookmarks/:bookmark_id')
  .get((req,res)=>{
    const { bookmark_id } = req.params
    console.log(bookmark_id)
    const bookmark = store.bookmarks.find(c => {
        console.log(c.id);
        return c.id == bookmark_id
    })
    console.log(bookmark);

    if(!bookmark){
      logger.error(`Bookmark id:${bookmark_id} not found`)
      return res  
        .status(404)
        .send('Bookmark not found')
    }
    res.json(bookmark)
  })
  .delete((req,res)=>{
    const { bookmark_id } = req.params;
    const bookmarkIndex = store.bookmarks.findIndex(c => c.id === bookmark_id)

    if (bookmarkIndex === -1){
      logger.error(`Bookmark id: ${bookmark_id} not found`)
      return res
        .status(404)
        .send('Bookmark not found')
    }

    store.bookmarks.splice(bookmarkIndex,1)

    logger.info(`Bookmark with id ${bookmark_id} deleted`);
    res
      .status(204)
      .end()
  })


module.exports = bookmarkRouter;