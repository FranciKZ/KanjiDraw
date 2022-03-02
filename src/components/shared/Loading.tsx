import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

const Loading = ({ loading, children }: { loading : boolean, children: any}) => {
    return (
        <>
            {
                loading ? <View style={styles.container}><ActivityIndicator size='large'/></View> : { ...children}
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
});

export default Loading;
