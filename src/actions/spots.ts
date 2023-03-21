import firebase from 'firebase/compat';

export const getWeekSelection = () => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('/week_selection')
      .once('value')
      .then((snapshot) => {
        // Resolve the promise with the data
        resolve(snapshot.val());
      })
      .catch((error) => {
        // Reject the promise with the error
        reject(error);
      });
  });
};

export const getSpot = (spotId: string) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`/spots/${spotId}`)
      .once('value')
      .then((snapshot) => {
        // Resolve the promise with the data
        resolve(snapshot.val());
      })
      .catch((error) => {
        // Reject the promise with the error
        reject(error);
      });
  });
};

export const getAllSpots = async () => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('/spots')
      .once('value')
      .then((snapshot) => {
        // Resolve the promise with the data
        resolve(snapshot.val());
      })
      .catch((error) => {
        // Reject the promise with the error
        reject(error);
      });
  });
};
