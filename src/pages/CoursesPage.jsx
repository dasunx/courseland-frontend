import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Course from '../components/course/course.component';
import { getCourses } from '../actions/course';
import './coursepages.styles.css';

const CoursesPage = ({ getCourses, course: { courses, coursesLoad } }) => {
    useEffect(() => {
        getCourses();
    }, [getCourses]);
    return (
        <Fragment>
            {coursesLoad ? (
                <Fragment>Loading</Fragment>
            ) : (
                <div className='courses'>
                    <div className='secondary-title'>Available courses</div>

                    <div className='row'>
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <Course key={course._id} course={course} />
                            ))
                        ) : (
                            <h4>...</h4>
                        )}
                    </div>
                </div>
            )}
        </Fragment>
    );
};

CoursesPage.propTypes = {
    getCourses: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    course: state.course
});
export default connect(mapStateToProps, { getCourses })(CoursesPage);
