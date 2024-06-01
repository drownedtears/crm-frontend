import {action, makeObservable, observable} from "mobx";
import {send} from "../../common/Controller";
import {showError} from "../../common/ErrorAlert.ts";
import {SyntheticEvent} from "react";
import dayjs, {Dayjs} from "dayjs";
import {showAddEditPostWindow} from "./post/window/AddEditPostWindow.ts";
import {ADD_EDIT_RESPONSE_ERROR_TEXT, PostResponseText} from "./post/window/AddEditPostWindowVm";
import {showWarn} from "../../common/WarnAlert.ts";

export interface AddEmployeeWindowProps {
    onSave: VoidFunction;
}

export interface PostResponse {
    id: string,
    employeeId: string,
    name: string,
    schedule: string,
    firstWorkDate: Date,
    main: boolean
}

export class AddEmployeeWindowVm {
    private readonly _onSave: VoidFunction;
    private _name: string = "";
    private _surname: string = "";
    private _patronymic?: string;
    private _dateOfBirth: Date = new Date();
    private _active: boolean = true;
    private _isOpen: boolean = true;
    private _phone: string = "";
    private _email: string = "";

    public constructor(props: AddEmployeeWindowProps) {
        makeObservable<AddEmployeeWindowVm,
            "_name" |
            "_surname" |
            "_patronymic" |
            "_active" |
            "_isOpen" |
            "_dateOfBirth" |
            "_phone" |
            "_email"
        >
        (this, {
            _name: observable,
            _surname: observable,
            _patronymic: observable,
            _active: observable,
            _isOpen: observable,
            _phone: observable,
            _email: observable,
            _dateOfBirth: observable,
            save: action.bound,
            close: action.bound,
            onChangeName: action.bound,
            onChangeSurname: action.bound,
            onChangePatronymic: action.bound,
            onChangeDateOfBirth: action.bound,
            onChangePhone: action.bound,
            onChangeEmail: action.bound
        });
        this._onSave = props.onSave;
    }

    public save() {
        const request = {
            name: this._name,
            surname: this._surname,
            patronymic: this._patronymic,
            active: true,
            dateOfBirth: this._dateOfBirth.getTime(),
            phone: this._phone,
            email: this._email
        }
        send('employee_window/add_edit', 'POST', request)
            .then(() => {
                this.close()
            })
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

    public onChangeDateOfBirth(date: Dayjs) {
        this._dateOfBirth = date.toDate();
    }

    public onChangePhone(event: SyntheticEvent) {
        this._phone = (event.target as HTMLInputElement).value;
    }

    public onChangeEmail(event: SyntheticEvent) {
        this._email = (event.target as HTMLInputElement).value;
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
}