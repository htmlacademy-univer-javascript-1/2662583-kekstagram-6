const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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

const MESSAGE = [
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

const createCommentId = () => {
  let lastCommetId = 0;
  return () => {
    lastCommetId += 1;
    return lastCommetId;
  };
};

const generateCommentId = createCommentId();

const generateComment = () => {
  const countMessage = getRandomInteger(1,2);
  let message = '';
  if (countMessage === 1){
    message = getRandomArrayElement(MESSAGE);
  }
  else{
    const firstMessage = getRandomArrayElement(MESSAGE);
    let secondMessage = getRandomArrayElement(MESSAGE);
    while (secondMessage === firstMessage){
      secondMessage = getRandomArrayElement(MESSAGE);
    }
    message = `${firstMessage} ${secondMessage}`;
  }
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: message,
    name: getRandomArrayElement(NAMES),
  };
};

const createComments = () => {
  const countComments = getRandomInteger(0, 30);
  return Array.from({length: countComments}, generateComment);
};

const createPhoto = (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: createComments(),
});

const createPhotos = () => Array.from({length: 25}, (_, index) => createPhoto(index));

createPhotos();

