import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Colors } from '../../../common/constants/Colors';
import { Text, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';

const FromToBottomSheet = ({ ref, list, onPress, type }: any) => {
  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={['95%']}
      enableDynamicSizing={false}
      enableDismissOnClose
      enablePanDownToClose={false}
      style={styles.modal}
      backgroundStyle={styles.modalBackground}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{type}</Text>
        <Text style={styles.closeButton} onPress={() => ref.current?.close()}>
          Close
        </Text>
      </View>
      <BottomSheetScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View>
          {list.map((item: any, index: number) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => onPress(list[index])}>
                <View style={styles.listItem}>
                  <View style={styles.listItemContent}>
                    <Text style={styles.cityText}>
                      {item.city}, {item.country}
                    </Text>
                    <Text style={styles.airportName} numberOfLines={1}>
                      {item.airportName}
                    </Text>
                  </View>
                  <Text style={styles.airportCode}>{item.airportCode}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 8,
  },
  modalBackground: {
    backgroundColor: Colors.light,
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 20,
    height: 40,
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 14,
  },
  scrollView: {
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f7',
    marginHorizontal: 20,
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  listItemContent: {
    flex: 1,
    marginRight: 15,
  },
  cityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  airportName: {
    fontSize: 14,
  },
  airportCode: {
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#e1e1e1',
    width: 50,
    textAlign: 'center',
    padding: 5,
    borderRadius: 15,
  },
});

export default FromToBottomSheet;
