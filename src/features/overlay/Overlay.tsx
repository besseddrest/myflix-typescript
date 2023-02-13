import { MovieDetail } from '../../types/MovieDetail';
import { getYear } from './OverlayUtils';
import './Overlay.scss';
import React, { useEffect } from 'react';
import { formatRuntime, handleMoreScrollClick } from '../../scripts/utils';

type OverlayProps = {
  movieDetailsState: [MovieDetail, React.Dispatch<React.SetStateAction<MovieDetail | null>>]
}

export const Overlay: React.FC<OverlayProps> = ({movieDetailsState: [movieDetails, setMovieDetails]}) => {
  useEffect(() => {
    const body = document.querySelector("body");
    (body as HTMLElement).style.setProperty("overflow", "hidden");
    const modal = document.querySelector(".modal");
    (modal as HTMLElement).classList.add("modal--active");
  }, [movieDetails]);

  const handleOverlayClose = (ev: React.MouseEvent) => {
    const target = (ev.target as HTMLElement);
    const isCloseElement = (target.classList.contains("overlay") || target.classList.contains("button--icon-close"))
      ? true
      : false;
  
    if (isCloseElement) {
      const modal = document.querySelector(".modal");
      (modal as HTMLElement).classList.remove("modal--active");
      const body = document.querySelector("body");
      (body as HTMLElement).style.setProperty("overflow", "visible");
      setMovieDetails(null);
    }
  }

  return (<div onClick={(event) => handleOverlayClose(event)} className={movieDetails ? "overlay overlay--active" : "overlay"}>
    <div className="modal">
      <div className="modal__hero">
      { movieDetails?.backdrop_path && <img src={"https://image.tmdb.org/t/p/w1280" + movieDetails.backdrop_path} alt="This Movie Alt" /> }
      <h3>{ movieDetails?.title }</h3>
      </div>
      {movieDetails && <div className="movie__details">
        <div className="movie__actions">
          <button className="button--text">&#9658; Play</button>
          <button className="button--icon">&#65291;</button>
          <button className="button--icon">&#128077;</button>
        </div>
        <div className="movie__ratings">
          <strong>Score: {movieDetails.popularity}</strong> &#x2022;&nbsp;
          {getYear(movieDetails.release_date)} &#x2022;&nbsp;
          <span>{ movieDetails.rating }</span> &#x2022;&nbsp;
          Avg: {movieDetails.vote_average} &#x2022;&nbsp;
          {formatRuntime(movieDetails.runtime)}</div>
        <div className="movie__info">
          <div><p>{movieDetails.overview}</p></div>
          <div className="movie__sidebar">
            <p><strong>Cast: </strong>
              {movieDetails.cast.slice(0, 4).map((name, i) => <span key={i}>{name}{
                (i < 3) 
                  ? ', ' 
                  : <span>&nbsp;<a href="#" onClick={(event) => handleMoreScrollClick(event)}>more...</a></span>}</span>
                )
              }
            </p>
            <p><strong>Genres: </strong>
              {movieDetails.genres.map((genre, i) => <span key={i}>{genre.name}{(i < movieDetails.genres.length - 1) ? ', ' : ' '}</span>)}
            </p>
          </div>
        </div>
        <div className="similar-movies">
          <h4>More Like This</h4>
          <div className="similar-movies__wrap">
            {
              movieDetails.similar.map((similarItem, i) => {
                if (similarItem.backdrop_path) {
                  return (
                    <div key={i} className="similar-movie">
                      <div className="similar-movie__backdrop">
                        <button className="button--icon">&#9658;</button>
                        <img src={"https://image.tmdb.org/t/p/w500" + similarItem.backdrop_path} alt={"Backdrop for " + similarItem.title} />
                      </div>
                      <div className="similar-movie__info">
                        <h5>{ similarItem.title }</h5>
                        <div className="similar-movie__meta">
                          <div>
                            <strong>Score: { similarItem.popularity }</strong>
                            { getYear(similarItem.release_date) }
                          </div>
                          <div>
                            <button className="button--icon">&#65291;</button>
                          </div>
                        </div>
                        <div className="similar-movie__description">
                          { similarItem.overview }
                        </div>

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
          <p><span>Director:</span> { movieDetails.director } </p>
          <p><span>Cast:</span> { movieDetails.cast.slice(0, 10).map((item) => item + ", ") }</p>
          <p><span>Writer(s):</span> { movieDetails.writers.map((item) => item + ", ") }</p>
          <p><span>Genres:</span> { movieDetails.genres.map((genre) => genre.name + ', ') }</p>
          {/* <p><span>Adjectives:</span> </p> */}
          <p><span>Maturity Rating:</span> { movieDetails.rating }</p>
        </div>
      </div>}
      <button className="button--icon-close button--icon" onClick={(event) => handleOverlayClose(event)}>&#10006;</button>
    </div>
  </div>);
  }