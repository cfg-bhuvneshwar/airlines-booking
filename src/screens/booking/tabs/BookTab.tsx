import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useCallback, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native';
import fromCities from '../../../data/fromCities.json';
import toCities from '../../../data/toCities.json';
import { CalendarList } from 'react-native-calendars';
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks';
import {
  saveCurrentBookingData,
  saveRecentSearch,
  selectRecentSearchData,
} from '../../../state/flightSlice';
import { commonStyles } from '../../../common/constants/commonStyles';
import FromCityToCity from '../components/FromCityToCity';
import PassengerCabinSelection from '../components/PassengerCabinSelection';
import DateSelection from '../components/DateSelection';
import { Colors } from '../../../common/constants/Colors';
import Header from '../../../common/components/Header';
import GuestsSelection from '../components/GuestsSelection';
import CabinSelection from '../components/CabinSelection';
import FromToBottomSheet from '../components/FromToBottomSheet';
import moment from 'moment';
import { formatDate, getDatesBetween } from '../../../utils/Utils';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  const searchFlights = ({
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
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={commonStyles.container}>
        <Header title="Book" />
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

        <View style={styles.previousSearchContainer}>
          <Text style={styles.previousSearchTitle}>PREVIOUSLY SEARCHED</Text>
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.previousSearchList}>
                {recentSearchData.map((item, index) => (
                  <TouchableWithoutFeedback
                    key={`${item.fromCity}${index}`}
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
                    }>
                    <View style={styles.previousSearchItem}>
                      <Text
                        style={
                          styles.previousSearchItemTitle
                        }>{`${item.fromCity} - ${item.toCity}`}</Text>
                      <Text>{`${
                        item.endDate !== ''
                          ? `${formatDate(item.startDate)} - ${formatDate(
                              item.endDate,
                            )}`
                          : `${formatDate(item.startDate)}`
                      } • ${
                        item.adults +
                        item.children +
                        item.infants +
                        item.infantsWithSeats
                      } guest`}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        <TouchableWithoutFeedback
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
          }}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search Flights</Text>
          </View>
        </TouchableWithoutFeedback>

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
        <BottomSheetModal
          ref={bottomSheetGuestRef}
          snapPoints={['95%']}
          enableDynamicSizing={false}
          enableDismissOnClose
          enablePanDownToClose={false}
          style={styles.bottomSheetModal}>
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.bottomSheetHeaderTitle}>Guest and Cabin</Text>
            <Text
              style={styles.bottomSheetHeaderClose}
              onPress={() => bottomSheetGuestRef.current?.close()}>
              Close
            </Text>
          </View>
          <BottomSheetScrollView
            style={styles.bottomSheetScrollView}
            showsVerticalScrollIndicator={false}>
            <View style={styles.bottomSheetContent}>
              <View style={styles.guestSection}>
                <Text style={styles.guestSectionTitle}>GUESTS</Text>
                <View style={styles.guestSectionContent}>
                  {/* Adults */}
                  <GuestsSelection
                    title="Adults"
                    subTitle={'Age 12+'}
                    onPressMinus={(value: number) => setAdults(value)}
                    onPressPlus={(value: number) => setAdults(value)}
                    value={adults}
                    styles={{}}
                  />
                  {/* Children */}
                  <GuestsSelection
                    title="Children"
                    subTitle="Age 2-11 years"
                    onPressMinus={(value: number) => setChildren(value)}
                    onPressPlus={(value: number) => setChildren(value)}
                    value={children}
                    styles={styles.guestSelectionSpacing}
                  />
                  {/* Infants */}
                  <GuestsSelection
                    title="Infants"
                    subTitle="Under 2 years"
                    onPressMinus={(value: number) => setInfants(value)}
                    onPressPlus={(value: number) => setInfants(value)}
                    value={infants}
                    styles={styles.guestSelectionSpacing}
                  />
                  {/* Infants with seats */}
                  <GuestsSelection
                    title="Infants with seats"
                    subTitle="Under 2 years"
                    onPressMinus={(value: number) => setInfantsWithSeats(value)}
                    onPressPlus={(value: number) => setInfantsWithSeats(value)}
                    value={infantsWithSeats}
                    styles={{}}
                  />
                </View>
                <Text style={styles.cabinSectionTitle}>CABIN</Text>
                <View style={styles.cabinSectionContent}>
                  <CabinSelection
                    cabin="Economy"
                    onPress={(value: string) => setSelectedCabin(value)}
                    styles={{}}
                    selectedCabin={selectedCabin}
                  />
                  <CabinSelection
                    cabin="Business"
                    onPress={(value: string) => setSelectedCabin(value)}
                    styles={styles.cabinSelectionSpacing}
                    selectedCabin={selectedCabin}
                  />
                  <CabinSelection
                    cabin="First"
                    onPress={(value: string) => setSelectedCabin(value)}
                    styles={{}}
                    selectedCabin={selectedCabin}
                  />
                </View>
              </View>
            </View>
          </BottomSheetScrollView>
          <View>
            <View style={styles.divider} />
            <View style={styles.bottomSheetFooter}>
              <Text style={styles.bottomSheetFooterText}>{`${
                adults + children + infants + infantsWithSeats
              } ${
                adults + children + infants + infantsWithSeats > 1
                  ? 'guests'
                  : 'guest'
              } in ${selectedCabin}`}</Text>
              <TouchableWithoutFeedback
                onPress={() => {
                  bottomSheetGuestRef.current?.close();
                }}>
                <View style={styles.continueButton}>
                  <Text style={styles.continueButtonText}>Continue</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </BottomSheetModal>

        {/* Date Selection */}
        <BottomSheetModal
          ref={bottomSheetDateRef}
          snapPoints={['95%']}
          enableDynamicSizing={false}
          enableDismissOnClose
          enablePanDownToClose={false}
          stackBehavior="replace"
          style={styles.bottomSheetModal}>
          <View style={styles.dateModalHeader}>
            <Text style={styles.dateModalHeaderTitle}>Dates</Text>
            <Text
              style={styles.dateModalHeaderClose}
              onPress={() => {
                bottomSheetDateRef.current?.dismiss();
                setStartDate('');
                setEndDate('');
                setMarkedDates({});
              }}>
              Close
            </Text>
          </View>
          <BottomSheetFlatList
            data={[0]}
            renderItem={() => (
              <View>
                <CalendarList
                  pastScrollRange={0}
                  futureScrollRange={50}
                  scrollEnabled={true}
                  showScrollIndicator={false}
                  markingType={'period'}
                  markedDates={markedDates}
                  firstDay={1}
                  calendarStyle={styles.calendar}
                  minDate={
                    new Date(new Date().setDate(new Date().getDate() + 1))
                      .toISOString()
                      .split('T')[0]
                  }
                  disableAllTouchEventsForDisabledDays={true}
                  hideDayNames={false}
                  onDayPress={({ dateString }) => {
                    if (!startDate) {
                      setStartDate(dateString);
                      setMarkedDates({
                        [dateString]: {
                          color: Colors.background,
                          selected: true,
                          textColor: '#FFFFFF',
                          startingDay: true,
                        },
                      });
                    } else if (!endDate) {
                      if (moment(dateString).isAfter(startDate)) {
                        const datesBetween = getDatesBetween(
                          startDate,
                          dateString,
                        );

                        let markedDatesObject = { ...markedDates };
                        datesBetween.forEach(date => {
                          markedDatesObject[date] = {
                            selected: false,
                            color: 'gray',
                            textColor: 'white',
                          };
                        });
                        markedDatesObject = {
                          ...markedDatesObject,
                          ...{
                            [dateString]: {
                              selected: true,
                              endingDay: true,
                              color: Colors.background,
                              textColor: '#FFFFFF',
                            },
                          },
                        };
                        setEndDate(dateString);
                        setMarkedDates(markedDatesObject);
                      } else {
                        setStartDate(dateString);
                        setEndDate('');
                        setMarkedDates({
                          [dateString]: {
                            color: Colors.background,
                            selected: true,
                            textColor: '#FFFFFF',
                            startingDay: true,
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
                          textColor: '#FFFFFF',
                          startingDay: true,
                        },
                      });
                    }
                  }}
                />
              </View>
            )}
          />
          <TouchableWithoutFeedback
            onPress={() => {
              startDate !== '' && bottomSheetDateRef.current?.dismiss();
            }}>
            <View style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>
                {endDate === '' ? 'Confirm one-way' : 'Confirm round trip'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </BottomSheetModal>
      </View>
    </SafeAreaView>
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
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
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
  previousSearchItem: {
    backgroundColor: '#e1e1e1',
    marginTop: 15,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  previousSearchItemTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  searchButton: {
    backgroundColor: Colors.buttonBackground,
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    borderRadius: 25,
    margin: 15,
  },
  searchButtonText: {
    color: 'white',
  },
  bottomSheetModal: {
    marginHorizontal: 8,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    marginHorizontal: 20,
    height: 40,
    alignItems: 'center',
  },
  bottomSheetHeaderTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSheetHeaderClose: {
    fontSize: 14,
  },
  bottomSheetScrollView: {
    flex: 1,
  },
  bottomSheetContent: {
    flex: 1,
  },
  guestSection: {
    flex: 1,
  },
  guestSectionTitle: {
    marginHorizontal: 15,
    marginTop: 15,
  },
  guestSectionContent: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: '#f7f7f7',
  },
  guestSelectionSpacing: {
    marginVertical: 15,
  },
  cabinSectionTitle: {
    marginHorizontal: 15,
  },
  cabinSectionContent: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: '#f7f7f7',
  },
  cabinSelectionSpacing: {
    marginVertical: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#eaeaea',
  },
  bottomSheetFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  bottomSheetFooterText: {
    flex: 1,
  },
  continueButton: {
    backgroundColor: '#cac029',
    paddingHorizontal: 25,
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    borderRadius: 25,
  },
  continueButtonText: {
    color: 'white',
  },
  dateModalHeader: {
    flexDirection: 'row',
    marginHorizontal: 20,
    height: 40,
    alignItems: 'center',
  },
  dateModalHeaderTitle: {
    flex: 1,
    fontSize: 16,
  },
  dateModalHeaderClose: {
    fontSize: 14,
  },
  calendar: {
    flex: 1,
  },
  confirmButton: {
    backgroundColor: '#cac029',
    paddingHorizontal: 20,
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    borderRadius: 25,
    marginHorizontal: 25,
    marginVertical: 10,
  },
  confirmButtonText: {
    color: 'white',
  },
});

export default BookTab;
