import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ISummaryData, ISummaryResponse } from '../../models';
import { WaniWrapper } from '../../util/WaniWrapper';

export function Home() {
    const [summary, setSummary] = useState<ISummaryResponse | undefined>(undefined);

    useEffect(() => {
        const getSummary = async () => {
            const response = await WaniWrapper.getSummary();
            if (response) {
                debugger;
                setSummary(response);
            }
        }

        getSummary();
    }, [])

    const calculateReviews = () => {
        let total = 0;

        if (summary) {
            summary.data.reviews.forEach((val: ISummaryData) => {
                if (val.availableAt.isBefore(moment.now())) {
                    total += val.subjectIds.length
                }
            })
        }

        return total;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.mainView} >
                <TouchableOpacity
                    style={{ ...styles.touchable, backgroundColor: '#FF00AA' }}
                >
                    <Text style={styles.touchableMainText}>Lessons</Text>
                    <View style={styles.itemCountView}>
                        <Text style={styles.itemCountText}>{
                            summary
                            ? summary.data.lessons[0].subjectIds.length
                            : 0
                        }</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.touchable, backgroundColor: '#00AAFF' }}
                >
                    <Text style={styles.touchableMainText}>Reviews</Text>
                    <View style={styles.itemCountView}>
                        <Text style={styles.itemCountText}>{calculateReviews()}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainView: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        height: 200
    },
    touchable: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 140,
        height: 140,
        borderRadius: 70
    },
    touchableMainText: {
        fontSize: 22,
        color: '#fff'
    },
    itemCountView: {
        color: '#707070',
        fontSize: 20,
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#707070'
    },
    itemCountText: {
        fontSize: 20,
        color: '#707070'
    }
})