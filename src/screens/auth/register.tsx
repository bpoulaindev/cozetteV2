import React, { useCallback, useRef, useState } from 'react';
import { View, Image, TextInput, TouchableOpacity } from 'react-native';
import { SimpleButton } from '../../components/buttons';
import { AppText } from '../../components/appText';
import tw from 'twrnc';
import {
  createUserWithEmailAndPassword,
  PhoneAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import { auth, firebaseConfig } from '../../../firebaseConfig';
import { createUser } from '../../actions/users';
import firebase from 'firebase/compat';
import User = firebase.User;
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { useTranslation } from 'react-i18next';

const { style } = tw;
export const Register = () => {
  const { t } = useTranslation();
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const postUser = useCallback(() => {
    console.log('sending request', mail, password);
    //const auth = getAuth();
    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        return createUser(userCredential.user as User);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  }, [mail, password]);
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [verificationId, setVerificationId] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [displayVerificationCode, setDisplayVerificationCode] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const attemptInvisibleVerification = true;
  const sendCode = async () => {
    console.log('jpp gros', phoneNumber);
    try {
      const phoneProvider = new PhoneAuthProvider(auth as any);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        // @ts-ignore
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      setDisplayVerificationCode(true);
      setMessage('Un code de vérification a été envoyé à votre téléphone.');
    } catch (err: any) {
      console.log('there was an error', err);
      setMessage(`Error: ${err.message}`);
    }
  };
  return (
    <View style={style('flex flex-col h-full items-center justify-between z-50 w-full bg-white')}>
      <View style={style('flex w-full justify-center items-center pb-8')}>
        <Image
          style={style('mt-16 w-[150px]')}
          resizeMode='contain'
          source={require('../../../assets/Cozette.png')}
        />
        <AppText
          style={style(
            'text-xl md:text-2xl pt-1 lg:text-2.5xl font-normal text-center -mt-2 lg:mt-4 xl:mt-8'
          )}
          font='SuperiorBold'>
          {t('Register.welcome')}
        </AppText>
        <View style={style('mt-5 lg:mt-10 max-w-[80%] w-full flex flex-col')}>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            // attemptInvisibleVerification
          />
          <AppText style={style('mb-2 mt-8 text-gray-700')}>{t('Register.phone.title')}</AppText>
          <View style={style('w-full')}>
            <TextInput
              style={style(
                'w-full flex items-center py-3 px-4 bg-white border-[.5px] border-gray-200 [&>*]:text-gray-700 rounded-lg'
              )}
              placeholder='+33 99 99 99 99'
              keyboardType='phone-pad'
              textContentType='telephoneNumber'
              onChangeText={setPhoneNumber}
            />
          </View>
          <SimpleButton
            content={t('Register.continue')}
            variant={'contained'}
            onPress={sendCode}
            color='primary'
            buttonClasses='mt-4 py-2 rounded-lg'
            contentClasses='text-lg font-medium'
          />
          {message.length > 0 && <AppText style={style('mt-4')}>{message}</AppText>}
          {displayVerificationCode && (
            <View style={style('w-full flex flex-col mt-8')}>
              <AppText style={style('mb-2 mt-8 text-gray-700')}>
                {t('Register.phone.confirm')}
              </AppText>
              <View style={style('w-full')}>
                <TextInput
                  style={style(
                    'w-full flex items-center py-3 px-4 bg-white border-[.5px] border-gray-200 [&>*]:text-gray-700 rounded-lg'
                  )}
                  editable={!!verificationId}
                  placeholder='123456'
                  onChangeText={setVerificationCode}
                />
              </View>
              <SimpleButton
                content={t('Register.phone.confirm.button')}
                variant='contained'
                color={'primary'}
                buttonClasses='mt-4 rounded-lg'
                onPress={async () => {
                  try {
                    const credential = PhoneAuthProvider.credential(
                      verificationId,
                      verificationCode
                    );
                    await signInWithCredential(auth, credential);
                    setMessage('Phone authentication successful 👍');
                  } catch (err: any) {
                    setMessage(`Error: ${err.message}`);
                  }
                }}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
