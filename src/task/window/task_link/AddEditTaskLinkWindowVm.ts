import {action, makeObservable, observable} from "mobx";
import {SyntheticEvent} from "react";
import {TaskLink} from "../AddEditTaskWindowVm";

export interface AddEditTaskLinkWindowProps {
    id?: string,
    shortName?: string,
    description?: string;
    url?: string;
    onSave: (item: TaskLink) => void
}

export class AddEditTaskLinkWindowVm {
    private readonly _id?: string;
    private _shortName?: string;
    private _description?: string;
    private _url?: string;
    private _isOpen: boolean = true;
    private readonly _onSave: (item: TaskLink) => void;

    public constructor(props: AddEditTaskLinkWindowProps) {
        makeObservable<AddEditTaskLinkWindowVm,
            "_shortName" |
            "_description" |
            "_url" |
            "_isOpen" |
            "_onSave"
        >
        (this, {
            _shortName: observable,
            _description: observable,
            _url: observable,
            _isOpen: observable,
            _onSave: observable,
            save: action.bound,
            close: action.bound,
            onChangeShortName: action.bound,
            onChangeDescription: action.bound,
            onChangeUrl: action.bound,
        });
        this._id = props.id;
        this._shortName = props.shortName;
        this._description = props.description;
        this._url = props.url;
        this._onSave = props.onSave;
    }

    public save() {
        const request: TaskLink = {
            id: this._id!!,
            shortName: this._shortName!!,
            description: this._description!!,
            url: this._url!!
        }
        this._onSave(request)
        this._isOpen = false;
    }

    public close() {
        this._isOpen = false;
    }

    public onChangeShortName(event: SyntheticEvent) {
        this._shortName = (event.target as HTMLInputElement).value;
    }

    public onChangeDescription(event: SyntheticEvent) {
        this._description = (event.target as HTMLInputElement).value;
    }

    public onChangeUrl(event: SyntheticEvent) {
        this._url = (event.target as HTMLInputElement).value;
    }

    public get shortName() {
        return this._shortName;
    }

    public get description() {
        return this._description;
    }

    public get url() {
        return this._url;
    }

    public get isOpen() {
        return this._isOpen;
    }
}