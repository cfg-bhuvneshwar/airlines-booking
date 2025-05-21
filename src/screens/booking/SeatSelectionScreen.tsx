import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SeatSelectionScreenProps } from '../../navigation/types';
import { useEffect, useState } from 'react';
import { Colors } from '../../common/constants/Colors';
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import {
  saveCurrentBookingData,
  selectCurrentBooking,
  selectRecentSearchData,
} from '../../state/flightSlice';
import SeatSelection from './components/SeatSelection';
import Header from '../../common/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookingData } from '../../utils/types';

const SeatSelectionScreen: React.FC<SeatSelectionScreenProps> = ({
  navigation,
}: SeatSelectionScreenProps) => {
  const dispatch = useAppDispatch();
  const recentSearchData = useAppSelector(selectRecentSearchData);
  const currentBooking = useAppSelector(selectCurrentBooking);

  const [selectedTab, setSelectedTab] = useState<'onward' | 'return'>('onward');
  const [onwardSelectedSeats, setOnwardSelectedSeats] = useState<number[]>([]);
  const [returnSelectedSeats, setReturnSelectedSeats] = useState<number[]>([]);
  const [seats, setSeats] = useState<{ seatNumber: number; status: string }[]>(
    [],
  );

  useEffect(() => {
    const seatArr = [];
    for (let seat = 0; seat < 120; seat++) {
      const status = Math.random() > 0.3 ? 'available' : 'unavailable';
      seatArr.push({ seatNumber: seat + 1, status });
    }
    setSeats(seatArr);
  }, []);

  const handleSeatSelect = (seatNumber: number) => {
    if (selectedTab === 'onward') {
      if (onwardSelectedSeats.includes(seatNumber)) {
        setOnwardSelectedSeats(
          onwardSelectedSeats.filter(value => value !== seatNumber),
        );
      } else {
        if (
          onwardSelectedSeats.length <
          recentSearchData[0].adults +
            recentSearchData[0].children +
            recentSearchData[0].infantsWithSeats
        ) {
          setOnwardSelectedSeats([...onwardSelectedSeats, seatNumber]);
        }
      }
    } else {
      if (returnSelectedSeats.includes(seatNumber)) {
        setReturnSelectedSeats(
          returnSelectedSeats.filter(value => value !== seatNumber),
        );
      } else {
        if (
          returnSelectedSeats.length <
          recentSearchData[0].adults +
            recentSearchData[0].children +
            recentSearchData[0].infantsWithSeats
        ) {
          setReturnSelectedSeats([...returnSelectedSeats, seatNumber]);
        }
      }
    }
  };

  const handleConfirm = () => {
    if (selectedTab === 'onward') {
      if ('roundTrip' in currentBooking) {
        setSelectedTab('return');
      } else {
        dispatch(
          saveCurrentBookingData({
            oneway: {
              ...currentBooking.oneway,
              ...{
                seats: onwardSelectedSeats,
              },
            } as BookingData,
            roundTrip: {
              ...currentBooking.roundTrip,
              ...{
                seats: returnSelectedSeats,
              },
            } as BookingData,
          }),
        );
        navigation.navigate('PaymentScreen');
      }
    } else {
      dispatch(
        saveCurrentBookingData({
          roundTrip: {
            ...currentBooking.roundTrip,
            ...{
              seats: returnSelectedSeats,
            },
          } as BookingData,
          oneway: {
            ...currentBooking.oneway,
            ...{
              seats: onwardSelectedSeats,
            },
          } as BookingData,
        }),
      );
      navigation.navigate('PaymentScreen');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Header title="Seat Selection" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>Window or aisle?</Text>
          <Text style={styles.subtitle}>Book your seat now</Text>

          {/* Conditionally render the tab view */}
          {currentBooking.roundTrip &&
            Object.keys(currentBooking.roundTrip).length > 0 && (
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    selectedTab === 'onward' && styles.activeTab,
                  ]}
                  onPress={() => setSelectedTab('onward')}>
                  <Text
                    style={[
                      styles.tabText,
                      selectedTab === 'onward' && styles.activeTabText,
                    ]}>
                    Onward Flight
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    selectedTab === 'return' && styles.activeTab,
                  ]}
                  onPress={() => setSelectedTab('return')}>
                  <Text
                    style={[
                      styles.tabText,
                      selectedTab === 'return' && styles.activeTabText,
                    ]}>
                    Return Flight
                  </Text>
                </TouchableOpacity>
              </View>
            )}

          <SeatSelection
            seats={seats}
            selectedSeats={
              selectedTab === 'onward'
                ? onwardSelectedSeats
                : returnSelectedSeats
            }
            onSelect={handleSeatSelect}
            totalPassengers={
              recentSearchData[0].adults +
              recentSearchData[0].children +
              recentSearchData[0].infantsWithSeats
            }
            onConfirm={handleConfirm}
            isConfirmDisabled={
              selectedTab === 'onward'
                ? onwardSelectedSeats.length <
                  recentSearchData[0].adults +
                    recentSearchData[0].children +
                    recentSearchData[0].infantsWithSeats
                : returnSelectedSeats.length <
                  recentSearchData[0].adults +
                    recentSearchData[0].children +
                    recentSearchData[0].infantsWithSeats
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default SeatSelectionScreen;
