import { View, Text, SafeAreaView  } from 'react-native';
import { CardResult } from './cardResult';
import tw from '../../../lib/tailwind';
import { SvgNoResult } from '../../../assets/svg_components/svg_no_result';
import React from 'react';

const { style } = tw;

export const Results = ({shouldData,search}) => {
    console.log({shouldData},'iczezeei');

    if (shouldData?.length > 0 && shouldData !== null) {
        return (
          <SafeAreaView style={style('w-full')}>

          <View style={style('w-full max-w-[90vw] flex flex-row')}>
            <Text style={style('text-2xl md:text-2.5xl font-medium mt-4 text-left leading-7 font-bold')}>
                Résultats pour&nbsp; &quot;
            </Text>

            <Text style={style('text-2xl md:text-2.5xl font-medium mt-4 text-left leading-7 font-bold text-secondary-300 font-italic' )}>
              {search}
            </Text>
            <Text style={style('text-2xl md:text-2.5xl font-medium mt-4 text-left leading-7 italic ' )}>
              &quot;
            </Text>
            <Text style={style('text-2xl md:text-2.5xl font-medium mt-4 text-left leading-7 text-secondary-300 ' )}>
              ({shouldData?.length})
            </Text>
          </View>
            <View style={style('w-full ')}>
              <CardResult spots={shouldData}/>
            </View>
          </SafeAreaView>
        );
      } else {
        return (
          <SafeAreaView style={style('w-95 mx-auto')}>
            <View style={style('w-full max-w-[90%] flex flex-row mb-2')}>
                    <Text style={style('text-2xl md:text-2.5xl font-medium mt-4 text-left leading-7 font-bold')}>
                        Résultats pour&nbsp; &quot;
                    </Text>

                    <Text style={style('text-2xl md:text-2.5xl font-medium mt-4 text-left leading-7 font-bold text-secondary-300 font-italic' )}>
                    {search} 
                    </Text>
                    <Text style={style('text-2xl md:text-2.5xl font-medium mt-4 text-left leading-7 ' )}>
                     &quot;
                    </Text>
                    <Text style={style('text-2xl md:text-2.5xl font-medium mt-4 text-left leading-7 text-secondary-300 ' )}>
                      (0)
                    </Text>

            </View>
            <View
              style={{
                borderBottomColor: '#E5E5E5',
                borderBottomWidth: 1,
              }}/>
            <View style={style('w-full ml-12 mt-15 ')}>
              <SvgNoResult />
              
            </View>
            <View style={style('w-full mx-auto')}>
            <Text style={style('text-2xl font-medium  mx-auto ' )}>
                Malheureusement, nous n’avons rien trouvé pour “
                <Text style={style('text-2xl md:text-2.5xl font-medium mt-4 text-left leading-7 text-secondary-300 ' )}>
                  {search}
                </Text>
                    ”
              </Text>
              
            </View>

          </SafeAreaView>
        );
      }
}