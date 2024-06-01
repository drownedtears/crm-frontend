import {action, makeObservable, observable} from "mobx";
import dayjs, {Dayjs} from "dayjs";
import {send} from "../../common/Controller";
import {showAddEditContractorWindow} from "../window/AddEditContractorWindow.ts";

interface ContractorPageResponse {
    contractors: ContractorResponse[],
    totalElements: number
}

export interface ContractorResponse {
    id: string,
    name: string,
}

export interface ContractorIdName {
    id: string,
    name: string,
}

export interface GridContractor {
    contractorIdName: ContractorIdName
}

export class ContractorGridVm {
    private _contractors: GridContractor[] = [];
    private _totalElements: number = 0;
    private _menuTab: string = "ENTERPRISE";

    public constructor() {
        makeObservable<ContractorGridVm, "onLoadInitData" | "_contractors" | "_totalElements" | "_menuTab">
        (this, {
            _contractors: observable,
            _menuTab: observable,
            _totalElements: observable,
            loadInitData: action.bound,
            onLoadInitData: action.bound,
            onClickContractorGridItem: action.bound,
            onClickAddContractor: action.bound
        });
    }

    public get contractors() {
        return this._contractors;
    }

    public get menuTab() {
        return this._menuTab
    }

    public loadInitData(page: number = 1) {
        const request = {
            count: 5,
            page: page - 1,
            type: this._menuTab
        }
        send<ContractorPageResponse>('contractor_grid', 'POST', request)
            .then((response) => {
                this.onLoadInitData(response)
            })
    }

    public onChangeMenuTab(tab: string) {
        this._menuTab = tab;
        this.loadInitData()
    }

    public onClickContractorGridItem(id: string) {
        const contractor = this._contractors.filter((contractor) => contractor.contractorIdName.id == id)[0];
        showAddEditContractorWindow({
            id: contractor.contractorIdName.id,
            name: contractor.contractorIdName.name,
            type: this._menuTab,
            onSave: this.loadInitData
        })
    }

    public onClickAddContractor() {
        showAddEditContractorWindow({
            type: this._menuTab,
            onSave: this.loadInitData
        })
    }

    public get totalElements() {
        return this._totalElements;
    }

    private onLoadInitData(response: ContractorPageResponse) {
        console.log(response)
        this._totalElements = response.totalElements
        this._contractors = response.contractors.map((contractorResponse) => this.toGridContractor(contractorResponse))
    }

    private toGridContractor(contractorResponse: ContractorResponse): GridContractor {
        return {
            contractorIdName: { id: contractorResponse.id, name: contractorResponse.name },
        }
    }
}