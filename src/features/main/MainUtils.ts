import React from "react";

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