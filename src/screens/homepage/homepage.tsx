import { ScrollView, View } from 'react-native';
import { SimpleButton } from '../../components/buttons';
import { AppText } from '../../components/appText';
import tw from 'twrnc';
import { useState } from 'react';
const { style } = tw;
export const Homepage = () => {
  const [count, setCount] = useState<string[]>(['Wesh alors']);
  const addWeshAlors = () => {
    setCount([...count, 'Wesh alors']);
  };
  return (
    <ScrollView style={style('flex mt-20 px-8')}>
      <SimpleButton
        content='Ajouter un wesh alors'
        variant='contained'
        color='primary'
        onPress={addWeshAlors}
        buttonClasses='rounded-lg py-2'
      />
      <View style={style('flex flex-wrap flex-row justify-center items-center w-full mt-4')}>
        {count.map((weshAlors, index) => (
          <View style={style('rounded-lg items-center bg-indigo-100 m-2')} key={index}>
            <AppText
              style={style('text-indigo-800 px-3 py-2 rounded-lg font-medium flex items-center')}
              key={index}>
              Wesh alors
            </AppText>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
