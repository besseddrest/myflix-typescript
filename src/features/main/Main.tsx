import { render } from '@testing-library/react';
import React, { useState, useEffect, ReactText } from 'react';
import { Movie } from '../../types/Movie';
import './Main.scss';

export function Main() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=ddb9cdf5d7e5e833c1ace354ee4baa49&language=en-US&page=1')
    .then(response => response.json())
    .then(res => setNowPlaying(res.results))
  }, [])

  const handleSliderClick = (e: React.MouseEvent) => {
    const slider = (e.target as HTMLElement).closest(".movie-cards__container")?.querySelector(".movie-cards__slider");
    if (slider) {
      const sliderIndex = parseInt(window.getComputedStyle(slider).getPropertyValue("--slider-index"));
      if ((e.target as HTMLElement).classList.contains("movie-cards__scroll--left")) {
        (slider as HTMLElement).style.setProperty("--slider-index", (sliderIndex - 1).toString());
      } else {
        (slider as HTMLElement).style.setProperty("--slider-index", (sliderIndex + 1).toString());
      }
    }
  }

  return (
    <div className="movie-cards__wrapper">
      <h2>Main</h2>
      <h3 className="movie-category__header">Now In Theaters</h3>
      <div className="movie-cards__container">
        <div className="movie-cards__scroll movie-cards__scroll--left" onClick={handleSliderClick}>LEFT</div>
        <div className="movie-cards__slider">
          { 
            nowPlaying.map((item: Movie, i: number) => 
              <div key={i} className={(i == activeIndex && isActive) ? "movie-card movie-card--active" : "movie-card"} 
                onMouseOver={() => {
                  setActiveIndex(i);
                  setIsActive(true);
                }} 
                onMouseOut={() => {
                  setActiveIndex(-1);
                  setIsActive(false);                
                }}>
                <img src={"https://image.tmdb.org/t/p/original" + item.poster_path} alt={"Poster for " + item.title}/>
                <div className="movie-card__details">
                  <p>Preview here</p>
                  <div className="movie-card__info">
                    <h4>{item.title}</h4>
                    <ul>
                      <li>Popularity: {item.popularity}%</li>
                    </ul>
                  </div>
                </div>
              </div>)
          }
        </div>
        <div className="movie-cards__scroll movie-cards__scroll--right" onClick={handleSliderClick}>right</div>
      </div>
    </div>
  )
}