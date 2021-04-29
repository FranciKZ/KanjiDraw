import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { ISubject } from '../../models';
import { Subject } from './Subject';

interface IItemProps {
    item: ISubject;
    navigation: any;
    push?: boolean;
}

function SubjectButton({ item, navigation, push = false }: IItemProps) {
    const navigate = () => {
        if (push) {
            navigation.push('SubjectDetails', { subjectId: item.id });
        } else {
            navigation.navigate('SearchStackScreen', {
                screen: 'SubjectDetails',
                params: { subjectId: item.id },
            });
        }
    }

    return (
        <TouchableWithoutFeedback onPress={navigate}>
            <Subject item={item} />
        </TouchableWithoutFeedback>
    )
}

export default SubjectButton;
