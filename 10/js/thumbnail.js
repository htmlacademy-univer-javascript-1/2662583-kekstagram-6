import {openBigPicture} from './bigPicture.js';
import {getData} from './api.js';

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
  errorAlert.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    padding: 16px 24px;
    background: linear-gradient(135deg, #ff6b6b, #ff4757);
    color: white;
    text-align: center;
    font-family: 'Open Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
    display: flex;
    align-items: center;
    gap: 12px;
    max-width: 90%;
    width: 400px;
  `;

  const errorText = document.createElement('span');
  errorText.textContent = 'Ошибка загрузки фотографий. Обновите страницу.';
  errorText.style.flex = '1';

  const closeButton = document.createElement('button');
  closeButton.innerHTML = '&times;';
  closeButton.style.cssText = `
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s;
  `;

  closeButton.addEventListener('mouseover', () => {
    closeButton.style.background = 'rgba(255, 255, 255, 0.3)';
  });

  closeButton.addEventListener('mouseout', () => {
    closeButton.style.background = 'rgba(255, 255, 255, 0.2)';
  });

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
  } catch (error) {
    showLoadError();
  }
};


export {initThumbnails, renderThumbnails};
