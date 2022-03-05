import React, { useState } from 'react';
import {
  Alert, Button, Modal, Text, TextInput, View,
} from 'react-native';
import styles from './style';

interface IKeyPromptProps {
  modalVisible: boolean;
  setKey: (key: string) => void;
}

function KeyPrompt({ modalVisible, setKey }: IKeyPromptProps) {
  const [wanikey, setWanikey] = useState('');

  const handleSubmit = () => {
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(wanikey)) {
      Alert.alert(
        'Invalid Wanikani Key',
        'Please enter a valid wanikani api key.',
        [
          {
            text: 'Ok',
            style: 'default',
          },
        ],
      );
      return;
    }
    setKey(wanikey);
  };
  // ^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>No Wanikani key detected. Please enter the key below to use the app.</Text>
            <TextInput
              style={styles.keyInput}
              value={wanikey}
              onChangeText={setWanikey}
              placeholder="Wanikani Key"
              autoCompleteType="off"
              autoCorrect={false}
            />
            <Button title="Save" onPress={handleSubmit} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default KeyPrompt;
