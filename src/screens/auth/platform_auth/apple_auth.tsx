import * as AppleAuthentication from 'expo-apple-authentication';
import { View } from 'react-native';
import tw from '../../../../lib/tailwind';
const { style } = tw;

interface AppleCredentials {
  user: string;
  state: string | null;
  fullName: {
    namePrefix: string | null;
    givenName: string | null;
    middleName: string | null;
    familyName: string | null;
    nameSuffix: string | null;
    nickname: string | null;
  } | null;
  email: string | null;
  realUserStatus: 1 | 2 | 0;
  identityToken: string | null;
  authorizationCode: string | null;
}
export const AppleAuth = () => {
  return (
    <View style={style('flex items-center justify-center')}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={style('w-[200px] h-[50px]')}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL
              ]
            });
            console.log('it worked !!!!!', credential);
            // signed in
          } catch (e: any) {
            console.log('there was a problem fdp');
            if (e?.code === 'ERR_REQUEST_CANCELED') {
              // handle that the user canceled the sign-in flow
            } else {
              // handle other errors
            }
          }
        }}
      />
    </View>
  );
};
