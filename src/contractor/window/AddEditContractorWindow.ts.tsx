import React, {createElement, useEffect, useState} from "react";
import {observer} from "mobx-react";
import ReactDOM from "react-dom";
import {Card, DatePicker, Input, List, Modal, Radio, Select, Space, Switch} from "antd";
import styled from "styled-components";
import {AddEditContractorWindowProps, AddEditContractorWindowVm} from "./AddEditContractorWindowVm";
import {DeleteOutlined, PlusCircleOutlined} from "@ant-design/icons";

const StyledInputLayout = styled.div`
    padding-bottom: 10px;
`;

const FirstCardRowLayout = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledContactListItemLayout = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
`;

const StyledContactListFooter = styled.div`
    cursor: pointer;
`;


const AddEditPostWindowElement = (props: AddEditContractorWindowProps) => {
    const [vm] = useState(() => new AddEditContractorWindowVm(props));

    return (
        <Modal title="Контрагент" open={vm.isOpen} onOk={vm.save} onCancel={vm.close} width={675} okText={"Сохранить"} cancelText={"Отмена"}>
            <FirstCardRowLayout>
                <Card title="Основная информация" bordered={true} style={{ width: 300 }}>
                    <StyledInputLayout>
                        <Input placeholder="Название" onChange={vm.onChangeName} value={vm.name} />
                    </StyledInputLayout>
                    <Radio.Group style={{ width: "200px" }} onChange={(event) => vm.onChangeType(event.target.value)} value={vm.type}>
                        <Space direction="vertical">
                            <Radio value={"ENTERPRISE"}>Юр. лицо</Radio>
                            <Radio value={"PHYSICAL"}>Физ. лицо</Radio>
                            <Radio value={"PERSON"}>Частный</Radio>
                        </Space>
                    </Radio.Group>
                </Card>
                <Card title="Контакты" bordered={true} style={{ width: 300 }}>
                    <StyledInputLayout>
                        todo Контакты
                    </StyledInputLayout>
                </Card>
            </FirstCardRowLayout>
        </Modal>
    );
}

export const AddEditPostWindow = observer(AddEditPostWindowElement);

export const showAddEditContractorWindow = (props: AddEditContractorWindowProps) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const element = createElement(AddEditPostWindow, {...props});
    ReactDOM.render(element, container);
}