import * as React from 'react';
import Svg, { ClipPath, Defs, G, Mask, Path, Rect } from 'react-native-svg';
import tw from '../../../../lib/tailwind';
import { Palette } from '../../../../lib/palette';
const { style } = tw;
export const SvgFriends = ({
  classes = '',
  fill = Palette.dark
}: {
  classes?: string;
  fill?: string;
}) => {
  return (
    <Svg width='110' height='80' viewBox='0 0 22 18' fill='none' style={style(classes)}>
      <Path
        d='M1.1423 9.43463C0.765383 8.80898 0.480767 8.17179 0.28845 7.52307C0.09615 6.87436 0 6.23333 0 5.6C0 4.04102 0.543592 2.71794 1.63078 1.63077C2.71794 0.543591 4.04102 0 5.6 0C6.61153 0 7.58268 0.2625 8.51345 0.7875C9.44423 1.3125 10.2731 2.06923 11 3.05768C11.7269 2.06923 12.5558 1.3125 13.4865 0.7875C14.4173 0.2625 15.3885 0 16.4 0C17.959 0 19.2821 0.543591 20.3692 1.63077C21.4564 2.71794 22 4.04102 22 5.6C22 6.2077 21.9039 6.82949 21.7115 7.46537C21.5192 8.10127 21.2346 8.75128 20.8577 9.41537C20.7535 9.27767 20.6303 9.15447 20.4882 9.04575C20.3461 8.93703 20.1981 8.84614 20.0442 8.77307C20.3609 8.21026 20.5994 7.66538 20.7596 7.13845C20.9199 6.61153 21 6.09872 21 5.6C21 4.31282 20.5551 3.22436 19.6654 2.33463C18.7756 1.44488 17.6872 1 16.4 1C15.3705 1 14.4356 1.30993 13.5952 1.9298C12.7548 2.54968 11.8897 3.43975 11 4.6C10.1103 3.4359 9.24518 2.54487 8.4048 1.92692C7.56442 1.30897 6.62948 1 5.6 1C4.31282 1 3.22436 1.44488 2.33463 2.33463C1.44488 3.22436 1 4.31282 1 5.6C1 6.12435 1.08012 6.65319 1.24037 7.18652C1.40064 7.71986 1.63269 8.25512 1.93652 8.7923C1.78269 8.8782 1.63847 8.97243 1.50385 9.075C1.36923 9.17757 1.24872 9.29744 1.1423 9.43463ZM0 17.0385V16.175C0 15.5571 0.326308 15.0465 0.978925 14.6433C1.63156 14.2401 2.47851 14.0385 3.51978 14.0385C3.71044 14.0385 3.89295 14.0458 4.0673 14.0606C4.24167 14.0753 4.40769 14.0994 4.56538 14.1327C4.42179 14.3891 4.3109 14.6584 4.2327 14.9406C4.15448 15.2227 4.11538 15.5233 4.11538 15.8423V17.0385H0ZM6 17.0385V15.9135C6 15.0865 6.46229 14.4295 7.38688 13.9423C8.31147 13.4551 9.51762 13.2115 11.0053 13.2115C12.5069 13.2115 13.7148 13.4551 14.6288 13.9423C15.5429 14.4295 16 15.0865 16 15.9135V17.0385H6ZM17.8846 17.0385V15.8423C17.8846 15.5233 17.8497 15.2227 17.7798 14.9406C17.7099 14.6584 17.6051 14.3891 17.4654 14.1327C17.6231 14.0994 17.7893 14.0753 17.9641 14.0606C18.139 14.0458 18.3176 14.0385 18.5 14.0385C19.55 14.0385 20.3958 14.2401 21.0375 14.6433C21.6792 15.0465 22 15.5571 22 16.175V17.0385H17.8846ZM10.9977 14.2115C9.86973 14.2115 8.93398 14.3622 8.19038 14.6635C7.44679 14.9647 7.05962 15.3526 7.02885 15.8269V16.0385H14.9769V15.8269C14.9423 15.3526 14.5574 14.9647 13.8221 14.6635C13.0869 14.3622 12.1454 14.2115 10.9977 14.2115ZM3.51922 13.0962C3.12787 13.0962 2.79286 12.9568 2.51418 12.6781C2.23549 12.3994 2.09615 12.0644 2.09615 11.6731C2.09615 11.2859 2.23549 10.9551 2.51418 10.6807C2.79286 10.4064 3.12787 10.2692 3.51922 10.2692C3.90641 10.2692 4.24038 10.4064 4.52115 10.6807C4.80192 10.9551 4.9423 11.2859 4.9423 11.6731C4.9423 12.0644 4.80192 12.3994 4.52115 12.6781C4.24038 12.9568 3.90641 13.0962 3.51922 13.0962ZM18.5 13.0962C18.1167 13.0962 17.7837 12.9568 17.501 12.6781C17.2183 12.3994 17.0769 12.0644 17.0769 11.6731C17.0769 11.2859 17.2183 10.9551 17.501 10.6807C17.7837 10.4064 18.1179 10.2692 18.5037 10.2692C18.9012 10.2692 19.2372 10.4064 19.5115 10.6807C19.7859 10.9551 19.9231 11.2859 19.9231 11.6731C19.9231 12.0644 19.7867 12.3994 19.514 12.6781C19.2412 12.9568 18.9032 13.0962 18.5 13.0962ZM11.0068 12.4615C10.3997 12.4615 9.88141 12.2484 9.45193 11.8221C9.02243 11.3958 8.80768 10.8782 8.80768 10.2692C8.80768 9.64808 9.02082 9.1274 9.4471 8.7072C9.87338 8.287 10.391 8.0769 11 8.0769C11.6212 8.0769 12.1418 8.28635 12.562 8.70525C12.9822 9.12415 13.1923 9.64321 13.1923 10.2624C13.1923 10.8695 12.9829 11.3878 12.564 11.8173C12.1451 12.2468 11.626 12.4615 11.0068 12.4615ZM11 9.07693C10.6782 9.07693 10.399 9.19118 10.1625 9.4197C9.92597 9.64823 9.8077 9.93141 9.8077 10.2692C9.8077 10.591 9.92597 10.8702 10.1625 11.1067C10.399 11.3433 10.6814 11.4615 11.0096 11.4615C11.3378 11.4615 11.617 11.3433 11.8471 11.1067C12.0772 10.8702 12.1923 10.5878 12.1923 10.2596C12.1923 9.9314 12.078 9.65223 11.8495 9.4221C11.621 9.19198 11.3378 9.07693 11 9.07693Z'
        fill={fill}
      />
    </Svg>
  );
};