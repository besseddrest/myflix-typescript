import { MovieDetail } from '../../types/MovieDetail';
import { getYear } from './OverlayUtils';
import './Overlay.scss';
import React from 'react';

type OverlayProps = {
  handleOverlayClose: Function,
  movieDetails?: MovieDetail,
}

const formatRuntime = (runtime: number | null) => {
  if (runtime) {
    const hours = Math.floor(runtime / 60).toString();
    const mins = (runtime % 60).toString();
    return hours + "h " + mins + "m";
  }
}

const handleMoreClick = (ev: React.MouseEvent) => {
  ev.preventDefault();
  const section = document.querySelector(".movie__about");
  (section as HTMLElement).scrollIntoView({behavior: 'smooth'})
}

export const Overlay: React.FC<OverlayProps> = (props) => {
  const { handleOverlayClose, movieDetails } = props;
  return (<div onClick={(event) => handleOverlayClose(event)} className={movieDetails ? "overlay overlay--active" : "overlay"}>
    <div className="modal">
      { movieDetails?.backdrop_path && <img src={"https://image.tmdb.org/t/p/w1280" + movieDetails.backdrop_path} alt="This Movie Alt" /> }
      {movieDetails && <div className="movie__details">
        <h3>{movieDetails.title}</h3>
        <div className="movie__actions">
          <button className="button--text">&#9658; Play</button>
          <button className="button--icon">&#65291;</button>
          <button className="button--icon">&#128077;</button>
        </div>
        <div className="movie__ratings"><strong>Score: {movieDetails.popularity}</strong> &#x2022; {getYear(movieDetails.release_date)} &#x2022; Avg: {movieDetails.vote_average} &#x2022; {formatRuntime(movieDetails.runtime)}</div>
        <div className="movie__info">
          <div><p>{movieDetails.overview}</p></div>
          <div className="movie_sidebar">
            <p><strong>Cast: </strong>
              {movieDetails.cast.map((name, i) => <span key={i}>{name}{
                (i < movieDetails.cast.length - 1) 
                  ? ', ' 
                  : <span>&nbsp;<a href="#" onClick={(event) => handleMoreClick(event)}>more...</a></span>}</span>
                )
              }
            </p>
            <p><strong>Genres: </strong>
              {movieDetails.genres.map((genre, i) => <span key={i}>{genre.name}{(i < movieDetails.genres.length - 1) ? ', ' : ' '}</span>)}
            </p>
          </div>
        </div>
        <div className="movie__similar">
          <h4>More Like This</h4>
          <div className="similar__wrap">
            {
              movieDetails.similar.map((similarItem, i) => {
                if (similarItem.backdrop_path) {
                  return (
                    <div key={i} className="movie-card">
                      <img src={"https://image.tmdb.org/t/p/w500" + similarItem.backdrop_path} alt={"Backdrop for " + similarItem.title} />
                      <h5>{ similarItem.title }</h5>
                      <div className="movie-card__meta">
                        { getYear(similarItem.release_date) }
                        <button className="button--icon">&#65291;</button>
                      </div>
                      <div className="movie-card__description">
                        {similarItem.overview}
                      </div>
                    </div>
                  )
                }
              }
                
              )
            }
          </div>
        </div>
        <div className="movie__about">
          <h4>About {movieDetails.title}</h4>
          <p>
            about info here
          </p>
        </div>
      </div>}
      <button className="button--icon-close button--icon" onClick={(event) => handleOverlayClose(event)}>&#10006;</button>
    </div>
  </div>);
  }