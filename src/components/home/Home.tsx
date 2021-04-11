import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function Home(){
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: 200
                }}
            >
                <TouchableOpacity
                    style={{...styles.touchable, backgroundColor: '#FF00AA'}}
                >
                    <Text>Lessons</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{...styles.touchable, backgroundColor: '#00AAFF'}}
                >
                    <Text>Reviews</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    touchable: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.1)',
        alignItems:'center',
        justifyContent:'center',
        width:140,
        height:140,
        borderRadius:70
    }
})