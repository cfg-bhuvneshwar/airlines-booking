import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import fromCities from '../../../data/fromCities.json';
import toCities from '../../../data/toCities.json';
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks';
import {
  saveCurrentBookingData,
  saveRecentSearch,
  selectRecentSearchData,
} from '../../../state/flightSlice';
import { commonStyles } from '../../../common/constants/commonStyles';
import FromCityToCity from '../components/homtabcomponents/FromCityToCity';
import PassengerCabinSelection from '../components/homtabcomponents/PassengerCabinSelection';
import DateSelection from '../components/homtabcomponents/DateSelection';
import { Colors } from '../../../common/constants/Colors';
import Header from '../../../common/components/Header';
import FromToBottomSheet from '../components/homtabcomponents/bottomsheetcomponents/FromToBottomSheet';
import moment from 'moment';
import { formatDate, getDatesBetween } from '../../../utils/Utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { pushClickEvent, pushPageloadEvent } from '../../../utils/AepUtils';
import ActionButton from '../../../common/components/ActionButton';
import DateSelectionBottomSheet from '../components/homtabcomponents/bottomsheetcomponents/DateSelectionBottomSheet';
import GuestCabinSelectionBottomSheet from '../components/homtabcomponents/bottomsheetcomponents/GuestCabinSelectionBottomSheet';
import PreviouslySearchedListItem from '../components/PreviouslySearchedListItem';
import {
  AepPageName,
  AepPageUrl,
} from '../../../common/constants/AepConstants';

interface MarkedDates {
  color: string;
  selected: boolean;
  textColor: string;
  startingDay?: boolean;
  endingDay?: boolean;
}

