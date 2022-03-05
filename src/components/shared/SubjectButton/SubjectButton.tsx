import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ISubject } from '../../../models';
import Subject from '../Subject/Subject';

type IItemProps = {
  item: ISubject;
  navigation: any;
  displayExtraData?: boolean;
  push?: boolean;
};

function SubjectButton({
  item, navigation, push = false, displayExtraData = true,
}: IItemProps) {
  const navigate = () => {
    if (push) {
      navigation.push('SubjectDetails', { subjectId: item.id });
    } else {
      navigation.navigate('SearchStackScreen', {
        screen: 'SubjectDetails',
        params: { subjectId: item.id },
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={navigate}>
      <Subject item={item} displayExtraData={displayExtraData} />
    </TouchableWithoutFeedback>
  );
}

export default SubjectButton;
