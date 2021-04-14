import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

interface ILevelDetailProps {
    route: any;
    navigation: any;
}

export function LevelDetail({ route, navigation }: ILevelDetailProps) {
    const { levelNumber } = route.params;
    // Section list to display the sections and items
    // https://reactnative.dev/docs/sectionlist
    return (
        <SafeAreaView>
            <Text>{levelNumber}</Text>
        </SafeAreaView>
    )
}
