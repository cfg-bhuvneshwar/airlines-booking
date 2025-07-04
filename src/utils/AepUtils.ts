import { MobileCore, Event } from '@adobe/react-native-aepcore';
import { Edge, ExperienceEvent } from '@adobe/react-native-aepedge';
import { store } from '../state/store';
import { Dimensions, Platform } from 'react-native';

const pushAdobeEvent = (eventName: string, eventData: Record<string, any>) => {
  const event = new Event(eventName, '', '', eventData);
  console.log('AdobeExperienceSDK : ', event);
  MobileCore.dispatchEvent(event);
};

const pushEdgeEvent = (xdmData: Record<string, any>) => {
  const experienceEvent = new ExperienceEvent({
    xdmData,
    datastreamIdOverride: 'dfefbe79-3f16-4bcd-8a71-8590f97552aa',
  });
  console.log('AdobeExperienceSDK experienceEvent : ', experienceEvent);
  Edge.sendEvent(experienceEvent);
};

const pushPageloadEvent = (pageName: string, pageURL: string) => {
  const event = {
    page: {
      pageName,
      pageURL: pageURL,
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

  // edge event

  const userData = store.getState().user.user;
  const experienceCloudId = store.getState().aep.experienceCloudId;
  const xdmData = {
    eventType: 'custom.pageload',
    _aeppsemea: {
      identification: {
        core: {
          email: userData.uid !== '' ? userData.email : '',
          ecid: experienceCloudId,
        },
        customerType: 'frequent-flyer',
        loginStatus: userData.uid !== '' ? 'logged-in' : 'guest',
        loyaltyTier: userData.uid !== '' ? userData.loyaltyTier : 'Silver',
      },
    },
    device: {
      _aeppsemea: {
        operatingSystem: Platform.OS === 'ios' ? 'iOS' : 'Android',
        screenResolution: `${Dimensions.get('window').width}x${
          Dimensions.get('window').height
        }`,
      },
      type: 'mobile',
    },
    timestamp: new Date().toISOString(),
    web: {
      webPageDetails: {
        URL: pageURL,
        _aeppsemea: {
          pageType: 'landing',
          siteSubSection: 'flight-search',
        },
        isErrorPage: false,
        isHomePage: false,
        name: pageName,
        siteSection: 'booking',
      },
      webReferrer: {
        URL: '',
        type: 'internal',
      },
    },
  };
  pushEdgeEvent(xdmData);
};

const pushClickEvent = ({
  eventName,
  event,
}: {
  eventName: string;
  event: Record<string, any>;
}) => {
  let flightDetails = { ...event };
  if ('flightContext' in event) {
    if ('oneway' in event.flightContext) {
      flightDetails = {
        ...flightDetails,
        flightContext: {
          ...flightDetails.flightContext,
          oneway: {
            ...flightDetails.flightContext.oneway,
            departureTime: `${flightDetails.flightContext.oneway.date}T${flightDetails.flightContext.oneway.departureTime}:00.000Z`,
            arrivalTime: `${flightDetails.flightContext.oneway.date}T${flightDetails.flightContext.oneway.arrivalTime}:00.000Z`,
          },
        },
      };
    }
    if (
      'roundTrip' in event.flightContext &&
      Object.keys(event.flightContext.roundTrip).length > 0
    ) {
      flightDetails = {
        ...flightDetails,
        flightContext: {
          ...flightDetails.flightContext,
          roundTrip: {
            ...flightDetails.flightContext.roundTrip,
            departureTime: `${flightDetails.flightContext.roundTrip.date}T${flightDetails.flightContext.roundTrip.departureTime}:00.000Z`,
            arrivalTime: `${flightDetails.flightContext.roundTrip.date}T${flightDetails.flightContext.roundTrip.arrivalTime}:00.000Z`,
          },
        },
      };
    }
  }

  pushAdobeEvent(eventName, flightDetails);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user: _, ...otherEventData } = flightDetails;

  const userData = store.getState().user.user;
  const experienceCloudId = store.getState().aep.experienceCloudId;
  const xdmData = {
    eventType: `custom.${eventName}`,
    _aeppsemea: {
      identification: {
        core: {
          email: userData.uid !== '' ? userData.email : '',
          ecid: experienceCloudId,
        },
        customerType: 'frequent-flyer',
        loginStatus: userData.uid !== '' ? 'logged-in' : 'guest',
        loyaltyTier: userData.uid !== '' ? userData.loyaltyTier : 'Silver',
      },
      FlightDetails: otherEventData,
    },
    device: {
      _aeppsemea: {
        operatingSystem: Platform.OS === 'ios' ? 'iOS' : 'Android',
        screenResolution: `${Dimensions.get('window').width}x${
          Dimensions.get('window').height
        }`,
      },
      type: 'mobile',
    },
    timestamp: new Date().toISOString(),
  };
  pushEdgeEvent(xdmData);
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
