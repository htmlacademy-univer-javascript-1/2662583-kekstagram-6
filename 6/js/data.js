import {getRandomArrayElement, getRandomInteger, createCommentId} from './util.js';
import {NAMES, MESSAGES, DESCRIPTIONS, POSTS_COUNT, MIN_LIKES, MAX_LIKES, MIN_COMMENTS, MAX_COMMENTS,
  MIN_AVATAR, MAX_AVATAR, MIN_MESSAGES_COUNT,MAX_MESSAGES_COUNT} from './constants.js';

const generateCommentId = createCommentId();

const generateComment = () => {
  const countMessage = getRandomInteger(MIN_MESSAGES_COUNT, MAX_MESSAGES_COUNT);
  let message = '';
  if (countMessage === 1){
    message = getRandomArrayElement(MESSAGES);
  }
  else{
    const firstMessage = getRandomArrayElement(MESSAGES);
    let secondMessage = getRandomArrayElement(MESSAGES);
    while (secondMessage === firstMessage){
      secondMessage = getRandomArrayElement(MESSAGES);
    }
    message = `${firstMessage} ${secondMessage}`;
  }
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(MIN_AVATAR, MAX_AVATAR)}.svg`,
    message: message,
    name: getRandomArrayElement(NAMES),
  };
};

const createComments = () => {
  const countComments = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
  return Array.from({length: countComments}, generateComment);
};


const createPost = (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: createComments(),
});

const createPosts = () => Array.from({length: POSTS_COUNT}, (_, index) => createPost(index));

export {createPosts};
