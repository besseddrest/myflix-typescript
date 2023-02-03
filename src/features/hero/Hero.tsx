import React from "react"
import { HeroMovie } from "../../types/HeroMovie"
import './Hero.scss';

interface HeroMovieProps {
  heroMovieState: [HeroMovie, React.Dispatch<React.SetStateAction<HeroMovie>>]
}

export const Hero: React.FC<HeroMovieProps> = ({heroMovieState: [heroMovie, setHeroMovie]}) => {
  const url = "url(https://image.tmdb.org/t/p/original" + heroMovie.backdrop_path + ")";

  const heroImageStyle:React.CSSProperties = {
    backgroundImage: url,
    backgroundSize: "cover"
  };
  
  return(
    <div className="hero__wrapper">
      <div className="hero__poster" style={heroImageStyle}></div>
      <div className="hero__metadata">
        <h2 className="hero__title">{heroMovie.title}</h2>
        <p>{heroMovie.overview}</p>
        <div className="hero__actions">
          <button className="hero__button hero__button--play button--text button--primary">&#9658; Play</button>
          <button className="hero__button hero__button--info button--text button--secondary">&#9432; More Info</button>
        </div>
      </div>
    </div>
  )
}