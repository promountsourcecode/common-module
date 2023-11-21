import { Component } from 'react';
interface ModalInputProps {
    show: boolean;
    onSetting: any;
    columns: any;
    filter: boolean;
    gridId: string;
    gridData: any;
    onClose: any;
    onReset: any;
    menuItemId: any;
}
declare class Setting extends Component<ModalInputProps> {
    tableColumns: any;
    state: {
        visible: any;
        columns: any;
        filter: any;
        gridData: any;
        prop: any;
        pageSize: {
            size: string;
        }[];
        language: string | null;
        selectedPageSize: {
            size: any;
        };
    };
    constructor(props: any);
    getcolumns(): Promise<void>;
    componentDidMount(): void;
    toggle: (e: any) => void;
    setSelectedPageSize(e: any): Promise<void>;
    checkboxChange: (event: any, index: any) => void;
    handleChange(): void;
    handleCancel(): void;
    resetSettings(): void;
    resetFromServer(): Promise<void>;
    footerContent: () => any;
    getTabelHeaderData(): Promise<void>;
    render(): any;
}
export default Setting;
