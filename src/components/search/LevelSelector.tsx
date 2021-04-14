import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface ILevelSelector {
    route: any;
    navigation: any;
}

export function LevelSelector({ route, navigation }: ILevelSelector) {

    const navigate = (levelNumber: number) => {
        navigation.navigate('SearchStackScreen', {
            screen: 'LevelDetail',
            params: { levelNumber },
        });
    }

    const generateLevels = () => {
        const elements: JSX.Element[] = [];

        for (let i = 1; i <= 60; i++) {
            elements.push(
                <TouchableWithoutFeedback key={i} style={styles.individualItem} onPress={() => navigate(i)}>
                    <Text style={styles.individalItemText}>{i}</Text>
                </TouchableWithoutFeedback>
            );
        }
        
        return elements;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.viewRow}>
                {generateLevels()}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    viewRow: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    individualItem: {
        fontSize: 20,
        backgroundColor: 'white',
        width: 45,
        height: 45,
        margin: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(102, 102, 102, 0.5)',
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    individalItemText: {
        color: 'rgb(70, 70, 70)'
    }
})