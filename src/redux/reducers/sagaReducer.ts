import { IAction } from "../../models/IAction"
import { SagaActions } from "../actions"

interface ISagaState {
    loading: boolean;
    errorMessage?: string;
}

const initialState: ISagaState = {
    loading: false
}

export default(state = initialState, { type, payload }: IAction) => {
    switch(type) {
        case SagaActions.FETCHING_DATA:
            return { loading: true };
        case SagaActions.FETCH_FAILURE:
            return { loading: false, errorMessage: payload };
        case SagaActions.FETCH_SUCCESSFUL:
            return { loading: false };
        default:
            return state;
    }
}