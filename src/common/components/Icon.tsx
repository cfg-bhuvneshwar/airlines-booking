import React, { useMemo } from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6Icons from 'react-native-vector-icons/FontAwesome6';
import FeatherIcons from 'react-native-vector-icons/Feather';
import { IconsTypes } from '../constants/Icons';

type IconProps = {
  type: string;
  name: string;
  [key: string]: any;
};

const getIcon = (type: string) => {
  switch (type) {
    case IconsTypes.ION_ICON:
      return Ionicon;
    case IconsTypes.MATERIAL_ICON:
      return MaterialIcons;
    case 'fontawesome5':
      return FontAwesome5Icons;
    case 'fontawesome6':
      return FontAwesome6Icons;
    case IconsTypes.FEATHER_ICON:
      return FeatherIcons;
    default:
      return MaterialIcons;
  }
};

const Icon = ({ type, name, ...props }: IconProps) => {
  const FontIcon = useMemo(() => getIcon(type), [type]);

  return <FontIcon name={name} {...props} />;
};

export default Icon;
