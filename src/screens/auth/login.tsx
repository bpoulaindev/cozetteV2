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

const { style } = tw;
export const Login = () => {
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
  const [message, setMessage] = useState<string>('');
  const attemptInvisibleVerification = false;
  const sendCode = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth as any);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        // @ts-ignore
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      setMessage('Verification code has been sent to your phone.');
    } catch (err: any) {
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
          Bienvenue chez Cozette, {'\n'} Lille, vue par les lillois
        </AppText>
        <View style={style('mt-5 lg:mt-10 max-w-[80%] w-full flex flex-col')}>
          <AppText style={style('my-2 text-gray-700')}>Adresse mail</AppText>
          <View style={style('w-full')}>
            <TextInput
              style={style(
                'w-full flex items-center py-3 px-4 bg-white border-[.5px] border-gray-200 [&>*]:text-gray-700 rounded-lg'
              )}
              value={mail}
              onChangeText={(e: string) => setMail(e)}
              placeholder='Votre adresse mail'
            />
          </View>
          <AppText style={style('mb-2 mt-8 text-gray-700')}>Mot de passe</AppText>
          <View style={style('w-full')}>
            <TextInput
              style={style(
                'w-full flex items-center py-3 px-4 bg-white border-[.5px] border-gray-200 [&>*]:text-gray-700 rounded-lg'
              )}
              value={password}
              onChangeText={(e: string) => setPassword(e)}
              placeholder='Votre mot de passe'
              secureTextEntry
            />
          </View>
          <SimpleButton
            content='Créer un compte'
            variant='contained'
            color='primary'
            buttonClasses='rounded-lg py-2 mt-8'
            onPress={postUser}
          />
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            // attemptInvisibleVerification
          />
          <View style={style('w-full')}>
            <TextInput
              style={style(
                'w-full flex items-center py-3 px-4 bg-white border-[.5px] border-gray-200 [&>*]:text-gray-700 rounded-lg'
              )}
              placeholder='+1 999 999 9999'
              autoFocus
              keyboardType='phone-pad'
              textContentType='telephoneNumber'
              onChangeText={setPhoneNumber}
            />
          </View>
          <SimpleButton
            content='Send Verification Code'
            variant={'contained'}
            onPress={sendCode}
            color='primary'
          />
          <AppText>Enter Verification code</AppText>
          <TextInput
            style={{ marginVertical: 10, fontSize: 17 }}
            editable={!!verificationId}
            placeholder='123456'
            onChangeText={setVerificationCode}
          />
          <SimpleButton
            content='Confirm Verification Code'
            variant='contained'
            color={'primary'}
            onPress={async () => {
              try {
                const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
                await signInWithCredential(auth, credential);
                setMessage('Phone authentication successful 👍');
              } catch (err: any) {
                setMessage(`Error: ${err.message}`);
              }
            }}
          />
          {message.length > 0 && <AppText>{message}</AppText>}
        </View>
      </View>
    </View>
  );
};
