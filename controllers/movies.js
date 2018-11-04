const app = require('express')()
const MovieDB = require('moviedb-promise')
const moviedb = new MovieDB('3ff1627251b2e297c8f60ee1b83ac509')

app.get('/', (req, res) => {
    moviedb.miscNowPlayingMovies()
    .then(response => {
        // res.send(response)
        res.render('movies-index', {movies: response.results})
    }).catch(console.error)
})

// app.get('/movies/:id', (req, res) => {
//     moviedb.movieInfo({id: req.params.id})
//     .then((movie) => {
//         res.render('movies-show', {movie: movie})
//     }).catch(console.error)
// })

app.get('/movies/:id', (req,res) => {
    moviedb.movieInfo({id: req.params.id}).then(movie => {
        moviedb.movieTrailers({id: req.params.id}).then(videos => {
            movie.trailer_youtube_id = videos.youtube[0].source
            console.log('VIDEOS.TRAILER_YOUTUBE_ID', movie.trailer_youtube_id);

            res.render("movies-show", {movie: movie})
        }).catch(console.error)
    }).catch(console.error)
})

module.exports = app
