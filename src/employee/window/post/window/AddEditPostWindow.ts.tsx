import React, {createElement, useEffect, useState} from "react";
import {observer} from "mobx-react";
import {AddEditPostWindowProps, AddEditPostWindowVm} from "./AddEditPostWindowVm";
import ReactDOM from "react-dom";
import {Card, DatePicker, Input, Modal, Select, Space, Switch} from "antd";
import styled from "styled-components";

const StyledInputLayout = styled.div`
    padding-bottom: 10px;
`;

const StyledSwitchLayout = styled.div`
    padding-bottom: 10px;
    display: flex;
`;

const AddEditPostWindowElement = (props: AddEditPostWindowProps) => {
    const [vm] = useState(() => new AddEditPostWindowVm(props));

 return (
     <Modal title="Должность" open={vm.isOpen} onOk={vm.save} onCancel={vm.close} width={350} okText={"Сохранить"} cancelText={"Отмена"}>
         <Card title="Основная информация" bordered={true} style={{ width: 300 }}>
             <StyledInputLayout>
                 <Input placeholder="Имя" onChange={vm.onChangeName} value={vm.name} />
             </StyledInputLayout>
             <StyledInputLayout>
                 <Select
                     defaultValue={vm.schedule}
                     style={{ width: 120 }}
                     onChange={vm.onChangeSchedule}
                     options={vm.scheduleOptions}
                 />
             </StyledInputLayout>
             <StyledInputLayout>
                 <Space.Compact>
                     <Input style={{ width: '50%' }} value="В должности с" disabled={true} />
                     <DatePicker style={{ width: '50%' }} placeholder={"Дата рождения"} onChange={(date) => vm.onChangeFirstWorkDate(date)} value={vm.firstWorkDay} />
                 </Space.Compact>
             </StyledInputLayout>
             <StyledSwitchLayout>
                 <div style={{ paddingRight: "10px" }} >Основная</div>
                 <Switch onChange={vm.onChangeMain} value={vm.main} />
             </StyledSwitchLayout>
         </Card>
     </Modal>
 );
}

export const AddEditPostWindow = observer(AddEditPostWindowElement);

export const showAddEditPostWindow = (props: AddEditPostWindowProps) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const element = createElement(AddEditPostWindow, {...props});
    ReactDOM.render(element, container);
}