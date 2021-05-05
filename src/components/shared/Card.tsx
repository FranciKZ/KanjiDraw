import React from 'react'
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../util/Theme';

interface ICardProps {
    style?: object;
    children: any;
}

function Card({ children, style }: ICardProps) {
    const theme = useTheme();

    return (
        <View style={{...defaultStyles.container, ...style, ...theme.primaryBackground}}>
            {children}
        </View>
    )
}

const defaultStyles = StyleSheet.create({
    container: {
        marginBottom: 5,
        borderRadius: 5,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.9,
        shadowRadius: 5,  
        elevation: 2
    },
});

export default Card;
