import {action, makeObservable, observable} from "mobx";
import dayjs, {Dayjs} from "dayjs";
import {send} from "../../common/Controller";
import {showAddEditContractorWindow} from "../window/AddEditContractorWindow.ts";

interface ContractorPageResponse {
    contractors: ContractorResponse[],
    totalElements: number
}

export interface Contact {
    id: string,
    type: string,
    value: string,
    main: boolean
}

export interface ContractorResponse {
    id: string,
    name: string,
    contactList: Contact[]
}

export interface ContractorIdName {
    id: string,
    name: string,
}

export interface GridContractor {
    contractorIdName: ContractorIdName
    contactList:  Contact[]
    mainContact: Contact
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
        //todo remove mock
        const mockResponse: ContractorPageResponse = {
            contractors: [
                {
                    id: "1",
                    name: "ООО Борьба",
                    contactList: [
                        {
                            id: "11",
                            type: "EMAIL",
                            value: "borba@mail.ru",
                            main: false
                        },
                        {
                            id: "12",
                            type: "PHONE",
                            value: "+79304509923",
                            main: true
                        },
                        {
                            id: "13",
                            type: "ADDRESS",
                            value: "ул. Пушкина, д. Колотушкина",
                            main: false
                        }
                    ]
                },
                {
                    id: "2",
                    name: "ИП Смирнов А.Ю.",
                    contactList: [
                        {
                            id: "21",
                            type: "email",
                            value: "smirnov@mail.ru",
                            main: true
                        },
                        {
                            id: "22",
                            type: "phone",
                            value: "+79105468765",
                            main: false
                        }
                    ]
                },
                {
                    id: "3",
                    name: "ОАО Зеленый Дом",
                    contactList: [
                        {
                            id: "31",
                            type: "email",
                            value: "greenhome37@mail.ru",
                            main: true
                        },
                        {
                            id: "32",
                            type: "address",
                            value: "м-н Московский, 3",
                            main: false
                        },
                    ]
                }
            ],
            totalElements: 3
        }
        this.onLoadInitData(mockResponse)
        /*
        const request = {
            count: 5,
            page: page - 1,
            type: this._menuTab
        }
        send<ContractorPageResponse>('contractor_grid', 'POST', request)
            .then((response) => {
                this.onLoadInitData(response)
            })
         */
    }

    public onChangeMenuTab(tab: string) {
        this._menuTab = tab;
        this.loadInitData()
    }

    public onClickContractorGridItem(id: string) {
        const contractor = this._contractors.filter((contractor) => contractor.contractorIdName.id == id)[0];
        console.log(contractor)
        showAddEditContractorWindow({
            id: contractor.contractorIdName.id,
            name: contractor.contractorIdName.name,
            type: this._menuTab,
            contactList: contractor.contactList,
            onSave: this.loadInitData
        })
    }

    public onClickAddContractor() {
        showAddEditContractorWindow({
            type: this._menuTab,
            onSave: this.loadInitData,
            contactList: []
        })
    }

    public get totalElements() {
        return this._totalElements;
    }

    private onLoadInitData(response: ContractorPageResponse) {
        this._totalElements = response.totalElements
        this._contractors = response.contractors.map((contractorResponse) => this.toGridContractor(contractorResponse))
    }

    private toGridContractor(contractorResponse: ContractorResponse): GridContractor {
        return {
            contractorIdName: { id: contractorResponse.id, name: contractorResponse.name },
            contactList: contractorResponse.contactList,
            mainContact: contractorResponse.contactList.filter((contact) => contact.main)[0]
        }
    }
}
