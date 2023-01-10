import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import { Movie } from '../../types/Movie';

export function Main() {
  const [nowPlaying, setNowPlaying] = useState([]);
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=ddb9cdf5d7e5e833c1ace354ee4baa49&language=en-US&page=1')
    .then(response => response.json())
    .then(res => setNowPlaying(res.results))
  }, [])
  return (
    <div>
      <h2>Main</h2>
      <h3>Now In Theaters</h3>
      <div className="movie__card-container">
        { 
          nowPlaying.map((item: Movie, i: number) => <div key={i} className="movie__card"><img src={"https://image.tmdb.org/t/p/original" + item.poster_path} />{ item.title }</div>)
        }
      </div>
    </div>
  )
}