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
  StatusBar,
} from 'react-native';
import fromCities from '../../../data/fromCities.json';
import toCities from '../../../data/toCities.json';
import { CalendarList } from 'react-native-calendars';
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks';
import {
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
  const [selectedDate, setSelectedDate] = useState('');
  const [markedDates, setMarkedDates] = useState({});
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

  return (
    <View style={commonStyles.container}>
      {/* <GestureHandlerRootView style={styles.container}>
        <BottomSheetModalProvider> */}
      <View
        style={[
          { backgroundColor: Colors.background },
          commonStyles.paddingHorizontalLarge,
        ]}>
        <Header statusBarHeight={StatusBar.currentHeight} />
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
          date={selectedDate}
          onHandleDateModalPress={handleDateModalPress}
        />
      </View>

      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <Text style={{ fontSize: 16, marginTop: 15 }}>PREVIOUSLY SEARCHED</Text>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {recentSearchData.map((item, index) => (
                <View
                  key={`${item.fromCity}${index}`}
                  style={{
                    backgroundColor: '#e1e1e1',
                    marginTop: 15,
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    marginHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#000',
                      fontWeight: 'bold',
                    }}>{`${item.fromCity} - ${item.toCity}`}</Text>
                  <Text>{`${item.date} • ${
                    item.adults +
                    item.children +
                    item.infants +
                    item.infantsWithSeats
                  } guest`}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      <TouchableWithoutFeedback
        onPress={() => {
          dispatch(
            saveRecentSearch({
              fromCity: from.city,
              toCity: to.city,
              fromAirportCode: from.airportCode,
              toAirportCode: to.airportCode,
              cabin: selectedCabin,
              date: selectedDate,
              adults,
              children,
              infants,
              infantsWithSeats,
            }),
          );
          navigation.navigate('FlightListScreen', {
            fromCity: from.city,
            fromAirportCode: from.airportCode,
            toCity: to.city,
            toAirportCode: to.airportCode,
            date: selectedDate,
            adults,
            children,
            infants,
            infantsWithSeats,
            cabin: selectedCabin,
          });
          // navigation.navigate('SeatSelectionScreen');
        }}>
        <View
          style={{
            backgroundColor: Colors.buttonBackground,
            alignItems: 'center',
            height: 45,
            justifyContent: 'center',
            borderRadius: 25,
            margin: 15,
          }}>
          <Text style={{ color: 'white' }}>Search Flights</Text>
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
        style={{
          marginHorizontal: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            height: 40,
            alignItems: 'center',
          }}>
          <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold' }}>
            Guest and Cabin
          </Text>
          <Text
            style={{ fontSize: 14 }}
            onPress={() => bottomSheetGuestRef.current?.close()}>
            Close
          </Text>
        </View>
        <BottomSheetScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ marginHorizontal: 15, marginTop: 15 }}>
                GUESTS
              </Text>

              <View
                style={{
                  marginVertical: 15,
                  padding: 15,
                  backgroundColor: '#f7f7f7',
                }}>
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
                  styles={{ marginVertical: 15 }}
                />
                {/* Infants */}
                <GuestsSelection
                  title="Infants"
                  subTitle="Under 2 years"
                  onPressMinus={(value: number) => setInfants(value)}
                  onPressPlus={(value: number) => setInfants(value)}
                  value={infants}
                  styles={{ marginBottom: 15 }}
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
              <Text style={{ marginHorizontal: 15 }}>CABIN</Text>
              <View
                style={{
                  marginVertical: 15,
                  padding: 15,
                  backgroundColor: '#f7f7f7',
                }}>
                <CabinSelection
                  cabin="Economy"
                  onPress={(value: string) => setSelectedCabin(value)}
                  styles={{}}
                  selectedCabin={selectedCabin}
                />
                <CabinSelection
                  cabin="Business"
                  onPress={(value: string) => setSelectedCabin(value)}
                  styles={{ marginVertical: 15 }}
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
          <View style={{ height: 1, backgroundColor: '#eaeaea' }} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 15,
              marginVertical: 15,
            }}>
            <Text style={{ flex: 1 }}>{`${
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
              <View
                style={{
                  backgroundColor: '#cac029',
                  paddingHorizontal: 25,
                  alignItems: 'center',
                  height: 45,
                  justifyContent: 'center',
                  borderRadius: 25,
                }}>
                <Text style={{ color: 'white' }}>Continue</Text>
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
        style={{
          marginHorizontal: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            height: 40,
            alignItems: 'center',
          }}>
          <Text style={{ flex: 1, fontSize: 16 }}>Dates</Text>
          <Text
            style={{ fontSize: 14 }}
            onPress={() => bottomSheetDateRef.current?.close()}>
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
                markingType={'custom'}
                markedDates={markedDates}
                firstDay={1}
                calendarStyle={styles.container}
                minDate={
                  new Date(new Date().setDate(new Date().getDate() + 1))
                    .toISOString()
                    .split('T')[0]
                }
                disableAllTouchEventsForDisabledDays={true}
                hideDayNames={false}
                onDayPress={({ dateString, timestamp }) => {
                  const date = new Date(timestamp);
                  const month = date.toLocaleString('default', {
                    month: 'short',
                  });

                  const weekday = [
                    'Sun',
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat',
                  ];
                  let dayOfWeek = weekday[date.getDay()];
                  const day = date.getDate();
                  setSelectedDate(`${day} ${month}, ${dayOfWeek}`);
                  setMarkedDates({
                    [dateString]: {
                      selected: true,
                      color: '#00B0BF',
                      textColor: '#FFFFFF',
                    },
                  });
                  bottomSheetDateRef.current?.dismiss();
                }}
              />
            </View>
          )}
        />
      </BottomSheetModal>
      {/* </BottomSheetModalProvider>
      </GestureHandlerRootView> */}
    </View>
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

export default BookTab;
