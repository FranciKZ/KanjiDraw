
import { IAction } from '../../models/IAction';
import { LevelActions } from '../actions';

interface ILevelState {
    levels: Record<string, boolean>;
};

const initialState: ILevelState = {
    levels: {}
}

export default(state = initialState, { type, payload }: IAction) => {
    switch(type) {
        case LevelActions.SET_LEVEL:
            const newLevels = { ...state.levels };
            newLevels[payload] = true;

            return { ...state, levels: newLevels };
        default: 
            return state;
    }
}