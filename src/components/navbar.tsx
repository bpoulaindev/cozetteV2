import { Pressable, View } from 'react-native';
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
      <Pressable
        onPress={() => redirect('/')}
        style={style('px-2.5 py-1.5 border border-transparent rounded-xl')}>
        {({ pressed }) => (
          <View style={style('flex flex-col items-center')}>
            <View
              style={style(
                'px-6 py-1 rounded-full h-7 flex flex-col justify-center',
                isHome || pressed ? 'bg-secondary-100' : 'bg-transparent'
              )}>
              <SvgHome
                fill={isHome || pressed ? Palette.secondary[300] : Palette.dark}
                classes='max-w-5 max-h-5'
                contained={isHome || pressed}
              />
            </View>
            <AppText
              style={style(
                'text-sm',
                isHome || pressed ? 'text-secondary-300 font-500' : 'text-dark'
              )}>
              Accueil
            </AppText>
          </View>
        )}
      </Pressable>
      <Pressable
        onPress={() => redirect('/journeys')}
        style={style('px-2.5 py-1.5 border border-transparent rounded-xl')}>
        {({ pressed }) => (
          <View style={style('flex flex-col items-center')}>
            <View
              style={style(
                'px-6 py-1 rounded-full h-7 flex flex-col justify-center',
                isJourneys || pressed ? 'bg-secondary-100' : 'bg-transparent'
              )}>
              <SvgFlag
                fill={isJourneys || pressed ? Palette.secondary[300] : Palette.dark}
                classes='max-w-4 max-h-4'
                contained={isJourneys || pressed}
              />
            </View>
            <AppText
              style={style(
                'text-sm',
                isJourneys || pressed ? 'text-secondary-300 font-500' : 'text-dark'
              )}>
              Parcours
            </AppText>
          </View>
        )}
      </Pressable>
      <Pressable
        onPress={() => redirect('/search')}
        style={style('px-2.5 py-1.5 border border-transparent rounded-xl')}>
        {({ pressed }) => (
          <View style={style('flex flex-col items-center')}>
            <View
              style={style(
                'px-6 py-1 rounded-full h-7 flex flex-col justify-center',
                isSearch || pressed ? 'bg-secondary-100' : 'bg-transparent'
              )}>
              <SvgSearch
                fill={isSearch || pressed ? Palette.secondary[300] : Palette.dark}
                classes={isSearch || pressed ? 'max-w-6 max-h-6' : 'max-w-4 max-h-4'}
                contained={isSearch || pressed}
              />
            </View>
            <AppText
              style={style(
                'text-sm',
                isSearch || pressed ? 'text-secondary-300 font-500' : 'text-dark'
              )}>
              Recherche
            </AppText>
          </View>
        )}
      </Pressable>
      <Pressable
        onPress={() => redirect('/profile')}
        style={style('px-2.5 py-1.5 border border-transparent rounded-xl')}>
        {({ pressed }) => (
          <View style={style('flex flex-col items-center')}>
            <View
              style={style(
                'px-6 py-1 rounded-full h-7 flex flex-col justify-center',
                isProfile || pressed ? 'bg-secondary-100' : 'bg-transparent'
              )}>
              <SvgProfile
                fill={isProfile || pressed ? Palette.secondary[300] : Palette.dark}
                classes='max-w-4 max-h-4'
                contained={(isProfile || pressed) as boolean}
              />
            </View>
            <AppText
              style={style(
                'text-sm',
                isProfile || pressed ? 'text-secondary-300 font-500' : 'text-dark'
              )}>
              Compte
            </AppText>
          </View>
        )}
      </Pressable>
    </View>
  );
};
