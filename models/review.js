const mongoose =  require('mongoose')

const ReviewSchema = mongoose.Schema({
    title: String,
    movieTitle: String,
    description: String,
    ratingValue: Number,
    movieId: {type: String, required: true}

})

module.exports = mongoose.model('Review', ReviewSchema);
