import * as React from 'react';
import Svg, { ClipPath, Defs, G, Mask, Path, Rect } from 'react-native-svg';
import tw from '../../../../lib/tailwind';
import { Palette } from '../../../../lib/palette';
const { style } = tw;
export const SvgPizza = ({
  classes = '',
  fill = Palette.dark
}: {
  classes?: string;
  fill?: string;
}) => {
  return (
    <Svg width='64' height='64' viewBox='0 0 12 12' fill='none' style={style(classes)}>
      <Path
        d='M5.99995 11.4615L0.230713 2.82048C1.06405 2.16578 1.96768 1.64313 2.94161 1.25253C3.91555 0.861926 4.93499 0.666626 5.99995 0.666626C7.0649 0.666626 8.08435 0.859148 9.05828 1.24419C10.0322 1.62924 10.9358 2.15466 11.7692 2.82048L5.99995 11.4615ZM5.99995 10.2666L10.8666 2.96663C10.1444 2.46663 9.37217 2.0694 8.54995 1.77496C7.72772 1.48051 6.87772 1.33329 5.99995 1.33329C5.12217 1.33329 4.27495 1.48051 3.45828 1.77496C2.64161 2.0694 1.86661 2.46663 1.13328 2.96663L5.99995 10.2666ZM3.89588 4.28201C4.08065 4.28201 4.2382 4.21734 4.36855 4.08801C4.49888 3.95868 4.56405 3.80163 4.56405 3.61686C4.56405 3.43209 4.49938 3.27454 4.37005 3.14419C4.24071 3.01385 4.08366 2.94868 3.8989 2.94868C3.71413 2.94868 3.55657 3.01334 3.42623 3.14268C3.29589 3.27202 3.23071 3.42908 3.23071 3.61384C3.23071 3.79861 3.29539 3.95616 3.42473 4.08649C3.55406 4.21684 3.71111 4.28201 3.89588 4.28201ZM5.99845 7.66663C6.18321 7.66663 6.34076 7.60196 6.4711 7.47263C6.60144 7.34328 6.66661 7.18623 6.66661 7.00146C6.66661 6.81669 6.60195 6.65914 6.47261 6.52881C6.34328 6.39847 6.18622 6.33329 6.00145 6.33329C5.81668 6.33329 5.65913 6.39796 5.5288 6.52729C5.39845 6.65664 5.33328 6.81369 5.33328 6.99846C5.33328 7.18323 5.39795 7.34078 5.52728 7.47111C5.65661 7.60145 5.81367 7.66663 5.99845 7.66663Z'
        fill={fill}
      />
    </Svg>
  );
};