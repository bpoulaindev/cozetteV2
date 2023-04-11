import * as React from 'react';
import Svg, { ClipPath, Defs, G, Mask, Path, Rect } from 'react-native-svg';
import tw from '../../../../lib/tailwind';
import { Palette } from '../../../../lib/palette';
const { style } = tw;
export const SvgCocktail = ({
  classes = '',
  fill = Palette.dark
}: {
  classes?: string;
  fill?: string;
}) => {
  return (
    <Svg width='64' height='64' viewBox='0 0 12 12' fill='none' style={style(classes)}>
      <Path
        d='M2.66669 11.6666V11H5.66669V6.69228L0.897461 1.33329V0.666626H11.1026V1.33329L6.33336 6.69228V11H9.33336V11.6666H2.66669ZM2.96669 2.66663H9.03336L10.2334 1.33329H1.76669L2.96669 2.66663ZM6.00003 6.06663L8.43976 3.33329H3.56029L6.00003 6.06663Z'
        fill={fill}
      />
    </Svg>
  );
};
