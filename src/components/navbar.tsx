import { View } from 'react-native';
import tw from 'twrnc';
import { SimpleButton } from './buttons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Linking } from 'react-native';
import { useMemo } from 'react';

const { style } = tw;
export const Navbar = () => {
  const navigate = useNavigate();
  const redirect = (path: string) => {
    navigate(path);
  };
  const location = useLocation();
  const bannedLocations = ['/login', '/signup'];
  const isHome = useMemo(() => location.pathname === '/home', [location.pathname]);
  const isMap = useMemo(() => location.pathname === '/map', [location.pathname]);
  const isChat = useMemo(() => location.pathname === '/chat', [location.pathname]);
  if (bannedLocations.includes(location.pathname)) return null;
  return (
    <View
      style={style(
        'flex flex-row w-full justify-center items-center bg-white rounded-t-lg border-[.5px] border-indigo-200 absolute bottom-0 z-50 px-4 py-3'
      )}>
      <SimpleButton
        variant='text'
        color='primary'
        contentClasses='text-lg'
        onPress={() => redirect('/')}
        content='Home'
      />
      <SimpleButton
        variant='text'
        color='primary'
        contentClasses='text-lg'
        onPress={() => redirect('/maps')}
        content='Maps'
      />
      <SimpleButton
        variant='text'
        color='primary'
        contentClasses='text-lg'
        onPress={() => Linking.openURL('https://maps.apple.com/?ll=37.484847,-122.148386')}
        content='Test'
      />
    </View>
  );
};
