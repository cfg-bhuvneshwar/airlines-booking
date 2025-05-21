import { memo, useMemo } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import userTitles from '../../data/userTitles.json';

type TitleSelectionProps = {
  title: string;
  onChange: (item: { label: string; value: string }) => void;
  dropdown: StyleProp<ViewStyle>;
  selectedTextStyle: StyleProp<TextStyle>;
};

const TitleSelection = ({
  title,
  onChange,
  dropdown,
  selectedTextStyle,
}: TitleSelectionProps) => {
  const memoizedUserTitles = useMemo(() => userTitles, []);

  return (
    <Dropdown
      style={dropdown}
      selectedTextStyle={selectedTextStyle}
      data={memoizedUserTitles}
      maxHeight={300}
      labelField="label"
      valueField="label"
      placeholder={'Title'}
      value={title}
      onChange={onChange}
    />
  );
};

export default memo(TitleSelection);
