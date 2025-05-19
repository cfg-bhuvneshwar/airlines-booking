import { Text, View, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

const PaymentMethodSelection = ({
  paymentMethod,
  onPress,
  styles: customStyles,
  selectedPaymentMethod,
}: any) => {
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
            color="#000"
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
    backgroundColor: '#000',
    height: 1,
  },
});

export default PaymentMethodSelection;
