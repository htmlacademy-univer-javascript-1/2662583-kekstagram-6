import {createPosts} from './data.js';
import {openBigPicture} from './bigPicture.js';

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

const renderThumbnails = () =>{
  const pictures = document.querySelector('.pictures');
  const posts = createPosts();
  const fragment = document.createDocumentFragment();

  posts.forEach((post) =>{
    const thumbnail = createThumbnail(post);
    fragment.appendChild(thumbnail);
  });

  pictures.appendChild(fragment);
};

export {renderThumbnails};
