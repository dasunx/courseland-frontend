import React from 'react';
import { Link } from 'react-router-dom';

export const Landing = () => {
    return (
        <div className='container-fluid landing-image'>
            <span className='text-box'>
                <span className='d-block'>Learn something new today!</span>
                <Link className='btn get-started-btn' to='/courses'>
                    Get Started
                </Link>
            </span>
        </div>
    );
};
