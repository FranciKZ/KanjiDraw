export enum SubjectActions {
    UPSERT_NOTE = 'upsert_note',
    SET_SUBJECTS = 'set_subjects',
    GET_SUBJECT_REQUEST = 'get_subjects_request'
};

export enum LevelActions {
    GET_LEVEL_REQUEST = 'get_level_request',
    SET_LEVEL = 'set_level'
};

export enum SagaActions { 
    FETCHING_DATA = 'fetching_data',
    FETCH_SUCCESSFUL = 'fetch_successful',
    FETCH_FAILURE = 'fetch_failure'
}
