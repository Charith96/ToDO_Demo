import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'react-bootstrap';
import CustomButtom from '../components/CustomButton.jsx';
import TextField from '../components/TextField.jsx';
import CheckBox from '../components/CheckBox.jsx';
import { TODO_URL } from "../utils/Constant.js";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const ToDoList = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [userId, setUserID] = useState('');
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [isEdit, setIsEdit] = useState(false);


    // get all todos from the api
    const fetchTodos = async () => {
        try {            
            const response = await axios.get(`${BASE_URL}${TODO_URL}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200) {
                setTodos(response.data);
            }

        } catch (error) {
            toast.error(error?.message);
        }
    }

    useEffect(() => {
        fetchTodos();
    }, [])

    const handleNavigate = () => {
        navigate('/add');
    }

    const handleEdit = (data) => {
        setIsEdit(true);
        setUserID(data.userId)
        setId(data.id)
        setTitle(data.title)
        setIsComplete(data.completed)
    }

    const handleUpdate = async () => {
        try {
            if (id && userId && title) {
                const formData = {
                    id: id,
                    userId: userId,
                    title: title,
                    completed: isComplete
                }

                const response = await axios.put(`${BASE_URL}${TODO_URL}/${id}`, formData, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                if (response.status === 200) {
                    toast.success('Successfully Update Todo');
                    fetchTodos();
                }
                clearInputs()
            }

        } catch (error) {
            toast.error(error?.message);
        }
    }

    const clearInputs = () => {
        setId('');
        setUserID('');
        setTitle('');
        setIsComplete(false);
        setIsEdit(false);
    }


    return (
        <>
            <div className="todo-container">
                <Row className="title-row">
                    <Col className="title">
                        <h1>Todos</h1>
                    </Col>
                </Row>
                <Row className='form-button'>
                    <Col sm={10} className="button">
                        <CustomButtom variant={'primary'} className={''} label={'Add New'} onClick={handleNavigate} />
                    </Col>
                </Row>
                <Row className="table-container">
                    <Col sm={8}>
                        <Table responsive hover bordered className="table">
                            <thead>
                                <tr>
                                    <th>Todo ID</th>
                                    <th>User ID</th>
                                    <th>Title</th>
                                    <th>Completed</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(todos.length > 0) && todos.map((todo) => (
                                    <tr key={todo.id}>
                                        <td id='todo-item'>{todo.id}</td>
                                        <td id='todo-item'>{todo.userId}</td>
                                        <td>{
                                            (isEdit && (id === todo.id)) ? (
                                                <TextField inputType={'text'} className={'mt-0'} value={title} onChange={(e) => setTitle(e.target.value)} />
                                            ) : (<span id='todo-item'>{todo.title}</span>)}
                                        </td>
                                        <td className={`text-center`} >
                                            {
                                                (isEdit && (id === todo.id)) ? (
                                                    <CheckBox type={'checkbox'} label={''} checked={isComplete} onChange={(e) => setIsComplete(e.target.checked)} />
                                                ) : (todo.completed ? (<span id='complete'>Yes</span>) : <span id='not-complete'>No</span>)}
                                        </td>
                                        <td className='action'>
                                            {
                                                (isEdit && (id === todo.id)) ? (
                                                    <CustomButtom id='edit-btn' variant={'primary'} label={'Save'} onClick={handleUpdate} />
                                                ) : (
                                                    <CustomButtom id='edit-btn' variant={'warning'} label={'Edit'} onClick={() => handleEdit(todo)} />
                                                )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ToDoList