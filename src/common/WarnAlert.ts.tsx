import React, {createElement, ReactElement} from 'react';
import { Alert } from 'antd';
import ReactDOM from "react-dom";
import {EmployeeWindow} from "../employee/window/EmployeeWindow.ts";

const WarnAlert = ({ message } : { message: string} ) => (
    <Alert message={message} type="warning" style={{ zIndex: 9999, width: "250px", position: "fixed", bottom: "15px", left: "45%" }} closable />
);

export const showWarn = (message: string) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const element = createElement(WarnAlert, {message});
    ReactDOM.render(element, container);
}
