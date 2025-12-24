import {RANDOM_PHOTOS_COUNT, FILTER_DEFAULT, FILTER_RANDOM, FILTER_DISCUSSED, RERENDER_DELAY} from './constants.js';

let originalPosts = [];
let filteredPosts = [];

const getRandomUniqueElement = (array, count) =>{
  const random = [...array].sort(() => Math.random() - 0.5);
  return random.slice(0, count);
};

const sortByComments = (posts) => {
  const sortComment =  [...posts].sort((a, b) => b.comments.length - a.comments.length);
  return sortComment;

};

const filterPosts = (posts, filterType) =>{
  switch (filterType){
    case FILTER_RANDOM:
      return getRandomUniqueElement(posts, RANDOM_PHOTOS_COUNT);
    case FILTER_DISCUSSED:
      return sortByComments(posts);
    case FILTER_DEFAULT:
      return [...posts];
  }
};

const applyFilter = (filterType) =>{
  filteredPosts = filterPosts(originalPosts, filterType);
  return filteredPosts;
};

const updateActiveFilterButton = (activeButtonId) => {
  const filterButtons = document.querySelectorAll('.img-filters__button');
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  const activeButton = document.querySelector(`#${activeButtonId}`);
  if (activeButton) {
    activeButton.classList.add('img-filters__button--active');
  }
};
const initFilter = (posts, renderCallback) =>{
  originalPosts = [...posts];
  filteredPosts = [...posts];

  const filterContainer = document.querySelector('.img-filters');
  if (filterContainer) {
    filterContainer.classList.remove('img-filters--inactive');
  }
  const debouncedRender = (() => {
    let timeoutId;
    return (filterType, buttonId) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const filtered = applyFilter(filterType);
        renderCallback(filtered);
      }, RERENDER_DELAY);
      updateActiveFilterButton(buttonId);
    };
  })();

  const defaultButton = document.querySelector('#filter-default');
  const randomButton = document.querySelector('#filter-random');
  const discussedButton = document.querySelector('#filter-discussed');

  if (defaultButton) {
    defaultButton.addEventListener('click', () => {
      debouncedRender(FILTER_DEFAULT, 'filter-default');
    });
  }

  if (randomButton) {
    randomButton.addEventListener('click', () => {
      debouncedRender(FILTER_RANDOM, 'filter-random');
    });
  }

  if (discussedButton) {
    discussedButton.addEventListener('click', () => {
      debouncedRender(FILTER_DISCUSSED, 'filter-discussed');
    });
  }

  return filteredPosts;
};


export {initFilter};
