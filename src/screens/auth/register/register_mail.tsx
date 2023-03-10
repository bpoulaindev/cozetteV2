import React, { useCallback, useContext, useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import { AppText } from '../../../components/appText';
import tw from '../../../../lib/tailwind';
import { t } from 'i18next';
import { createUserWithEmailAndPassword, getAuth, signInAnonymously } from 'firebase/auth';
import { auth } from '../../../../firebaseConfig';
import { createUser } from '../../../actions/users';
import firebase from 'firebase/compat';
import User = firebase.User;
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/solid';
import { Button, ComplexButton, SimpleButton } from '../../../components/buttons';
import { TermsOfUse } from './terms_of_use';
import UserCredential = firebase.auth.UserCredential;
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth_context';
import { CztUser } from '../../../../types/users';
import { AnonymousLogin } from './anonymous_login';
import { SvgArrowRight } from '../../../../assets/svg_components/svg_arrow_right';

const { style } = tw;
export const RegisterMail = () => {
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { isLoggedIn, login, logout, changeUser } = useContext(AuthContext);
  const authUser = useCallback(() => {
    console.log('sending request', mail, password);
    //const auth = getAuth();
    createUserWithEmailAndPassword(auth, mail, password)
      .then(async (userCredential) => {
        setErrorMessage('');
        const userToken = await userCredential.user?.getIdTokenResult();
        return fetch('http://10.43.128.154:3333/me', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken?.token}`
          },
          body: JSON.stringify({
            user: userCredential.user
          })
        })
          .then((response) => {
            if (response.status === 201) {
              return response.json();
            }
            return null;
          })
          .then((response) => {
            // console.log('response', response);
            login();
            // console.log('oeoeoeoe', response.user);
            changeUser(response.user);
          })
          .then(() => navigate('/'));
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessage(error.message);
        console.log(errorCode, errorMessage);
        // ..
      });
  }, [mail, password]);
  return (
    <View
      style={style('w-full flex justify-between h-full items-center mt-8 max-h-[50%] max-w-[80%]')}>
      <View style={style('w-full flex flex-col h-auto')}>
        <View style={style('w-full')}>
          <TextInput
            style={style('w-full py-4 px-4 border-[.5px] border-indigo-800 bg-cream rounded-lg', {
              textAlignVertical: 'center'
            })}
            value={mail}
            onChangeText={(e: string) => setMail(e)}
            placeholder={t('Register.mail.placeholder') ?? ''}
            returnKeyType='next'
          />
        </View>
        <View style={style('w-full mt-8')}>
          <TextInput
            style={style(
              'w-full relative py-4 px-4 bg-cream border-[.5px] border-indigo-800 rounded-lg'
            )}
            value={password}
            onChangeText={(e: string) => setPassword(e)}
            placeholder={t('Register.password.placeholder') ?? ''}
            secureTextEntry={!showPassword}
            returnKeyType='next'
          />
          {showPassword ? (
            <Button
              variant='text'
              buttonClasses='absolute right-4 top-[10px]'
              color='primary'
              onPress={() => setShowPassword(false)}>
              <EyeIcon style={style('text-indigo-800 max-h-5 max-w-5')} />
            </Button>
          ) : (
            <Button
              variant='text'
              buttonClasses='absolute right-4 top-[10px]'
              color='primary'
              onPress={() => setShowPassword(true)}>
              <EyeSlashIcon style={style('text-indigo-800 max-h-5 max-w-5')} />
            </Button>
          )}
          {errorMessage.length > 0 && (
            <AppText style={style('mt-8 text-red-500')}>{errorMessage}</AppText>
          )}
          <TermsOfUse />
        </View>
      </View>
      <View style={style('flex flex-row w-full items-center justify-between')}>
        <AnonymousLogin />
        <Button
          variant='contained'
          color='primary'
          buttonClasses='rounded-full flex justify-center w-10 h-10'
          onPress={authUser}>
          <SvgArrowRight />
        </Button>
      </View>
    </View>
  );
};
