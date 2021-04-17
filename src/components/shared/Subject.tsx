import React from 'react';
import { Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { ISubject } from '../../models';
interface IItemProps {
    item: ISubject;
    navigation: any;
    route: any;
}

function Subject({ item, navigation, route }: IItemProps) {
    const navigate = () => {
        // navigation.navigate('Account', {
        //     screen: 'Settings',
        //     params: { user: 'jane' },
        //   });
    }

    return (
        <TouchableWithoutFeedback>
            <Text>{ item.data.characters }</Text>
        </TouchableWithoutFeedback>
    )
}

export default Subject;
