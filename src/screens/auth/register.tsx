import React, { useState } from 'react';
import { View, Image, TextInput } from 'react-native';
import { ComplexButton, SimpleButton } from '../../components/buttons';
import { AppText } from '../../components/appText';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/solid';
import { useNavigate } from 'react-router-native';
import tw from 'twrnc';

const { style } = tw;
export const Register = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
  const [birthDate, setBirthDate] = useState<string>('');
  console.log(mail, password, birthDate);

  return (
    <View
      style={style('flex flex-col h-full items-center justify-between z-50 w-full bg-light-100')}>
      <View
        style={style('flex w-full justify-center items-center pb-8')}
        onLayout={(event) => setViewHeight(event.nativeEvent.layout.height)}>
        <Image
          style={style('mt-2 lg:mt-10 xl:mt-16 w-[150px]')}
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
          <View style={style('w-full')}>
            <AppText style={style('text-sm lg:text-base')} font='Lato'>
              Votre adresse mail
            </AppText>
            <View style={style('w-full rounded-md mt-1/2 md:mt-2 bg-white w-full')}>
              <TextInput
                style={style('py-1 md:py-2 px-3 lg:py-4 lg:px-6 text-sm lg:text-base leading-5')}
                value={mail}
                placeholder='lillois@gmail.com'
                onChangeText={(text) => setMail(text)}
              />
            </View>
          </View>
          <View style={style('w-full mt-3 md:mt-5')}>
            <AppText style={style('text-sm lg:text-base')} font='Lato'>
              Votre date de naissance
            </AppText>
            <ComplexButton variant='text' onPress={() => setOpen(true)}>
              <AppText font='Lato'>Teeest</AppText>
            </ComplexButton>
            <View style={style('w-full rounded-md mt-1/2 md:mt-2 bg-white w-full')}>
              <TextInput
                style={style('py-1 md:py-2 px-3 lg:py-4 lg:px-6 text-sm lg:text-base leading-5')}
                value={birthDate}
                placeholder='JJ/MM/AAAA'
                onChangeText={(text) => setBirthDate(text)}
              />
            </View>
          </View>
          <View style={style('mt-3 md:mt-5 w-full')}>
            <AppText style={style('text-sm lg:text-base')} font='Lato'>
              Votre mot de passe
            </AppText>
            <View style={style('w-full rounded-md mt-1/2 md:mt-2 bg-white w-full relative')}>
              <TextInput
                style={style('py-1 md:py-2 px-3 lg:py-4 lg:px-6 text-sm lg:text-base leading-5')}
                value={password}
                secureTextEntry={passwordHidden}
                placeholder='Evitez azerty1234'
                onChangeText={(text) => setPassword(text)}
              />
              <View
                style={style(
                  'pointer-events-none absolute inset-y-1.5 lg:inset-y-2.5 right-0 flex items-center pr-1.5 lg:pr-3'
                )}>
                {passwordHidden ? (
                  <ComplexButton
                    variant='text'
                    buttonClasses='-mt-1 lg:mt-0'
                    onPress={() => setPasswordHidden(false)}>
                    <EyeIcon color='#FF9270' size={20} />
                  </ComplexButton>
                ) : (
                  <ComplexButton
                    variant='text'
                    buttonClasses='-mt-1 lg:mt-0'
                    onPress={() => setPasswordHidden(true)}>
                    <EyeSlashIcon color='#FF9270' size={20} />
                  </ComplexButton>
                )}
              </View>
            </View>
          </View>
          <SimpleButton
            content="S'inscrire"
            variant='contained'
            color='primary'
            buttonClasses='mt-3 md:mt-5 lg:mt-10'
            contentClasses='text-sm lg:text-base p-1 lg:p-2'
            font='LatoBold'
            onPress={register}
          />
          <View style={style('flex flex-row items-center justify-center')}>
            <AppText style={style('text-sm lg:text-base')}>Déjà un compte ?</AppText>
            <SimpleButton
              content='Connectez-vous ici'
              variant='text'
              color='primary'
              contentClasses='text-sm lg:text-base'
              font='LatoBold'
              buttonClasses='px-1'
              onPress={navigateToLogin}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