const BookTab = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  const recentSearchData = useAppSelector(selectRecentSearchData);

  const bottomSheetFromRef = useRef<BottomSheetModal>(null);
  const bottomSheetToRef = useRef<BottomSheetModal>(null);
  const bottomSheetGuestRef = useRef<BottomSheetModal>(null);
  const bottomSheetDateRef = useRef<BottomSheetModal>(null);

  const [from, setFrom] = useState<{ city: string; airportCode: string }>({
    city: '',
    airportCode: '',
  });
  const [to, setTo] = useState<{ city: string; airportCode: string }>({
    city: '',
    airportCode: '',
  });
  const [markedDates, setMarkedDates] = useState<Record<string, MarkedDates>>(
    {},
  );
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [selectedCabin, setSelectedCabin] = useState('Economy');

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [infantsWithSeats, setInfantsWithSeats] = useState(0);

  const handleFromModalPress = useCallback(() => {
    bottomSheetFromRef.current?.present();
  }, []);

  const handleToModalPress = useCallback(() => {
    bottomSheetToRef.current?.present();
  }, []);

  const handleGuestModalPress = useCallback(() => {
    bottomSheetGuestRef.current?.present();
  }, []);

  const handleDateModalPress = useCallback(() => {
    bottomSheetDateRef.current?.present();
  }, []);

  useEffect(() => {
    pushPageloadEvent(AepPageName.BOOK_FLIGHT, AepPageUrl.BOOK_FLIGHT);
  }, []);

  const searchFlights = useCallback(
    ({
      fromCity,
      toCity,
      fromAirportCode,
      toAirportCode,
      cabin,
      sDate,
      eDate,
      noOfAdults,
      noOfChildren,
      noOfInfants,
      noOfInfantsWithSeats,
    }: any) => {
      dispatch(
        saveRecentSearch({
          fromCity: fromCity,
          toCity: toCity,
          fromAirportCode: fromAirportCode,
          toAirportCode: toAirportCode,
          cabin: cabin,
          startDate: sDate,
          endDate: eDate,
          adults: noOfAdults,
          children: noOfChildren,
          infants: noOfInfants,
          infantsWithSeats: noOfInfantsWithSeats,
        }),
      );
      dispatch(saveCurrentBookingData({}));
      const pushClickEventData: Record<string, any> = {
        searchContext: {
          tripType: eDate !== '' ? 'roundTrip' : 'oneway',
          origin: fromCity,
          destination: toCity,
          departureDate: new Date(sDate).toISOString(),
          cabinClass: cabin,
          passengerCount: {
            adults: adults,
            children: children,
            infants: infants + infantsWithSeats,
          },
        },
      };
      if (eDate !== '') {
        pushClickEventData.searchContext.returnDate = new Date(
          eDate,
        ).toISOString();
      }

      pushClickEvent({ eventName: 'flightSearch', event: pushClickEventData });
      navigation.navigate('FlightListScreen', {
        fromCity: fromCity,
        toCity: toCity,
        fromAirportCode: fromAirportCode,
        toAirportCode: toAirportCode,
        cabin: cabin,
        startDate: sDate,
        endDate: eDate,
        adults: noOfAdults,
        children: noOfChildren,
        infants: noOfInfants,
        infantsWithSeats: noOfInfantsWithSeats,
      });
    },
    [adults, children, dispatch, infants, infantsWithSeats, navigation],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={commonStyles.container}>
        <Header title="Book" />
        {/* Main content */}
        <View
          style={[
            styles.sectionContainer,
            commonStyles.paddingHorizontalLarge,
          ]}>
          <FromCityToCity
            from={from}
            to={to}
            onHandleFromModalPress={handleFromModalPress}
            onHandleToModalPress={handleToModalPress}
          />
          <PassengerCabinSelection
            adults={adults}
            children={children}
            infants={infants}
            infantsWithSeats={infantsWithSeats}
            cabin={selectedCabin}
            onHandleGuestModalPress={handleGuestModalPress}
          />
          <DateSelection
            date={
              endDate === '' && startDate === ''
                ? 'Dates'
                : endDate === ''
                ? `${formatDate(startDate)}`
                : `${formatDate(startDate)} - ${formatDate(endDate)}`
            }
            onHandleDateModalPress={handleDateModalPress}
          />
        </View>

        {/* Previously searched flights */}
        <View style={styles.previousSearchContainer}>
          <Text style={styles.previousSearchTitle}>PREVIOUSLY SEARCHED</Text>
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.previousSearchList}>
                {recentSearchData.map((item, index) => (
                  <PreviouslySearchedListItem
                    key={`${item.fromCity}${index}`}
                    item={item}
                    onPress={() =>
                      searchFlights({
                        fromCity: item.fromCity,
                        toCity: item.toCity,
                        fromAirportCode: item.fromAirportCode,
                        toAirportCode: item.toAirportCode,
                        cabin: item.cabin,
                        sDate: item.startDate,
                        eDate: item.endDate,
                        noOfAdults: item.adults,
                        noOfChildren: item.children,
                        noOfInfants: item.infants,
                        noOfInfantsWithSeats: item.infantsWithSeats,
                      })
                    }
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Search Flights Button */}
        <ActionButton
          label="Search Flights"
          buttonViewStyles={styles.searchButton}
          buttonTextStyles={styles.searchButtonText}
          onPress={() => {
            if (from.city === '') {
              bottomSheetFromRef.current?.present();
            } else if (to.city === '') {
              bottomSheetToRef.current?.present();
            } else if (startDate === '') {
              bottomSheetDateRef.current?.present();
            } else {
              searchFlights({
                fromCity: from.city,
                toCity: to.city,
                fromAirportCode: from.airportCode,
                toAirportCode: to.airportCode,
                cabin: selectedCabin,
                sDate: startDate,
                eDate: endDate,
                noOfAdults: adults,
                noOfChildren: children,
                noOfInfants: infants,
                noOfInfantsWithSeats: infantsWithSeats,
              });
            }
          }}
        />

        {/* From City Selection */}
        <FromToBottomSheet
          ref={bottomSheetFromRef}
          list={fromCities}
          onPress={(value: any) => {
            setFrom(value);
            bottomSheetFromRef.current?.close();
          }}
          type="Origin"
        />

        {/* To City Selection */}
        <FromToBottomSheet
          ref={bottomSheetToRef}
          list={toCities}
          onPress={(value: any) => {
            setTo(value);
            bottomSheetToRef.current?.close();
          }}
          type="Destination"
        />

        {/* Guest and Cabin Selection */}
        <GuestCabinSelectionBottomSheet
          ref={bottomSheetGuestRef}
          adults={adults}
          children={children}
          infants={infants}
          infantsWithSeats={infantsWithSeats}
          selectedCabin={selectedCabin}
          onSelectCabin={setSelectedCabin}
          onPressMinus={(value: number, type: string) => {
            if (type === 'adults') {
              setAdults(value);
            } else if (type === 'children') {
              setChildren(value);
            } else if (type === 'infants') {
              setInfants(value);
            } else if (type === 'infantsWithSeats') {
              setInfantsWithSeats(value);
            }
          }}
          onPressPlus={(value: number, type: string) => {
            if (type === 'adults') {
              setAdults(value);
            } else if (type === 'children') {
              setChildren(value);
            } else if (type === 'infants') {
              setInfants(value);
            } else if (type === 'infantsWithSeats') {
              setInfantsWithSeats(value);
            }
          }}
        />

        {/* Date Selection */}
        <DateSelectionBottomSheet
          ref={bottomSheetDateRef}
          startDate={startDate}
          endDate={endDate}
          markedDates={markedDates}
          onClosePress={() => {
            setStartDate('');
            setEndDate('');
            setMarkedDates({});
          }}
          onDayPress={(dateString: string) => {
            if (!startDate) {
              setStartDate(dateString);
              setMarkedDates({
                [dateString]: {
                  color: Colors.background,
                  selected: true,
                  textColor: Colors.white,
                },
              });
            } else if (!endDate) {
              if (moment(dateString).isAfter(startDate)) {
                const datesBetween = getDatesBetween(startDate, dateString);
                let markedDatesObject: Record<string, MarkedDates> = {
                  [startDate]: {
                    color: Colors.background,
                    selected: true,
                    textColor: '#FFFFFF',
                    startingDay: true,
                  },
                };
                datesBetween.forEach(date => {
                  markedDatesObject = {
                    ...markedDatesObject,
                    [date]: {
                      selected: false,
                      color: 'gray',
                      textColor: Colors.white,
                    },
                  };
                });
                markedDatesObject = {
                  ...markedDatesObject,
                  ...{
                    [dateString]: {
                      selected: true,
                      endingDay: true,
                      color: Colors.background,
                      textColor: Colors.white,
                    },
                  },
                };
                setEndDate(dateString);
                setMarkedDates({ ...markedDatesObject });
              } else {
                setStartDate(dateString);
                setEndDate('');
                setMarkedDates({
                  [dateString]: {
                    color: Colors.background,
                    selected: true,
                    textColor: Colors.white,
                  },
                });
              }
            } else {
              setStartDate(dateString);
              setEndDate('');
              setMarkedDates({
                [dateString]: {
                  color: Colors.background,
                  selected: true,
                  textColor: Colors.white,
                },
              });
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    backgroundColor: Colors.background,
  },
  previousSearchContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  previousSearchTitle: {
    fontSize: 16,
    marginTop: 15,
  },
  previousSearchList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchButton: {
    backgroundColor: Colors.buttonBackground,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 25,
    margin: 15,
  },
  searchButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default BookTab;
