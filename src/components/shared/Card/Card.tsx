import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../../util/Theme';
import defaultStyles from './style';

type ICardProps = {
  style?: object;
  children: JSX.Element | JSX.Element[];
};

function Card({ children, style = {} }: ICardProps) {
  const theme = useTheme();

  return (
    <View style={{
      ...defaultStyles.container,
      ...style,
      ...theme.primaryCardBackground,
      shadowColor: theme.primaryBorder.borderColor,
    }}
    >
      {children}
    </View>
  );
}

export default Card;
