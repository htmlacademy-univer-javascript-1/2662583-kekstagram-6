import {HASHTAG_REGEX, MAX_HASHTAGS, MAX_COMMENT_LENGTH} from './constants.js';
import { sendData } from './api.js';
import { showSuccess, showError, showLoading } from './messages.js';

let pristine;
let lastHashtagError = '';
let isSending = false;

const validateHashtags = (value) => {
  lastHashtagError = '';
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.toLowerCase().trim().split(/\s+/).filter((tag) => tag.length > 0);

  if (hashtags.length > MAX_HASHTAGS) {
    lastHashtagError = `Максимум ${MAX_HASHTAGS} хэш-тегов`;
    return false;
  }

  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    if (!HASHTAG_REGEX.test(hashtag)) {
      if (hashtag[0] !== '#') {
        lastHashtagError = 'Хэш-тег должен начинаться с #';
      } else if (hashtag.length === 1) {
        lastHashtagError = 'Хэш-тег не может состоять только из #';
      } else if (hashtag.length > 20) {
        lastHashtagError = 'Максимальная длина хэш-тега 20 символов';
      } else {
        lastHashtagError = 'Недопустимые символы в хэш-теге';
      }
      return false;
    }

    const firstIndex = hashtags.indexOf(hashtag);
    if (firstIndex !== i) {
      lastHashtagError = 'Хэш-теги не должны повторяться';
      return false;
    }
  }

  return true;
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
    () => lastHashtagError
  );

  pristineInstance.addValidator(
    commentInput,
    validateComment,
    `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`
  );

  return pristineInstance;
};

const blockSubmitButton = () => {
  const submitButton = document.querySelector('.img-upload__submit');
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
  isSending = true;
};

const unblockSubmitButton = () => {
  const submitButton = document.querySelector('.img-upload__submit');
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
  isSending = false;
};

const resetForm = () => {
  const form = document.querySelector('.img-upload__form');
  const fileInput = document.querySelector('.img-upload__input');

  form.reset();

  fileInput.value = '';

  if (pristine) {
    pristine.reset();
  }
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  if (!pristine || !pristine.validate()) {
    return;
  }
  blockSubmitButton();
  const hideLoading = showLoading();

  try {
    const formData = new FormData(evt.target);
    await sendData(formData);
    closeForm();
    showSuccess();
    resetForm();
  } catch (error) {
    showError();
  } finally {
    hideLoading();
    unblockSubmitButton();
  }
};

const showForm = () => {
  const overlay = document.querySelector('.img-upload__overlay');
  const scaleValue = document.querySelector('.scale__control--value');
  const cancelButton = document.querySelector('.img-upload__cancel');
  const hashtagsInput = document.querySelector('.text__hashtags');
  const commentInput = document.querySelector('.text__description');

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  if (scaleValue) {
    scaleValue.value = '100%';
  }

  if (pristine) {
    pristine.reset();
  }

  document.addEventListener('keydown', onDocumentKeydown);
  hashtagsInput.addEventListener('keydown', onHashtagInputKeydown);
  commentInput.addEventListener('keydown', onCommentInputKeydown);
  cancelButton.addEventListener('click', closeForm);
};

function closeForm () {
  const fileInput = document.querySelector('.img-upload__input');
  const overlay = document.querySelector('.img-upload__overlay');
  const form = document.querySelector('.img-upload__form');
  const cancelButton = document.querySelector('.img-upload__cancel');
  const hashtagsInput = document.querySelector('.text__hashtags');
  const commentInput = document.querySelector('.text__description');

  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  form.reset();

  if (pristine) {
    pristine.reset();
  }

  fileInput.value = '';

  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButton.removeEventListener('click', closeForm);
  hashtagsInput.removeEventListener('keydown', onHashtagInputKeydown);
  commentInput.removeEventListener('keydown', onCommentInputKeydown);
}

function onDocumentKeydown (evt){
  const hashtagsInput = document.querySelector('.text__hashtags');
  const commentInput = document.querySelector('.text__description');
  const errorMessage = document.querySelector('.error');
  const successMessage = document.querySelector('.success');

  if (evt.key === 'Escape') {
    if (errorMessage) {
      errorMessage.querySelector('.error__button').click();
      evt.preventDefault();
      return;
    }
    if (successMessage) {
      successMessage.querySelector('.success__button').click();
      evt.preventDefault();
      return;
    }
    if (!isSending && document.activeElement !== hashtagsInput &&
        document.activeElement !== commentInput) {
      evt.preventDefault();
      closeForm();
    }
  }
}

function onHashtagInputKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

function onCommentInputKeydown (evt){
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}


const initForm = () => {
  const fileInput = document.querySelector('.img-upload__input');
  const form = document.querySelector('.img-upload__form');
  const resetButton = document.querySelector('.img-upload__cancel');

  pristine = initPristine();

  fileInput.addEventListener('change', showForm);

  form.addEventListener('submit', onFormSubmit);

  resetButton.addEventListener('click', () => {
    closeForm();
    resetForm();
  });
};

export { initForm };
