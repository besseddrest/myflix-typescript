import { MovieDetail } from '../../types/MovieDetail';
import { getYear } from './OverlayUtils';
import './Overlay.scss';

type OverlayProps = {
  handleOverlayClose: Function,
  movieDetails?: MovieDetail,
}

export const Overlay: React.FC<OverlayProps> = (props) => {
  const { handleOverlayClose, movieDetails } = props;
  return (<div onClick={() => handleOverlayClose()} className={movieDetails ? "overlay overlay--active" : "overlay"}>
    <div className="modal">
      <img src={"https://image.tmdb.org/t/p/w1280" + movieDetails?.backdrop_path} alt="This Movie Alt" />
      {movieDetails && <div className="movie__details">
        <h3>{movieDetails.title}</h3>
        <div className="movie__actions">
          <button>&#9658; Play</button>
          <div className="movie-card__media--add">+</div>
          <div className="movie-card__media--like">&#128077;</div>
        </div>
        <div className="movie__ratings"><strong>{movieDetails.popularity}</strong> | {getYear(movieDetails.release_date)} | {movieDetails.vote_average} | {movieDetails.runtime}</div>
        <div className="movie__info">
          <div><p>{movieDetails.overview}</p></div>
          <div className="movie_sidebar">
            <p><strong>Cast: </strong>
              {movieDetails.cast.map((name, i) => <span key={i}>{name}{(i < movieDetails.cast.length) ? ', ' : ' '}</span>)}
            </p>
            <p><strong>Genres: </strong>
              {movieDetails.genres.map((genre, i) => <span key={i}>{genre.name}{(i < movieDetails.genres.length) ? ', ' : ' '}</span>)}
            </p>
          </div>
        </div>
      </div>}
      <button className="overlay__close" onClick={() => handleOverlayClose()}>x</button>
    </div>
  </div>);
  }