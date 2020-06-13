import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createCourse } from '../../actions/course';
import './addCourse.styles.css';

const AddCourse = ({ createCourse, history }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        slang: '',
        tags: '',
        featuredImage: ''
    });

    const { name, description, price, slang, tags, featuredImage } = formData;

    const slangChange = (e) => {
        const value = e.target.value;
        setFormData({ slang: value.split(' ').join('-') });
    };

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        createCourse(formData, history);
    };
    return (
        <div className='add-course'>
            <span className='secondary-title'>Add new course</span>
            <form method='POST' onSubmit={(e) => onSubmit(e)}>
                <div className='form-group'>
                    <label htmlFor='slang'>Slang</label>
                    <input
                        type='text'
                        className='form-control'
                        id='slang'
                        name='slang'
                        value={slang}
                        onChange={(e) => slangChange(e)}
                        placeholder='css-grid-introduction'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='name'>Course name</label>
                    <input
                        type='text'
                        className='form-control'
                        id='name'
                        name='name'
                        value={name || ''}
                        onChange={(e) => onChange(e)}
                        placeholder='Css grid introduction'
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='courseDescription'>Description</label>
                    <textarea
                        className='form-control'
                        id='courseDescription'
                        rows='3'
                        name='description'
                        value={description}
                        onChange={(e) => onChange(e)}
                        required
                    ></textarea>
                </div>

                <div className='form-group'>
                    <label htmlFor='price'>price</label>
                    <input
                        type='number'
                        className='form-control'
                        id='price'
                        name='price'
                        value={price || ''}
                        onChange={(e) => onChange(e)}
                        placeholder='19.99'
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='featuredImage'>Featured image</label>
                    <input
                        type='text'
                        className='form-control'
                        id='featuredImage'
                        name='featuredImage'
                        value={featuredImage || ''}
                        onChange={(e) => onChange(e)}
                        placeholder='Add featured image url here'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='tags'>
                        Tags (Please add comma separated values)
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        id='tags'
                        name='tags'
                        value={tags || ''}
                        onChange={(e) => onChange(e)}
                        placeholder='React,Express'
                        required
                    />
                </div>

                <div className='form-group'>
                    <input
                        type='submit'
                        className='form-control submit-btn'
                        value='Save course'
                    />
                </div>
            </form>
        </div>
    );
};

AddCourse.propTypes = {
    createCourse: PropTypes.func.isRequired
};

export default connect(null, { createCourse })(withRouter(AddCourse));
