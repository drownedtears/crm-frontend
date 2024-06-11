import React, {createElement, useEffect, useState} from "react";
import {observer} from "mobx-react";
import ReactDOM from "react-dom";
import {Card, DatePicker, Input, List, Modal, Radio, Select, Space, Switch} from "antd";
import styled from "styled-components";
import {AddEditContractorWindowProps, AddEditContractorWindowVm} from "./AddEditContractorWindowVm";
import {DeleteOutlined, PlusCircleOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {Contact} from "../grid/ContractorGridVm";
import TextArea from "antd/es/input/TextArea";

const StyledInputLayout = styled.div`
    padding-bottom: 10px;
`;

const FirstCardRowLayout = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
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
                    <List
                        footer={<StyledContactListFooter onClick={vm.onClickAddContact}><PlusCircleOutlined /></StyledContactListFooter>}
                        dataSource={vm.contacts}
                        renderItem={(item: Contact) => {
                            return (
                                <List.Item>
                                    <StyledContactListItemLayout>
                                        <div onClick={() => vm.onClickContactListItem(item)}>
                                            {item.main ? <strong>{item.value}</strong>
                                                : item.value}
                                        </div>
                                        <DeleteOutlined onClick={() => vm.deleteContact(item)} />
                                    </StyledContactListItemLayout>
                                </List.Item>
                            )}}
                    />
                </Card>
            </FirstCardRowLayout>
            <Card title="Дополнительная информация" bordered={true} style={{ width: "100%", height: 200 }}>
                <TextArea
                    autoSize={{ minRows: 4, maxRows: 4 }}
                    placeholder="Дополнительная информация"
                    maxLength={300}
                    onChange={() => {}}
                    value={"Дополнительная информация о контрагенте или любая заметка"} />
            </Card>
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
