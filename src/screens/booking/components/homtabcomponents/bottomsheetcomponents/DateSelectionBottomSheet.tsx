import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { StyleSheet, Text, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import ActionButton from '../../../../../common/components/ActionButton';
import { RefObject } from 'react';
import { Colors } from '../../../../../common/constants/Colors';

type DateSelectionBottomSheetProps = {
  ref: RefObject<BottomSheetModal | null>;
  startDate: string;
  endDate: string;
  onClosePress: () => void;
  onDayPress: (dateString: string) => void;
  markedDates: { [date: string]: any };
};

const DateSelectionBottomSheet = ({
  ref,
  endDate,
  startDate,
  onClosePress,
  markedDates,
  onDayPress,
}: DateSelectionBottomSheetProps) => {
  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={['95%']}
      enableDynamicSizing={false}
      enableDismissOnClose
      enablePanDownToClose={false}
      stackBehavior="replace"
      style={styles.bottomSheetModal}>
      <View style={styles.dateModalHeader}>
        <Text style={styles.dateModalHeaderTitle}>Dates</Text>
        <Text
          style={styles.dateModalHeaderClose}
          onPress={() => {
            ref.current?.dismiss();
            onClosePress();
            // setStartDate('');
            //     setEndDate('');
            //     setMarkedDates({});
          }}>
          Close
        </Text>
      </View>
      <BottomSheetFlatList
        data={[0]}
        renderItem={() => (
          <View>
            <CalendarList
              pastScrollRange={0}
              futureScrollRange={50}
              scrollEnabled={true}
              showScrollIndicator={false}
              markingType={'period'}
              markedDates={markedDates}
              firstDay={1}
              calendarStyle={styles.calendar}
              minDate={
                new Date(new Date().setDate(new Date().getDate() + 1))
                  .toISOString()
                  .split('T')[0]
              }
              disableAllTouchEventsForDisabledDays={true}
              hideDayNames={false}
              onDayPress={({ dateString }) => onDayPress(dateString)}
            />
          </View>
        )}
      />
      <ActionButton
        label={endDate === '' ? 'Confirm one-way' : 'Confirm round trip'}
        buttonViewStyles={styles.confirmButton}
        buttonTextStyles={styles.confirmButtonText}
        onPress={() => {
          startDate !== '' && ref.current?.dismiss();
        }}
      />
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  bottomSheetModal: {
    marginHorizontal: 8,
  },
  dateModalHeader: {
    flexDirection: 'row',
    marginHorizontal: 20,
    height: 40,
    alignItems: 'center',
  },
  dateModalHeaderTitle: {
    flex: 1,
    fontSize: 16,
  },
  dateModalHeaderClose: {
    fontSize: 14,
  },
  calendar: {
    flex: 1,
  },
  confirmButton: {
    backgroundColor: Colors.buttonBackground,
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    borderRadius: 25,
    marginHorizontal: 25,
    marginVertical: 10,
  },
  confirmButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default DateSelectionBottomSheet;
