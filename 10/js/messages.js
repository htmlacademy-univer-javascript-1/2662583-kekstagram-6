const showSuccess = () => {
  const successTemplate = document.querySelector('#success').content;
  const successElement = successTemplate.cloneNode(true);
  document.body.appendChild(successElement);

  const successMessage = document.querySelector('.success');
  const successButton = successMessage.querySelector('.success__button');

  const closeSuccessMessage = () => {
    successMessage.remove();
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onOutsideClick);
  };

  function onEscKeydown (evt){
    if (evt.key === 'Escape') {
      closeSuccessMessage();
    }
  }
  function onOutsideClick (evt){
    if (evt.target === successMessage) {
      closeSuccessMessage();
    }
  }

  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOutsideClick);
};
const showError = () => {
  const errorTemplate = document.querySelector('#error').content;
  const errorElement = errorTemplate.cloneNode(true);
  document.body.appendChild(errorElement);

  const errorMessage = document.querySelector('.error');
  const errorButton = errorMessage.querySelector('.error__button');
  const errorInner = errorMessage.querySelector('.error__inner');
  errorMessage.style.zIndex = '10000';

  const closeErrorMessage = () => {
    errorMessage.remove();
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onOutsideClick);
  };

  function onEscKeydown (evt){
    if (evt.key === 'Escape') {
      closeErrorMessage();
    }
  }

  function onOutsideClick (evt) {
    if (evt.target === errorMessage && !errorInner.contains(evt.target)) {
      closeErrorMessage();
    }
  }

  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOutsideClick);
};

const showLoading = () => {
  const messagesTemplate = document.querySelector('#messages').content;
  const messagesElement = messagesTemplate.cloneNode(true);
  document.body.appendChild(messagesElement);

  return () => {
    const loadingMessage = document.querySelector('.img-upload__message--loading');
    if (loadingMessage) {
      loadingMessage.remove();
    }
  };
};
export { showSuccess, showError, showLoading };
