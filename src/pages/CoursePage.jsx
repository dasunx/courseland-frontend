import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCourseById, deleteCourse } from '../actions/course';
import Moment from 'react-moment';

import './coursepages.styles.css';

const CoursePage = ({
    getCourseById,
    deleteCourse,
    course: { course, loading },
    auth,
    history
}) => {
    let { slang } = useParams();

    useEffect(() => {
        getCourseById(slang);
    }, [getCourseById, slang]);

    return (
        <div className='course-page'>
            <Fragment>
                {!loading ? (
                    <Fragment>
                        {course !== null ? (
                            <Fragment>
                                <div className='row'>
                                    <div className='col-md-8 course-details'>
                                        <span className='course-title'>
                                            {course.name}
                                        </span>
                                        <span className='course-description'>
                                            {course.description} - created date{' '}
                                            <Moment format='YYYY/MM/DD'>
                                                {course.date}
                                            </Moment>
                                        </span>
                                    </div>
                                    <div className='col-md-4 course-overview'>
                                        <img
                                            src={course.featuredImage}
                                            alt='Course featured'
                                        />
                                        <span className='d-block  mt-2'>
                                            Instructor {course.user.name}
                                        </span>
                                        <span className='d-block'>
                                            Price {course.price} usd
                                        </span>
                                        <span className='d-block'>
                                            Tags -
                                            {course.tags
                                                .slice()
                                                .map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className='tag'
                                                    >
                                                        {' '}
                                                        {tag}{' '}
                                                    </span>
                                                ))}
                                        </span>

                                        <div className='col-md-12 mt-5'>
                                            {' '}
                                            <button className='btn course-btn buynow'>
                                                Buy now
                                            </button>
                                        </div>
                                        <div className='col-md-12'>
                                            {' '}
                                            <button className='btn course-btn'>
                                                Add to cart
                                            </button>
                                        </div>
                                        {auth.isAuthenticated &&
                                            auth.loading === false &&
                                            auth.user._id ===
                                                course.user._id && (
                                                <div className='col-md-12'>
                                                    {' '}
                                                    <button
                                                        className='btn  course-btn btn-danger '
                                                        onClick={() =>
                                                            deleteCourse(
                                                                course._id,
                                                                history
                                                            )
                                                        }
                                                    >
                                                        Delete Course
                                                    </button>
                                                </div>
                                            )}
                                    </div>
                                </div>
                                <div className='row course-content mt-5'>
                                    <span className='secondary-title'>
                                        Course Content
                                    </span>
                                    <span>
                                        This is test course -- Content will or
                                        will not be update later
                                    </span>
                                </div>
                            </Fragment>
                        ) : (
                            <h4>No course found</h4>
                        )}
                    </Fragment>
                ) : (
                    'loading'
                )}
            </Fragment>
        </div>
    );
};

CoursePage.propTypes = {
    getCourseById: PropTypes.func.isRequired,
    deleteCourse: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    course: state.course,
    auth: state.auth
});

export default connect(mapStateToProps, { getCourseById, deleteCourse })(
    withRouter(CoursePage)
);
