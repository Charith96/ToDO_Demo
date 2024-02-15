import React from "react";
import { Button } from 'react-bootstrap'

const CustomButtom = ({ variant, disabled, id, className, onClick, label }) => {
    return (
        <Button variant={variant} disabled={disabled} id={id} className={className} onClick={onClick}>{label}</Button>
    )
}

export default CustomButtom