import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { RefObject } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GuestsSelection from './GuestsSelection';
import CabinSelection from './CabinSelection';
import ActionButton from '../../../../../common/components/ActionButton';
import { Colors } from '../../../../../common/constants/Colors';

type GuestCabinSelectionBottomSheetProps = {
  ref: RefObject<BottomSheetModal | null>;
  adults: number;
  children: number;
  infants: number;
  infantsWithSeats: number;
  selectedCabin: string;
  onSelectCabin: (cabin: string) => void;
  onPressPlus: (value: number, guestType: string) => void;
  onPressMinus: (value: number, guestType: string) => void;
};

const GuestCabinSelectionBottomSheet = ({
  ref,
  adults,
  children,
  infants,
  infantsWithSeats,
  selectedCabin,
  onSelectCabin,
  onPressMinus,
  onPressPlus,
}: GuestCabinSelectionBottomSheetProps) => {
  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={['95%']}
      enableDynamicSizing={false}
      enableDismissOnClose
      enablePanDownToClose={false}
      style={styles.bottomSheetModal}>
      <View style={styles.bottomSheetHeader}>
        <Text style={styles.bottomSheetHeaderTitle}>Guest and Cabin</Text>
        <Text
          style={styles.bottomSheetHeaderClose}
          onPress={() => ref.current?.close()}>
          Close
        </Text>
      </View>
      <BottomSheetScrollView
        style={styles.bottomSheetScrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.bottomSheetContent}>
          <View style={styles.guestSection}>
            <Text style={styles.guestSectionTitle}>GUESTS</Text>
            <View style={styles.guestSectionContent}>
              {/* Adults */}
              <GuestsSelection
                title="Adults"
                subTitle={'Age 12+'}
                onPressMinus={(value: number) => onPressMinus(value, 'adults')}
                onPressPlus={(value: number) => onPressPlus(value, 'adults')}
                value={adults}
                styles={{}}
              />
              {/* Children */}
              <GuestsSelection
                title="Children"
                subTitle="Age 2-11 years"
                onPressMinus={(value: number) =>
                  onPressMinus(value, 'children')
                }
                onPressPlus={(value: number) => onPressPlus(value, 'children')}
                value={children}
                styles={styles.guestSelectionSpacing}
              />
              {/* Infants */}
              <GuestsSelection
                title="Infants"
                subTitle="Under 2 years"
                onPressMinus={(value: number) => onPressMinus(value, 'infants')}
                onPressPlus={(value: number) => onPressPlus(value, 'infants')}
                value={infants}
                styles={styles.guestSelectionSpacing}
              />
              {/* Infants with seats */}
              <GuestsSelection
                title="Infants with seats"
                subTitle="Under 2 years"
                onPressMinus={(value: number) =>
                  onPressMinus(value, 'infantsWithSeats')
                }
                onPressPlus={(value: number) =>
                  onPressPlus(value, 'infantsWithSeats')
                }
                value={infantsWithSeats}
                styles={{}}
              />
            </View>
            <Text style={styles.cabinSectionTitle}>CABIN</Text>
            <View style={styles.cabinSectionContent}>
              <CabinSelection
                cabin="Economy"
                onPress={(value: string) => onSelectCabin(value)}
                styles={{}}
                selectedCabin={selectedCabin}
              />
              <CabinSelection
                cabin="Business"
                onPress={(value: string) => onSelectCabin(value)}
                styles={styles.cabinSelectionSpacing}
                selectedCabin={selectedCabin}
              />
              <CabinSelection
                cabin="First"
                onPress={(value: string) => onSelectCabin(value)}
                styles={{}}
                selectedCabin={selectedCabin}
              />
            </View>
          </View>
        </View>
      </BottomSheetScrollView>
      <View>
        <View style={styles.divider} />
        <View style={styles.bottomSheetFooter}>
          <Text style={styles.bottomSheetFooterText}>{`${
            adults + children + infants + infantsWithSeats
          } ${
            adults + children + infants + infantsWithSeats > 1
              ? 'guests'
              : 'guest'
          } in ${selectedCabin}`}</Text>
          <ActionButton
            label="Continue"
            buttonViewStyles={styles.continueButton}
            buttonTextStyles={styles.continueButtonText}
            onPress={() => {
              ref.current?.close();
            }}
          />
        </View>
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  bottomSheetModal: {
    marginHorizontal: 8,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    marginHorizontal: 20,
    height: 40,
    alignItems: 'center',
  },
  bottomSheetHeaderTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSheetHeaderClose: {
    fontSize: 14,
  },
  bottomSheetScrollView: {
    flex: 1,
  },
  bottomSheetContent: {
    flex: 1,
  },
  guestSection: {
    flex: 1,
  },
  guestSectionTitle: {
    marginHorizontal: 15,
    marginTop: 15,
  },
  guestSectionContent: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: '#f7f7f7',
  },
  guestSelectionSpacing: {
    marginVertical: 15,
  },
  cabinSectionTitle: {
    marginHorizontal: 15,
  },
  cabinSectionContent: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: '#f7f7f7',
  },
  cabinSelectionSpacing: {
    marginVertical: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#eaeaea',
  },
  bottomSheetFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  bottomSheetFooterText: {
    flex: 1,
  },
  continueButton: {
    backgroundColor: Colors.buttonBackground,
    paddingHorizontal: 25,
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    borderRadius: 25,
  },
  continueButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default GuestCabinSelectionBottomSheet;
