import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Colors } from '../constants/Colors';
import { fontFamilies } from '../constants/fontFamily';
import { memo } from 'react';
import Icon from './Icon';
import { IconsTypes } from '../constants/Icons';
import { useNavigation } from '@react-navigation/native';

type HeaderProps = {
  title: string;
  icon?: boolean;
};

const Header = ({ title, icon }: HeaderProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {icon && (
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Icon
            type={IconsTypes.FEATHER_ICON}
            name="arrow-left"
            size={22}
            color={Colors.white}
            style={{ marginRight: 15 }}
          />
        </TouchableWithoutFeedback>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: Colors.background,
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'center',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: fontFamilies.SemiBold,
  },
});

export default memo(Header);
