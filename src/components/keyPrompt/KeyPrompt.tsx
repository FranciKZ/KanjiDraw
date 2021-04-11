import React, { useState } from 'react';
import { Alert, Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
interface IKeyPromptProps {
    modalVisible: boolean;
    setKey: (key: string) => void;
}

export function KeyPrompt({ modalVisible, setKey }: IKeyPromptProps) {
    const [wanikey, setWanikey] = useState('');
    // 390fcd3d-d287-44cb-89cb-efcdd4f359f9
    const handleSubmit = () => {
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(wanikey)) {
            Alert.alert(
                'Invalid Wanikani Key',
                'Please enter a valid wanikani api key.',
                [
                    {
                        text: "Ok",
                        style: "default",
                    }
                ]
            );
            return;
        }
        setKey(wanikey);
    }
    // ^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>No Wanikani key detected. Please enter the key below to use the app.</Text>
                        <TextInput
                            style={styles.keyInput}
                            value={wanikey}
                            onChangeText={setWanikey}
                            placeholder='Wanikani Key'
                            autoCompleteType='off'
                            autoCorrect={false}
                        />
                        <Button title='Save' onPress={handleSubmit} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 22,
        textAlign: 'center',
    },
    modalView: {
        margin: 5,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    keyInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        margin: 10
    }
});