import React, {useEffect, useState} from 'react';
import { observer } from "mobx-react";
import {Menu, MenuProps, Space, Table, Tag} from 'antd';
import type { TableProps } from 'antd';
import styled from "styled-components";
import {LeftOutlined, PlusCircleOutlined, RightOutlined} from "@ant-design/icons";
import {Contact, ContractorGridVm, ContractorIdName} from "./ContractorGridVm";

const StyledContactsLayout = styled.div`
`;

const EmployeeGridLayout = styled.div`
`;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'Юр. лица',
        key: 'ENTERPRISE',
    },
    {
        label: 'Физ. лица',
        key: 'PHYSICAL',
    },
    {
        label: 'Частные',
        key: 'PERSON',
    },
];

const ContractorGridElement = () => {
    const [vm] = useState(() => new ContractorGridVm());
    useEffect(() => vm.loadInitData(), [])
    return(
        <EmployeeGridLayout>
            <Menu onClick={(item) => vm.onChangeMenuTab(item.key)} selectedKeys={[vm.menuTab]} mode="horizontal" items={items}/>
            <Table
                columns={[
                    {
                        title: 'Название',
                        dataIndex: 'contractorIdName',
                        key: 'contractorIdName',
                        render: (item: ContractorIdName) => <div onClick={() => vm.onClickContractorGridItem(item.id)}>{item.name}</div>
                    },
                    {
                        title: 'Основной контакт',
                        dataIndex: 'mainContact',
                        key: 'mainContact',
                        render: (item: Contact) => <div>{item.value}</div>
                    },
                ]}
                footer={() => <div><PlusCircleOutlined onClick={vm.onClickAddContractor} /></div>}
                dataSource={vm.contractors}
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

export const ContractorGrid = observer(ContractorGridElement);
