import {action, makeObservable, observable} from "mobx";
import React, {SyntheticEvent} from "react";
import dayjs, {Dayjs} from "dayjs";
import {Contact} from "../ContractorGridVm";

export const ADD_EDIT_RESPONSE_ERROR_TEXT = "EMPLOYEE_CANT_HAVE_NO_MAIN_POST";

interface TypeOption {
    value: string,
    label: string
}

export interface AddEditContactWindowProps {
    onSave: VoidFunction
    contact?: Contact
}

export class AddEditContactWindowVm {
    private readonly _id?;
    private readonly _typeOptions: TypeOption[] = [];
    private readonly _onSave: VoidFunction;
    private _type?: string;
    private _value?: string;
    private _main?: boolean;
    private _isOpen: boolean = true;

    constructor(props: AddEditContactWindowProps) {
        makeObservable<AddEditContactWindowVm,
            "_isOpen" |
            "_value" |
            "_type" |
            "_main" |
            "save" |
            "close"
        >
        (this, {
            _value: observable,
            _type: observable,
            _main: observable,
            _isOpen: observable,
            close: action.bound,
            save: action.bound,
            onChangeSchedule: action.bound,
            onChangeName: action.bound,
            onChangeFirstWorkDate: action.bound,
            onChangeMain: action.bound
        });
        this._typeOptions = [
            { value: "EMAIL", label: "Эл. почта" },
            { value: "PHONE", label: "Номер телефона" },
        ];
        this._id = props.contact?.id;
        this._value = props.contact?.value;
        this._type = props.contact?.type ?? this._typeOptions[0].value;
        this._main = props.contact?.main;
        this._onSave = props.onSave;
    }

    public save() {
        /*
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
         */
    }

    public close() {
        this._isOpen = false;
    }

    public onChangeName(event: SyntheticEvent) {
        //this._name = (event.target as HTMLInputElement).value;
    }

    public onChangeSchedule(option: string) {
        //this._schedule = option;
    }

    public onChangeFirstWorkDate(date: Dayjs) {
        //this._firstWorkDay = date.toDate();
    }

    public onChangeMain(value: boolean) {
        this._main = value;
    }

    public get isOpen() {
        return this._isOpen;
    }

    public get value() {
        return this._value;
    }

    public get type() {
        return this._typeOptions.filter((option) => this._type === option.value)[0].value;
    }

    public get typeOptions() {
        return this._typeOptions;
    }

    public get main() {
        return this._main;
    }
}
