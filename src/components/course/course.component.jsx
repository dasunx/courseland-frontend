import React from 'react';
import { Link } from 'react-router-dom';
import './course.styles.css';

const Course = ({ course }) => {
    const { name, slang, description, price, featuredImage, tags } = course;

    return (
        <div className='col-sm-4 col-md-4 col-lg-3 mb-3'>
            <div className='card'>
                <img
                    className='card-img-top'
                    src={featuredImage}
                    alt='Card cap'
                />
                <div className='card-body card-heading'>
                    <h5 className='card-title'>{name}</h5>
                    <p className='card-text'>{description}</p>
                </div>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'>by {course.user.name}</li>
                    <li className='list-group-item'>usd {price}</li>
                    <li className='list-group-item'>
                        {tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className='tag'>
                                {' '}
                                {tag}{' '}
                            </span>
                        ))}
                    </li>
                </ul>
                <div className='card-body'>
                    <Link to={`/course/${slang}`} className='card-link'>
                        View Course
                    </Link>
                    <Link to='#' className='card-link'>
                        buy now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Course;
