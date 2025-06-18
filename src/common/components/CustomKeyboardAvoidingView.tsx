import { useHeaderHeight } from '@react-navigation/elements';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

import React, { PropsWithChildren } from 'react';

const CustomKeyboardAvoidingView: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const headerHeight = useHeaderHeight();
  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={headerHeight}>
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
});

export default CustomKeyboardAvoidingView;
