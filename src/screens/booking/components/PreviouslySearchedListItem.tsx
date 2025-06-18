import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { formatDate } from '../../../utils/Utils';
import { RecentSearchData } from '../../../utils/types';
import { Colors } from '../../../common/constants/Colors';
import Icon from '../../../common/components/Icon';
import { IconsTypes } from '../../../common/constants/Icons';

type PreviouslySearchedListItemProps = {
  item: RecentSearchData;
  onPress: () => void;
};

const PreviouslySearchedListItem = ({
  item,
  onPress,
}: PreviouslySearchedListItemProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.previousSearchItem}>
        <Icon
          type={IconsTypes.FEATHER_ICON}
          name="clock"
          size={25}
          color={Colors.black}
          style={{ marginRight: 10 }}
        />
        <View>
          <Text
            style={
              styles.previousSearchItemTitle
            }>{`${item.fromCity} - ${item.toCity}`}</Text>
          <Text>{`${
            item.endDate !== ''
              ? `${formatDate(item.startDate)} - ${formatDate(item.endDate)}`
              : `${formatDate(item.startDate)}`
          } • ${
            item.adults + item.children + item.infants + item.infantsWithSeats
          } guest`}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  previousSearchContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  previousSearchTitle: {
    fontSize: 16,
    marginTop: 15,
  },
  previousSearchList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previousSearchItem: {
    backgroundColor: '#e1e1e1',
    flexDirection: 'row',
    marginTop: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  previousSearchItemTitle: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: 'bold',
  },
});

export default PreviouslySearchedListItem;
