import { NativeRouter, Route } from 'react-router-native';
import { Homepage } from './src/screens/homepage/homepage';
import { Maps } from './src/screens/maps/maps';
import { Navbar } from './src/components/navbar';
import { Navigate, Routes } from 'react-router-dom';
import { StatusBar } from 'expo-status-bar';
import { AuthContext, AuthProvider } from './src/screens/auth/auth_context';
import { useContext } from 'react';
import { Login } from './src/screens/auth/login';
// @ts-ignore
import { API_KEY } from '@env';
import './i18n.config';

export default function App() {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  return (
    // @ts-ignore
    <AuthProvider>
      <NativeRouter>
        <Routes>
          <Route path='/' element={isLoggedIn ? <Homepage /> : <Navigate to='/login' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Homepage />} />
          {isLoggedIn && (
            <>
              <Route path='/maps' element={<Maps />} />
            </>
          )}
        </Routes>
        <Navbar />
        <StatusBar hidden />
      </NativeRouter>
    </AuthProvider>
  );
}
