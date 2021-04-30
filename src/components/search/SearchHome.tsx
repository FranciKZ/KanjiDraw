import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LevelSelector } from './LevelSelector'

interface ISearchHomeProps {
    route: any;
    navigation: any;
}

export function SearchHome ({ route, navigation }: ISearchHomeProps) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LevelSelector route={route} navigation={navigation}/>
        </SafeAreaView>
    )
}
