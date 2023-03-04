import React from 'react';
import { View } from 'react-native';
import tw from '../../../../lib/tailwind';
import { AppText } from '../../../components/appText';
import { t } from 'i18next';

const { style } = tw;

export const TermsOfUse = () => {
  return (
    <View style={style('flex mt-6')}>
      <AppText style={style('text-sm font-400')}>
        {t('Register.terms.1')}
        <AppText style={style('font-600')}>{t('Register.terms.2')}</AppText>
        {t('Register.terms.3')}
        <AppText style={style('font-600')}>{t('Register.terms.4')}</AppText>
      </AppText>
    </View>
  );
};
