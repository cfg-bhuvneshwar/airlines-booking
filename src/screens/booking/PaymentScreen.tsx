import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PaymentMethodSelection from './components/PaymentMethodSelection';
import { useCallback, useState } from 'react';
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

const PaymentScreen = ({ navigation }: PaymentScreenProps) => {
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const currentBooking = useAppSelector(selectCurrentBooking);
  const userData = useAppSelector(selectUserData);

  console.log('currentBooking : ', currentBooking);

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState('Credit/Debit');

  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');

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
      let memberType = userData.memberType;
      if (userData.miles + (currentBooking.oneway?.miles ?? 0) >= 40000) {
        memberType = 'Platinum';
      } else if (userData.miles + (currentBooking.oneway?.miles ?? 0) >= 5000) {
        memberType = 'Gold';
      }
      dispatch(
        saveUserData({
          ...userData,
          miles: totalMiles,
          bookings: userData.bookings + 1,
          points: userData.points + currentBookingPoints,
          memberType,
        }),
      );
      dispatch(
        updateRegisterData({
          ...userData,
          miles: totalMiles,
          bookings: userData.bookings + 1,
          points: userData.points + currentBookingPoints,
          memberType,
        }),
      );
    }
    dispatch(saveCurrentBookingData({}));
    dispatch(
      saveBookingData({
        userId: userData.uid !== '' ? userData.uid : '',
        bookingId: generate16DigitId(),
        oneway: currentBooking.oneway,
        roundTrip: currentBooking.roundTrip,
        paymentMethod: selectedPaymentMethod,
        cardDetails:
          selectedPaymentMethod === 'Credit/Debit'
            ? {
                cardNumber,
                name,
                expiryMonth,
                expiryYear,
                cvv,
              }
            : {},
        totalFare: calculateTotalFare({
          oneway: currentBooking.oneway,
          roundTrip: currentBooking.roundTrip || 0,
        }),
        email: currentBooking.email as string,
        contactNumber: currentBooking.contactNumber as string,
        bookingDate: Date.now(),
        guestsInformation: currentBooking.guestInformation as [],
      }),
    );

    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  }, [
    cardNumber,
    currentBooking.contactNumber,
    currentBooking.email,
    currentBooking.guestInformation,
    currentBooking.oneway,
    currentBooking.roundTrip,
    cvv,
    dispatch,
    expiryMonth,
    expiryYear,
    name,
    navigation,
    selectedPaymentMethod,
    userData,
  ]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Header title="Payment" />
      <View style={styles.container}>
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
                  placeholder="Card number"
                  onChangeText={value => setCardNumber(value)}
                  value={cardNumber}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Name"
                  onChangeText={value => setName(value)}
                  value={name}
                  style={styles.input}
                />
                <View style={styles.row}>
                  <TextInput
                    placeholder="Expiry month"
                    onChangeText={value => setExpiryMonth(value)}
                    value={expiryMonth}
                    style={[styles.input, styles.halfInput, styles.marginRight]}
                  />
                  <TextInput
                    placeholder="Expiry year"
                    onChangeText={value => setExpiryYear(value)}
                    value={expiryYear}
                    style={[styles.input, styles.halfInput, styles.marginLeft]}
                  />
                </View>
                <View style={styles.row}>
                  <TextInput
                    placeholder="CVV/CVC"
                    onChangeText={value => setCvv(value)}
                    value={cvv}
                    style={[styles.input, styles.halfInput, styles.marginRight]}
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
                  You'll be securely redirected to Net Banking to complete your
                  payment. Please do not refresh the page or click back while
                  your payment is being processed.
                </Text>
              </View>
            )}

            {selectedPaymentMethod === 'UPI' && (
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                  You'll be securely redirected to UPI to complete your payment.
                  Please do not refresh the page or click back while your
                  payment is being processed.
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
            {`Total : INR ${calculateTotalFare({
              oneway: currentBooking.oneway,
              roundTrip: currentBooking.roundTrip || 0,
            })}`}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              if (selectedPaymentMethod === 'Credit/Debit') {
                if (cardNumber && name && expiryMonth && expiryYear && cvv) {
                  submitBooking();
                } else {
                  showToastOrAlert('Enter details');
                }
              } else {
                submitBooking();
              }
            }}>
            <View style={styles.payNowButton}>
              <Text style={styles.payNowText}>Pay now</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
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
    backgroundColor: '#fff',
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
    borderColor: '#000',
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
  },
  halfInput: {
    flex: 1,
  },
  marginRight: {
    marginRight: 10,
  },
  marginLeft: {
    marginLeft: 10,
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
    borderColor: 'white',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  checkMark: {
    color: 'white',
    fontSize: 16,
  },
  footerText: {
    color: '#fff',
  },
  totalText: {
    color: '#fff',
    marginTop: 10,
  },
  payNowButton: {
    backgroundColor: Colors.light,
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 20,
  },
  payNowText: {
    color: Colors.dark,
  },
});

export default PaymentScreen;
