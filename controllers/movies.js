const app = require('express')()
const MovieDB = require('moviedb-promise')
const moviedb = new MovieDB('3ff1627251b2e297c8f60ee1b83ac509')

//INDEX
app.get('/', (req, res) => {
    moviedb.miscNowPlayingMovies()
    .then(response => {
        // res.send(response)
        res.render('movies-index', {movies: response.results})
    }).catch(console.error)
})

//SHOW
// TODO: Fix videos.trailer_youtube_ID undefined bug
app.get('/movies/:id', (req, res) => {
    console.log('movies show')
    moviedb.movieInfo({ id: req.params.id }).then(movie => {
        moviedb.movieTrailers({ id: req.params.id }).then(videos => {
            movie.trailer_youtube_id = videos.youtube[0].source
            console.log('VIDEOS.TRAILER_YOUTUBE_ID', movie.trailer_youtube_id)

            // res.send(videos)
            res.render('movies-show', { movie: movie});
        }).catch(console.error);
    }).catch(console.error);
});

module.exports = app
