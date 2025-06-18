import { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import ActionButton from '../../../../common/components/ActionButton';
import { Colors } from '../../../../common/constants/Colors';
import Icon from '../../../../common/components/Icon';
import { IconsTypes } from '../../../../common/constants/Icons';

type City = {
  city: string;
  airportCode: string;
};

type FromCityToCityProps = {
  from: City;
  to: City;
  onHandleFromModalPress: () => void;
  onHandleToModalPress: () => void;
};

const FromCityToCity = ({
  from,
  to,
  onHandleFromModalPress,
  onHandleToModalPress,
}: FromCityToCityProps) => {
  return (
    <View style={styles.container}>
      <ActionButton
        label={from.city !== '' ? `${from.city} ${from.airportCode}` : 'From'}
        buttonViewStyles={styles.cityContainer}
        buttonTextStyles={styles.cityText}
        onPress={onHandleFromModalPress}
        icon={
          <Icon
            type={IconsTypes.MATERIAL_ICON}
            name="flight-takeoff"
            size={20}
            color={Colors.black}
            style={{ marginRight: 10 }}
          />
        }
      />

      <View style={styles.divider} />

      <ActionButton
        label={to.city !== '' ? `${to.city} ${to.airportCode}` : 'To'}
        buttonViewStyles={styles.cityContainer}
        buttonTextStyles={styles.cityText}
        onPress={onHandleToModalPress}
        icon={
          <Icon
            type={IconsTypes.MATERIAL_ICON}
            name="flight-land"
            size={20}
            color={Colors.black}
            style={{ marginRight: 10 }}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginTop: 30,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  cityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  cityText: {
    color: Colors.black,
    fontSize: 16,
  },
  divider: {
    height: 0.5,
    backgroundColor: 'grey',
  },
});

export default memo(FromCityToCity);
