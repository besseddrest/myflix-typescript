export const trimMovieDetailResponse = (res: any) => {
  const response = res;
  const cast = []
  let director: string = '';
  let writers: string[] = [];
  let rating: string = '';

  // similar movies
  response.similar = res.similar.results;

  // cast
  for (let i = 0; i < res.credits.cast.length; i++) {
    cast.push(res.credits.cast[i].name);
  }
  response.cast = cast;

  // director + writer
  for (let i = 0; i < res.credits.crew.length; i++) {
    const member = res.credits.crew[i];

    if (member.job == 'Director') {
      director = member.name;
    }

    if (member.job == 'Screenplay' || member.job == 'Co-Writer') {
      writers.push(member.name);
    }

    if (writers.length == 3) {
      break;
    }
  }
  
  for (let i = 0; i < res.release_dates.results.length; i++) {
    const entry = res.release_dates.results[i];
    if (entry.iso_3166_1 == 'US' && entry.release_dates.length > 0) {
      rating = entry.release_dates[0].certification;
      break;
    }
  }
  response.rating = rating;
  response.director = director != '' ? director : 'N/A';
  response.writers = writers;

  return response;
}