import React from 'react';
import ListPage from './pages/ListPage';
import { Routes, Route } from 'react-router-dom';

TodoFeature.propTypes = {};

function TodoFeature(props) {
    
    return (
        <div>
            <Routes>
                <Route path='/' element={<ListPage />} />
            </Routes>
        </div>
    );
}

export default TodoFeature;