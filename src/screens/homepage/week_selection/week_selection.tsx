import { View } from 'react-native';
import tw from '../../../../lib/tailwind';
import { AppText } from '../../../components/appText';

const { style } = tw;
export const WeekSelection = () => {
  return (
    <View style={style('w-[90%] flex flex-col')}>
      <AppText style={style('text-2xl font-bold')}>Notre sélection de la semaine</AppText>
    </View>
  );
};
