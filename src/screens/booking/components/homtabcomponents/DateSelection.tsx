import { memo } from 'react';
import { StyleSheet } from 'react-native';
import ActionButton from '../../../../common/components/ActionButton';
import { Colors } from '../../../../common/constants/Colors';
import Icon from '../../../../common/components/Icon';
import { IconsTypes } from '../../../../common/constants/Icons';

interface DateSelectionProps {
  onHandleDateModalPress: () => void;
  date: string | null;
}

const DateSelection = ({
  onHandleDateModalPress,
  date,
}: DateSelectionProps) => {
  return (
    <ActionButton
      label={date ? date : 'Dates'}
      buttonViewStyles={styles.dateView}
      buttonTextStyles={styles.dateText}
      onPress={onHandleDateModalPress}
      icon={
        <Icon
          type={IconsTypes.MATERIAL_ICON}
          name="calendar-month"
          size={20}
          color={Colors.black}
          style={{ marginRight: 10 }}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  dateView: {
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  dateText: {
    color: Colors.black,
    fontSize: 16,
  },
});

export default memo(DateSelection);
