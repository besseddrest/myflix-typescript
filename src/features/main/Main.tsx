import { render } from '@testing-library/react';
import React, { useState, useEffect, ReactText } from 'react';
import { Movie } from '../../types/Movie';
import { MovieDetail } from '../../types/MovieDetail';
import { MovieLists } from '../../types/MovieLists';
import './Main.scss';
import { handlePageClick, handleSliderClick } from './MainUtils';

export function Main() {
  const [movieLists, setMovieLists] = useState<MovieLists>();
  const [movieDetails, setMovieDetails] = useState<MovieDetail>();
  const [pageCount, setPageCount] = useState(0);
  
  const handleMoreInfoClick = (ev: React.MouseEvent, id: number) => {
    fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=ddb9cdf5d7e5e833c1ace354ee4baa49&language=en-US")
      .then(response => response.json())
      .then(res => {
        setMovieDetails(res);
      })
  }

  const handleOverlayClose = (ev: React.MouseEvent) => {
    setMovieDetails(undefined);
    console.log('hello world');
  }
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

    // fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=ddb9cdf5d7e5e833c1ace354ee4baa49&language=en-US')
    //   .then(response => response.json())
    //   .then(res => {
    //     setGenres(() => res.genres);
    //   });
  }, [])

  return (
    <div className="movie-cards__wrapper">
      <div className={movieDetails ? "overlay overlay--active" : "overlay"}>
        <div className="modal">
          <h3>{movieDetails?.title}</h3>
          <button onClick={handleOverlayClose}>X</button>
        </div>
      </div>
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
                  <img src={"https://image.tmdb.org/t/p/w500" + item.poster_path} alt={"Poster for " + item.title}/>
                  <div className="movie-card__details">
                    {
                      item.backdrop_path ? <img src={"https://image.tmdb.org/t/p/w500" + item.backdrop_path} alt={"Backdrop for " + item.title} /> : "No backdrop"
                    }
                    <div className="movie-card__info">
                      <h4>{item.title}</h4>
                      <div className="movie-card__media">
                        <div className="movie-card__media--play">&#9658;</div>
                        <div className="movie-card__media--add">+</div>
                        <div className="movie-card__media--like">&#128077;</div>
                      </div>
                      <button className="movie-card__more-info" onClick={(event) => handleMoreInfoClick(event, item.id)}>More Info</button>
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