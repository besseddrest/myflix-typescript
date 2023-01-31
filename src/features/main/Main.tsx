import { render } from '@testing-library/react';
import React, { useState, useEffect, ReactText } from 'react';
import { Movie } from '../../types/Movie';
import { MovieDetail } from '../../types/MovieDetail';
import { MovieLists } from '../../types/MovieLists';
import { PageCounts } from '../../types/PageCounts';
import { HeroMovie } from '../../types/HeroMovie';
import './Main.scss';
import { handlePageClick, handleSliderClick } from './MainUtils';

export function Main() {
  const [movieLists, setMovieLists] = useState<MovieLists>({now_playing: [], top_rated: []});
  const [movieDetails, setMovieDetails] = useState<MovieDetail>();
  const [pageCounts, setPageCounts] = useState<PageCounts>({});
  const [heroMovie, setHeroMovie] = useState<HeroMovie>();
  
  const handleMoreInfoClick = (ev: React.MouseEvent, id: number) => {
    fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=ddb9cdf5d7e5e833c1ace354ee4baa49&language=en-US")
      .then(response => response.json())
      .then(res => {
        setMovieDetails(res);
      })
  }

  const handleOverlayClose = (ev: React.MouseEvent) => {
    setMovieDetails(undefined);
  }

  useEffect(() => {
    // fetch movie lists: "Now In Theaters", "Top Rated"
    const fetchData = async () => {
      const nowPlaying = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=ddb9cdf5d7e5e833c1ace354ee4baa49&language=en-US&page=1')
        .then(response => response.json())
        .then(res => {
          setHeroMovie(res.results[0]);
          return res.results;
        });

      const topRated = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=ddb9cdf5d7e5e833c1ace354ee4baa49&language=en-US&page=1')
        .then(response => response.json())
        .then(res => {
          return res.results;
        })

      setMovieLists({
        now_playing: nowPlaying,
        top_rated: topRated,
      });

      setPageCounts({
        now_playing: nowPlaying.length / 4,
        top_rated: topRated.length / 4,
      });
    }

    fetchData();
  }, [])

  return (
    <div>
      <div className="hero__wrapper">
        <div className="hero__poster"><img src={"https://image.tmdb.org/t/p/original" + heroMovie?.backdrop_path} alt={"Poster for " + heroMovie?.title}/></div>
        <div className="hero__metadata">
          <h2 className="hero__title">{heroMovie?.title}</h2>
        </div>
      </div>
      <div className="movie-cards__wrapper">
        <div onClick={handleOverlayClose} className={movieDetails ? "overlay overlay--active" : "overlay"}>
          <div className="modal">
            <img src={"https://image.tmdb.org/t/p/w1280" + movieDetails?.backdrop_path} alt="This Movie Alt" />
            <div className="movie__details">
              <h3>{movieDetails?.title}</h3>
              <p>{movieDetails?.overview}</p>
              <p>
                {
                  movieDetails?.genres.map((genre, i) => <span key={i}>{genre.name}, </span>)
                }
              </p>
            </div>
            <button onClick={handleOverlayClose}>X</button>
          </div>
        </div>
        {
          Object.keys(movieLists)?.map((list, i) => 
            <div key={i} className="movie-cards__group-container">
              <div className="movie-cards__header">
                <h3 className="movie-cards__category">
                  {
                    (list === 'now_playing') ? "Now In Theaters" : "Top Rated"
                  }
                </h3>
                <div className="movie-cards__pages">
                  {
                    [...Array(pageCounts[list])].map((element, i) => <div className={i == 0 ? "movie-cards__pages-item movie-cards__pages-item--active" : "movie-cards__pages-item"} data-page-key={i} key={i} onClick={handlePageClick}></div>)
                  }
                </div>
              </div>        
              <div className="movie-cards__slider-container">
                <div className="movie-cards__scroll movie-cards__scroll--left" onClick={(event) => handleSliderClick(event, pageCounts[list])}>&lsaquo;</div>
                <div className="movie-cards__slider">
                  { 
                    movieLists[list]?.map((item: Movie, i: number) => 
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
                <div className="movie-cards__scroll movie-cards__scroll--right" onClick={(event) => handleSliderClick(event, pageCounts[list])}>&rsaquo;</div>
              </div> 
            </div>
          )
        }
      </div>
    </div>
  )
}