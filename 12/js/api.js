import {SERVER_URL, GET_DATA_URL, ERROR_MESSAGES} from './constants.js';
const getData = async () => {
  try {
    const response = await fetch(GET_DATA_URL);

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.GET);
    }
    return response.json();
  } catch (error) {
    throw new Error(ERROR_MESSAGES.GET);
  }
};

const sendData = async (formData) => {
  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SEND);
    }

    return response.json();
  } catch (error) {
    throw new Error(ERROR_MESSAGES.SEND);
  }
};

export {getData, sendData};
