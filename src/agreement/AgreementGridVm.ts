import {action, makeObservable, observable} from "mobx";
import {send} from "../common/Controller";
import dayjs, {Dayjs} from "dayjs";
import {EmployeeDisplay} from "../task/TaskGridVm";
import {ContractorIdName, ContractorResponse} from "../contractor/grid/ContractorGridVm";
import {EmployeeResponse} from "../employee/grid/EmployeeGridVm";
import {PostResponse} from "../employee/window/EmployeeWindowVm";
import {showAgreementWindow} from "./window/AgreementWindow.ts";

interface AgreementPageResponse {
    agreements: AgreementResponse[],
    totalElements: number
}

export interface AgreementIdTittle {
    id: string,
    title: string
}

export interface AgreementResponse {
    id: string,
    title: string,
    description: string,
    contractor: ContractorResponse
    endDate?: Date,
    status: string,
    sum: number,
    responsible: EmployeeDisplay,
    taskId: string,
    statusChangeComment: string
}

export interface GridAgreement {
    agreementIdTittle: AgreementIdTittle,
    description: string,
    contractorIdName: ContractorIdName,
    endDate: Date,
    responsible: EmployeeDisplay,
    taskId: string,
    status: string,
    sum: number,
    statusChangeComment: string
}

export class AgreementGridVm {
    private _agreements: GridAgreement[] = [];
    private _totalElements: number = 0;
    private _menuTab: string = "IN_WORK";

    public constructor() {
        makeObservable<AgreementGridVm, "onLoadInitData" | "_agreements" | "_totalElements" | "_menuTab">
        (this, {
            _agreements: observable,
            _menuTab: observable,
            _totalElements: observable,
            loadInitData: action.bound,
            onLoadInitData: action.bound,
            onChangeMenuTab: action.bound,
            onClickItem: action.bound,
            onClickAddTask: action.bound
        });
    }

    public loadInitData(page: number = 1) {
        const response: AgreementPageResponse = {
                agreements: [
                    {
                        id: "1",
                        title: "Закупка сахара",
                        description: "Закупка сахара \"Солнышко\" в количестве 5кг",
                        contractor:
                            {
                                id: "2222",
                                name: "ООО Фабрика Грез",
                                contactList: []
                            },
                        endDate: undefined,
                        status: "IN_PROGRESS",
                        sum: 1000,
                        responsible:
                            {
                                id: "1111",
                                name: "Докетов",
                                surname: "Александр",
                                patronymic: "Сергеевич",
                                mainPostName: "Директор"
                            },
                        taskId: "11111",
                        statusChangeComment: ""
                    }
                ],
            totalElements: 1
        }
        this.onLoadInitData(response)
        //todo remove mock
        /*
        const request = {
            count: 5,
            page: page - 1,
            status: this._menuTab
        }
        send<AgreementPageResponse>('task_grid', 'POST', request)
            .then((response) => {
                this.onLoadInitData(response)
            })
         */
    }

    public onClickItem(id?: string) {
        const agreement = this._agreements.filter((agreement) => agreement.agreementIdTittle.id === id)[0]
        showAgreementWindow({
            id: agreement.agreementIdTittle.id,
            title: agreement.agreementIdTittle.title,
            description: agreement.description,
            responsible: agreement.responsible,
            contractor: agreement.contractorIdName,
            onSave: this.loadInitData,
            endDate: agreement.endDate,
            status: agreement.status,
            sum: agreement.sum,
            statusChangeComment: agreement.statusChangeComment
        })
        /*
        const gridTask = this._tasks.filter((task) => task.taskIdTitle.id === id)[0];
        showAddEditTaskWindow({
            id: gridTask.taskIdTitle.id,
            title: gridTask.taskIdTitle.title,
            description: gridTask.description,
            executor: gridTask.executor,
            inspector: gridTask.inspector,
            endDate: gridTask.endDate,
            status: gridTask.status,
            onSave: this.loadInitData,
            taskLinks: gridTask.taskLinks,
            statusChangeComment: gridTask.statusChangeComment
        })

         */
    }

    public onClickAddTask() {
        //showAddEditTaskWindow({ onSave: this.loadInitData })
    }

    public get agreements() {
        return this._agreements;
    }

    public get totalElements() {
        return this._totalElements;
    }

    public get menuTab() {
        return this._menuTab;
    }

    public onChangeMenuTab(menuTab: string) {
        this._menuTab = menuTab;
        this.loadInitData()
    }
    private onLoadInitData(taskPageResponse: AgreementPageResponse) {
        this._totalElements = taskPageResponse.totalElements;
        this._agreements = taskPageResponse.agreements.map((agreement) => this.toGridAgreement(agreement))
    }

    private toGridAgreement(agreementResponse: AgreementResponse): GridAgreement {
        return {
            agreementIdTittle: {id: agreementResponse.id, title: agreementResponse.title },
            description: agreementResponse.description,
            responsible: agreementResponse.responsible,
            contractorIdName: { id: agreementResponse.contractor.id, name: agreementResponse.contractor.name },
            endDate: dayjs(agreementResponse.endDate).toDate(),
            status: agreementResponse.status,
            sum: agreementResponse.sum,
            statusChangeComment: agreementResponse.statusChangeComment,
            taskId: agreementResponse.taskId
        }
    }
}
