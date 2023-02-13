import { render } from '@testing-library/react';
import React, { useState, useEffect, ReactText } from 'react';
import { Movie } from '../../types/Movie';
import { MovieDetail } from '../../types/MovieDetail';
import { MovieLists } from '../../types/MovieLists';
import { PageCounts } from '../../types/PageCounts';
import { HeroMovie } from '../../types/HeroMovie';
import './Main.scss';
import { handlePageClick, handleSliderClick, debounce } from './MainUtils';
import { Hero } from '../hero/Hero';
import { Overlay } from '../overlay/Overlay';
import { trimMovieDetailResponse } from '../../scripts/utils';

export function Main() {
  const [movieLists, setMovieLists] = useState<MovieLists>({now_playing: [], top_rated: []});
  const [movieDetails, setMovieDetails] = useState<MovieDetail | null>(null);
  const [pageCounts, setPageCounts] = useState<PageCounts>({});
  const [heroMovie, setHeroMovie] = useState<HeroMovie>(Object);

  const handleScroll = () => {
    const scrollPosition = window.scrollY.toString();
    const scrollElement = document.querySelector('html');
    (scrollElement as HTMLElement).dataset.scroll = scrollPosition;
  }

  const handleMoreInfoClick = (ev: React.MouseEvent, id: number) => {
    fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=ddb9cdf5d7e5e833c1ace354ee4baa49&language=en-US&append_to_response=credits,release_dates,similar")
      .then(response => response.json())
      .then(res => {
        const response = trimMovieDetailResponse(res);
        setMovieDetails(response);
      })
  }

  useEffect(() => {
    window.addEventListener("scroll", debounce(() => handleScroll(), 200), { passive: true });
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
        now_playing: nowPlaying.length / 5,
        top_rated: topRated.length / 5,
      });
    }

    fetchData();

    return () => {
      window.removeEventListener("scroll", debounce(() => handleScroll(), 200));
    }
  }, [])

  return (
    <>
      { movieDetails ? <Overlay movieDetailsState={[movieDetails, setMovieDetails]} /> : null }
      <Hero heroMovie={heroMovie} handleMoreInfoClick={(event: React.MouseEvent) => handleMoreInfoClick(event, heroMovie.id)} />
      <div className="movie-cards__wrapper">
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
                            <div className="movie-card__score">Score: {item.popularity}</div>
                            <div className="movie-card__actions">
                              <button className="button--icon button--icon-light">&#9658;</button>
                              <button className="button--icon">&#65291;</button>
                              <button className="button--icon">&#128077;</button>
                            </div>
                            <button className="movie-card__more-info button--text button--primary" onClick={(event) => handleMoreInfoClick(event, item.id)}>More Info</button>
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
    </>
  )
}