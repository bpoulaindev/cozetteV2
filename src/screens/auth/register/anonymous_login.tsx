import { t } from 'i18next';
import { Button } from '../../../components/buttons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInAnonymously } from 'firebase/auth';

export const AnonymousLogin = () => {
  const [path, setPath] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    if (path) {
      navigate(path);
    }
  }, [path]);
  const anonymousLogin = async () => {
    try {
      await signInAnonymously(auth);
      setPath('/');
    } catch (err: any) {
      console.log('there was an error', err);
    }
  };
  return (
    <Button
      content={t('Register.ignore') ?? ''}
      variant='text'
      contentClasses='font-800 underline'
      onPress={anonymousLogin}
      color='gray'
    />
  );
};
