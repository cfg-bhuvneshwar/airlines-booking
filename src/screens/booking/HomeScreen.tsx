import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './tabs/HomeTab';
import MyTripsTab from './tabs/MyTripsTab';
import BookTab from './tabs/BookTab';
import ProfileTab from './tabs/ProfileTab';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import { RootTabParamList } from '../../navigation/types';

const Tab = createBottomTabNavigator<RootTabParamList>();

const HomeScreen = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeTab}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Book"
            component={BookTab}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Trips"
            component={MyTripsTab}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileTab}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default HomeScreen;
