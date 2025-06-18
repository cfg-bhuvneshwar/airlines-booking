import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PaymentMethodSelection from './components/PaymentMethodSelection';
import { useCallback, useEffect, useState } from 'react';
import { Colors } from '../../common/constants/Colors';
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { saveBookingData } from '../../state/bookingSlice';
import {
  calculateTotalFare,
  generate16DigitId,
  showToastOrAlert,
} from '../../utils/Utils';
import {
  saveCurrentBookingData,
  selectCurrentBooking,
} from '../../state/flightSlice';
import {
  saveUserData,
  selectUserData,
  updateRegisterData,
} from '../../state/userSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../common/components/Header';
import { PaymentScreenProps } from '../../navigation/types';
import {
  pushClickEvent,
  pushPageloadEvent,
  userInfoForAEP,
} from '../../utils/AepUtils';
import ActionButton from '../../common/components/ActionButton';
import { AepPageName } from '../../common/constants/AepConstants';
import CustomKeyboardAvoidingView from '../../common/components/CustomKeyboardAvoidingView';

const PaymentScreen = ({ navigation }: PaymentScreenProps) => {
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const currentBooking = useAppSelector(selectCurrentBooking);
  const userData = useAppSelector(selectUserData);

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState('Credit/Debit');

  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => {
    pushPageloadEvent(AepPageName.PAYMENT);
  }, []);

  const submitBooking = useCallback(() => {
    if (userData.uid !== '') {
      // calculate points
      let currentBookingPoints = 0;
      if (currentBooking.oneway && currentBooking.roundTrip) {
        currentBookingPoints =
          ((currentBooking.oneway?.miles as number) * 10) / 100 +
          ((currentBooking.roundTrip?.miles as number) * 10) / 100;
      } else {
        currentBookingPoints =
          ((currentBooking.oneway?.miles as number) * 10) / 100;
      }

      // calculate miles
      let totalMiles = 0;
      if (currentBooking.oneway && currentBooking.roundTrip) {
        totalMiles =
          (currentBooking.oneway?.miles as number) +
          (currentBooking.roundTrip?.miles as number);
      } else {
        totalMiles = currentBooking.oneway?.miles as number;
      }

      // identify member type
      let loyaltyTier = userData.loyaltyTier;
      if (userData.miles + (currentBooking.oneway?.miles ?? 0) >= 40000) {
        loyaltyTier = 'Platinum';
      } else if (userData.miles + (currentBooking.oneway?.miles ?? 0) >= 5000) {
        loyaltyTier = 'Gold';
      }
      dispatch(
        saveUserData({
          ...userData,
          miles: totalMiles,
          bookings: userData.bookings + 1,
          points: userData.points + currentBookingPoints,
          loyaltyTier,
        }),
      );
      dispatch(
        updateRegisterData({
          ...userData,
          miles: totalMiles,
          bookings: userData.bookings + 1,
          points: userData.points + currentBookingPoints,
          loyaltyTier,
        }),
      );
    }
    dispatch(saveCurrentBookingData({}));
    const bookingId = generate16DigitId();
    dispatch(
      saveBookingData({
        userId: userData.uid !== '' ? userData.uid : '',
        bookingId,
        oneway: currentBooking.oneway,
        roundTrip: currentBooking.roundTrip,
        paymentMethod: selectedPaymentMethod,
        cardDetails:
          selectedPaymentMethod === 'Credit/Debit'
            ? {
                cardNumber,
                name,
                expiry,
                cvv,
              }
            : {},
        totalFare: calculateTotalFare(currentBooking),
        email: currentBooking.email as string,
        contactNumber: currentBooking.contactNumber as string,
        bookingDate: new Date().toISOString(),
        guestsInformation: currentBooking.guestInformation as [],
      }),
    );
    pushClickEvent({
      eventName: 'bookingConfirmed',
      event: {
        user: userInfoForAEP(),
        flightContext: {
          tripType: 'roundTrip' in currentBooking ? 'roundTrip' : 'oneway',
          oneway: {
            flightId: currentBooking.oneway?.flightId,
            flightNumber: currentBooking.oneway?.flightNumber,
            departureTime: currentBooking.oneway?.departureTime,
            arrivalTime: currentBooking.oneway?.arrivalTime,
            numberOfStops: currentBooking.oneway?.numberOfStops,
            timeDuration: currentBooking.oneway?.timeDuration,
            fromAirportCode: currentBooking.oneway?.fromAirportCode,
            toAirportCode: currentBooking.oneway?.toAirportCode,
            economyFare: currentBooking.oneway?.economyFare,
            businessFare: currentBooking.oneway?.businessFare,
            cabinClass: currentBooking.oneway?.cabin,
            date: currentBooking.oneway?.date,
            totalFare: currentBooking.oneway?.totalFare,
            miles: currentBooking.oneway?.miles,
            passengerCount: {
              adults: currentBooking.oneway?.adults,
              children: currentBooking.oneway?.children,
              infants:
                (currentBooking.oneway?.infants as number) +
                (currentBooking.oneway?.infantsWithSeats as number),
            },
            seatSelection: {
              seatNumber: currentBooking.oneway?.seats,
              seatType: 'Aisle',
              isPaidSeat: false,
              seatPrice: 0,
              currency: 'USD',
            },
          },
          roundTrip:
            'roundTrip' in currentBooking
              ? {
                  flightId: currentBooking.roundTrip?.flightId,
                  flightNumber: currentBooking.roundTrip?.flightNumber,
                  departureTime: currentBooking.roundTrip?.departureTime,
                  arrivalTime: currentBooking.roundTrip?.arrivalTime,
                  numberOfStops: currentBooking.roundTrip?.numberOfStops,
                  timeDuration: currentBooking.roundTrip?.timeDuration,
                  fromAirportCode: currentBooking.roundTrip?.fromAirportCode,
                  toAirportCode: currentBooking.roundTrip?.toAirportCode,
                  economyFare: currentBooking.roundTrip?.economyFare,
                  businessFare: currentBooking.roundTrip?.businessFare,
                  cabinClass: currentBooking.roundTrip?.cabin,
                  date: currentBooking.roundTrip?.date,
                  totalFare: currentBooking.roundTrip?.totalFare,
                  miles: currentBooking.roundTrip?.miles,
                  passengerCount: {
                    adults: currentBooking.roundTrip?.adults,
                    children: currentBooking.roundTrip?.children,
                    infants:
                      (currentBooking.roundTrip?.infants as number) +
                      (currentBooking.roundTrip?.infantsWithSeats as number),
                  },
                  seatSelection: {
                    seatNumber: currentBooking.roundTrip?.seats,
                    seatType: 'Aisle',
                    isPaidSeat: false,
                    seatPrice: 0,
                    currency: 'USD',
                  },
                }
              : {},
        },
        booking: {
          bookingReferenceNumber: bookingId,
          paymentMethod: selectedPaymentMethod,
          totalFare: calculateTotalFare(currentBooking),
          bookingDate: new Date().toISOString(),
          currency: 'USD',
        },
        email: currentBooking.email as string,
        contactNumber: currentBooking.contactNumber as string,
        guestsInformation: currentBooking.guestInformation as [],
      },
    });
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  }, [
    cardNumber,
    currentBooking,
    cvv,
    dispatch,
    expiry,
    name,
    navigation,
    selectedPaymentMethod,
    userData,
  ]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Header title="Payment" icon />
      <View style={styles.container}>
        <CustomKeyboardAvoidingView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.paymentContainer}>
              <Text style={styles.title}>Payment</Text>
              <Text style={styles.subtitle}>How would you like to pay?</Text>
              <View style={styles.paymentMethods}>
                <PaymentMethodSelection
                  paymentMethod="Credit/Debit"
                  onPress={(value: string) => setSelectedPaymentMethod(value)}
                  styles={{}}
                  selectedPaymentMethod={selectedPaymentMethod}
                />
                <PaymentMethodSelection
                  paymentMethod="Rupay"
                  onPress={(value: string) => setSelectedPaymentMethod(value)}
                  styles={{}}
                  selectedPaymentMethod={selectedPaymentMethod}
                />
                <PaymentMethodSelection
                  paymentMethod="Net Banking"
                  onPress={(value: string) => setSelectedPaymentMethod(value)}
                  styles={{}}
                  selectedPaymentMethod={selectedPaymentMethod}
                />
                <PaymentMethodSelection
                  paymentMethod="UPI"
                  onPress={(value: string) => setSelectedPaymentMethod(value)}
                  styles={{}}
                  selectedPaymentMethod={selectedPaymentMethod}
                />
              </View>

              {selectedPaymentMethod === 'Credit/Debit' && (
                <View style={styles.creditDebitContainer}>
                  <TextInput
                    placeholder="Card Number"
                    onChangeText={value => setCardNumber(value)}
                    value={cardNumber}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Name on card"
                    onChangeText={value => setName(value)}
                    value={name}
                    style={styles.input}
                  />
                  <View style={styles.row}>
                    <TextInput
                      placeholder="MM/YY"
                      onChangeText={value => setExpiry(value)}
                      value={expiry}
                      style={[styles.input, styles.marginRight]}
                    />
                    <TextInput
                      placeholder="CVV/CVC"
                      onChangeText={value => setCvv(value)}
                      value={cvv}
                      style={[styles.input, styles.marginLeft]}
                    />
                  </View>
                </View>
              )}

              {selectedPaymentMethod === 'Rupay' && (
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>
                    You'll be securely redirected to Rupay to complete your
                    payment. Please do not refresh the page or click back while
                    your payment is being processed.
                  </Text>
                </View>
              )}

              {selectedPaymentMethod === 'Net Banking' && (
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>
                    You'll be securely redirected to Net Banking to complete
                    your payment. Please do not refresh the page or click back
                    while your payment is being processed.
                  </Text>
                </View>
              )}

              {selectedPaymentMethod === 'UPI' && (
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>
                    You'll be securely redirected to UPI to complete your
                    payment. Please do not refresh the page or click back while
                    your payment is being processed.
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setIsChecked(!isChecked)}>
                <View style={styles.checkbox}>
                  {isChecked && <Text style={styles.checkMark}>✓</Text>}
                </View>
              </TouchableOpacity>
              <Text style={styles.footerText}>
                By clicking "Pay now", I agree to all terms and conditions
              </Text>
            </View>
            <Text style={styles.totalText}>
              {`Total : INR ${calculateTotalFare(currentBooking)}`}
            </Text>

            <ActionButton
              label="Pay now"
              buttonViewStyles={styles.payNowButton}
              buttonTextStyles={styles.payNowText}
              onPress={() => {
                if (selectedPaymentMethod === 'Credit/Debit') {
                  if (cardNumber && name && expiry && cvv) {
                    submitBooking();
                  } else {
                    showToastOrAlert('Enter details');
                  }
                } else {
                  submitBooking();
                }
              }}
            />
          </View>
        </CustomKeyboardAvoidingView>
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
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
  },
  paymentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 5,
    fontSize: 16,
  },
  paymentMethods: {
    alignItems: 'center',
    marginTop: 20,
  },
  creditDebitContainer: {
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderColor: '#c7c5c5',
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
  },
  marginRight: {
    marginRight: 10,
    flex: 1,
  },
  marginLeft: {
    marginLeft: 10,
    flex: 1,
  },
  infoContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  infoText: {
    fontSize: 14,
  },
  footer: {
    backgroundColor: Colors.background,
    padding: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  checkMark: {
    color: Colors.white,
    fontSize: 16,
  },
  footerText: {
    color: Colors.white,
  },
  totalText: {
    color: Colors.white,
    marginTop: 10,
  },
  payNowButton: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 25,
    marginTop: 20,
  },
  payNowText: {
    color: Colors.black,
    fontSize: 16,
  },
});

export default PaymentScreen;
