const express = require('express');

// database access using knex
const knex = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    // select * from posts
    knex.select('*').from('posts')
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Error getting the posts from the database." });
        });
});

router.get('/:id', (req, res) => {
    // select * from posts where id = req.params.id
    knex
        .select("*")
        .from("posts")
        .where("id", "=", req.params.id)
        // .where({ id: req.params.id }) alternative 
        .first() // gets the first item in an array
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Error getting the post from the database." });
        });
});

router.post('/', (req, res) => {
    // validate data first -- don't bother the db unless you know the data is good
    const postData = req.body;
    knex('posts')
        .insert(postData, 'id') // 2nd argument will show warning when using SQLite -- it's there for MySQL or Postgres
        .then(ids => {
            // returns an array of one element, the id of the last record inserted
            const id = ids[0];
            return knex("posts")
                .select('id', 'title', 'contents')
                .where({ id })
                .first()
                .then(post => {
                    res.status(201).json(post)
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Error adding the post to the database." });
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    // validate the data 
    knex('posts')
        .where({ id })
        .update(changes)
        .then(count => {
            res.status(200).json({ message: `${count} records updated` })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Error updating post to the database." });
        });
});

router.delete('/:id', (req, res) => {
    knex("posts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
        count > 0
        ? res.status(200).json({ message: `${count} records deleted` })
        : res.status(404).json({ message: `Post not found` })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "Error deleting the post from the database." });
    });
});

module.exports = router;