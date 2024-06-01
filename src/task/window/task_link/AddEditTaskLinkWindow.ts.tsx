import React, {createElement, useEffect, useState} from "react";
import {Card, DatePicker, Input, List, Modal, Select, Space} from "antd";
import {observer} from "mobx-react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import TextArea from "antd/es/input/TextArea";
import {AddEditTaskLinkWindowProps, AddEditTaskLinkWindowVm} from "./AddEditTaskLinkWindowVm";

const StyledInputLayout = styled.div`
    padding-bottom: 10px;
`;

const AddEditTaskLinkWindowElement = (props: AddEditTaskLinkWindowProps) => {
    const [vm] = useState(() => new AddEditTaskLinkWindowVm(props));

    return (
        <Modal title="Ссылка" open={vm.isOpen} onOk={vm.save} onCancel={vm.close} width={350} okText={"Сохранить"} cancelText={"Отмена"}>
            <Card title="Основная информация" bordered={true} style={{ width: 300 }}>
                <StyledInputLayout>
                    <Input placeholder="Название" onChange={vm.onChangeShortName} value={vm.shortName} />
                </StyledInputLayout>
                <StyledInputLayout>
                    <TextArea
                        autoSize={{ minRows: 4, maxRows: 4 }}
                        placeholder="Дополнительная информация"
                        maxLength={300}
                        onChange={vm.onChangeDescription}
                        value={vm.description} />
                </StyledInputLayout>
                <StyledInputLayout>
                    <Input placeholder="Ссылка" onChange={vm.onChangeUrl} value={vm.url} />
                </StyledInputLayout>
            </Card>
        </Modal>
    );
}

export const AddEditTaskLinkWindow = observer(AddEditTaskLinkWindowElement);

export const showAddEditTaskLinkWindow = (props: AddEditTaskLinkWindowProps) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const element = createElement(AddEditTaskLinkWindow, {...props});
    ReactDOM.render(element, container);
}