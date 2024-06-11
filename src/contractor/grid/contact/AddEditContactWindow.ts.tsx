import React, {createElement, useEffect, useState} from "react";
import {observer} from "mobx-react";
import ReactDOM from "react-dom";
import {Card, DatePicker, Input, Modal, Select, Space, Switch} from "antd";
import styled from "styled-components";
import {AddEditContactWindowProps, AddEditContactWindowVm} from "./AddEditContactWindowVm";

const StyledInputLayout = styled.div`
    padding-bottom: 10px;
`;

const StyledSwitchLayout = styled.div`
    padding-bottom: 10px;
    display: flex;
`;

const AddEditContactWindowElement = (props: AddEditContactWindowProps) => {
    const [vm] = useState(() => new AddEditContactWindowVm(props));

    return (
        <Modal title="Контакт" open={vm.isOpen} onOk={vm.save} onCancel={vm.close} width={350} okText={"Сохранить"} cancelText={"Отмена"}>
            <Card bordered={true} style={{ width: 300 }}>
                <StyledInputLayout>
                    <Select
                        defaultValue={vm.type}
                        style={{ width: 250 }}
                        onChange={vm.onChangeSchedule}
                        options={vm.typeOptions}
                    />
                </StyledInputLayout>
                <StyledInputLayout>
                    <Input placeholder="Значение" onChange={vm.onChangeName} value={vm.value} />
                </StyledInputLayout>
                <StyledSwitchLayout>
                    <div style={{ paddingRight: "10px" }} >Основной</div>
                    <Switch onChange={vm.onChangeMain} value={vm.main} />
                </StyledSwitchLayout>
            </Card>
        </Modal>
    );
}

export const AddEditContactWindow = observer(AddEditContactWindowElement);

export const showAddEditContactWindow = (props: AddEditContactWindowProps) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const element = createElement(AddEditContactWindow, {...props});
    ReactDOM.render(element, container);
}
