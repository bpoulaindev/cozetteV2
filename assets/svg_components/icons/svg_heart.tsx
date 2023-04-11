import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import tw from '../../../lib/tailwind';
import { Palette } from '../../../lib/palette';
const { style } = tw;
export const SvgHeart = ({
  classes = '',
  fill = Palette.dark
}: {
  classes?: string;
  fill?: string;
}) => {
  return (
    <Svg width='85' height='70' viewBox='0 0 17 14' fill='none' style={style(classes)}>
      <Path
        d='M12.418 0.333374C10.9371 0.333374 9.62663 1.88234 8.80222 2.98275C7.97781 1.88234 6.66738 0.333374 5.1864 0.333374C2.69028 0.333374 0.666626 2.35703 0.666626 4.85315C0.666626 9.8249 8.25623 13.6667 8.80222 13.6667C9.34821 13.6667 16.9378 9.8249 16.9378 4.85315C16.9378 2.35703 14.9142 0.333374 12.418 0.333374Z'
        fill={fill}
      />
    </Svg>
  );
};
