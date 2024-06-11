import {action, makeObservable, observable} from "mobx";
import React, {SyntheticEvent} from "react";
import {showError} from "../../common/ErrorAlert.ts";
import {send} from "../../common/Controller";
import {Contact} from "../grid/ContractorGridVm";
import {showAddEditContactWindow} from "../grid/contact/AddEditContactWindow.ts";

export const ADD_EDIT_RESPONSE_ERROR_TEXT = "EMPLOYEE_CANT_HAVE_NO_MAIN_POST";

export interface AddEditContractorWindowProps {
    onSave: VoidFunction
    id?: string
    type: string
    name?: string
    contactList: Contact[]
}

export class AddEditContractorWindowVm {
    private readonly _id?;
    private readonly _onSave: VoidFunction;
    private _name?: string;
    private _type?: string;
    private _isOpen: boolean = true;
    private readonly _contacts: Contact[] = [];

    constructor(props: AddEditContractorWindowProps) {
        makeObservable<AddEditContractorWindowVm,
            "_isOpen" |
            "_contacts" |
            "_name" |
            "_type" |
            "save" |
            "close"
        >
        (this, {
            _name: observable,
            _contacts: observable,
            _type: observable,
            _isOpen: observable,
            close: action.bound,
            save: action.bound,
            onChangeName: action.bound,
            onChangeType: action.bound
        });
        this._id = props.id;
        this._name = props.name;
        this._type = props.type;
        this._contacts = props.contactList;
        this._onSave = props.onSave;
    }

    public save() {
        const request = {
            id: this._id,
            name: this._name,
            type: this._type
        }
        send('contractor_window/add_edit', 'POST', request)
            .then(() => {
                this.close()
            })
            .catch(() => showError())
    }

    public close() {
        this._isOpen = false;
        this._onSave();
    }

    public get contacts(): Contact[] {
        return this._contacts;
    }

    public onClickAddContact() {
        //todo
    }

    public onClickContactListItem(item: Contact) {
        showAddEditContactWindow({
            contact: item,
            onSave: this.save
        })
    }

    public deleteContact(item: Contact) {
        //todo
    }

    public onChangeName(event: SyntheticEvent) {
        this._name = (event.target as HTMLInputElement).value;
    }

    public onChangeType(value: string){
        this._type = value;
    }

    public get isOpen() {
        return this._isOpen;
    }

    public get name() {
        return this._name;
    }

    public get type() {
        return this._type;
    }
}
