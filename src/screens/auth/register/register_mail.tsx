import React, { useCallback, useContext, useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import { AppText } from '../../../components/appText';
import tw from '../../../../lib/tailwind';
import { t } from 'i18next';
import { createUserWithEmailAndPassword, getAuth, signInAnonymously } from 'firebase/auth';
import { auth } from '../../../../firebaseConfig';
import { buildMinimalUser, createUser } from '../../../actions/users';
import firebase from 'firebase/compat';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/solid';
import { Button } from '../../../components/buttons';
import { TermsOfUse } from './terms_of_use';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth_context';
import { CztUser, MinimalUser } from '../../../../types/users';
import { AnonymousLogin } from './anonymous_login';
import { SvgArrowRight } from '../../../../assets/svg_components/svg_arrow_right';
import UserCredential = firebase.auth.UserCredential;
import { AppleAuth } from '../platform_auth/apple_auth';
import { GoogleAuth } from '../platform_auth/google_auth';

const { style } = tw;
export const RegisterMail = () => {
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { isLoggedIn, login, logout, changeUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const authUser = useCallback(() => {
    console.log('sending request', mail, password);
    //const auth = getAuth();
    createUserWithEmailAndPassword(auth, mail, password)
      .then(async (userCredential) => {
        setErrorMessage('');
        const userToken = await userCredential.user?.getIdTokenResult();
        const minimalUser = buildMinimalUser(userCredential.user);
        createUser(userToken.token, minimalUser, login, changeUser).then(() => navigate('/'));
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessage(error.message);
        console.log(errorCode, errorMessage);
      });
  }, [mail, password]);
  return (
    <View
      style={style('w-full flex justify-between h-full items-center mt-8 max-h-[50%] max-w-[80%]')}>
      <View style={style('w-full flex flex-col h-full')}>
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
        <View style={style('w-full mt-6')}>
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
          <View style={style('w-full h-auto flex flex-col mt-4')}>
            <AppText style={style('text-center text-gray-300 text-sm')}>Ou continuer avec</AppText>
            <View style={style('w-full flex flex-row justify-center mt-2')}>
              <AppleAuth classes='mr-8' />
              <GoogleAuth />
            </View>
          </View>
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
