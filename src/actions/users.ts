import firebase from 'firebase/compat';
import User = firebase.User;
import { sendEmailVerification } from 'firebase/auth';
import UserCredential = firebase.auth.UserCredential;
import { CztUser, MinimalUser } from '../../types/users';

export const createUser2 = async (user: User) => {
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

export const buildMinimalUser = (user: any) => {
  const today = new Date().getTime();
  return {
    uid: user?.uid,
    email: user.email ?? '',
    createdAt: today,
    lastLoginAt: today,
    stsTokenManager: user.stsTokenManager,
    isAnonymous: false,
    emailVerified: user?.emailVerified ?? false
  } as MinimalUser;
};
export const createUser = async (
  userToken: string,
  user: MinimalUser,
  login: () => void,
  changeUser: (user: CztUser | null) => void
) => {
  console.log('minimal user received', user);
  return fetch('http://10.43.128.154:3333/me', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`
    },
    body: JSON.stringify({
      user: user
    })
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      }
      return null;
    })
    .then((response) => {
      login();
      changeUser(response.user);
    });
};
