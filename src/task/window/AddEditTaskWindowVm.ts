import {action, makeObservable, observable} from "mobx";
import {send} from "../../common/Controller";
import {SyntheticEvent} from "react";
import dayjs, {Dayjs} from "dayjs";
import {EmployeeDisplay} from "../TaskGridVm";
import {toFullName, toShortName} from "../../common/Utils";
import {showAddEditTaskLinkWindow} from "./task_link/AddEditTaskLinkWindow.ts";

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

export interface AddEditTaskWindowProps {
    id?: string,
    title?: string,
    description?: string,
    executor?: EmployeeDisplay,
    inspector?: EmployeeDisplay,
    onSave: VoidFunction
    endDate?: Date;
    status?: string;
    taskLinks?: TaskLink[];
    statusChangeComment?: string;
}

export class AddEditTaskWindowVm {
    private readonly _id?: string;
    private readonly _onSave: VoidFunction;
    private _title?: string;
    private _description?: string;
    private _endDate: Date = dayjs(new Date()).toDate();
    private _status?: string;
    private _executorId?: string;
    private _inspectorId?: string;
    private _isOpen: boolean = true;
    private _employees: EmployeeSelectOption[] = [];
    private _taskLinks: TaskLink[] = [];
    private _statusChangeComment?: string;

    public constructor(props: AddEditTaskWindowProps) {
        makeObservable<AddEditTaskWindowVm,
            "_title" |
            "_employees" |
            "_description" |
            "_status" |
            "_statusChangeComment" |
            "_taskLinks" |
            "_isOpen" |
            "_endDate" |
            "_executorId" |
            "_inspectorId" |
            "onAddTaskLink"
        >
        (this, {
            _title: observable,
            _description: observable,
            _isOpen: observable,
            _endDate: observable,
            _status: observable,
            _executorId: observable,
            _inspectorId: observable,
            _statusChangeComment: observable,
            _employees: observable,
            _taskLinks: observable,
            save: action.bound,
            close: action.bound,
            loadInitData: action.bound,
            onChangeTitle: action.bound,
            onChangeDescription: action.bound,
            onChangeEndDate: action.bound,
            onChangeExecutor: action.bound,
            onChangeInspector: action.bound,
            onClickTaskLinkListItem: action.bound,
            onAddTaskLink: action.bound,
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
        this._executorId = props.executor ? props.executor.id : undefined;
        this._inspectorId = props.inspector ? props.inspector.id : undefined;
        this._onSave = props.onSave;
        this._taskLinks = props.taskLinks ?? [];
        this._statusChangeComment = props.statusChangeComment;
    }

    public loadInitData() {
        send<EmployeesResponse>('task_window/employees', 'GET')
            .then((response) => {
                this._employees = response.employees.map((employee): EmployeeSelectOption => {
                    return {value: employee.id, label: `[${employee.mainPostName}] ${toShortName(employee.name, employee.surname, employee.patronymic)}`}
                });
            })
    }

    public save() {
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

    public onChangeExecutor(executor: string) {
        this._executorId = executor;
    }

    public onChangeInspector(inspector: string) {
        this._inspectorId = inspector;
    }

    public onChangeStatusChangeComment(event: SyntheticEvent) {
        this._statusChangeComment = (event.target as HTMLInputElement).value;
    }

    public onChangeStatus(value: string) {
        this._status = value;
    }

    public onClickAddTaskLink() {
        showAddEditTaskLinkWindow({ onSave: this.onAddTaskLink })
    }

    public onClickTaskLinkListItem(item: TaskLink) {
        showAddEditTaskLinkWindow({
            onSave: this.onAddTaskLink,
            id: item.id,
            shortName: item.shortName,
            description: item.description,
            url: item.url
        })
    }

    public deleteTaskLink(item: TaskLink) {
        const itemIndex = this._taskLinks.indexOf(item);
        this._taskLinks = this._taskLinks.splice(itemIndex, 1);

    }

    public get taskLinks() {
        return this._taskLinks;
    }

    public get status() {
        return this._status;
    }

    public get employees() {
        return this._employees;
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

    public get executor() {
        return this._executorId;
    }

    public get inspectorId() {
        return this._inspectorId;
    }

    public onAddTaskLink(item: TaskLink) {
        this._taskLinks = [...this._taskLinks.filter((taskLink) => taskLink.id != item.id), item];
    }
}