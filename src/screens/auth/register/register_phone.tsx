import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Modal, TextInput, View } from 'react-native';
import { AppText } from '../../../components/appText';
import tw from '../../../../lib/tailwind';
import { t } from 'i18next';
import { Button, ComplexButton, SimpleButton } from '../../../components/buttons';
import { getAuth, PhoneAuthProvider, signInAnonymously, signInWithCredential } from 'firebase/auth';
import { auth, firebaseConfig } from '../../../../firebaseConfig';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { TermsOfUse } from './terms_of_use';
import SelectDropdown from 'react-native-select-dropdown';
import * as country from '../../../../lib/countryCodes.json';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { Keyboard } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from 'react-native-confirmation-code-field';
import { useNavigate } from 'react-router-dom';
import { AnonymousLogin } from './anonymous_login';
import { SvgArrowRight } from '../../../../assets/svg_components/svg_arrow_right';
import { MinimalUser } from '../../../../types/users';
import { createUser } from '../../../actions/users';
import { AppleAuth } from '../platform_auth/apple_auth';
import { GoogleAuth } from '../platform_auth/google_auth';

const { style } = tw;
export const RegisterPhone = () => {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [verificationId, setVerificationId] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [displayVerificationCode, setDisplayVerificationCode] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [confirmationMessage, setConfirmationMessage] = useState<string>('');
  const navigate = useNavigate();

  const attemptInvisibleVerification = true;
  const sendCode = async () => {
    console.log('jpp gros', phoneNumber);
    try {
      Keyboard.dismiss();
      const phoneProvider = new PhoneAuthProvider(auth as any);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        `${selectedCountry.dial_code}${phoneNumber}`,
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
  useEffect(() => {
    const attemptVerification = async () => {
      try {
        const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
        signInWithCredential(auth, credential).then(async (userCredential) => {
          // await createUser(userToken.token, minimalUser, login, changeUser).then(() =>
          //   navigate('/')
          // );
        });
        navigate('/');
      } catch (err: any) {
        setConfirmationMessage(`Error: ${err.message}`);
      }
    };
    if (verificationCode.length === CELL_COUNT) {
      attemptVerification();
    }
  }, [verificationId, verificationCode]);
  const [selectedCountry, setSelectedCountry] = useState<{ name: string; dial_code: string }>({
    name: 'France',
    dial_code: '+33'
  });
  const CELL_COUNT = 6;
  const ref = useBlurOnFulfill({ value: verificationCode, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: verificationCode,
    setValue: setVerificationCode
  });
  return (
    <View
      style={style(
        'flex flex-col w-full items-center mt-8 max-w-[80%]',
        displayVerificationCode ? 'h-auto justify-start' : 'max-h-[50%] h-full justify-between'
      )}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification
      />
      {displayVerificationCode ? (
        <Modal
          animationType='slide'
          style={style('w-full h-full justify-center items-center')}
          visible={displayVerificationCode}
          presentationStyle='fullScreen'
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={style('w-full px-10 pt-40 justify-center ')}>
            <View style={style('w-full flex flex-row justify-start')}>
              <Button variant='text' onPress={() => setDisplayVerificationCode(false)}>
                <ArrowLeftIcon style={style('w-6 h-6 -ml-2')} />
              </Button>
            </View>

            <AppText style={style('text-3xl text-indigo-800 font-bold text-left')}>
              {t('Register.phone.confirm.title')}
            </AppText>
            <AppText style={style('font-light text-left mt-4')}>
              {t('Register.phone.confirm.subtitle', {
                phone: `(${selectedCountry.dial_code}) ${phoneNumber}`
              })}
            </AppText>
            <View style={style('flex items-center')}>
              <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={verificationCode}
                onChangeText={setVerificationCode}
                cellCount={CELL_COUNT}
                rootStyle={style('mt-14')}
                keyboardType='number-pad'
                textContentType='oneTimeCode'
                renderCell={({ index, symbol, isFocused }) => (
                  <View
                    style={style(
                      'flex w-10 h-12 mx-2 border-2 border-indigo-800 rounded-lg text-center items-center bg-cream justify-center'
                    )}>
                    <AppText
                      key={index}
                      style={style('text-lg', isFocused && 'border-indigo-500')}
                      onLayout={getCellOnLayoutHandler(index)}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </AppText>
                  </View>
                )}
              />
              <TextInput style={style('hidden')} value='123' />
              {confirmationMessage.length > 0 && (
                <AppText style={style('mt-4 text-red-500')}>{confirmationMessage}</AppText>
              )}
              <AppText style={style('text-gray-500 text-lg mt-10')}>
                {t('Register.phone.confirm.notReceived')}
              </AppText>
              <Button
                content={t('Register.phone.confirm.resend') ?? ''}
                variant='text'
                color='primary'
                buttonClasses='mt-4'
                contentClasses='text-lg'
              />
            </View>
          </View>
        </Modal>
      ) : (
        <View style={style('w-full flex flex-col h-full')}>
          <View style={style('w-full flex flex-col h-full')}>
            <SelectDropdown
              buttonStyle={style('w-full rounded-lg bg-cream border-[.5px] border-indigo-800')}
              buttonTextStyle={style('text-sm text-left')}
              data={Object.values(country || {}).map((e: any) => e.name)}
              onSelect={(selectedItem, index) => {
                setSelectedCountry({ name: selectedItem, dial_code: country[index]?.dial_code });
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return `${selectedCountry.name} (${selectedCountry.dial_code})`;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              renderCustomizedRowChild={(item, index) => {
                return (
                  <View style={style('flex flex-row items-center')}>
                    <AppText style={style('ml-4')}>{item}</AppText>
                    <AppText style={style('text-gray-500 ml-1')}>
                      ({country[index].dial_code})
                    </AppText>
                  </View>
                );
              }}
              dropdownStyle={style('w-full max-w-[80%] rounded-lg mt-14')}
              defaultButtonText='France (+33)'
              search
            />
            <View
              style={style(
                'flex flex-row w-full items-center mt-6 py-4 bg-cream border-[.5px] border-indigo-800 rounded-lg'
              )}>
              <AppText style={style('w-auto pl-4 pr-2')}>{selectedCountry.dial_code}</AppText>
              <TextInput
                style={style('w-auto flex items-center pr-4')}
                value={phoneNumber}
                placeholder='99 99 99 99'
                keyboardType='number-pad'
                textContentType='telephoneNumber'
                onChangeText={setPhoneNumber}
                returnKeyType='next'
              />
            </View>
            {message.length > 0 && <AppText style={style('mt-4 text-red-500')}>{message}</AppText>}
            <TermsOfUse />
            <View style={style('w-full flex flex-col mt-4')}>
              <AppText style={style('text-center text-gray-300 text-sm')}>
                Ou continuer avec
              </AppText>
              <View style={style('w-full flex flex-row justify-center mt-2')}>
                <AppleAuth classes='mr-8' />
                <GoogleAuth />
              </View>
            </View>
          </View>
          <View style={style('flex flex-row w-full items-center justify-between')}>
            <AnonymousLogin />
            <Button
              variant='contained'
              color='primary'
              buttonClasses='rounded-full flex justify-center w-10 h-10'
              onPress={sendCode}>
              <SvgArrowRight />
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};
