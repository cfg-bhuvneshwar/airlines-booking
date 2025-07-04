import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { MobileCore, LogLevel } from '@adobe/react-native-aepcore';
import { Assurance } from '@adobe/react-native-aepassurance';
import { Consent } from '@adobe/react-native-aepedgeconsent';
import { Identity } from '@adobe/react-native-aepedgeidentity';
import { Provider } from 'react-redux';
import { saveExperienceCloudId } from './state/aepSlice';
import { store } from './state/store';

const config = {
  screens: {
    HomeScreen: 'home',
  },
};

const linking = {
  prefixes: ['https://airlinesbooking.com', 'airlinesbooking://'],
  config,
};

const App = () => {
  useEffect(() => {
    MobileCore.setLogLevel(LogLevel.DEBUG);

    MobileCore.initializeWithAppId(
      'de3a66fdc88b/874656462d84/launch-6fece0a335db-development',
    )
      .then(() => {
        console.log('AdobeExperienceSDK: AEP SDK Initialized');
        Assurance.startSession(
          'airlinesbooking://?adb_validation_sessionid=b78af7e5-322c-4083-9bcb-8dea9789df7d',
        );

        // consents
        const consents: { [keys: string]: any } = {
          consents: { collect: { val: 'y' } },
        };
        Consent.update(consents);

        // ECID

        Identity.getExperienceCloudId().then(experienceCloudId => {
          console.log(
            'AdobeExperienceSDK: Experience Cloud Id = ' + experienceCloudId,
          );
          store.dispatch(saveExperienceCloudId(experienceCloudId));
        });
      })
      .catch(error => {
        console.error(
          'AdobeExperienceSDK: AEP SDK Initialization error:',
          error,
        );
      });
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer linking={linking}>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
