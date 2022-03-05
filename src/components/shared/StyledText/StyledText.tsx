import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../../../util/Theme';
import styles from './style';

interface IStyledTextProps {
  style?: object;
  children: any;
}

function StyledText({ style, children }: IStyledTextProps) {
  const theme = useTheme();
  return (
    <Text style={[style, theme.primaryText, styles.baseMargin]}>
      {children}
    </Text>
  );
}

export default StyledText;
