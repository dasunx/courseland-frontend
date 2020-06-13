import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_COURSE,
    GET_COURSES,
    COURSE_ERROR,
    CLEAR_COURSE,
    CLEAR_COURSES,
    LOAD_COURSE
} from './types';

//Get all courses
export const getCourses = () => async (dispatch) => {
    dispatch({ type: CLEAR_COURSE });
    try {
        const res = await axios.get('/api/courses');
        dispatch({
            type: GET_COURSES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: COURSE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

//Get course by id
export const getCourseById = (slang) => async (dispatch) => {
    try {
        dispatch({
            type: LOAD_COURSE
        });
        const res = await axios.get(`/api/courses/course/${slang}`);
        dispatch({
            type: GET_COURSE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: COURSE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

//Create course
export const createCourse = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/courses', formData, config);

        dispatch({
            type: GET_COURSE,
            payload: res.data
        });

        dispatch(setAlert('Course Created', 'success'));

        history.push(`/course/${res.data.slang}`);
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: COURSE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

//delete course
export const deleteCourse = (id, history) => async (dispatch) => {
    if (
        window.confirm(
            'Are you sure you need to delete this course? This cannot be undone'
        )
    ) {
        try {
            console.log(id);
            await axios.delete(`/api/courses/${id}`);
            dispatch({
                type: CLEAR_COURSES
            });
            dispatch(setAlert('Course Deleted', 'success'));
            history.push('/courses');
        } catch (err) {
            // dispatch({
            //     type: COURSE_ERROR,
            //     payload: {
            //         msg: err.response.statusText,
            //         status: err.response.status
            //     }
            // });
        }
    }
};
