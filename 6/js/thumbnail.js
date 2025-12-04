import {createPosts} from './data.js';

const pictureTemplate =  document.querySelector('#picture').content;
const pictures = document.querySelector('.pictures');


const createThumbnail = (post) => {
  const thumbnail = pictureTemplate.cloneNode(true);
  const imgElement = thumbnail.querySelector('.picture__img');
  const commentsElement = thumbnail.querySelector('.picture__comments');
  const likesElement = thumbnail.querySelector('.picture__likes');

  imgElement.src = post.url;
  imgElement.alt = post.description;
  commentsElement.textContent = post.comments.length;
  likesElement.textContent = post.likes;

  return thumbnail;
};

const renderThumbnails = () =>{
  const posts = createPosts();
  const fragment = document.createDocumentFragment();

  posts.forEach((post) =>{
    const thumbnail = createThumbnail(post);
    fragment.appendChild(thumbnail);
  });

  pictures.appendChild(fragment);
};

export {renderThumbnails};
