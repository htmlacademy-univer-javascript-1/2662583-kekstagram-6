import {isEscapeKey} from './util.js';

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

function openBigPicture(post) {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const socialCaption = bigPicture.querySelector('.social__caption');
  const socialComments = bigPicture.querySelector('.social__comments');
  const buttonCancel= bigPicture.querySelector('.big-picture__cancel');

  bigPictureImg.src = post.url;
  bigPictureImg.alt = post.description;
  likesCount.textContent = post.likes;
  commentsCount.textContent = post.comments.length;
  socialCaption.textContent = post.description;

  socialComments.innerHTML = '';

  post.comments.forEach((comment) => {
    const commentElement = createComment(comment);
    socialComments.appendChild(commentElement);
  });

  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeKeydown);
  buttonCancel.addEventListener('click', closeBigPicture);

}

function closeBigPicture() {
  const bigPicture = document.querySelector('.big-picture');
  const buttonCancel= bigPicture.querySelector('.big-picture__cancel');
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeKeydown);
  buttonCancel.removeEventListener('click', closeBigPicture);

}

export {openBigPicture};
