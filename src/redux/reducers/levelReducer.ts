import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAction } from '../../models/IAction';
import { LevelActions } from '../actions';

interface ILevelState {
    levels: Record<string, number[]>;
};

type LevelAction = {
  levelNumber: number,
  data: any,
}

const initialState: ILevelState = {
    levels: {}
}

export const levelSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {
    setLevel: (state, action: PayloadAction<LevelAction>) => {
      state.levels[action.payload.levelNumber] = action.payload.data;
    }
  }
})

export const { setLevel } = levelSlice.actions;

export default levelSlice.reducer;
