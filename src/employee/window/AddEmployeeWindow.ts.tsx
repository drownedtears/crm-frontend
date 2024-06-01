import React, {createElement, useState} from "react";
import ReactDOM from "react-dom";
import {observer} from "mobx-react";
import { Card, DatePicker, Input, List, Modal, Space } from "antd";
import styled from "styled-components";
import {AddEmployeeWindowProps, AddEmployeeWindowVm} from "./AddEmployeeWindowVm";

const StyledInputLayout = styled.div`
    padding-bottom: 10px;
`;

const ModalMainLayout = styled.div`
    display: flex;
    justify-content: space-between;
`;
const AddEmployeeWindowElement = (props: AddEmployeeWindowProps) => {
    const [vm] = useState(() => new AddEmployeeWindowVm(props));

    return (
        <Modal title="Личное дело" open={vm.isOpen} onOk={vm.save} onCancel={vm.close} width={350} okText={"Сохранить"} cancelText={"Отмена"}>
            <ModalMainLayout>
                <Card title="Основная информация" bordered={true} style={{ width: 300 }}>
                    <StyledInputLayout>
                        <Input placeholder="Фамилия" onChange={vm.onChangeSurname} value={vm.surname} />
                    </StyledInputLayout>
                    <StyledInputLayout>
                        <Input placeholder="Имя" onChange={vm.onChangeName} value={vm.name} />
                    </StyledInputLayout>
                    <StyledInputLayout>
                        <Input placeholder="Отчество" onChange={vm.onChangePatronymic} value={vm.patronymic} />
                    </StyledInputLayout>
                    <StyledInputLayout>
                        <Space.Compact>
                            <Input style={{ width: '50%' }} value="Дата рождения" disabled={true}/>
                            <DatePicker style={{ width: '50%' }} placeholder={"Дата рождения"} onChange={(date) => vm.onChangeDateOfBirth(date)} value={vm.dateOfBirth} />
                        </Space.Compact>
                    </StyledInputLayout>
                    <StyledInputLayout>
                        <Space.Compact>
                            <Input style={{ width: '17%' }} value="+7" disabled={true}/>
                            <Input style={{ width: '83%' }} onChange={vm.onChangePhone} value={vm.phone} />
                        </Space.Compact>
                    </StyledInputLayout>
                    <StyledInputLayout>
                        <Input onChange={vm.onChangeEmail} value={vm.email} />
                    </StyledInputLayout>
                </Card>
            </ModalMainLayout>
        </Modal>
    );
}

export const AddEmployeeWindow = observer(AddEmployeeWindowElement);

export const showAddEmployeeWindow = (props: AddEmployeeWindowProps) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const element = createElement(AddEmployeeWindow, {...props});
    ReactDOM.render(element, container);
}