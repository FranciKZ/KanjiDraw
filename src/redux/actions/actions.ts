export enum SubjectActions {
    UPSERT_NOTE = 'upsert_note',
    SET_SUBJECTS = 'set_subjects',
    GET_SUBJECT_REQUEST = 'get_subjects_request',
    FETCHING_SUBJECTS = 'fetching_subjects',
    FETCHING_SUBJECTS_SUCCESS = 'fetching_subjects_success',
    FETCHING_SUBJECTS_FAILURE = 'fetching_subjects_failure'
};

export enum LevelActions {
    GET_LEVEL = 'get_level',
    SET_LEVEL = 'set_level'
};

export enum SagaActions { 
    FETCHING_DATA = 'fetching_data',
    FETCH_SUCCESSFUL = 'fetch_successful',
    FETCH_FAILURE = 'fetch_failure'
}
