import { NativeRouter, Route } from 'react-router-native';
import { Homepage } from './src/screens/homepage/homepage';
import { Maps } from './src/screens/maps/maps';
import { Navbar } from './src/components/navbar';
import { Navigate, Routes } from 'react-router-dom';
import { StatusBar } from 'expo-status-bar';
import { AuthContext, AuthProvider } from './src/screens/auth/auth_context';
import { useContext, useState } from 'react';
import { Register } from './src/screens/auth/register/register';
// @ts-ignore
import { API_KEY } from '@env';
import './i18n.config';
import { Onboarding } from './src/screens/onboarding/onboarding';
import tw from './lib/tailwind';
import { useDeviceContext } from 'twrnc';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const { isLoggedIn, login, logout, changeUser } = useContext(AuthContext);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(isLoggedIn);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('ok poto');
      login();
      changeUser(user as any);
      setUserLoggedIn(true);
      const uid = user.uid;
      // ...
    } else {
      console.log('User is signed out');
      // ...
    }
  });
  console.log('jen ai marre', isLoggedIn);
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
