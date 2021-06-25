import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';

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

const mapLoadingStateToProps = (state: RootState) => ({
    loading: state.sagaState.loading
});

export default connect(mapLoadingStateToProps)(Loading);
