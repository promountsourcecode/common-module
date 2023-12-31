import { Component } from 'react';

interface ModalInputProps$1 {
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
declare class Setting extends Component<ModalInputProps$1> {
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

declare const Translate: (prop: any) => any;

declare const Table: (prop: any) => any;

interface ModalInputProps {
    show: boolean;
    onSetting: any;
    columns: any;
    onClose: any;
}
declare class ExportSetting extends Component<ModalInputProps> {
    state: {
        visible: any;
        columns: any;
        prop: any;
    };
    constructor(props: any);
    toggle: (e: any) => void;
    checkboxChange: (event: any, index: any) => void;
    handleChange(): void;
    handleCancel(): void;
    resetSettings(): void;
    render(): any;
}

declare const AskReason: (prop: any) => any;

declare const Treetable: (prop: any) => any;

declare const LoadingSpinner: (prop: any) => any;

declare const getDateFormat: () => void;
declare const convertDateObjToDateString: (date: any) => any;
declare const convertDateStringToDateObj: (date: any) => any;
declare const getDateAndTimeFormate: () => string | null;
declare const getCalendarDateFormat: () => string | null;

declare const index_d_convertDateObjToDateString: typeof convertDateObjToDateString;
declare const index_d_convertDateStringToDateObj: typeof convertDateStringToDateObj;
declare const index_d_getCalendarDateFormat: typeof getCalendarDateFormat;
declare const index_d_getDateAndTimeFormate: typeof getDateAndTimeFormate;
declare const index_d_getDateFormat: typeof getDateFormat;
declare namespace index_d {
  export {
    index_d_convertDateObjToDateString as convertDateObjToDateString,
    index_d_convertDateStringToDateObj as convertDateStringToDateObj,
    index_d_getCalendarDateFormat as getCalendarDateFormat,
    index_d_getDateAndTimeFormate as getDateAndTimeFormate,
    index_d_getDateFormat as getDateFormat,
  };
}

declare function screenConfigration(menuItemId: any): Promise<void>;
declare function setMsgLangKeyInSessionStorage(key: any): void;
declare function getDisplay(field: any): boolean;
declare function getControlValidationObj(field: any): {};
declare function isFieldMandatory(field: any): any;
declare function checkReasonFlag(field: any): boolean;
declare function checkStatus(statusCode: Number): boolean;
declare function breadCrumbsFlag(): void;

export { AskReason, index_d as DateFormat, ExportSetting, LoadingSpinner, Setting, Table, Translate, Treetable, breadCrumbsFlag, checkReasonFlag, checkStatus, convertDateObjToDateString, convertDateStringToDateObj, getCalendarDateFormat, getControlValidationObj, getDateAndTimeFormate, getDateFormat, getDisplay, isFieldMandatory, screenConfigration, setMsgLangKeyInSessionStorage };
