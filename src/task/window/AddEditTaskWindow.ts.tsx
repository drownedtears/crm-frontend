import React, {createElement, useEffect, useState} from "react";
import {Card, DatePicker, Input, List, Modal, Radio, Select, Space} from "antd";
import {observer} from "mobx-react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import {AddEditTaskWindowProps, AddEditTaskWindowVm} from "./AddEditTaskWindowVm";
import TextArea from "antd/es/input/TextArea";
import {DeleteOutlined, PlusCircleOutlined} from "@ant-design/icons";
import dayjs from "dayjs";

const StyledInputLayout = styled.div`
    padding-bottom: 10px;
`;

const ModalMainLayout = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

const StyledTaskLinkListFooter = styled.div`
    cursor: pointer;
`;

const FirstCardRowLayout = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
`;

const StyledTaskLinksListItemLayout = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
`;

const ActionMenuLayout = styled.div`
    display: flex;
    padding-bottom: 20px;
`;

const AddEditTaskWindowElement = (props: AddEditTaskWindowProps) => {
    const [vm] = useState(() => new AddEditTaskWindowVm(props));
    useEffect(() => vm.loadInitData(), [])

    return (
        <Modal title="Задача" open={vm.isOpen} onOk={vm.save} onCancel={vm.close} width={675} okText={"Сохранить"} cancelText={"Отмена"}>
            <ModalMainLayout>
                <FirstCardRowLayout>
                    <Card title="Основная информация" bordered={true} style={{ width: 300 }}>
                        <StyledInputLayout>
                            <Input placeholder="Название" onChange={vm.onChangeTitle} value={vm.title} />
                        </StyledInputLayout>
                        <StyledInputLayout>
                            <Space.Compact>
                                <Input style={{ width: '50%' }} value="Срок выполнения" disabled={true}/>
                                <DatePicker style={{ width: '50%' }} placeholder={"Срок выполнения"} onChange={(date) => vm.onChangeEndDate(date)} value={vm.endDate} />
                            </Space.Compact>
                        </StyledInputLayout>
                        <StyledInputLayout>
                            <Space wrap>
                                Исполнитель
                                <Select
                                    defaultValue={vm.executor}
                                    style={{ width: 250 }}
                                    onChange={vm.onChangeExecutor}
                                    value={vm.executor}
                                    options={vm.employees}
                                />
                            </Space>
                        </StyledInputLayout>
                        <StyledInputLayout>
                            <Space wrap>
                                Проверяющий
                                <Select
                                    defaultValue={vm.inspectorId}
                                    style={{ width: 250 }}
                                    onChange={vm.onChangeInspector}
                                    value={vm.inspectorId}
                                    options={vm.employees}
                                />
                            </Space>
                        </StyledInputLayout>
                    </Card>
                    <Card title="Дополнительная информация" bordered={true} style={{ width: 300 }}>
                        <StyledInputLayout>
                            <TextArea
                                autoSize={{ minRows: 4, maxRows: 4 }}
                                placeholder="Дополнительная информация"
                                maxLength={300}
                                onChange={vm.onChangeDescription}
                                value={vm.description} />
                        </StyledInputLayout>
                        <StyledInputLayout>
                            <List
                                header={<strong>Ссылки</strong>}
                                footer={<StyledTaskLinkListFooter onClick={vm.onClickAddTaskLink}><PlusCircleOutlined /></StyledTaskLinkListFooter>}
                                dataSource={vm.taskLinks}
                                renderItem={(item) => {
                                    return (
                                        <List.Item>
                                            <StyledTaskLinksListItemLayout>
                                                <div onClick={() => vm.onClickTaskLinkListItem(item)}>
                                                    {item.shortName}
                                                </div>
                                                <DeleteOutlined onClick={() => vm.deleteTaskLink(item)} />
                                            </StyledTaskLinksListItemLayout>
                                        </List.Item>
                                    )}}
                            />
                        </StyledInputLayout>
                    </Card>
                </FirstCardRowLayout>
                <Card title="Действия" bordered={true} style={{ width: "100%", height: 220 }}>
                    <ActionMenuLayout>
                        <Radio.Group style={{ width: "200px" }} onChange={(event) => vm.onChangeStatus(event.target.value)} value={vm.status}>
                            <Space direction="vertical">
                                <Radio value={"IN_WORK"}>В работе</Radio>
                                <Radio value={"IN_REVIEW"}>На проверке</Radio>
                                <Radio value={"CANCELED"}>Отменена</Radio>
                                <Radio value={"COMPLETED"}>Выполнена</Radio>
                            </Space>
                        </Radio.Group>
                        <TextArea
                            autoSize={{ minRows: 5, maxRows: 5 }}
                            placeholder="Комментарий при изменении статуса"
                            maxLength={300}
                            onChange={vm.onChangeStatusChangeComment}
                            value={vm.statusChangeComment} />
                    </ActionMenuLayout>
                </Card>
            </ModalMainLayout>
        </Modal>
    );
}

export const AddEditTaskWindow = observer(AddEditTaskWindowElement);

export const showAddEditTaskWindow = (props: AddEditTaskWindowProps) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const element = createElement(AddEditTaskWindow, {...props});
    ReactDOM.render(element, container);
}