import firebase from 'firebase/compat';

import { PLACES_API_KEY } from '@env';
export const getPlaceInformations = (placeId: string) => {
  return new Promise((resolve, reject) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${PLACES_API_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Récupération des horaires d'ouverture et de fermeture
        // console.log('coucouuuu', data);
        // const openingHours = data.result.opening_hours;
        // const weekdayText = openingHours.weekday_text;
        // console.log(data);
        resolve(data);
      })
      .catch((error) => {
        // Reject the promise with the error
        reject(error);
      });
  });
};
