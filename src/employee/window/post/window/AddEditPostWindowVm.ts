import {action, makeObservable, observable} from "mobx";
import {PostResponse} from "../../EmployeeWindowVm";
import React, {SyntheticEvent} from "react";
import dayjs, {Dayjs} from "dayjs";
import {send} from "../../../../common/Controller";
import {showWarn} from "../../../../common/WarnAlert.ts";
import {showError} from "../../../../common/ErrorAlert.ts";

export const ADD_EDIT_RESPONSE_ERROR_TEXT = "EMPLOYEE_CANT_HAVE_NO_MAIN_POST";

export interface PostResponseText {
    responseText: string
}

interface ScheduleOption {
    value: string,
    label: string
}

export interface AddEditPostWindowProps {
    onSave: VoidFunction
    post?: PostResponse
    employeeId: string
}

export class AddEditPostWindowVm {
    private readonly _id?;
    private readonly _employeeId?;
    private readonly _scheduleOptions: ScheduleOption[] = [];
    private readonly _onSave: VoidFunction;
    private _name?: string;
    private _schedule?: string;
    private _firstWorkDay: Date;
    private _main?: boolean;
    private _isOpen: boolean = true;

    constructor(props: AddEditPostWindowProps) {
        makeObservable<AddEditPostWindowVm,
            "_isOpen" |
            "_name" |
            "_schedule" |
            "_firstWorkDay" |
            "_main" |
            "save" |
            "close"
        >
        (this, {
            _name: observable,
            _schedule: observable,
            _firstWorkDay: observable,
            _main: observable,
            _isOpen: observable,
            close: action.bound,
            save: action.bound,
            onChangeSchedule: action.bound,
            onChangeName: action.bound,
            onChangeFirstWorkDate: action.bound,
            onChangeMain: action.bound
        });
        this._scheduleOptions = [
            { value: "FIVE_TWO", label: "5/2" },
            { value: "TWO_TWO", label: "2/2" },
            { value: "THREE_ONE", label: "3/1" },
        ];
        this._id = props.post?.id;
        this._employeeId = props.employeeId;
        this._name = props.post?.name;
        this._schedule = props.post?.schedule ?? this._scheduleOptions[0].value;
        this._firstWorkDay = dayjs(props.post?.firstWorkDay).toDate() ?? dayjs(new Date()).toDate();
        this._main = props.post?.main;
        this._onSave = props.onSave;
    }

    public save() {
        const request = {
            id: this._id,
            employeeId: this._employeeId,
            name: this._name,
            schedule: this._schedule,
            firstWorkDay: this._firstWorkDay?.getTime(),
            main: this._main,
        }
        send<PostResponseText>('post/add_edit', 'POST', request)
            .then((response) => {
                if (response.responseText == ADD_EDIT_RESPONSE_ERROR_TEXT) {
                    showWarn("У сотрудника должна быть одна главная должность")
                } else {
                    this.close()
                    this._onSave()
                }
            })
            .catch(() => showError())
    }

    public close() {
        this._isOpen = false;
    }

    public onChangeName(event: SyntheticEvent) {
        this._name = (event.target as HTMLInputElement).value;
    }

    public onChangeSchedule(option: string) {
        this._schedule = option;
    }

    public onChangeFirstWorkDate(date: Dayjs) {
        this._firstWorkDay = date.toDate();
    }

    public onChangeMain(value: boolean) {
        this._main = value;
    }

    public get isOpen() {
        return this._isOpen;
    }

    public get name() {
        return this._name;
    }

    public get schedule() {
        return this._scheduleOptions.filter((option) => this._schedule === option.value)[0].value;
    }

    public get scheduleOptions() {
        return this._scheduleOptions;
    }

    public get firstWorkDay() {
        return dayjs(this._firstWorkDay);
    }

    public get main() {
        return this._main;
    }
}