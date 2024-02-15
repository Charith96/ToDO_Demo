import React, { Suspense, lazy } from "react";
import { Spinner } from "react-bootstrap";
import { HashRouter, Routes, Route } from 'react-router-dom';
const ToDoList = lazy(() => import("./pages/ToDoList"));
const ToDoForm = lazy(() => import("./pages/ToDoForm"));

const CommonRoutes = () => {
    return (
        <HashRouter>
            <Suspense fallback={<Spinner animation="border" />}>
                <Routes>
                    <Route path="/" element={<ToDoList />} />
                    <Route path="/add" element={<ToDoForm />} />
                </Routes>
            </Suspense>
        </HashRouter>
    )
}

export { CommonRoutes };