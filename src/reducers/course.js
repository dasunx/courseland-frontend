import {
    GET_COURSE,
    COURSE_ERROR,
    CLEAR_COURSE,
    UPDATE_COURSE,
    GET_COURSES,
    LOAD_COURSE,
    CLEAR_COURSES
} from '../actions/types';

const initialState = {
    course: null,
    courses: [],
    loading: true,
    coursesLoad: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_COURSE:
        case UPDATE_COURSE:
            return {
                ...state,
                course: payload,
                loading: false
            };
        case GET_COURSES:
            return {
                ...state,
                courses: payload,
                coursesLoad: false,
                loading: true
            };
        case COURSE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                coursesLoad: false
            };
        case CLEAR_COURSES:
        case CLEAR_COURSE:
            return {
                ...state,
                course: null,
                courses: [],
                coursesLoad: false,
                loading: false
            };
        case LOAD_COURSE:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}
