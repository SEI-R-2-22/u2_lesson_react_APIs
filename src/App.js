import './styles/App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from './globals'
import MovieList from './components/MovieList'
import MovieDetails from './components/MovieDetails'

const App = () => {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)

  const selectMovie = (id) => {
    setSelectedMovie(id)
  }

  const goBack = () => {
    setSelectedMovie(null)
  }

  useEffect(() => {
    const getMovies = async () => {
      const response = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}`)
      setMovies(response.data.results)
    }
    getMovies()
  }, [])

  return (
    <div>
      <h1 className="title">Movie Database</h1>
      {selectedMovie ? (
        <MovieDetails selectedMovie={selectedMovie} goBack={goBack}/>
      ) : (
        <MovieList movies={movies} selectMovie={selectMovie} />
      )}
    </div>
  )
}

export default App
