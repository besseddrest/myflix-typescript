import { render } from '@testing-library/react';
import React, { useState, useEffect, ReactText } from 'react';
import { Movie } from '../../types/Movie';
import { MovieDetail } from '../../types/MovieDetail';
import { MovieLists } from '../../types/MovieLists';
import './Main.scss';
import { handlePageClick, handleSliderClick } from './MainUtils';

export function Main() {
  const [movieLists, setMovieLists] = useState<MovieLists>();
  const [movieDetails, setMovieDetails] = useState<MovieDetail[]>([]);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=ddb9cdf5d7e5e833c1ace354ee4baa49&language=en-US&page=1')
      .then(response => response.json())
      .then(res => {
        setMovieLists(prev => ({
          ...prev,
          now_playing: res.results
        }));
        setPageCount(res.results.length / 4)
      });

    // idea for movie details:
    // per slider fetch for next 'page' of movies (4x) and store in state permanently,
    // slider click handler will check if id in state, and request any missing metadata
    // state is only cleared on app refresh or new page?

    // fetch('https://api.themoviedb.org/3/movie/661374?api_key=ddb9cdf5d7e5e833c1ace354ee4baa49&language=en-US')
    //   .then(response => response.json())
    //   .then(res => {
    //     const detail = {
    //       id: res.id,
    //       overview: res.overview,
    //     }
    //     setMovieDetails(prev => ([
    //       ...prev,
    //       detail,
    //     ]));
    //   });
  }, [])

  return (
    <div className="movie-cards__wrapper">
      <div className="movie-cards__group-container">
        <div className="movie-cards__header">
          <h3 className="movie-cards__category">Now In Theaters</h3>
          <div className="movie-cards__pages">
            {
              [...Array(pageCount)].map((element, i) => <div className={i == 0 ? "movie-cards__pages-item movie-cards__pages-item--active" : "movie-cards__pages-item"} data-page-key={i} key={i} onClick={handlePageClick}></div>)
            }
          </div>
        </div>        
        <div className="movie-cards__slider-container">
          <div className="movie-cards__scroll movie-cards__scroll--left" onClick={(event) => handleSliderClick(event, pageCount)}>&lsaquo;</div>
          <div className="movie-cards__slider">
            { 
              movieLists?.now_playing.map((item: Movie, i: number) => 
                <div key={i} className="movie-card" data-movie-id={item.id}>
                  <img src={"https://image.tmdb.org/t/p/original" + item.poster_path} alt={"Poster for " + item.title}/>
                  <div className="movie-card__details">
                    <p>Preview here</p>
                    <div className="movie-card__info">
                      <h4>{item.title}</h4>
                      <ul>
                        <li>Popularity: {item.popularity}</li>
                        <li>Vote Count: {item.vote_count}</li>
                        <li>Vote Avg: {item.vote_average}</li>
                      </ul>
                    </div>
                  </div>
                </div>)
            }
          </div>
          <div className="movie-cards__scroll movie-cards__scroll--right" onClick={(event) => handleSliderClick(event, pageCount)}>&rsaquo;</div>
        </div> 
      </div>
    </div>
  )
}