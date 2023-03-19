import { NativeRouter, Route } from 'react-router-native';
import { Homepage } from './src/screens/homepage/homepage';
import { Maps } from './src/screens/maps/maps';
import { Navbar } from './src/components/navbar';
import { Navigate, Routes } from 'react-router-dom';
import { StatusBar } from 'expo-status-bar';
import { AuthContext, AuthProvider } from './src/screens/auth/auth_context';
import { useContext, useEffect, useState } from 'react';
import { Register } from './src/screens/auth/register/register';
// @ts-ignore
import { API_KEY } from '@env';
import './i18n.config';
import { Onboarding } from './src/screens/onboarding/onboarding';
import tw from './lib/tailwind';
import { useDeviceContext } from 'twrnc';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const { isLoggedIn, login, logout, changeUser, user } = useContext(AuthContext);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(isLoggedIn);
  const auth = getAuth();

  const checkUid = async () => {
    try {
      const value = await AsyncStorage.getItem('@userUid');
      if (value !== null) {
        login();
        setUserLoggedIn(true);
        console.log('ok we have a value', value, userLoggedIn);
      }
    } catch (e) {
      console.log('error getting uid', e);
    }
  };
  const storeUid = async (uid: string) => {
    try {
      await AsyncStorage.setItem('@userUid', uid);
    } catch (e) {
      // saving error
      console.log('error saving uid', e);
    }
  };
  onAuthStateChanged(auth, (newUser) => {
    if (newUser) {
      console.log('ok poto', userLoggedIn, newUser);
      login();
      changeUser(newUser as any);
      setUserLoggedIn(true);
      const uid = newUser.uid;
      storeUid(uid).then(() => console.log('uid saved'));
    } else {
      console.log('User is signed out');
      // ...
    }
  });
  useEffect(() => {
    checkUid().then(() => console.log('uid checked'));
  }, []);
  useDeviceContext(tw);
  return (
    <AuthProvider>
      <NativeRouter>
        <Routes>
          <Route path='/' element={userLoggedIn ? <Homepage /> : <Navigate to='/onboarding' />} />
          <Route path='/onboarding' element={<Onboarding />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Homepage />} />
          {userLoggedIn && (
            <>
              <Route path='/maps' element={<Maps />} />
            </>
          )}
        </Routes>
        <Navbar />
        {/*<StatusBar hidden />*/}
      </NativeRouter>
    </AuthProvider>
  );
}
