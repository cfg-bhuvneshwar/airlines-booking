import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Colors } from '../../../common/constants/Colors';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

const FromToBottomSheet = ({ ref, list, onPress, type }: any) => {
  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={['95%']}
      enableDynamicSizing={false}
      enableDismissOnClose
      enablePanDownToClose={false}
      style={{
        marginHorizontal: 8,
      }}
      backgroundStyle={{
        backgroundColor: Colors.light,
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          height: 40,
          alignItems: 'center',
        }}>
        <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold' }}>
          {type}
        </Text>
        <Text style={{ fontSize: 14 }} onPress={() => ref.current?.close()}>
          Close
        </Text>
      </View>
      <BottomSheetScrollView
        style={{
          paddingHorizontal: 20,
          backgroundColor: '#f7f7f7',
          marginHorizontal: 20,
          marginTop: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        showsVerticalScrollIndicator={false}>
        <View>
          {list.map((item: any, index: number) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => onPress(list[index])}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      marginRight: 15,
                    }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                      {item.city}, {item.country}
                    </Text>
                    <Text style={{ fontSize: 14 }} numberOfLines={1}>
                      {item.airportName}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      backgroundColor: '#e1e1e1',
                      width: 50,
                      textAlign: 'center',
                      padding: 5,
                      borderRadius: 15,
                    }}>
                    {item.airportCode}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default FromToBottomSheet;
