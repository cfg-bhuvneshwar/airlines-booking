import { memo } from 'react';
import { Text, View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

type GuestsSelectionProps = {
  title: string;
  subTitle?: string;
  onPressMinus: (value: number) => void;
  onPressPlus: (value: number) => void;
  value: number;
  styles?: StyleProp<ViewStyle>;
};

const GuestsSelection = ({
  title,
  subTitle,
  onPressMinus,
  onPressPlus,
  value,
  styles: customStyles,
}: GuestsSelectionProps) => {
  return (
    <View style={[styles.container, customStyles]}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      <View style={styles.counterContainer}>
        <Text
          style={styles.counterButton}
          onPress={() => {
            if (
              (title === 'Adults' && value > 1) ||
              (title !== 'Adults' && value > 0)
            ) {
              onPressMinus(value - 1);
            }
          }}>
          -
        </Text>
        <Text style={styles.counterValue}>{value}</Text>
        <Text
          style={styles.counterButton}
          onPress={() => {
            onPressPlus(value + 1);
          }}>
          +
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    color: 'grey',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    height: 30,
    width: 30,
    fontSize: 20,
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 5,
  },
  counterValue: {
    height: 30,
    width: 30,
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 10,
  },
});

export default memo(GuestsSelection);
