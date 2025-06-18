import { memo } from 'react';
import { Text, View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Colors } from '../../../common/constants/Colors';

type PaymentMethodSelectionProps = {
  paymentMethod: string; // The name of the payment method (e.g., "Credit/Debit", "UPI")
  onPress: (paymentMethod: string) => void; // Callback when a payment method is selected
  styles?: StyleProp<ViewStyle>; // Optional custom styles for the row
  selectedPaymentMethod: string; // The currently selected payment method
};

const PaymentMethodSelection = ({
  paymentMethod,
  onPress,
  styles: customStyles,
  selectedPaymentMethod,
}: PaymentMethodSelectionProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.row, customStyles]}>
        <Text style={styles.paymentMethodText}>{paymentMethod}</Text>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value={paymentMethod}
            status={
              paymentMethod === selectedPaymentMethod ? 'checked' : 'unchecked'
            }
            onPress={() => onPress(paymentMethod)}
            color={Colors.black}
          />
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  paymentMethodText: {
    flex: 1,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: '#c7c5c5',
    height: 1,
  },
});

export default memo(PaymentMethodSelection);
