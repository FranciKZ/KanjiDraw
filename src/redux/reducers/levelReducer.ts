
import { IAction } from '../../models/IAction';
import { LevelActions } from '../actions';

interface ILevelState {
    [key: string]: boolean;
};

const initialState: ILevelState = {

}

export default(state = initialState, { type, payload }: IAction) => {
    switch(type) {
        case LevelActions.GET_LEVEL_SUBJECTS:
            break;
        default: 
            return state;
    }
}