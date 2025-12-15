const NAMES = [
  'Иван',
  'Дмитрий',
  'Мария',
  'Максим',
  'Виктор',
  'Юлия',
  'Артём',
  'Ксения',
  'Александр',
  'Матвей',
  'Арина',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'В семейном кругу',
  'Наконец-то отпуск!',
  'Вся красота мира в одном кадре',
  'Невероятное место!',
  'Уютный вечер',
  'Новогодняя сказка',
  'Мечты сбываются!',
  'Сегодня на деловом',
  'Вечер с друзьями',
];

const POSTS_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;
const MIN_MESSAGES_COUNT = 1;
const MAX_MESSAGES_COUNT = 2;
const LOAD_COMMENTS_COUNT = 5;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

export {NAMES, MESSAGES, DESCRIPTIONS, POSTS_COUNT, MIN_LIKES, MAX_LIKES, MIN_COMMENTS, MAX_COMMENTS,
  MIN_AVATAR, MAX_AVATAR, MIN_MESSAGES_COUNT,MAX_MESSAGES_COUNT, LOAD_COMMENTS_COUNT, HASHTAG_REGEX, MAX_HASHTAGS, MAX_COMMENT_LENGTH};
