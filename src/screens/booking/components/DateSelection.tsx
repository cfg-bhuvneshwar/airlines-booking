import { memo } from 'react';
import { Text, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';

interface DateSelectionProps {
  onHandleDateModalPress: () => void;
  date: string | null;
}

const DateSelection = ({
  onHandleDateModalPress,
  date,
}: DateSelectionProps) => {
  return (
    <TouchableWithoutFeedback onPress={onHandleDateModalPress}>
      <View style={styles.container}>
        <Text style={styles.dateText}>{date ? date : 'Dates'}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    height: 50,
  },
  dateText: {
    fontSize: 15,
  },
});

export default memo(DateSelection);
