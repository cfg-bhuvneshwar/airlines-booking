import { memo } from 'react';
import { StyleSheet } from 'react-native';
import ActionButton from '../../../../common/components/ActionButton';
import { Colors } from '../../../../common/constants/Colors';
import Icon from '../../../../common/components/Icon';
import { IconsTypes } from '../../../../common/constants/Icons';

type PassengerCabinSelectionProps = {
  adults: number;
  children: number;
  infants: number;
  infantsWithSeats: number;
  cabin: string;
  onHandleGuestModalPress: () => void;
};

const PassengerCabinSelection = ({
  adults,
  children,
  infants,
  infantsWithSeats,
  cabin,
  onHandleGuestModalPress,
}: PassengerCabinSelectionProps) => {
  return (
    <ActionButton
      label={`${adults + children + infants + infantsWithSeats} ${
        adults + children + infants + infantsWithSeats > 1 ? 'guests' : 'guest'
      } • ${cabin}`}
      buttonViewStyles={styles.container}
      buttonTextStyles={styles.text}
      onPress={onHandleGuestModalPress}
      icon={
        <Icon
          type={IconsTypes.MATERIAL_ICON}
          name="person"
          size={20}
          color={Colors.black}
          style={{ marginRight: 10 }}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
  },
  text: {
    color: Colors.black,
    fontSize: 16,
  },
});

export default memo(PassengerCabinSelection);
