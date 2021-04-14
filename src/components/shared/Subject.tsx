import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { IKanjiSubject, IRadicalSubject, IVocabSubject } from '../../models';
interface IItemProps {
    item: IKanjiSubject | IRadicalSubject | IVocabSubject;
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
            
        </TouchableWithoutFeedback>
    )
}

export default Subject;
