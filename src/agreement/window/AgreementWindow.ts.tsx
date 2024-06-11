import React, {createElement, useEffect, useState} from "react";
import {Card, DatePicker, Input, List, Modal, Radio, Select, Space} from "antd";
import {observer} from "mobx-react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import TextArea from "antd/es/input/TextArea";
import {DeleteOutlined, PlusCircleOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {AgreementWindowProps, AgreementWindowVm} from "./AgreementWindowVm";

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

const AgreementWindowElement = (props: AgreementWindowProps) => {
    const [vm] = useState(() => new AgreementWindowVm(props));
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
                            <Space wrap>
                                Ответственный
                                <Select
                                    defaultValue={vm.responsible}
                                    style={{ width: 250 }}
                                    onChange={vm.onChangeResponsible}
                                    value={vm.responsible}
                                    options={vm.employees}
                                />
                            </Space>
                        </StyledInputLayout>
                        <StyledInputLayout>
                            <Space wrap>
                                Контрагент
                                <Select
                                    defaultValue={vm.contractor}
                                    style={{ width: 250 }}
                                    onChange={vm.onChangeContractor}
                                    value={vm.contractor}
                                    options={vm.contractors}
                                />
                            </Space>
                        </StyledInputLayout>
                        <StyledInputLayout>
                            <Space wrap>
                                Сумма, Руб.
                                <Input placeholder="Сумма" onChange={vm.onChangeTitle} value={vm.sum} />
                            </Space>
                        </StyledInputLayout>
                    </Card>
                    <Card title="Дополнительная информация" bordered={true} style={{ width: 300, height: 350 }}>
                        <StyledInputLayout>
                            <TextArea
                                autoSize={{ minRows: 4, maxRows: 4 }}
                                placeholder="Дополнительная информация"
                                maxLength={300}
                                onChange={vm.onChangeDescription}
                                value={vm.description} />
                        </StyledInputLayout>
                        <div>Связанная задача</div>
                        <TextArea
                            autoSize={{ minRows: 2, maxRows: 2 }}
                            placeholder="Кликните чтобы перейти к задаче №2"
                            value={"Кликните чтобы перейти к задаче №2"} />
                    </Card>
                </FirstCardRowLayout>
                <Card title={"Действия"} bordered={true} style={{ width: "100%", height: 220 }}>
                    <ActionMenuLayout>
                        <Radio.Group style={{ width: "200px" }} onChange={(event) => vm.onChangeStatus(event.target.value)} value={vm.status}>
                            <Space direction="vertical">
                                <Radio value={"IN_PROGRESS"}>В процессе выполнения</Radio>
                                <Radio value={"IN_REVIEW"}>Отменить</Radio>
                                <Radio value={"CANCELED"}>Завершить</Radio>
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

export const AgreementWindow = observer(AgreementWindowElement);

export const showAgreementWindow = (props: AgreementWindowProps) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const element = createElement(AgreementWindow, {...props});
    ReactDOM.render(element, container);
}
