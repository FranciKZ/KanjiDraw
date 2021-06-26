import { IAction } from '../../models/IAction';
import { LevelActions } from '../actions';

interface ILevelState {
    levels: Record<string, number[]>;
};

const initialState: ILevelState = {
    levels: {}
}

export default(state = initialState, { type, payload }: IAction) => {
    switch(type) {
        case LevelActions.SET_LEVEL:
            const newLevels = { ...state.levels };
            newLevels[payload.levelNumber] = payload.data;

            return { ...state, levels: newLevels };
        default: 
            return state;
    }
}