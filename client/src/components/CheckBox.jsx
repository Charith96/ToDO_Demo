import React from "react";
import { Form } from 'react-bootstrap';

const CheckBox = ({ label, disabled, type, id, checked, onChange }) => {
    return (
        <Form.Group className='mt-3'>
            <Form.Check inline disabled={disabled} label={label} type={type} id={id} checked={checked} onChange={onChange} />
        </Form.Group>
    )
}

export default CheckBox