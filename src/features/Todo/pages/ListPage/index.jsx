import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import TodoList from '../../components/TodoList';

ListPage.propTypes = {};

function ListPage(props) {
    const initTodoList = [
        {
            id: 1,
            title: 'Eat',
            status: 'new',
        },
        {
            id: 2,
            title: 'Sleep',
            status: 'completed',
        },
        {
            id: 3,
            title: 'Code',
            status: 'new',
        }
    ];

    
    const location = useLocation();
    console.log(location, 29)
    

    const [todoList, setTodoList] = useState(initTodoList);
    const [filteredStatus, setFilteredStatus] = useState(() => {
        const params = queryString.parse(location.search);
        console.log(params, 34);
        return params.status || 'all';
    });

    useEffect(() => {

    }, [location.search])


    // Update status :
    const handleTodoClick = (todo, idx) => {
        const newTodoList = [...todoList];
        newTodoList[idx] = {
            ...newTodoList[idx],
            status: newTodoList[idx].status === 'new' ? 'completed' : 'new',
        }
        setTodoList(newTodoList)
    };

    // Show list đã được lọc theo từng status
    const handleShowAllClick = () => {
        setFilteredStatus('all');
        
    };
    const handleShowCompleted = () => {
        setFilteredStatus('completed');
    };
    const handleShowNewClick = () => {
        setFilteredStatus('new');
    };


    const renderedTodoList = todoList.filter(todo => filteredStatus === 'all' || filteredStatus === todo.status)

    // render
    return (
        <div>
            <h3>Todo List</h3>
            <p>List todo</p>
            <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick}/>

            <div>
                <button onClick={handleShowAllClick}>Show All</button>
                <button onClick={handleShowCompleted}>Show Completed</button>
                <button onClick={handleShowNewClick}>Show New</button>
            </div>
        </div>
    );
}

export default ListPage;