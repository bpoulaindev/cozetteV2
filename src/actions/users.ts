import firebase from 'firebase/compat';
import User = firebase.User;
import { sendEmailVerification } from 'firebase/auth';

export const createUser = async (user: User) => {
  await sendEmailVerification(user);
  const newUser = {
    id: user.uid,
    displayName: user.displayName,
    mail: user.email,
    createdAt: Date.now(),
    emailVerified: user.emailVerified
  };

  return firebase
    .database()
    .ref('users' + user.uid)
    .set(newUser);
};
