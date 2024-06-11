import React, {useEffect, useState} from 'react';
import { observer } from "mobx-react";
import {Menu, MenuProps, Space, Table, Tag} from 'antd';
import type { TableProps } from 'antd';
import styled from "styled-components";
import {LeftOutlined, PlusCircleOutlined, RightOutlined} from "@ant-design/icons";
import {toFullName} from "../common/Utils";
import {EmployeeIdFullName} from "../employee/grid/EmployeeGridVm";
import {AgreementGridVm, AgreementIdTittle} from "./AgreementGridVm";
import {EmployeeDisplay} from "../task/TaskGridVm";
import {ContractorIdName} from "../contractor/grid/ContractorGridVm";

const StyledContactsLayout = styled.div`
`;

const EmployeeGridLayout = styled.div`
`;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'В процессе',
        key: 'IN_WORK',
    },
    {
        label: 'Отменены',
        key: 'IN_REVIEW',
    },
    {
        label: 'Выполнены',
        key: 'CANCELED',
    },
];

const AgreementGridElement = () => {
    const [vm] = useState(() => new AgreementGridVm());
    useEffect(() => vm.loadInitData(), [])
    return(
        <EmployeeGridLayout>
            <Menu onClick={(item) => vm.onChangeMenuTab(item.key)} selectedKeys={[vm.menuTab]} mode="horizontal" items={items}/>
            <Table
                columns={[
                    {
                        title: 'Название',
                        dataIndex: 'agreementIdTittle',
                        key: 'agreementIdTittle',
                        render: (item: AgreementIdTittle) => <div onClick={() => vm.onClickItem(item.id)}>{item.title}</div>,
                        width: 400
                    },
                    {
                        title: 'Контрагент',
                        dataIndex: 'contractorIdName',
                        key: 'contractorIdName',
                        render: (contractorIdName: ContractorIdName) => <div>{contractorIdName.name}</div>,
                        width: 300,
                    },
                    {
                        title: 'Ответственный',
                        dataIndex: 'responsible',
                        key: 'responsible',
                        render: (responsible: EmployeeDisplay) => <div><strong>[{responsible.mainPostName}] </strong>
                            {toFullName(responsible.name, responsible.surname, responsible.patronymic)}</div>,
                        width: 300,
                    },
                    {
                        title: 'Денежная сумма, Руб.',
                        dataIndex: 'sum',
                        key: 'sum',
                        render: (sum) => <div>{sum}</div>,
                        width: 200
                    },
                ]}
                footer={() => <div><PlusCircleOutlined onClick={vm.onClickAddTask} /></div>}
                dataSource={vm.agreements}
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

export const AgreementGrid = observer(AgreementGridElement);
