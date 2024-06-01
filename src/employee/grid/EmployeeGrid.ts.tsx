import React, {useEffect, useState} from 'react';
import { observer } from "mobx-react";
import {Menu, MenuProps, Space, Table, Tag} from 'antd';
import type { TableProps } from 'antd';
import {
    EmployeeGridVm,
    GridEmployee,
    FireCancelFireEmployee, EmployeeIdFullName,
} from "./EmployeeGridVm";
import styled from "styled-components";
import {LeftOutlined, PlusCircleOutlined, RightOutlined} from "@ant-design/icons";

const StyledContactsLayout = styled.div`
`;

const EmployeeGridLayout = styled.div`
`;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'Активные',
        key: 'active',
    },
    {
        label: 'Уволенные',
        key: 'fired',
    },
];

const EmployeeGridElement = () => {
    const [vm] = useState(() => new EmployeeGridVm());
    useEffect(() => vm.loadInitData(), [])
    return(
        <EmployeeGridLayout>
            <Menu onClick={(item) => vm.onChangeMenuTab(item.key)} selectedKeys={[vm.menuTab]} mode="horizontal" items={items}/>
            <Table
            columns={[
                {
                    title: 'Полное имя',
                    dataIndex: 'employeeIdFullName',
                    key: 'name',
                    render: (item: EmployeeIdFullName) => <div onClick={() => vm.onClickItem(item.id)}>{item.fullName}</div>
                },
                {
                    title: 'Дата рождения',
                    dataIndex: 'dateOfBirth',
                    key: 'dateOfBirth',
                },
                {
                    title: 'Должность',
                    dataIndex: 'post',
                    key: 'post',
                },
                {
                    title: 'Контакты',
                    dataIndex: 'contacts',
                    key: 'contacts',
                    render: (contacts: string[]) => <StyledContactsLayout><div>{contacts[0]}</div> <div>+7{contacts[1]}</div></StyledContactsLayout>
                },
                {
                    title: 'Уволить',
                    dataIndex: 'fireCancelFireEmployee',
                    width: 50,
                    key: 'fireCancelFireEmployee',
                    render: (fireEmployee: FireCancelFireEmployee) =>
                        <div style={{ display: "flex", justifyContent: "center" }} onClick={() => vm.employeeFireCancelFire(fireEmployee, true)}>
                            <RightOutlined />
                        </div>,
                    hidden: vm.menuTab != "active"
                },
                {
                    title: 'Нанять',
                    dataIndex: 'fireCancelFireEmployee',
                    width: 50,
                    key: 'fireCancelFireEmployee',
                    render: (fireEmployee: FireCancelFireEmployee) =>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <LeftOutlined onClick={() => vm.employeeFireCancelFire(fireEmployee, false)} />
                        </div>,
                    hidden: vm.menuTab == "active"
                }
            ]}
            footer={() => <div><PlusCircleOutlined onClick={vm.onClickAddEmployee} /></div>}
            dataSource={vm.employees}
            pagination={{
                onChange: vm.loadInitData,
                pageSize: 5,
                total: vm.totalElements
            }}
            style={{ cursor: "pointer" }}
            />
        </EmployeeGridLayout>
    );
}

export const EmployeeGrid = observer(EmployeeGridElement);