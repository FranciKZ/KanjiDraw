import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';

interface IKeyPromptProps {
    modalVisible: boolean;
    toggleModal: () => void;
}

const KeyPrompt: React.FC<IKeyPromptProps> = ({ modalVisible }) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                visible={ modalVisible }
            >
                <p>test modal</p>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 22
    }
});