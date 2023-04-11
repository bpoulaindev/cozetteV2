import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, TouchableWithoutFeedback, Keyboard, SafeAreaView, Text } from 'react-native';
import { Button } from '../../../components/buttons';
import { AppText } from '../../../components/appText';
import tw from '../../../../lib/tailwind';
import { Trans, useTranslation } from 'react-i18next';
import { RegisterMail } from './register_mail';
import { RegisterPhone } from './register_phone';
import { SvgCozette } from '../../../../assets/svg_components/svg_cozette';
import { Palette } from '../../../../lib/palette';
import { SvgMail } from '../../../../assets/svg_components/svg_mail';
import { SvgPhone } from '../../../../assets/svg_components/svg_phone';
import { AppleAuth } from '../platform_auth/apple_auth';
import { GoogleAuth } from '../platform_auth/google_auth';
import { firebaseConfig } from '../../../../firebaseConfig';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

const { style } = tw;
export const Register = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'phone' | 'mail'>('mail');
  const recaptchaVerifier = useRef(null);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView
        style={style(
          'flex flex-col h-full items-center justify-start z-50 w-full bg-cream max-h-[100vh]'
        )}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
          attemptInvisibleVerification
        />
        <View style={style('flex w-full justify-center items-center max-w-[90%] mt-12')}>
          <SvgCozette fill={Palette.secondary[300]} />
          <AppText
            style={style(
              'text-xl md:text-2xl pt-1 lg:text-3xl w-full font-700 text-left mt-8 md:mt-12'
            )}>
            {t('Register.title')}
          </AppText>
          <AppText
            style={style('text-sm md:text-base pt-1 lg:text-3xl w-full font-300 text-left mt-2')}>
            <Trans
              i18nKey='Register.subtitle'
              components={[<Text key='bold_element' style={style('font-bold')} />]}
            />
          </AppText>
          <View style={style('mt-10 w-full flex flex-col')}>
            <View
              style={style('flex flex-row w-full justify-between rounded-xl items-center mb-4')}>
              <Button
                buttonClasses='w-1/2 rounded-l-full'
                contentClasses='text-lg'
                variant={mode === 'mail' ? 'contained' : 'outlined'}
                color='primary'
                onPress={() => setMode('mail')}>
                <View style={style('flex flex-row items-center')}>
                  <SvgMail classes='mr-2' fill={mode === 'mail' ? Palette.white : Palette.dark} />
                  <AppText
                    style={style('text-lg font-800', mode === 'mail' ? 'text-white' : 'text-dark')}>
                    {t('Register.mail')}
                  </AppText>
                </View>
              </Button>
              <Button
                buttonClasses='w-1/2 rounded-r-full'
                contentClasses='text-lg text-dark'
                variant={mode === 'mail' ? 'outlined' : 'contained'}
                color='primary'
                onPress={() => setMode('phone')}>
                <View style={style('flex flex-row items-center')}>
                  <SvgPhone classes='mr-2' fill={mode === 'phone' ? Palette.white : Palette.dark} />
                  <AppText
                    style={style(
                      'text-lg font-800',
                      mode === 'phone' ? 'text-white' : 'text-dark'
                    )}>
                    {t('Register.phone')}
                  </AppText>
                </View>
              </Button>
            </View>
          </View>
        </View>
        {mode === 'mail' ? <RegisterMail /> : <RegisterPhone />}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
