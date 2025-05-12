import { useEffect } from 'react';
import { SplashScreenProps } from '../navigation/types';
import { useAppSelector } from '../common/hooks/hooks';
import { selectUserData } from '../state/userSlice';

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  const userData = useAppSelector(selectUserData);

  useEffect(() => {
    if (userData.user.uid !== '') {
      navigation.replace('HomeScreen');
    } else {
      navigation.replace('LoginScreen');
    }
  }, [navigation, userData.user.uid]);

  return <></>;
};

export default SplashScreen;
