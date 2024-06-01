import React, {useEffect, useState} from 'react';
import { observer } from "mobx-react";
import {Menu, MenuProps, Space, Table, Tag} from 'antd';
import type { TableProps } from 'antd';
import styled from "styled-components";
import {LeftOutlined, PlusCircleOutlined, RightOutlined} from "@ant-design/icons";
import {EmployeeDisplay, TaskGridVm, TaskIdTitle} from "./TaskGridVm";
import {toFullName} from "../common/Utils";
import {EmployeeIdFullName} from "../employee/grid/EmployeeGridVm";

const StyledContactsLayout = styled.div`
`;

const EmployeeGridLayout = styled.div`
`;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'В работе',
        key: 'IN_WORK',
    },
    {
        label: 'На проверке',
        key: 'IN_REVIEW',
    },
    {
        label: 'Отмененные',
        key: 'CANCELED',
    },
    {
        label: 'Завершенные',
        key: 'COMPLETED',
    },
];

const TaskGridElement = () => {
    const [vm] = useState(() => new TaskGridVm());
    useEffect(() => vm.loadInitData(), [])
    return(
        <EmployeeGridLayout>
            <Menu onClick={(item) => vm.onChangeMenuTab(item.key)} selectedKeys={[vm.menuTab]} mode="horizontal" items={items}/>
            <Table
                columns={[
                    {
                        title: 'Название',
                        dataIndex: 'taskIdTitle',
                        key: 'taskIdTitle',
                        render: (item: TaskIdTitle) => <div onClick={() => vm.onClickItem(item.id)}>{item.title}</div>,
                        width: 400
                    },
                    {
                        title: 'Исполнитель',
                        dataIndex: 'executor',
                        key: 'executor',
                        render: (executor: EmployeeDisplay) => <div><strong>[{executor.mainPostName}] </strong>
                            {toFullName(executor.name, executor.surname, executor.patronymic)}</div>,
                        width: 300,
                    },
                    {
                        title: 'Проверяющий',
                        dataIndex: 'inspector',
                        key: 'inspector',
                        render: (inspector: EmployeeDisplay) => <div><strong>[{inspector.mainPostName}] </strong>
                            {toFullName(inspector.name, inspector.surname, inspector.patronymic)}</div>,
                        width: 300,
                    },
                    {
                        title: 'Срок выполнения',
                        dataIndex: 'endDate',
                        key: 'endDate',
                        render: (endDate: Date) => <div>{endDate.toLocaleDateString()}</div>,
                        width: 200
                    },
                ]}
                footer={() => <div><PlusCircleOutlined onClick={vm.onClickAddTask} /></div>}
                dataSource={vm.tasks}
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

export const TaskGrid = observer(TaskGridElement);