import React from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { CommonRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <CommonRoutes />
        </Col>
      </Row>
      <ToastContainer position="bottom-right" theme="colored" />
    </Container>
  );
}

export default App;
