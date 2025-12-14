import {isEscapeKey} from './util.js';
import {LOAD_COMMENTS_COUNT} from './constants.js';

let visibleCommentsCount  = 0;
let currentPost = null;

const closeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const createComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const imgElement = document.createElement('img');
  imgElement.classList.add('social__picture');
  imgElement.src = comment.avatar;
  imgElement.alt = comment.name;
  imgElement.width = 35;
  imgElement.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = comment.message;

  commentElement.appendChild(imgElement);
  commentElement.appendChild(textElement);

  return commentElement;
};

const onLoaderCommentsClick = ()=>{
  const socialComments = document.querySelector('.social__comments');
  const socialCommentsCount = document.querySelector('.social__comment-count');
  const commentsLoader = document.querySelector('.social__comments-loader');

  const nextCommentsCount = Math.min(visibleCommentsCount + LOAD_COMMENTS_COUNT, currentPost.comments.length);
  for (let i = visibleCommentsCount; i < nextCommentsCount; i++){
    const commentElement = createComment(currentPost.comments[i]);
    socialComments.appendChild(commentElement);
  }
  visibleCommentsCount = nextCommentsCount;
  socialCommentsCount.firstChild.textContent = `${visibleCommentsCount} из `;

  if (visibleCommentsCount >= currentPost.comments.length){
    commentsLoader.classList.add('hidden');
  }

};

function openBigPicture(post) {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const socialCaption = bigPicture.querySelector('.social__caption');
  const socialComments = bigPicture.querySelector('.social__comments');
  const buttonCancel= bigPicture.querySelector('.big-picture__cancel');
  const socialCommentsCount = document.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');

  bigPictureImg.src = post.url;
  bigPictureImg.alt = post.description;
  likesCount.textContent = post.likes;
  commentsCount.textContent = post.comments.length;
  socialCaption.textContent = post.description;

  currentPost = post;
  socialComments.innerHTML = '';

  visibleCommentsCount = 0;

  const initialCommentsCount  = Math.min(currentPost.comments.length, LOAD_COMMENTS_COUNT);

  for(let i = 0; i < initialCommentsCount; i++){
    const commentElement = createComment(currentPost.comments[i]);
    socialComments.appendChild(commentElement);
  }

  visibleCommentsCount = initialCommentsCount;
  socialCommentsCount.firstChild.textContent = `${visibleCommentsCount} из `;

  if (currentPost.comments.length <= LOAD_COMMENTS_COUNT){
    commentsLoader.classList.add('hidden');
  } else{
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', onLoaderCommentsClick);
  }

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeKeydown);
  buttonCancel.addEventListener('click', closeBigPicture);

}

function closeBigPicture() {
  const bigPicture = document.querySelector('.big-picture');
  const buttonCancel= bigPicture.querySelector('.big-picture__cancel');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeKeydown);
  buttonCancel.removeEventListener('click', closeBigPicture);
  commentsLoader.removeEventListener('click', onLoaderCommentsClick);
}

export {openBigPicture};
