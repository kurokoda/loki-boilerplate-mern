/* eslint-disable no-plusplus */

export const randomString = length => {
  const allowedCharacters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += allowedCharacters.charAt(
      Math.floor(Math.random() * allowedCharacters.length)
    );
  }
  return result;
};
