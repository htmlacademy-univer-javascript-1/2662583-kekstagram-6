import {openBigPicture} from './bigPicture.js';
import {getData} from './api.js';
import {initFilter} from './filters.js';

const createThumbnail = (post) => {
  const pictureTemplate =  document.querySelector('#picture').content;
  const thumbnail = pictureTemplate.cloneNode(true);
  const pictureElement = thumbnail.querySelector('.picture');
  const imgElement = thumbnail.querySelector('.picture__img');
  const commentsElement = thumbnail.querySelector('.picture__comments');
  const likesElement = thumbnail.querySelector('.picture__likes');

  imgElement.src = post.url;
  imgElement.alt = post.description;
  commentsElement.textContent = post.comments.length;
  likesElement.textContent = post.likes;

  pictureElement.addEventListener('click', (evt) =>{
    evt.preventDefault();
    openBigPicture(post);
  });

  return thumbnail;
};

const showLoadError = () => {
  const errorAlert = document.createElement('div');
  errorAlert.className = 'data-load-error';

  const errorText = document.createElement('span');
  errorText.className = 'data-load-error__text';
  errorText.textContent = 'Ошибка загрузки фотографий. Обновите страницу.';

  const closeButton = document.createElement('button');
  closeButton.className = 'data-load-error__close-btn';
  closeButton.innerHTML = '&times;';
  closeButton.type = 'button';

  closeButton.addEventListener('click', () => {
    errorAlert.remove();
  });

  errorAlert.appendChild(errorText);
  errorAlert.appendChild(closeButton);
  document.body.appendChild(errorAlert);

};

const renderThumbnails = (posts) =>{
  const pictures = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  const existingPictures = pictures.querySelectorAll('.picture');
  existingPictures.forEach((picture) => picture.remove());

  posts.forEach((post) =>{
    const thumbnail = createThumbnail(post);
    fragment.appendChild(thumbnail);
  });

  pictures.appendChild(fragment);
};

const initThumbnails = async () => {
  try {
    const posts = await getData();
    renderThumbnails(posts);
    initFilter(posts, renderThumbnails);
  } catch (error) {
    showLoadError();
  }
};


export {initThumbnails, renderThumbnails};
