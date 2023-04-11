import * as React from 'react';
import Svg, { ClipPath, Defs, G, Mask, Path, Rect } from 'react-native-svg';
import tw from '../../../../lib/tailwind';
import { Palette } from '../../../../lib/palette';
const { style } = tw;
export const SvgWine = ({
  classes = '',
  fill = Palette.dark
}: {
  classes?: string;
  fill?: string;
}) => {
  return (
    <Svg width='110' height='70' viewBox='0 0 22 14' fill='none' style={style(classes)}>
      <Path
        d='M18.8692 12.4115C19.4218 12.7026 19.8769 12.634 20.2346 12.2058C20.5923 11.7776 20.6385 11.3064 20.3731 10.7923L18.4615 7.2077L16.7962 11.3308L18.8692 12.4115ZM13.5615 11.5H15.6462L18.0846 5.47307C18.2372 5.09616 18.2631 4.79135 18.1625 4.55865C18.0618 4.32597 17.8718 4.15258 17.5923 4.03848L15.5923 3.23848C15.2885 3.11154 14.9952 3.09615 14.7125 3.1923C14.4298 3.28847 14.2718 3.50129 14.2385 3.83077L13.5615 11.5ZM6.35385 11.5H8.43845L7.76153 3.75385C7.72819 3.4936 7.57659 3.31091 7.30673 3.20577C7.03686 3.10064 6.73718 3.11154 6.4077 3.23848L4.4077 4.03848C4.1077 4.16539 3.93173 4.36443 3.8798 4.63558C3.82788 4.90673 3.86538 5.21153 3.9923 5.55L6.35385 11.5ZM3.13078 12.4115L5.20385 11.3308L3.57693 7.2077L1.62693 10.8692C1.33589 11.3962 1.38525 11.8513 1.775 12.2346C2.16475 12.6179 2.61668 12.6769 3.13078 12.4115ZM9.43848 11.5H12.5615L13.35 2.58845C13.3833 2.28462 13.3074 2.02725 13.1221 1.81635C12.9369 1.60545 12.6795 1.5 12.35 1.5H9.65C9.40128 1.5 9.16507 1.59583 8.94135 1.7875C8.71763 1.97917 8.62052 2.22052 8.65 2.51155L9.43848 11.5ZM2.52933 13.5385C1.94953 13.5385 1.46636 13.3401 1.07983 12.9433C0.693275 12.5465 0.5 12.0667 0.5 11.5038C0.5 11.317 0.52275 11.1341 0.56825 10.9551C0.613767 10.776 0.678192 10.6013 0.761525 10.4308L3.07693 6C2.85641 5.42308 2.82948 4.85129 2.99615 4.28463C3.16282 3.71796 3.51153 3.32693 4.0423 3.11153L6.0423 2.31152C6.32692 2.18974 6.61794 2.12821 6.91537 2.12692C7.21281 2.12564 7.47819 2.2141 7.71152 2.3923C7.76538 1.8705 7.97499 1.42467 8.34037 1.0548C8.70576 0.684933 9.15219 0.5 9.67968 0.5H12.35C12.8705 0.5 13.3167 0.675317 13.6885 1.02595C14.0603 1.3766 14.2859 1.80641 14.3654 2.31537C14.5603 2.12821 14.8064 2.05353 15.1039 2.09135C15.4013 2.12917 15.6859 2.20256 15.9577 2.31152L17.9577 3.11153C18.4962 3.32693 18.8603 3.71475 19.05 4.275C19.2398 4.83525 19.2103 5.39358 18.9615 5.95L21.2769 10.3808C21.3513 10.5256 21.4135 10.6711 21.4635 10.817C21.5135 10.963 21.5385 11.115 21.5385 11.2731C21.5385 11.8949 21.3228 12.4279 20.8913 12.8721C20.4599 13.3164 19.9362 13.5385 19.3201 13.5385C19.1695 13.5385 19.0261 13.5208 18.8898 13.4856C18.7534 13.4503 18.6171 13.3974 18.4808 13.3269L16.8538 12.5H5.13462L3.61923 13.2885C3.45384 13.3795 3.27917 13.4439 3.0952 13.4817C2.91122 13.5196 2.72259 13.5385 2.52933 13.5385Z'
        fill={fill}
      />
    </Svg>
  );
};