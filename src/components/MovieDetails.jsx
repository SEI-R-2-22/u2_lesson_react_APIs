import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL, POSTER_PATH, API_KEY } from '../globals'

const MovieDetails = (props) => {
  const [movieDetails, setMovieDetails] = useState(null)

  useEffect(() => {
    const getDetails = async () => {
      const response = await axios.get(`${BASE_URL}/movie/${props.selectedMovie}?api_key=${API_KEY}`)
      setMovieDetails(response.data)
    }
    getDetails()
  }, [props.selectedMovie])

  return (
    <div>
      {movieDetails ? (
        <div className="details">
          <div className="card">
            <img src={`${POSTER_PATH}${movieDetails.backdrop_path}`} alt="poster"/>
            <h2>{movieDetails.title}</h2>
            <p>{movieDetails.overview}</p>
            <p>Released: {movieDetails.release_date}</p>
          </div>
          <button onClick={props.goBack}>Go Back</button>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  )
}

export default MovieDetails
