import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GCP_ANDROID_CLIENT_ID, GCP_IOS_CLIENT_ID } from '@env';
import { Button } from '../../../components/buttons';
import { getAuth, signInWithCredential } from 'firebase/auth';
import firebase from 'firebase/compat';
import { buildMinimalUser, createUser } from '../../../actions/users';
import { AuthContext } from '../auth_context';
import { useNavigate } from 'react-router-dom';
import { firebaseConfig } from '../../../../firebaseConfig';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { Prompt } from 'expo-auth-session';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

WebBrowser.maybeCompleteAuthSession();

interface GoogleCredentials {
  email: string;
  family_name: string;
  gender: string;
  given_name: string;
  hd: string;
  id: string;
  link: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}
export const GoogleAuth = () => {
  const [token, setToken] = useState<string>('');
  const [userInfo, setUserInfo] = useState<any>(null);
  const { isLoggedIn, login, logout, changeUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const auth = getAuth();
  const recaptchaVerifier = useRef(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: GCP_ANDROID_CLIENT_ID,
    iosClientId: GCP_IOS_CLIENT_ID,
    expoClientId: '1029132809433-m0bu4819a5hg0716ckitf6a5sdhh2334.apps.googleusercontent.com'
    /* clientSecret: '',
    responseType: 'code',
    prompt: Prompt.Consent,
    extraParams: {
      access_type: 'offline'
    } */
  });

  useEffect(() => {
    if (response?.type === 'success') {
      console.log('response please', response);
      setToken(response.authentication?.accessToken ?? '');
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const user = await response.json();
      console.log('i have been here', user);
      const credential = GoogleAuthProvider.credential(user.idToken, user.accessToken);
      console.log('hallelujah it is working', user, typeof user, token);
      signInWithCredential(auth, credential)
        .then(async (userCredential) => {
          const userToken = await userCredential.user?.getIdTokenResult();
          const minimalUser = buildMinimalUser(userCredential.user);
          createUser(userToken.token, minimalUser, login, changeUser).then(() => navigate('/'));
        })
        .catch((error) => {
          console.log(error);
        });
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
      console.log('google error', error);
    }
  };
  return (
    <View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification
      />
      {userInfo === null ? (
        <Button
          content='Sign in with Google'
          variant='contained'
          color='primary'
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        />
      ) : (
        <Text style={styles.text}>{userInfo?.name}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
