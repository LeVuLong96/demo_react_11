import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import TodoList from '../../components/TodoList';
import TodoForm from '../../components/TodoForm';

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
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();
    

    const [todoList, setTodoList] = useState(initTodoList);
    const [filteredStatus, setFilteredStatus] = useState(() => {
        const params = queryString.parse(location.search);
        return params.status || 'all';
    });

    useEffect(() => {
        //docc url
        const params = queryString.parse(location.search);
        setFilteredStatus(params?.status)
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
        // setFilteredStatus('all');
        setSearchParams((prevSearchParams) => {
            const newSearchParams = new URLSearchParams(prevSearchParams);
            newSearchParams.set(`status`, `all`);
            return newSearchParams;
        })
        
    };
    const handleShowCompleted = () => {
        // setFilteredStatus('completed');
        setSearchParams((prevSearchParams) => {
            const newSearchParams = new URLSearchParams(prevSearchParams);
            newSearchParams.set(`status`, `completed`);
            return newSearchParams;
        })
    }

    const handleShowNewClick = () => {
        // setFilteredStatus('new');
        setSearchParams((prevSearchParams) => {
            const newSearchParams = new URLSearchParams(prevSearchParams);
            newSearchParams.set(`status`, `new`);
            return newSearchParams;
        })
    };



    const renderedTodoList = useMemo(() => {
        return todoList.filter(
          (todo) => filteredStatus === 'all' || filteredStatus === todo.status
        );
      }, [todoList, filteredStatus]);

    const handleTodoFormSubmit = (values) => {
        const newTodo = {
            id: todoList.length + 1,
            title: values.title,
            status: 'new',
        };

        const newTodoList = [...todoList, newTodo];

        setTodoList(newTodoList)
    };

    return (
        <div>
            <h3>What todo?</h3>
            <TodoForm onSubmit={handleTodoFormSubmit} />
            
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