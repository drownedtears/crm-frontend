import {action, makeObservable, observable} from "mobx";
import {send} from "../common/Controller";
import dayjs from "dayjs";
import {showAddEditTaskWindow} from "./window/AddEditTaskWindow.ts";
import {TaskLink} from "./window/AddEditTaskWindowVm";

interface TaskPageResponse {
    tasks: TaskResponse[],
    totalElements: number
}

export interface TaskIdTitle {
    id: string,
    title: string
}

export interface EmployeeDisplay {
    id: string,
    name: string,
    surname: string,
    patronymic: string,
    mainPostName: string
}

export interface TaskResponse {
    id: string,
    title: string,
    description: string,
    endDate: Date,
    status: string,
    executor: EmployeeDisplay,
    inspector: EmployeeDisplay,
    taskLinks: TaskLink[],
    statusChangeComment: string
}

export interface GridTask {
    taskIdTitle: TaskIdTitle,
    description: string,
    executor: EmployeeDisplay,
    inspector: EmployeeDisplay,
    endDate: Date,
    status: string,
    taskLinks: TaskLink[],
    statusChangeComment: string
}

export class TaskGridVm {
    private _tasks: GridTask[] = [];
    private _totalElements: number = 0;
    private _menuTab: string = "IN_WORK";

    public constructor() {
        makeObservable<TaskGridVm, "onLoadInitData" | "_tasks" | "_totalElements" | "_menuTab">
        (this, {
            _tasks: observable,
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
        const request = {
            count: 5,
            page: page - 1,
            status: this._menuTab
        }
        send<TaskPageResponse>('task_grid', 'POST', request)
            .then((response) => {
                this.onLoadInitData(response)
            })
    }

    public onClickItem(id?: string) {
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
    }

    public onClickAddTask() {
        showAddEditTaskWindow({ onSave: this.loadInitData })
    }

    public get tasks() {
        return this._tasks;
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
    private onLoadInitData(taskPageResponse: TaskPageResponse) {
        this._totalElements = taskPageResponse.totalElements;
        this._tasks = taskPageResponse.tasks.map((task) => this.toGridTask(task))
    }

    private toGridTask(taskResponse: TaskResponse): GridTask {
        return {
            taskIdTitle: {id: taskResponse.id, title: taskResponse.title },
            description: taskResponse.description,
            executor: taskResponse.executor,
            inspector: taskResponse.inspector,
            endDate: dayjs(taskResponse.endDate).toDate(),
            status: taskResponse.status,
            taskLinks: taskResponse.taskLinks,
            statusChangeComment: taskResponse.statusChangeComment
        }
    }
}