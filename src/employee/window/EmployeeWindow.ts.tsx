import React, {createElement, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {observer} from "mobx-react";
import { Card, DatePicker, Input, List, Modal, Space, Typography } from "antd";
import {EmployeeWindowProps, EmployeeWindowVm} from "./EmployeeWindowVm";
import styled from "styled-components";
import {CloseCircleOutlined, DeleteOutlined, PlusCircleOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";

const StyledInputLayout = styled.div`
    padding-bottom: 10px;
`;

const ModalMainLayout = styled.div`

`;

const FirstCardRowLayout = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
`;

const StyledPostListFooter = styled.div`
    cursor: pointer;
`;

const StyledPostListItemLayout = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
`;

const EmployeeWindowElement = (props: EmployeeWindowProps) => {
    const [vm] = useState(() => new EmployeeWindowVm(props));
    useEffect(() => vm.loadInitData(), [])

    return (
        <Modal title="Личное дело" open={vm.isOpen} onOk={vm.save} onCancel={vm.close} width={675} okText={"Сохранить"} cancelText={"Отмена"}>
            <ModalMainLayout>
                <FirstCardRowLayout>
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
                                <Input style={{ width: '50%' }} value="Дата рождения" disabled={true} />
                                <DatePicker style={{ width: '50%' }} placeholder={"Дата рождения"} onChange={(date) => vm.onChangeDateOfBirth(date)} value={vm.dateOfBirth} />
                            </Space.Compact>
                        </StyledInputLayout>
                        <StyledInputLayout>
                            <Space.Compact>
                                <Input style={{ width: '17%' }} value="+7" />
                                <Input style={{ width: '83%' }} value={vm.phone} onChange={vm.onChangePhone} />
                            </Space.Compact>
                        </StyledInputLayout>
                        <StyledInputLayout>
                            <Input value={vm.email} onChange={vm.onChangeEmail} />
                        </StyledInputLayout>
                    </Card>
                    <Card title="Должности" bordered={true} style={{ width: 300 }}>
                        <List
                            footer={<StyledPostListFooter onClick={vm.onClickAddPost}><PlusCircleOutlined /></StyledPostListFooter>}
                            dataSource={vm.posts}
                            renderItem={(item) => {
                                return (
                                <List.Item>
                                    <StyledPostListItemLayout>
                                        <div onClick={() => vm.onClickPostListItem(item)}>
                                            {item.main ? <strong>{`${item.name} с ${dayjs(item.firstWorkDay).toDate().toLocaleDateString()}`}</strong>
                                                : `${item.name} с ${dayjs(item.firstWorkDay).toDate().toLocaleDateString()}`}
                                        </div>
                                        <DeleteOutlined onClick={() => vm.deletePost(item)} />
                                    </StyledPostListItemLayout>
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
                        onChange={vm.onChangeAdditionalInfo}
                        value={vm.additionalInfo} />
                </Card>
            </ModalMainLayout>
        </Modal>
    );
}

export const EmployeeWindow = observer(EmployeeWindowElement);

export const showEmployeeWindow = (props: EmployeeWindowProps) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const element = createElement(EmployeeWindow, {...props});
    ReactDOM.render(element, container);
}