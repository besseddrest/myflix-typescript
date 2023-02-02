import React from "react"
import { HeroMovie } from "../../types/HeroMovie"

interface HeroMovieProps {
  heroMovieState: [HeroMovie, React.Dispatch<React.SetStateAction<HeroMovie>>]
}
export const Hero: React.FC<HeroMovieProps> = ({heroMovieState: [heroMovie, setHeroMovie]}) => {
  return(
    <div className="hero__wrapper">
      <div className="hero__poster"><img src={"https://image.tmdb.org/t/p/original" + heroMovie.backdrop_path} alt={"Poster for " + heroMovie.title}/></div>
      <div className="hero__metadata">
        <h2 className="hero__title">{heroMovie.title}</h2>
        <p>{heroMovie.overview}</p>
        <div className="hero__actions">
          <button className="hero__button hero__button--play">Play</button>
          <button className="hero__button hero__button--info">More Info</button>
        </div>
      </div>
    </div>
  )
}