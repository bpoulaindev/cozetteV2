import { View } from 'react-native';
import { Button } from './buttons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Linking } from 'react-native';
import React, { useMemo } from 'react';
import { SvgHome } from '../../assets/svg_components/icons/navbar/svg_home';
import { Palette } from '../../lib/palette';
import { AppText } from './appText';
import tw from '../../lib/tailwind';
import { SvgFlag } from '../../assets/svg_components/icons/navbar/svg_flag';
import { SvgSearch } from '../../assets/svg_components/icons/navbar/svg_search';
import { SvgProfile } from '../../assets/svg_components/icons/navbar/svg_profile';

const { style } = tw;
export const Navbar = () => {
  const navigate = useNavigate();
  const redirect = (path: string) => {
    navigate(path);
  };
  const location = useLocation();
  const bannedLocations = ['/login', '/register', '/onboarding'];
  const isHome = useMemo(() => location.pathname === '/', [location.pathname]);
  const isJourneys = useMemo(() => location.pathname === '/journeys', [location.pathname]);
  const isSearch = useMemo(() => location.pathname === '/search', [location.pathname]);
  const isProfile = useMemo(() => location.pathname === '/profile', [location.pathname]);
  if (bannedLocations.includes(location.pathname)) return null;
  return (
    <View
      style={style(
        'flex flex-row w-full justify-between items-center bg-white absolute bottom-0 z-50 py-3 px-2'
      )}>
      <Button variant='text' color='primary' onPress={() => redirect('/')}>
        <View style={style('flex flex-col items-center')}>
          <View
            style={style(
              'px-6 py-1 rounded-full h-7 flex flex-col justify-center',
              isHome ? 'bg-secondary-100' : 'bg-transparent'
            )}>
            <SvgHome
              fill={isHome ? Palette.secondary[300] : Palette.dark}
              classes='max-w-5 max-h-5'
              contained={isHome}
            />
          </View>
          <AppText style={style('text-sm', isHome ? 'text-secondary-300 font-500' : 'text-dark')}>
            Accueil
          </AppText>
        </View>
      </Button>
      <Button variant='text' color='primary' onPress={() => redirect('/journeys')}>
        <View style={style('flex flex-col items-center')}>
          <View
            style={style(
              'px-6 py-1 rounded-full h-7 flex flex-col justify-center',
              isJourneys ? 'bg-secondary-100' : 'bg-transparent'
            )}>
            <SvgFlag
              fill={isJourneys ? Palette.secondary[300] : Palette.dark}
              classes='max-w-4 max-h-4'
              contained={isJourneys}
            />
          </View>
          <AppText
            style={style('text-sm', isJourneys ? 'text-secondary-300 font-500' : 'text-dark')}>
            Parcours
          </AppText>
        </View>
      </Button>
      <Button variant='text' color='primary' onPress={() => redirect('/search')}>
        <View style={style('flex flex-col items-center')}>
          <View
            style={style(
              'px-6 py-1 rounded-full h-7 flex flex-col justify-center',
              isSearch ? 'bg-secondary-100' : 'bg-transparent'
            )}>
            <SvgSearch
              fill={isSearch ? Palette.secondary[300] : Palette.dark}
              classes={isSearch ? 'max-w-6 max-h-6' : 'max-w-4 max-h-4'}
              contained={isSearch}
            />
          </View>
          <AppText style={style('text-sm', isSearch ? 'text-secondary-300 font-500' : 'text-dark')}>
            Recherche
          </AppText>
        </View>
      </Button>
      <Button variant='text' color='primary' onPress={() => redirect('/profile')}>
        <View style={style('flex flex-col items-center')}>
          <View
            style={style(
              'px-6 py-1 rounded-full h-7 flex flex-col justify-center',
              isProfile ? 'bg-secondary-100' : 'bg-transparent'
            )}>
            <SvgProfile
              fill={isProfile ? Palette.secondary[300] : Palette.dark}
              classes='max-w-4 max-h-4'
              contained={isProfile}
            />
          </View>
          <AppText
            style={style('text-sm', isProfile ? 'text-secondary-300 font-500' : 'text-dark')}>
            Compte
          </AppText>
        </View>
      </Button>
    </View>
  );
};
