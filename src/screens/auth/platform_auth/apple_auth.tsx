import * as AppleAuthentication from 'expo-apple-authentication';
import { View } from 'react-native';
import tw from '../../../../lib/tailwind';
import { getAuth, signInWithCredential } from 'firebase/auth';
import firebase from 'firebase/compat';
import OAuthProvider = firebase.auth.OAuthProvider;
import { buildMinimalUser, createUser } from '../../../actions/users';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../auth_context';
const { style } = tw;
import * as Crypto from 'expo-crypto';

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
  const auth = getAuth();
  const navigate = useNavigate();
  const { isLoggedIn, login, logout, changeUser } = useContext(AuthContext);
  return (
    <View style={style('flex items-center justify-center')}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={style('w-[200px] h-[50px]')}
        onPress={async () => {
          try {
            const nonce = Math.random().toString(36).substring(2, 10);
            const hashedNonce = await Crypto.digestStringAsync(
              Crypto.CryptoDigestAlgorithm.SHA256,
              nonce
            );
            const appleCredential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL
              ],
              nonce: hashedNonce
            });
            const { identityToken, user } = appleCredential;
            // const userCredential = await signInWithCredential(auth, credential);
            // console.log('it worked !!!!!', credential);
            // const provider = new firebase.auth.OAuthProvider('apple.com');
            // const provider = new OAuthProvider('apple.com');
            const provider = new firebase.auth.OAuthProvider('apple.com');
            const credential = provider.credential({
              idToken: appleCredential.identityToken ?? '',
              rawNonce: hashedNonce
            });
            console.log('provider', credential, identityToken, user);
            console.log('allez stp', credential);
            await firebase
              .auth()
              .signInWithCredential(credential)
              .then(async (userCredential) => {
                const userToken = await userCredential.user?.getIdTokenResult();
                const minimalUser = buildMinimalUser(userCredential.user);
                createUser(userToken?.token ?? '', minimalUser, login, changeUser).then(() =>
                  navigate('/')
                );
              });
            // signed in
          } catch (e: any) {
            console.log('there was a problem fdp', e?.code, e);
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
