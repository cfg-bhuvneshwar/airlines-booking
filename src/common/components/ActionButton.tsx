import { memo, ReactElement } from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

type ActionButtonProps = {
  label: string;
  onPress: () => void;
  buttonViewStyles: StyleProp<ViewStyle>;
  buttonTextStyles: StyleProp<TextStyle>;
  disabled?: boolean;
  icon?: ReactElement<any, any>;
};

const ActionButton = ({
  label,
  onPress,
  buttonViewStyles,
  buttonTextStyles,
  disabled = false,
  icon,
}: ActionButtonProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
      <View style={buttonViewStyles}>
        {icon}
        <Text style={buttonTextStyles}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default memo(ActionButton);
