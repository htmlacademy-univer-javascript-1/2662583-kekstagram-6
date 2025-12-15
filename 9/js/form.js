import {HASHTAG_REGEX, MAX_HASHTAGS, MAX_COMMENT_LENGTH} from './constants.js';

let pristine;

const validateHashtags = (value) => {

  const hashtags = value.toLowerCase().split(' ').filter((tag) => tag.length > 0);

  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    if (!HASHTAG_REGEX.test(hashtag)) {
      return false;
    }

    const firstIndex = hashtags.indexOf(hashtag);
    if (firstIndex !== i) {
      return false;
    }
  }

  return true;
};

const getHashtagErrorMessage = (value) => {
  if (!value.trim()) {
    return '';
  }

  const hashtags = value.toLowerCase().split(' ').filter((tag) => tag.length > 0);

  if (hashtags.length > MAX_HASHTAGS) {
    return `Максимум ${MAX_HASHTAGS} хэш-тегов`;
  }

  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];

    if (!HASHTAG_REGEX.test(hashtag)) {
      if (hashtag[0] !== '#') {
        return 'Хэш-тег должен начинаться с #';
      }
      if (hashtag.length === 1) {
        return 'Хэш-тег не может состоять только из #';
      }
      if (hashtag.length > 20) {
        return 'Максимальная длина хэш-тега 20 символов';
      }
      if (hashtag.includes(' ', 1)) {
        return 'Внутри хэш-тега не должно быть пробелов';
      }
      return 'Недопустимые символы в хэш-теге';
    }
    const firstIndex = hashtags.indexOf(hashtag);
    if (firstIndex !== i) {
      return 'Хэш-теги не должны повторяться';
    }
  }

  return '';
};

function validateComment (value) {
  return value.length <= MAX_COMMENT_LENGTH;
}

const initPristine = () => {
  const form = document.querySelector('.img-upload__form');
  const hashtagsInput = document.querySelector('.text__hashtags');
  const commentInput = document.querySelector('.text__description');

  const pristineInstance = new window.Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    successClass: 'img-upload__field-wrapper--success',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__error'
  });

  pristineInstance.addValidator(
    hashtagsInput,
    validateHashtags,
    getHashtagErrorMessage
  );

  pristineInstance.addValidator(
    commentInput,
    validateComment,
    `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`
  );

  return pristineInstance;
};


const onFormSubmit = (evt) => {

  if (!pristine || !pristine.validate()) {
    evt.preventDefault();
  }
};

const showForm = () => {
  const overlay = document.querySelector('.img-upload__overlay');
  const scaleValue = document.querySelector('.scale__control--value');

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  if (scaleValue) {
    scaleValue.value = '100%';
  }

  const noneEffect = document.querySelector('#effect-none');
  if (noneEffect) {
    noneEffect.checked = true;
  }

  if (pristine) {
    pristine.reset();
  }

  document.addEventListener('keydown', onDocumentKeydown);
};

function closeForm () {
  const fileInput = document.querySelector('.img-upload__input');
  const overlay = document.querySelector('.img-upload__overlay');
  const form = document.querySelector('.img-upload__form');

  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  form.reset();

  if (pristine) {
    pristine.reset();
  }

  fileInput.value = '';

  document.removeEventListener('keydown', onDocumentKeydown);
}

function onDocumentKeydown (evt){
  const hashtagsInput = document.querySelector('.text__hashtags');
  const commentInput = document.querySelector('.text__description');
  if (evt.key === 'Escape') {
    evt.preventDefault();

    if (document.activeElement === hashtagsInput ||
        document.activeElement === commentInput) {
      return;
    }

    closeForm();
  }
}

const onHashtagInputKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const onCommentInputKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const initForm = () => {
  const fileInput = document.querySelector('.img-upload__input');
  const cancelButton = document.querySelector('.img-upload__cancel');
  const form = document.querySelector('.img-upload__form');
  const hashtagsInput = document.querySelector('.text__hashtags');
  const commentInput = document.querySelector('.text__description');

  pristine = initPristine();

  fileInput.addEventListener('change', showForm);

  cancelButton.addEventListener('click', closeForm);

  form.addEventListener('submit', onFormSubmit);

  hashtagsInput.addEventListener('keydown', onHashtagInputKeydown);
  commentInput.addEventListener('keydown', onCommentInputKeydown);
};

export { initForm, closeForm };
