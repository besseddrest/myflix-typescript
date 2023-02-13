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

export const formatRuntime = (runtime: number | null) => {
  if (runtime) {
    const hours = Math.floor(runtime / 60).toString();
    const mins = (runtime % 60).toString();
    return hours + "h " + mins + "m";
  }
}

export const handleMoreScrollClick = (ev: React.MouseEvent) => {
  ev.preventDefault();
  const section = document.querySelector(".movie__about");
  (section as HTMLElement).scrollIntoView({behavior: 'smooth'})
}

export const handleScroll = () => {
  const scrollPosition = window.scrollY.toString();
  const scrollElement = document.querySelector('html');
  (scrollElement as HTMLElement).dataset.scroll = scrollPosition;
}

export const debounce = (fn: Function, timeout: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), timeout);
  } 
}

export const handleSliderClick = (e: React.MouseEvent, pageCount: number) => {
  const target = e.target as HTMLElement;
  const slider = target.closest(".movie-cards__group-container")?.querySelector(".movie-cards__slider");
  if (slider) {
    let sliderIndex = parseInt(window.getComputedStyle(slider).getPropertyValue("--slider-index"));
    if (target.classList.contains("movie-cards__scroll--left")) {
      sliderIndex = (sliderIndex == 0) ? sliderIndex = pageCount - 1 : sliderIndex - 1;
    } else {
      sliderIndex = (sliderIndex == pageCount - 1) ? sliderIndex = 0 : sliderIndex = sliderIndex + 1;
    }
    (slider as HTMLElement).style.setProperty("--slider-index", (sliderIndex).toString());

    // also update pager
    const pagesGroup = target.closest(".movie-cards__group-container")?.querySelector(".movie-cards__pages");
    if (pagesGroup) {
      pagesGroup.querySelector('.movie-cards__pages-item--active')?.classList.remove('movie-cards__pages-item--active');
      pagesGroup.querySelectorAll("[data-page-key='" + sliderIndex.toString() + "']")[0].classList.add("movie-cards__pages-item--active");
    }
  }
}

export const handlePageClick = (e: React.MouseEvent) => {
  const target = e.target as HTMLElement;
  const clickedItemIndex = target.getAttribute('data-page-key');
  if (clickedItemIndex) {
    const targetPage = parseInt(clickedItemIndex);
    target.closest(".movie-cards__pages")?.querySelector(".movie-cards__pages-item--active")?.classList.remove("movie-cards__pages-item--active");
    target.classList.add("movie-cards__pages-item--active");
    const slider = target.closest(".movie-cards__group-container")?.querySelector(".movie-cards__slider");
    (slider as HTMLElement).style.setProperty("--slider-index", (targetPage).toString());
  }
}