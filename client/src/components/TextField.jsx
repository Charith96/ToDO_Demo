import React from "react";
import { Form } from 'react-bootstrap';

const TextField = ({ label, disabled, type, className, value, checked, onChange }) => {
    return (
        <Form.Group className='mt-3'>
            {label ? (<Form.Label>{label}</Form.Label>) : ''}
            <Form.Control disabled={disabled} type={type} className={className} value={value} checked={checked} onChange={onChange} />
        </Form.Group>
    )
}

export default TextField