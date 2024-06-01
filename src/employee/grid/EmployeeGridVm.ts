import {action, makeObservable, observable} from "mobx";
import {send} from "../../common/Controller";
import {toFullName} from "../../common/Utils";
import {showEmployeeWindow} from "../window/EmployeeWindow.ts";
import dayjs, {Dayjs} from "dayjs";
import {PostResponse} from "../window/EmployeeWindowVm";
import {showAddEmployeeWindow} from "../window/AddEmployeeWindow.ts";
import {RightOutlined} from "@ant-design/icons";
import React from "react";

export interface FireCancelFireEmployee {
    id: string,
    onFireCancelEmployee: VoidFunction
}

interface EmployeePageResponse {
    employees: EmployeeResponse[],
    totalElements: number
}

export interface EmployeeResponse {
    id: string,
    name: string,
    surname: string,
    patronymic: string,
    dateOfBirth: Dayjs,
    posts: PostResponse[],
    phone: string,
    email: string
}

export interface EmployeeIdFullName {
    id: string,
    fullName: string,
}

export interface GridEmployee {
    employeeIdFullName: EmployeeIdFullName
    dateOfBirth: string,
    post: string,
    contacts: string[],
    fireCancelFireEmployee: FireCancelFireEmployee
}

export class EmployeeGridVm {
    private _employees: GridEmployee[] = [];
    private _totalElements: number = 0;
    private _menuTab: string = "active";

    public constructor() {
        makeObservable<EmployeeGridVm, "onLoadInitData" | "_employees" | "_totalElements" | "_menuTab">
        (this, {
            _employees: observable,
            _menuTab: observable,
            _totalElements: observable,
            onClickItem: action.bound,
            loadInitData: action.bound,
            onLoadInitData: action.bound,
            onClickAddEmployee: action.bound,
            employeeFireCancelFire: action.bound
        });
    }

    public get employees() {
        return this._employees;
    }

    public get menuTab() {
        return this._menuTab
    }

    public loadInitData(page: number = 1) {
        const request = {
            count: 5,
            page: page - 1,
            active: this._menuTab == "active"
        }
        send<EmployeePageResponse>('employee_grid', 'POST', request)
            .then((response) => {
                this.onLoadInitData(response)
            })
    }

    public onChangeMenuTab(tab: string) {
        this._menuTab = tab;
        this.loadInitData()
    }

    public onClickAddEmployee() {
        showAddEmployeeWindow({ onSave: this.loadInitData })
    }

    public onClickItem(id: string) {
        showEmployeeWindow({ id: id, onSave: this.loadInitData })
    }

    public get totalElements() {
        return this._totalElements;
    }

    public employeeFireCancelFire(fireCancelFireEmployee: FireCancelFireEmployee, fire: boolean) {
        const request = {
            employeeId: fireCancelFireEmployee.id,
            fire: fire
        }
        send(`employee_grid/fire_cancel_fire`, 'POST', request)
            .then(() => {
                fireCancelFireEmployee.onFireCancelEmployee()
            })
    }

    private onLoadInitData(response: EmployeePageResponse) {
        console.log(response.totalElements)
        this._totalElements = response.totalElements
        this._employees = response.employees.map((employeeResponse) => this.toGridEmployee(employeeResponse))
    }

    private toGridEmployee(employeeResponse: EmployeeResponse): GridEmployee {
        const dateOfBirth = dayjs(employeeResponse.dateOfBirth).toDate()
        const mainPost = employeeResponse.posts.filter((post) => post.main)[0]
        return {
            employeeIdFullName: { id: employeeResponse.id, fullName: toFullName(employeeResponse.name, employeeResponse.surname, employeeResponse.patronymic) },
            dateOfBirth: dateOfBirth.toLocaleDateString(),
            post: mainPost ? `${mainPost?.name} с ${dayjs(mainPost?.firstWorkDay).toDate().toLocaleDateString()}` : "",
            contacts: [employeeResponse.email, employeeResponse.phone],
            fireCancelFireEmployee: { id: employeeResponse.id, onFireCancelEmployee: this.loadInitData }
        }
    }
}