import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { useTheme } from '../../util/Theme';

interface IStyledTextProps {
    style?: object;
    children: any;
}

export function StyledText({ style, children }: IStyledTextProps) {
    const theme = useTheme();
    return (
        <Text style={[style, theme.primaryText, styles.baseMargin]}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    baseMargin: {
        margin: 3
    }
})