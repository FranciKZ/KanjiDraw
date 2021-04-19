import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { ISubject } from '../../models';
import { Subject } from './Subject';

interface IItemProps {
    item: ISubject;
    navigation: any;
}

function SubjectButton({ item, navigation }: IItemProps) {
    const navigate = () => {
        navigation.navigate('SearchStackScreen', {
            screen: 'SubjectDetails',
            params: { subjectId: item.id },
        });
    }

    return (
        <TouchableWithoutFeedback onPress={navigate}>
            <Subject item={item} />
        </TouchableWithoutFeedback>
    )
}

export default SubjectButton;
