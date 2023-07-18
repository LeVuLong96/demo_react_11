import React, { useState } from 'react';
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
    ]

    const [todoList, setTodoList] = useState(initTodoList)
    const [filteredStatus, setFilteredStatus] = useState("all");

    // thay đổi status của từng đối tượng:
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