import React from 'react';
import { Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native';

interface IKeyPromptProps {
    modalVisible: boolean;
    toggleModal: () => void;
}

export const KeyPrompt: React.FC = (props) => {
    return (             
        <SafeAreaView style={styles.centeredView}>
            <Text>test modal</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 4,
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 22,
        textAlign: 'center',
    },
    text: {
        textAlign: 'center'
    }
});