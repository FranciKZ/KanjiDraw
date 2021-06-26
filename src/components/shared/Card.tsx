import React from 'react'
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../util/Theme';

interface ICardProps {
    style?: object;
    children: any;
}

export function Card({ children, style }: ICardProps) {
    const theme = useTheme();

    return (
        <View style={{...defaultStyles.container, ...style, ...theme.primaryCardBackground, shadowColor: theme.primaryBorder.borderColor}}>
            {children}
        </View>
    )
}

const defaultStyles = StyleSheet.create({
    container: {
        marginBottom: 5,
        borderRadius: 5,
        padding: 5,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
        elevation: 2
    },
});
