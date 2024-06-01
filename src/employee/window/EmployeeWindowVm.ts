import {action, makeObservable, observable} from "mobx";
import {send} from "../../common/Controller";
import {showError} from "../../common/ErrorAlert.ts";
import {SyntheticEvent} from "react";
import dayjs, {Dayjs} from "dayjs";
import {showAddEditPostWindow} from "./post/window/AddEditPostWindow.ts";
import {ADD_EDIT_RESPONSE_ERROR_TEXT, PostResponseText} from "./post/window/AddEditPostWindowVm";
import {showWarn} from "../../common/WarnAlert.ts";

export interface EmployeeWindowProps {
    id: string,
    onSave: VoidFunction;
}

export interface PostResponse {
    id: string,
    employeeId: string,
    name: string,
    schedule: string,
    firstWorkDay: Date,
    main: boolean
}

interface Employee {
    id: string,
    name: string,
    surname: string,
    patronymic?: string,
    active: boolean,
    dateOfBirth: Date,
    phone: string,
    email: string,
    posts: PostResponse[],
    additionalInfo: string
}

export class EmployeeWindowVm {
    private readonly _id: string;
    private readonly _onSave: VoidFunction;
    private _name: string = "";
    private _surname: string = "";
    private _patronymic?: string;
    private _dateOfBirth: Date = new Date();
    private _active: boolean = true;
    private _isOpen: boolean = true;
    private _phone: string = "";
    private _email: string = "";
    private _additionalInfo: string = "";
    private _posts: PostResponse[] = [];

    public constructor(props: EmployeeWindowProps) {
        makeObservable<EmployeeWindowVm,
            "onLoadInitData" |
            "_dateOfBirth" |
            "_name" |
            "_surname" |
            "_patronymic" |
            "_active" |
            "_isOpen" |
            "_phone" |
            "_email" |
            "_additionalInfo" |
            "_posts"
        >
        (this, {
            _name: observable,
            _surname: observable,
            _patronymic: observable,
            _active: observable,
            _isOpen: observable,
            _phone: observable,
            _email: observable,
            _additionalInfo: observable,
            _posts: observable,
            _dateOfBirth: observable,
            save: action.bound,
            close: action.bound,
            onChangeName: action.bound,
            onChangeSurname: action.bound,
            onChangePatronymic: action.bound,
            onChangePhone: action.bound,
            onChangeEmail: action.bound,
            onChangeAdditionalInfo: action.bound,
            onClickAddPost: action.bound,
            onClickPostListItem: action.bound,
            loadInitData: action.bound,
            onLoadInitData: action.bound
        });
        this._id = props.id;
        this._onSave = props.onSave;
    }

    public loadInitData() {
        send<Employee>('employee_window', 'GET', undefined, [this._id])
            .then((response) => {
                this.onLoadInitData(response)
            })
            .catch(() => showError())
    }

    public save() {
        const request = {
            id: this._id,
            name: this._name,
            surname: this._surname,
            patronymic: this._patronymic,
            active: this._active,
            dateOfBirth: this._dateOfBirth.getTime(),
            phone: this._phone,
            email: this._email,
            additionalInfo: this._additionalInfo
        }
        send('employee_window/add_edit', 'POST', request)
            .then(() => {
                this.close()
            })
    }

    public onClickPostListItem(item: PostResponse) {
        showAddEditPostWindow({ post: item, onSave: this.loadInitData, employeeId: this._id })
    }

    public onClickAddPost() {
        showAddEditPostWindow({ onSave: this.loadInitData, employeeId: this._id })
    }

    public close() {
        this._onSave();
        this._isOpen = false;
    }

    public onChangeName(event: SyntheticEvent) {
        this._name = (event.target as HTMLInputElement).value;
    }

    public onChangeSurname(event: SyntheticEvent) {
        this._surname = (event.target as HTMLInputElement).value;
    }

    public onChangePatronymic(event: SyntheticEvent) {
        this._patronymic = (event.target as HTMLInputElement).value;
    }

    public onChangePhone(event: SyntheticEvent) {
        this._phone = (event.target as HTMLInputElement).value;
    }

    public onChangeEmail(event: SyntheticEvent) {
        this._email = (event.target as HTMLInputElement).value;
    }

    public onChangeDateOfBirth(date: Dayjs) {
        this._dateOfBirth = date.toDate();
    }

    public onChangeAdditionalInfo(event: SyntheticEvent) {
        this._additionalInfo = (event.target as HTMLInputElement).value;
    }

    public deletePost(post: PostResponse) {
        send<PostResponseText>('post', 'DELETE', undefined, [post.id])
            .then((response) => {
                if (response.responseText == ADD_EDIT_RESPONSE_ERROR_TEXT) {
                    showWarn("У сотрудника должна быть одна главная должность")
                } else {
                    this.loadInitData()
                }
            })
    }

    public get isOpen() {
        return this._isOpen;
    }

    public get name() {
        return this._name;
    }

    public get surname() {
        return this._surname;
    }

    public get patronymic() {
        return this._patronymic;
    }

    public get dateOfBirth() {
        return dayjs(this._dateOfBirth);
    }

    public get phone() {
        return this._phone;
    }

    public get email() {
        return this._email;
    }

    public get posts() {
        return this._posts;
    }

    public get additionalInfo() {
        return this._additionalInfo;
    }

    private onLoadInitData(response: Employee) {
        this._name = response.name;
        this._surname = response.surname;
        this._patronymic = response.patronymic;
        this._active = response.active;
        this._dateOfBirth = dayjs(response.dateOfBirth).toDate();
        this._phone = response.phone;
        this._email = response.email;
        this._posts = response.posts;
        this._additionalInfo = response.additionalInfo;
        console.log(response)
    }
}