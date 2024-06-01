import React, {createElement, ReactElement} from 'react';
import { Alert } from 'antd';
import ReactDOM from "react-dom";
import {EmployeeWindow} from "../employee/window/EmployeeWindow.ts";

const ErrorAlert = () => (
    <Alert message="Ошибка при загрузке данных" type="error" style={{ zIndex: 9999, width: "250px", position: "fixed", bottom: "15px", left: "45%" }} closable />
);

export const showError = () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const element = createElement(ErrorAlert);
    ReactDOM.render(element, container);
}
