import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './tabs/HomeTab';
import MyTripsTab from './tabs/MyTripsTab';
import BookTab from './tabs/BookTab';
import ProfileTab from './tabs/ProfileTab';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import { RootTabParamList } from '../../navigation/types';
import { Colors } from '../../common/constants/Colors';
import Icon from '../../common/components/Icon';
import { IconsNames, IconsTypes } from '../../common/constants/Icons';

type TabIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const renderHomeTabIcon = ({ color, size }: TabIconProps) => {
  return (
    <Icon
      type={IconsTypes.ION_ICON}
      name="home-outline"
      size={size}
      color={color}
    />
  );
};

const renderBookTabIcon = ({ color, size }: TabIconProps) => {
  return (
    <Icon
      type={IconsTypes.MATERIAL_ICON}
      name={IconsNames.FLIGHT}
      size={size}
      color={color}
    />
  );
};

const renderTripsTabIcon = ({ color, size }: TabIconProps) => {
  return (
    <Icon
      type={IconsTypes.ION_ICON}
      name="ticket-outline"
      size={size}
      color={color}
    />
  );
};

const renderProfileTabIcon = ({ color, size }: TabIconProps) => {
  return (
    <Icon
      type={IconsTypes.MATERIAL_ICON}
      name="account-circle"
      size={size}
      color={color}
    />
  );
};

const HomeScreen = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeTab}
            options={{
              headerShown: false,
              tabBarIcon: renderHomeTabIcon,
            }}
          />
          <Tab.Screen
            name="Book"
            component={BookTab}
            options={{ headerShown: false, tabBarIcon: renderBookTabIcon }}
          />
          <Tab.Screen
            name="Trips"
            component={MyTripsTab}
            options={{ headerShown: false, tabBarIcon: renderTripsTabIcon }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileTab}
            options={{ headerShown: false, tabBarIcon: renderProfileTabIcon }}
          />
        </Tab.Navigator>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default HomeScreen;
