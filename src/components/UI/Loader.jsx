import React from 'react';
import ReactDOM from 'react-dom';
import { Spinner } from 'react-bootstrap';
import './Loader.css';

const Loader = () => {
    return ReactDOM.createPortal(
        <div className="overlay">
            <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
            </Spinner>
        </div>,
        document.getElementById('loader-root')
    );
};

export default Loader;
