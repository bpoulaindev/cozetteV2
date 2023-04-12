import firebase from 'firebase/compat';

import { PLACES_API_KEY } from '@env';
export const getPlaceInformations = (placeId: string) => {
  return new Promise((resolve, reject) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${PLACES_API_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        // Reject the promise with the error
        reject(error);
      });
  });
};

export const getPlaceReviews = (placeId: string) => {
  return new Promise((resolve, reject) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,reviews&key=${PLACES_API_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        // Reject the promise with the error
        reject(error);
      });
  });
};
