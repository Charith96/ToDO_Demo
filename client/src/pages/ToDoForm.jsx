import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Container, Alert } from 'react-bootstrap';
import CustomButton from '../components/CustomButton';
import TextField from '../components/TextField';
import { useNavigate } from 'react-router-dom';
import CheckBox from '../components/CheckBox';
import { TODO_URL } from '../utils/Constant';
import { toast } from 'react-toastify';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const ToDoForm = () => {
  const navigate = useNavigate();
  const [userId, setUserID] = useState('1');
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}${TODO_URL}`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      setId((response.data.length) + 1);
      if (response.data.length > 0) {
        setUserID(response.data[0].userId)
      }
    } catch (error) {
      <Alert variant={'danger'}>{error}</Alert>
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id && userId && title) {
        const formData = {
          id: id.toString(),
          userId: userId,
          title: title,
          completed: isComplete
        }
        console.log('formData ', formData)
        const response = await axios.post(`${BASE_URL}${TODO_URL}`, formData, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        if (response.status === 201) {
          navigate('/');
          toast.success('Successfully added new Todo');
        }
      }

    } catch (error) {
      toast.error(error?.message);
    }

  }

  const navigateToHome = () => {
    navigate('/');
  }

  return (
    <div className='form-container'>
      <Container>
        <Row className="form-content">
          <Col xs={12} sm={4} >
            <Form onSubmit={handleSubmit} className='form-style'>
              <TextField inputType={'text'} disabled label={'ID'} value={id} onChange={() => { }} />
              <TextField inputType={'text'} label={'Title'} value={title} onChange={(e) => setTitle(e.target.value)} />
              <CheckBox type={'checkbox'} label={'Completed'} checked={isComplete} onChange={(e) => setIsComplete(e.target.checked)} />
              <div className='mt-4 mb-4'>
                <CustomButton variant={'primary'} disabled={(!title || !userId || !id)} label="Save" className={'w-100'} onClick={handleSubmit} />
                <CustomButton variant={'secondary'} label="Go Back" className={'w-100 mt-2'} onClick={navigateToHome} />
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ToDoForm