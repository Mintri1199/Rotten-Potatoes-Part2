const Review = require("../models/review.js")
const app = require('express')()
const Comment = require('../models/comment.js')


// Routes
app.get('/', (req, res) => {
    Review.find()
    .then(reviews => {
        res.render('reviews-index', {reviews: reviews});
    })
    .catch(err => {
        console.log(err);
    });
});

// New
app.get("/reviews/new", (req, res) => {
    res.render('reviews-new', {});
})

// Create
app.post('/reviews', (req, res) => {
    Review.create(req.body)
    .then((review) => {
        console.log(review)
        // Grave accents. not single quotes
        res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
    }).catch((err) => {
        console.log(err.message)
    })
})

// SHOW
app.get('/reviews/:id', (req,res) => {
    // console.log(err.message);
    Review.findById(req.params.id).then((review) => {
        Comment.find({reviewId: req.params.id})
        .then(comments => {
            res.render("reviews-show", {review: review, comments: comments})
        })
    }).catch((err) => {
        console.log(err.message);
    })
});

//EDIT
app.get('/reviews/:id/edit', (req,res) => {
    Review.findById(req.params.id, function(err, review){
        res.render('reviews-edit', {review: review});
    })
})

//Update
app.put("/reviews/:id", (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
        res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
        console.log(err.message);
    })
})

//Delete
app.delete("/reviews/:id", function(req, res) {
    console.log("Delete review");
    Review.findByIdAndRemove(req.params.id)
    .then((review) => {
        res.redirect('/')
    }).catch((err) => {
        console.log(err.message);
    })
})

module.exports = app
