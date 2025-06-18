import { useEffect } from 'react';
import { SplashScreenProps } from '../navigation/types';
import { useAppSelector } from '../common/hooks/hooks';
import { selectUserData } from '../state/userSlice';
import { selectPreLoginData } from '../state/preLoginSlice';

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  const userData = useAppSelector(selectUserData);
  const preLoginData = useAppSelector(selectPreLoginData);

  useEffect(() => {
    if (userData.uid !== '' || preLoginData) {
      navigation.replace('HomeScreen');
    } else {
      navigation.replace('PreLoginScreen');
    }
  }, [navigation, preLoginData, userData.uid]);

  return <></>;
};

export default SplashScreen;
