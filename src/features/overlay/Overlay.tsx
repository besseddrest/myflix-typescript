import { MovieDetail } from '../../types/MovieDetail';
import { getYear } from './OverlayUtils';
import './Overlay.scss';

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

export const Overlay: React.FC<OverlayProps> = (props) => {
  const { handleOverlayClose, movieDetails } = props;
  return (<div onClick={() => handleOverlayClose()} className={movieDetails ? "overlay overlay--active" : "overlay"}>
    <div className="modal">
      <img src={"https://image.tmdb.org/t/p/w1280" + movieDetails?.backdrop_path} alt="This Movie Alt" />
      {movieDetails && <div className="movie__details">
        <h3>{movieDetails.title}</h3>
        <div className="movie__actions">
          <button className="button--text">&#9658; Play</button>
          <button className="button--icon">&#65291;</button>
          <button className="button--icon">&#128077;</button>
        </div>
        <div className="movie__ratings"><strong>Score: {movieDetails.popularity}</strong> . {getYear(movieDetails.release_date)} . Avg: {movieDetails.vote_average} . {formatRuntime(movieDetails.runtime)}</div>
        <div className="movie__info">
          <div><p>{movieDetails.overview}</p></div>
          <div className="movie_sidebar">
            <p><strong>Cast: </strong>
              {movieDetails.cast.map((name, i) => <span key={i}>{name}{(i < movieDetails.cast.length - 1) ? ', ' : ' '}</span>)}
            </p>
            <p><strong>Genres: </strong>
              {movieDetails.genres.map((genre, i) => <span key={i}>{genre.name}{(i < movieDetails.genres.length - 1) ? ', ' : ' '}</span>)}
            </p>
          </div>
        </div>
      </div>}
      <button className="button--icon-close button--icon" onClick={() => handleOverlayClose()}>&#10006;</button>
    </div>
  </div>);
  }