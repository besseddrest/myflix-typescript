export const trimMovieDetailResponse = (res: any) => {
  const response = res;
  const cast = []
  let director: string = '';
  let writers: string[] = [];

  console.log(res.credits.crew);  
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
      console.log(member.name);
      writers.push(member.name);
    }

    if (writers.length == 3) {
      break;
    }
  }
  response.director = director;
  response.writers = writers;

  return response;
}