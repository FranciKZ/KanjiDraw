import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { IKanjiSubject, IRadicalSubject, IVocabSubject } from '../../models';

interface IItemProps {
    item: IKanjiSubject | IRadicalSubject | IVocabSubject;
}

function Item({ item }: IItemProps) {
    return (
        <TouchableWithoutFeedback>
            
        </TouchableWithoutFeedback>
    )
}

export default Item;
