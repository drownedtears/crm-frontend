import React, {useState} from 'react';
import './EntryPoint.css';
import {Route, Routes} from "react-router";
import {Menu, MenuProps} from "antd";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {EmployeeGrid} from "./employee/grid/EmployeeGrid.ts";
import {TaskGrid} from "./task/TaskGrid.ts";
import {ContractorGrid} from "./contractor/grid/ContractorGrid.ts";


type MenuItem = Required<MenuProps>['items'][number];

const MainLayout = styled.div`
  display: flex;
`;

const ContentLayout = styled.div`
    width: 100%;
`;

const HOST_NAME = "http://localhost:3000/"

const items: MenuItem[] = [
    {
        key: 'main',
        label: (
            <Link to={`${HOST_NAME}`}>
                Главная
            </Link>
        ),
    },
    {
        key: 'employee',
        label: (
            <Link to={`${HOST_NAME}employee`}>
                Сотрудники
            </Link>
        ),
    },
    {
        key: 'task',
        label: (
            <Link to={`${HOST_NAME}task`}>
                Задачи
            </Link>
        ),
    },
    {
        key: 'contractor',
        label: (
            <Link to={`${HOST_NAME}contractor`}>
                Контрагенты
            </Link>
        ),
    },
];

const EntryPointElement = () => {
  const [selectedKey, setCurrent] = useState('main');

  const onClick: MenuProps['onClick'] = (e) => {
      setCurrent(e.key);
  };
  return (
      <MainLayout>
          <Menu onClick={onClick} style={{ width: 200 }} selectedKeys={[selectedKey]} mode="inline" items={items} />
          <ContentLayout>
              <Routes>
                  <Route path={"/"} element={<div>todo Главная страница с новостями</div>} />
                  <Route path={"/employee"} element={<EmployeeGrid />} />
                  <Route path={"/task"} element={<TaskGrid />} />
                  <Route path={"/contractor"} element={<ContractorGrid />} />
              </Routes>
          </ContentLayout>
      </MainLayout>
  );
}

export const EntryPoint = EntryPointElement;
