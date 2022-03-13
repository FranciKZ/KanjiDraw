import { StackActions, TabActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ISubject } from '../../../models';
import Subject from '../Subject/Subject';

type IItemProps = {
  item: ISubject;
  displayExtraData?: boolean;
  push?: boolean;
};

function SubjectButton({
  item, push = false, displayExtraData = true,
}: IItemProps) {
  const navigation = useNavigation();
  const navigate = () => {
    if (push) {
      const pushAction = StackActions.push('SubjectDetails', { subjectId: item.id });
      navigation.dispatch(pushAction);
    } else {
      const navigateAction = TabActions.jumpTo('SearchStackScreen', {
        screen: 'SubjectDetails',
        params: { subjectId: item.id },
      });
      navigation.dispatch(navigateAction);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={navigate}>
      <Subject item={item} displayExtraData={displayExtraData} />
    </TouchableWithoutFeedback>
  );
}

export default SubjectButton;
