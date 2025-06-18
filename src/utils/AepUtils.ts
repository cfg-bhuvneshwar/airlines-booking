import { MobileCore, Event } from '@adobe/react-native-aepcore';
import { store } from '../state/store';
import { Dimensions, Platform } from 'react-native';

const pushAdobeEvent = (eventName: string, eventData: Record<string, any>) => {
  const event = new Event(eventName, '', '', eventData);
  console.log('AdobeExperienceSDK : ', event);
  MobileCore.dispatchEvent(event);
};

const pushPageloadEvent = (pageName: string) => {
  const event = {
    page: {
      pageName,
      pageURL: '',
      referrer: '',
      language: 'en-US',
      siteSection: 'booking',
      siteSubSection: 'flight-search',
      pageType: 'landing',
      country: 'IN',
    },
    user: userInfoForAEP(),
    device: deviceInfo(),
    timestamp: new Date().toISOString(),
  };
  pushAdobeEvent('pageload', event);
};

const pushClickEvent = ({
  eventName,
  event,
}: {
  eventName: string;
  event: Record<string, any>;
}) => {
  pushAdobeEvent(eventName, event);
};

const deviceInfo = () => {
  return {
    deviceType: 'mobile',
    os: Platform.OS === 'ios' ? 'iOS' : 'Android',
    osVersion: Platform.Version.toString(),
    browser: '',
    screenResolution: `${Dimensions.get('window').width}x${
      Dimensions.get('window').height
    }`,
  };
};

const userInfoForAEP = () => {
  const userData = store.getState().user.user;
  return userData.uid !== ''
    ? {
        userID: userData.uid,
        loginStatus: 'logged-in',
        loyaltyTier: userData.loyaltyTier,
        customerType: 'frequent-flyer',
      }
    : {
        userID: '',
        loginStatus: 'guest',
        loyaltyTier: 'Silver',
        customerType: 'frequent-flyer',
      };
};

export {
  pushAdobeEvent,
  deviceInfo,
  pushPageloadEvent,
  pushClickEvent,
  userInfoForAEP,
};
