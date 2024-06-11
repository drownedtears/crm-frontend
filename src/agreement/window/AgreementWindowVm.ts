import {action, makeObservable, observable} from "mobx";
import {send} from "../../common/Controller";
import {SyntheticEvent} from "react";
import dayjs, {Dayjs} from "dayjs";
import {toFullName, toShortName} from "../../common/Utils";
import {EmployeeDisplay} from "../../task/TaskGridVm";
import {ContractorIdName, ContractorResponse} from "../../contractor/grid/ContractorGridVm";

interface EmployeesResponse {
    employees: EmployeeDisplay[]
}

export interface EmployeeSelectOption {
    value: string,
    label: string
}

export interface TaskLink {
    id: string,
    shortName: string,
    description: string;
    url: string;
}

export interface AgreementWindowProps {
    id?: string,
    title?: string,
    description?: string,
    responsible?: EmployeeDisplay,
    contractor?: ContractorIdName,
    onSave: VoidFunction
    endDate?: Date;
    status?: string;
    sum?: number;
    statusChangeComment?: string;
}

export class AgreementWindowVm {
    private readonly _id?: string;
    private readonly _onSave: VoidFunction;
    private _title?: string;
    private _description?: string;
    private _endDate: Date = dayjs(new Date()).toDate();
    private _status?: string;
    private _responsibleId?: string;
    private _contractorId?: string;
    private _isOpen: boolean = true;
    private _employees: EmployeeSelectOption[] = [];
    //todo
    private _contractors: EmployeeSelectOption[] = [];
    private _sum?: number;
    private _statusChangeComment?: string;

    public constructor(props: AgreementWindowProps) {
        makeObservable<AgreementWindowVm,
            "_title" |
            "_employees" |
            "_description" |
            "_status" |
            "_statusChangeComment" |
            "_responsibleId" |
            "_isOpen" |
            "_endDate" |
            "_contractorId" |
            "_sum"
        >
        (this, {
            _title: observable,
            _description: observable,
            _isOpen: observable,
            _endDate: observable,
            _status: observable,
            _contractorId: observable,
            _sum: observable,
            _statusChangeComment: observable,
            _employees: observable,
            _responsibleId: observable,
            save: action.bound,
            close: action.bound,
            loadInitData: action.bound,
            onChangeTitle: action.bound,
            onChangeDescription: action.bound,
            onChangeEndDate: action.bound,
            onChangeResponsible: action.bound,
            onChangeContractor: action.bound,
            onClickTaskLinkListItem: action.bound,
            deleteTaskLink: action.bound,
            onClickAddTaskLink: action.bound,
            onChangeStatus: action.bound,
            onChangeStatusChangeComment: action.bound
        });
        this._id = props.id;
        this._title = props.title;
        this._description = props.description;
        this._endDate = dayjs(props.endDate).toDate();
        this._status = props.status;
        this._responsibleId = props.responsible ? props.responsible.id : undefined;
        this._contractorId = props.contractor ? props.contractor.id : undefined;
        this._onSave = props.onSave;
        this._sum = props.sum;
        this._statusChangeComment = props.statusChangeComment;
    }

    public loadInitData() {
        //todo remove mock
        const response: EmployeesResponse = {
            employees: [
                {
                    id: "1111",
                    name: "Александр",
                    surname: "Докетов",
                    patronymic: "Сергеевич",
                    mainPostName: "Директор"
                }
            ]
        }
        this._employees = response.employees.map((employee): EmployeeSelectOption => {
            return {value: employee.id, label: `[${employee.mainPostName}] ${toShortName(employee.name, employee.surname, employee.patronymic)}`}
        });
        const response2: ContractorResponse = {
            id: "2222",
            name: "ООО Фабрика Грез",
            contactList: []
        }
         this._contractors = [{ value: response2.id, label: response2.name}]
        /*
        send<EmployeesResponse>('task_window/employees', 'GET')
            .then((response) => {
                this._employees = response.employees.map((employee): EmployeeSelectOption => {
                    return {value: employee.id, label: `[${employee.mainPostName}] ${toShortName(employee.name, employee.surname, employee.patronymic)}`}
                });
            })
         */
    }

    public save() {
        /*
        const request = {
            id: this._id,
            title: this._title,
            description: this._description,
            executorId: this._executorId,
            inspectorId: this._inspectorId,
            endDate: this._endDate?.getTime(),
            status: this._status,
            taskLinks: this._taskLinks,
            statusChangeComment: this._statusChangeComment
        }
        send('task_window/add_edit', 'POST', request)
            .then(() => {
                this.close()
            })
         */
    }

    public close() {
        this._onSave();
        this._isOpen = false;
    }

    public onChangeTitle(event: SyntheticEvent) {
        this._title = (event.target as HTMLInputElement).value;
    }

    public onChangeDescription(event: SyntheticEvent) {
        this._description = (event.target as HTMLInputElement).value;
    }

    public onChangeEndDate(date: Dayjs) {
        this._endDate = date.toDate();
    }

    public onChangeContractor(contractorId: string) {
        this._contractorId = contractorId;
    }

    public onChangeResponsible(responsibleId: string) {
        this._responsibleId = responsibleId;
    }

    public onChangeStatusChangeComment(event: SyntheticEvent) {
        this._statusChangeComment = (event.target as HTMLInputElement).value;
    }

    public onChangeStatus(value: string) {
        this._status = value;
    }

    public onClickAddTaskLink() {
        //showAddEditTaskLinkWindow({ onSave: this.onAddTaskLink })
    }

    public onClickTaskLinkListItem(item: TaskLink) {
        /*
        showAddEditTaskLinkWindow({
            onSave: this.onAddTaskLink,
            id: item.id,
            shortName: item.shortName,
            description: item.description,
            url: item.url
        })

         */
    }

    public deleteTaskLink(item: TaskLink) {
        //const itemIndex = this._taskLinks.indexOf(item);
        //this._taskLinks = this._taskLinks.splice(itemIndex, 1);
    }

    public get sum() {
        return this._sum;
    }

    public get status() {
        return this._status;
    }

    public get employees() {
        return this._employees;
    }

    public get contractors() {
        return this._contractors;
    }

    public get statusChangeComment() {
        return this._statusChangeComment;
    }

    public get isOpen() {
        return this._isOpen;
    }

    public get title() {
        return this._title;
    }

    public get description() {
        return this._description;
    }

    public get endDate() {
        return dayjs(this._endDate);
    }

    public get contractor() {
        return this._contractorId;
    }

    public get responsible() {
        return this._responsibleId;
    }

}
