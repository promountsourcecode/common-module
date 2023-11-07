import React, { useState, useEffect, Component, useRef, useCallback } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { SplitButton } from 'primereact/splitbutton';
import { confirmDialog } from 'primereact/confirmdialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Paginator } from 'primereact/paginator';
import { RadioButton } from 'primereact/radiobutton';
import { classNames } from 'primereact/utils';
import { useForm, Controller } from 'react-hook-form';
import { Button as Button$1 } from 'reactstrap';
import { InputTextarea } from 'primereact/inputtextarea';
import { getControlValidationObj as getControlValidationObj$1, Translate as Translate$1, Setting as Setting$1 } from '@promountsourcecode/common_module';
import 'lodash';
import { TreeTable } from 'primereact/treetable';
import moment from 'moment';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const Translate = (prop) => {
    const [selectLanguage, setSelectLanguage] = useState(sessionStorage.getItem("Language"));
    useState();
    const [isMandatory, setIsMandatory] = useState([]);
    useState();
    const [lableFlag, setLableFlag] = useState(false);
    const [finalValue, setFinalValue] = useState();
    useState(sessionStorage.getItem("menuItemId"));
    useEffect(() => {
        fetchData();
    }, [""]);
    const fetchData = () => {
        const languageDataLocal = JSON.parse(sessionStorage.getItem("LanguageData"));
        if (languageDataLocal["translations"][selectLanguage][prop.contentKey] !=
            undefined)
            setFinalValue(languageDataLocal["translations"][selectLanguage][prop.contentKey]["text"]);
        setIsMandatory(languageDataLocal["translations"][selectLanguage][prop.contentKey]);
        if (languageDataLocal["translations"][selectLanguage][prop.contentKey]["type"] != undefined) {
            const obj = languageDataLocal["translations"][selectLanguage][prop.contentKey]["type"];
            if (obj == "Textarea" ||
                obj == "CheckBox" ||
                obj == "Radio" ||
                obj == "Text Field" ||
                obj == "ComboBox") {
                setLableFlag(true);
            }
            else {
                setLableFlag(false);
            }
        }
        // languageData.map(e => {
        //   if (e.key === prop.contentKey) {
        //     setFinalValue(e.value);
        //   }
        // });console.log(finalValue + element);
    };
    return (React.createElement(React.Fragment, null,
        isMandatory != undefined ? React.createElement("span", null,
            isMandatory.text,
            " ") : "",
        isMandatory != undefined ? (isMandatory.mandatory === true ? (lableFlag == true ? (React.createElement(React.Fragment, null,
            " ",
            React.createElement("span", null, ":"),
            React.createElement("span", { className: "reqsign" }, "*"))) : ("")) : lableFlag == true ? (React.createElement("span", null, ":")) : ("")) : ("")));
};

class Setting extends Component {
    constructor(props) {
        var _a, _b, _c, _d;
        super(props);
        this.state = {
            visible: this.props.show,
            columns: this.props.columns,
            filter: (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.columns[0]) === null || _b === void 0 ? void 0 : _b.filterEnable,
            gridData: this.props.gridData,
            prop: this.props,
            pageSize: [
                { size: "10" },
                { size: "20" },
                { size: "50" },
                { size: "100" },
                { size: "200" },
                { size: "500" },
            ],
            language: sessionStorage.getItem("Language"),
            selectedPageSize: {
                size: (_d = (_c = this.props) === null || _c === void 0 ? void 0 : _c.columns[0]) === null || _d === void 0 ? void 0 : _d.gridPageSize,
            },
        };
        this.toggle = (e) => {
            e.preventDefault();
            this.setState({ visible: !this.state.visible });
        };
        this.checkboxChange = (event, index) => {
            const data = this.tableColumns;
            data[index].visible = event.checked;
            this.setState({ columns: data });
        };
        this.footerContent = () => {
            return (React.createElement("div", null,
                React.createElement(Button, { label: "Apply", icon: "pi pi-check", onClick: () => this.handleChange(), autoFocus: true }),
                React.createElement(Button, { label: "Reset", onClick: () => this.resetSettings() }),
                React.createElement(Button, { label: "Cancel", icon: "pi pi-times", onClick: () => {
                        this.handleCancel();
                    }, className: "p-button-text" })));
        };
        if (this.state.gridData.length === 0) {
            this.tableColumns = this.state.columns;
            console.log("this.props?.columns[0]?.gridPageSize", this.state.selectedPageSize, this.state.filter);
        }
        else {
            this.tableColumns = this.state.gridData;
            console.log("this.props?.columns[0]?.gridPageSize", this.state.selectedPageSize, this.state.filter);
        }
    }
    getcolumns() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = [];
            this.props.columns.forEach((column) => {
                column["gridPageSize"] = this.state.selectedPageSize.size;
                column["filterEnable"] = this.state.filter;
            });
            const entity = {
                gridId: this.state.prop.gridId,
                gridSettingDetailText: JSON.stringify(this.props.columns),
                menuItemId: sessionStorage.getItem("menuItemId"),
                userMasterId: 1,
                hierarchyLevelId: 352,
                languageId: 1,
            };
            data = yield axios.put("api/grid-user-settings/saveUpdateData", entity);
            const dataJson = JSON.parse(data.data.gridSettingDetailText);
            // if(dataJson.length == 0 ){
            //   this.tableColumns= this.state.columns
            // }
            // else{
            this.tableColumns = dataJson;
            // }
        });
    }
    componentDidMount() {
        // this.getcolumns();
    }
    setSelectedPageSize(e) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("e", e);
            this.setState({
                selectedPageSize: e,
            });
        });
    }
    handleChange() {
        this.getTabelHeaderData();
        this.props.onSetting(this.tableColumns, this.state.filter, this.state.selectedPageSize);
    }
    handleCancel() {
        this.setState({
            visible: false,
            colums: this.props.columns,
        });
        this.props.onClose();
    }
    // resetSettings() {
    // console.log(this.props);
    // this.setState({
    //   filter: this.props.filter,
    //   columns: this.props.columns,
    // });
    // }
    resetSettings() {
        this.setState({
            visible: this.state.columns.map((e) => (e.visible = true)),
            columns: this.props.columns,
            // columns: this.state.columns.map(e => [{ field: e.field, header: e.header, visible: true }]),
        });
        this.resetFromServer();
        this.getTabelHeaderData();
        this.props.onSetting(this.tableColumns, this.state.filter, this.state.selectedPageSize);
    }
    resetFromServer() {
        return __awaiter(this, void 0, void 0, function* () {
            let id;
            if (this.state.language === "en")
                id = 1;
            else if (this.state.language === "hi")
                id = 2;
            else
                id = 3;
            yield axios.delete(`/api/grid-user-settings/deleteByUserIdAndHierarchyIdAndGridIdAndMenuItemId?userMasterId=${1}&languageId=${id}&gridId=${this.state.prop.gridId}`);
        });
    }
    getTabelHeaderData() {
        return __awaiter(this, void 0, void 0, function* () {
            let data1 = [];
            let id;
            if (this.state.language === "en")
                id = 1;
            else if (this.state.language === "hi")
                id = 2;
            else
                id = 3;
            this.props.columns.forEach((column) => {
                column["gridPageSize"] = this.state.selectedPageSize.size;
                column["filterEnable"] = this.state.filter;
            });
            const entity = {
                gridId: String(this.props.gridId),
                gridSettingDetailText: JSON.stringify(this.state.columns),
                menuItemId: sessionStorage.getItem("menuItemId"),
                userMasterId: 1,
                hierarchyLevelId: 1,
                languageId: id,
            };
            data1 = yield axios.put("api/grid-user-settings/saveUpdateData", entity, {
                headers: { menuItemId: this.props.gridId },
            });
            JSON.parse(data1.data.gridSettingDetailText);
        });
    }
    render() {
        const cellEditor = (options) => {
            return textEditor(options);
        };
        const textEditor = (options) => {
            return (React.createElement(InputText, { type: "text", value: options.value, onChange: (e) => options.editorCallback(e.target.value) }));
        };
        const onCellEditComplete = (e) => {
            const { rowData, newValue, field, originalEvent: event } = e;
            switch (field) {
                case "quantity":
                default:
                    if (newValue.trim().length > 0)
                        rowData[field] = newValue;
                    else
                        event.preventDefault();
                    break;
            }
        };
        const rowReorder = (e) => {
            // this.tableColumns = null;
            // this.tableColumns = e.value;
            if (this.state.gridData.length === 0) {
                this.setState({ columns: e.value });
                this.tableColumns = this.state.columns;
            }
            else {
                this.setState({ gridData: e.value });
                this.tableColumns = this.state.gridData;
            }
        };
        return (React.createElement(Dialog, { header: "Settings", 
            //footer={this.footerContent}
            visible: this.state.visible, style: { width: "80vw" }, onHide: () => {
                this.handleCancel();
            }, draggable: false, resizable: false, maximizable: true },
            React.createElement("div", null,
                React.createElement("div", { className: "modal-content" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-xs-12" },
                            React.createElement("div", { className: "d-flex justify-content-left align-items-left" },
                                React.createElement("label", { className: "form-label" }, "Filter: "),
                                React.createElement(Checkbox, { style: { marginLeft: "10px" }, onChange: (event) => this.setState({ filter: !this.state.filter }), checked: this.state.filter })),
                            " "),
                        React.createElement("div", { className: "col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-xs-12 " },
                            React.createElement("div", { className: "d-flex justify-content-end align-items-center" },
                                React.createElement("label", { className: "form-label", style: { marginRight: "10px" } }, "Page Size:"),
                                React.createElement(Dropdown, { value: this.state.selectedPageSize, onChange: (e) => this.setSelectedPageSize(e.value), options: this.state.pageSize, optionLabel: "size", placeholder: "Select a Page Size" })))),
                    React.createElement("div", { className: "tableWrap", style: { marginTop: "10px" } },
                        React.createElement(DataTable, { value: this.tableColumns, reorderableRows: true, onRowReorder: (e) => rowReorder(e), responsiveLayout: "scroll", rows: this.tableColumns.length, scrollable: true },
                            React.createElement(Column, { rowReorder: true, style: { width: "3rem" } }),
                            React.createElement(Column, { field: "header", header: "Columns", editor: (options) => cellEditor(options), onCellEditComplete: onCellEditComplete }),
                            React.createElement(Column, { field: "width", header: "Width", editor: (options) => cellEditor(options), onCellEditComplete: onCellEditComplete }),
                            React.createElement(Column, { header: "Display", body: (data, props) => (React.createElement("div", null,
                                    React.createElement(Checkbox, { onChange: (event) => this.checkboxChange(event, props.rowIndex), checked: data.visible }))) })))),
                React.createElement("div", { className: "p-dialog-footer" },
                    React.createElement(Button, { className: "btnStyle btn btn-success", onClick: () => this.handleChange(), autoFocus: true },
                        React.createElement(FontAwesomeIcon, { icon: faCheck }),
                        " ",
                        React.createElement(Translate, { contentKey: "home.apply" })),
                    React.createElement(Button, { className: "btnStyle btn btn-info", onClick: () => this.resetSettings() },
                        React.createElement(FontAwesomeIcon, { icon: faRepeat }),
                        " ",
                        React.createElement(Translate, { contentKey: "home.reset" })),
                    React.createElement(Button, { className: "btnStyle btn btn-danger", onClick: () => this.handleCancel() },
                        React.createElement(FontAwesomeIcon, { icon: "times" }),
                        React.createElement(Translate, { contentKey: "home.close" }))))));
    }
}

class ExportSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.show,
            columns: this.props.columns,
            prop: this.props,
        };
        this.toggle = (e) => {
            e.preventDefault();
            this.setState({ visible: !this.state.visible });
        };
        this.checkboxChange = (event, index) => {
            const data = this.state.columns;
            data[index].visible = event.checked;
            this.setState({ columns: data });
        };
        this.state.columns.map((e) => {
            e.visible = true;
        });
    }
    handleChange() {
        this.props.onSetting(this.state.columns);
    }
    handleCancel() {
        this.setState({
            visible: false,
            colums: this.props.columns,
        });
    }
    resetSettings() {
        this.setState({
            columns: this.state.columns.map((e) => (e.visible = true)),
        });
    }
    render() {
        const cellEditor = (options) => {
            return textEditor(options);
        };
        const textEditor = (options) => {
            return (React.createElement(InputText, { type: "text", value: options.value, onChange: (e) => options.editorCallback(e.target.value) }));
        };
        const onCellEditComplete = (e) => {
            const { rowData, newValue, field, originalEvent: event } = e;
            switch (field) {
                case "quantity":
                default:
                    if (newValue.trim().length > 0)
                        rowData[field] = newValue;
                    else
                        event.preventDefault();
                    break;
            }
        };
        const footerContent = (React.createElement("div", null,
            React.createElement(Button, { label: "Export", icon: "pi pi-check", onClick: () => this.handleChange(), autoFocus: true })));
        return (React.createElement(Dialog, { header: "Exports", footer: footerContent, maximizable: true, visible: this.state.visible, style: { width: "50vw" }, onHide: () => {
                this.handleCancel();
            } },
            React.createElement("div", { className: "modal-content" },
                React.createElement(DataTable
                // reorderableRows
                , { 
                    // reorderableRows
                    dataKey: "id", value: this.state.columns, 
                    // onRowReorder={onRowReorder}
                    responsiveLayout: "scroll", rows: this.state.columns.length },
                    React.createElement(Column, { field: "header", header: "Columns", editor: (options) => cellEditor(options), onCellEditComplete: onCellEditComplete }),
                    React.createElement(Column, { header: "Display", body: (data, props) => (React.createElement("div", null,
                            React.createElement(Checkbox, { onChange: (event) => this.checkboxChange(event, props.rowIndex), checked: data.visible }))) }))),
            React.createElement("div", { className: "p-dialog-footer" },
                React.createElement(Button, { className: "btnStyle btn btn-success", onClick: () => this.handleChange(), autoFocus: true },
                    React.createElement(FontAwesomeIcon, { icon: faCheck }),
                    " Export"))));
    }
}

const AskReason = (prop) => {
    const [dataForm, setData] = useState(prop.data);
    useState("");
    const [visible, setVisible] = useState(prop.visible);
    const [action, setAction] = useState(prop.action);
    const closeModal = () => {
        setVisible(false);
        prop.onClose();
    };
    useEffect(() => {
        console.log(prop);
    });
    const defaultValues = Object.assign(Object.assign({}, dataForm), { reasonForChange: "" });
    const getFormErrorMessage = (name) => {
        return errors[name] ? (React.createElement("small", { className: "p-error" }, errors[name].message)) : (React.createElement("small", { className: "p-error" }, "\u00A0"));
    };
    const onSubmit = (data) => {
        if (prop.passwordFlag) {
            {
                data.reasonForChange = data.reasonForChange;
                const entity = Object.assign(Object.assign({}, data), { reasonForChange: data.reasonForChange });
                prop.saveWithReason(entity, prop.deleteObject);
                prop.onClose();
            }
        }
        else {
            data.reasonForChange = data.reasonForChange;
            const entity = Object.assign(Object.assign({}, data), { reasonForChange: data.reasonForChange });
            prop.saveWithReason(entity, prop.deleteObject);
            prop.onClose();
        }
    };
    const { control, formState: { errors }, handleSubmit, getValues, reset, } = useForm({ defaultValues });
    return (React.createElement(React.Fragment, null,
        React.createElement(Dialog, { header: React.createElement(Translate, { contentKey: "reasonForConfirmation" }), id: prop.id, visible: visible, onHide: closeModal, style: { width: "30vw" } },
            React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
                React.createElement("div", { className: "modal-content", style: { overflow: "auto !important" } },
                    React.createElement("div", { className: "container-fluid" },
                        React.createElement("div", { className: "row form-group" },
                            React.createElement(Controller, { name: "reasonForChange", control: control, rules: getControlValidationObj$1("reason"), render: ({ field, fieldState }) => (React.createElement(React.Fragment, null,
                                    React.createElement("label", { className: "form-label" },
                                        React.createElement(Translate, { contentKey: "reason" })),
                                    React.createElement(InputTextarea, { id: field.name, value: field.value, className: classNames("form-control", {
                                            "p-invalid": fieldState.error,
                                        }), onChange: (e) => field.onChange(e.target.value), rows: 3, cols: 30 }),
                                    getFormErrorMessage(field.name))) })),
                        prop.passwordFlag && (React.createElement("div", { className: "row form-group" },
                            React.createElement(Controller, { name: "password", control: control, rules: getControlValidationObj$1("password.global"), render: ({ field, fieldState }) => (React.createElement(React.Fragment, null,
                                    React.createElement("label", { className: "form-label" },
                                        React.createElement(Translate, { contentKey: "password.global" })),
                                    React.createElement(InputText, { id: field.name, value: field.value, className: classNames("form-control", {
                                            "p-invalid": fieldState.error,
                                        }), onChange: (e) => field.onChange(e.target.value) }),
                                    getFormErrorMessage(field.name))) }))),
                        React.createElement("div", { className: "p-dialog-footer " },
                            React.createElement(Button$1, { label: "Submit", id: "askReason", type: "submit", color: action == "delete" ? "danger" : "primary", className: "btnStyle", icon: "pi pi-check" },
                                action == "delete" ? (React.createElement(FontAwesomeIcon, { icon: "times" })) : (React.createElement(FontAwesomeIcon, { icon: "save" })),
                                action == "delete" ? (React.createElement(Translate, { contentKey: "delete" })) : (React.createElement(Translate, { contentKey: "home.save" }))))))))));
};

// const dataSC1: any = JSON.parse(sessionStorage.getItem('LanguageData'));
// const dataSc = dataSC1 ? dataSC1.translations[2].validations.validateDetails : '';
sessionStorage.getItem("Language");
// let screenDataSc1 = JSON.parse(sessionStorage.getItem('LanguageData'));
sessionStorage.getItem("LanguageData")
    ? JSON.parse(sessionStorage.getItem("LanguageData"))["translations"]
    : "";
function screenConfigration(menuItemId) {
    return __awaiter(this, void 0, void 0, function* () {
        // setLanguageAPIData(getDataSC.data.languageDetails);
        const getDataSC = yield axios.get(`/api/screen-configurations/getAllScreenConfigurationsAndScreenControlValidations/${menuItemId}/${sessionStorage.getItem("lastSyncTime")
            ? sessionStorage.getItem("lastSyncTime")
            : 0}`);
        sessionStorage.setItem("lastSyncTime", getDataSC.data.lastSyncTime);
        sessionStorage.setItem("LanguageData", JSON.stringify(getDataSC.data));
    });
}
function setMsgLangKeyInSessionStorage(key) {
    sessionStorage.setItem("msgLangKey", key);
}
function getDisplay(field) {
    let language = sessionStorage.getItem("Language");
    let screenDataSc1 = sessionStorage.getItem("LanguageData")
        ? JSON.parse(sessionStorage.getItem("LanguageData"))["translations"]
        : "";
    const lngobj = screenDataSc1[language];
    const obj = lngobj[field];
    return Boolean(obj.display);
}
function getControlValidationObj(field) {
    let language = sessionStorage.getItem("Language");
    let screenDataSc1 = sessionStorage.getItem("LanguageData")
        ? JSON.parse(sessionStorage.getItem("LanguageData"))["translations"]
        : "";
    const lngobj = screenDataSc1[language];
    const obj = lngobj[field];
    const ruleObj = {};
    if (obj.mandatory != null) {
        ruleObj["required"] = {};
        ruleObj["required"]["value"] = obj.mandatory;
        if (obj.isRequiredMessage != null && obj.isRequiredMessage !== "") {
            ruleObj["required"]["message"] = obj.isRequiredMessage;
        }
    }
    if (obj.minvalue != null && obj.minvalue !== "") {
        ruleObj["minLength"] = {};
        ruleObj["minLength"]["value"] = Number(obj.minvalue);
        //message = getErrorMessageForMinLength(screenDataSc, field);
        // if (message != null && message != '') {
        ruleObj["minLength"]["message"] = obj.minLengthMessage;
        // }
    }
    // let maxLength: any = getMaxLength(screenDataSc, field);
    if (obj.maxvalue != null && obj.maxvalue !== "") {
        ruleObj["maxLength"] = {};
        ruleObj["maxLength"]["value"] = obj.maxvalue;
        ruleObj["maxLength"]["message"] = obj.maxLengthMessage;
    }
    // let pattern: any = getRegex(screenDataSc, field);
    if (obj.validationRegex != null && obj.validationRegex !== "") {
        ruleObj["pattern"] = {};
        ruleObj["pattern"]["value"] = RegExp(obj.validationRegex);
        //message = getErrorMessageForRegex(screenDataSc, field);
        // if (message != null && message != '') {
        ruleObj["pattern"]["message"] = obj.regexPatternMessage;
        // }
    }
    return ruleObj;
}
function isFieldMandatory(field) {
    let language = sessionStorage.getItem("Language");
    let screenDataSc1 = sessionStorage.getItem("LanguageData")
        ? JSON.parse(sessionStorage.getItem("LanguageData"))["translations"]
        : "";
    const lngobj = screenDataSc1[language];
    const obj = lngobj[field];
    if (obj.mandatory != null) {
        return obj.mandatory;
    }
    else {
        return false;
    }
}
function checkReasonFlag(field) {
    let language = sessionStorage.getItem("Language");
    let screenDataSc1 = sessionStorage.getItem("LanguageData")
        ? JSON.parse(sessionStorage.getItem("LanguageData"))["translations"]
        : "";
    const lngobj = screenDataSc1[language];
    const obj = lngobj[field]["askForReason"];
    return obj;
}
function checkStatus(statusCode) {
    if (statusCode == 400 || statusCode == 412 || statusCode == 500) {
        return false;
    }
    else {
        return true;
    }
}
function breadCrumbsFlag() {
    const configurationUrl = 'services/gateway/api/getSystemConfigurationByName/breadCrumbs_flag';
    axios.get(configurationUrl).then((res) => {
        sessionStorage.setItem('breadCrumbsFlag', res.data.configurationValue);
    });
}

const Table = (prop) => {
    const menuItemId = sessionStorage.getItem("menuItemId");
    useState(sessionStorage.getItem("id"));
    const dt = useRef();
    const [reasonFlag, setReasonFlag] = useState(false);
    const [data, setData] = useState();
    const [column, setColumn] = useState();
    useState([]);
    const [exportCol, setExportCol] = useState([]);
    const [filter, setfilter] = useState(prop.toggleFilter);
    const [filters, setfilters] = useState(prop.filters);
    /* pagination code */
    const [totalRecords, setTotalRecords] = useState(prop.totalRecords);
    const [lazyState, setlazyState] = useState(prop.pagination);
    const [gridId, setGridId] = useState(prop.gridId);
    const [apiGridData, setApiGridData] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalExport, setModalExport] = useState(false);
    useState(null);
    const [exportType, setExportType] = useState();
    useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [deleteHeader, setdeleteHeader] = useState(React.createElement(Translate, { contentKey: "global.deleteConfirm" }));
    const [deletemsg, setdeletemsg] = useState(React.createElement(Translate, { contentKey: "home.deleteMsg" }));
    const [ifShowHeader, setifShowHeader] = useState(false);
    const [ifHideHeader, setifHideHeader] = useState(true);
    const [language, setlanguage] = useState(sessionStorage.getItem("Language"));
    const [redioFilter, setRedioFilter] = useState("Active");
    const [redioFilterPublish, setRedioFilterPublish] = useState("");
    useState(true);
    const [Searchplaceholder, setSearchPlaceholder] = useState("Keyword Search");
    useState(prop.reasonAskOnCheck ? prop.reasonAskOnCheck : false);
    const [itemsAction, setitemsAction] = useState([]);
    const [buttonAction, setButtonAction] = useState([]);
    const [selectedItem, setSelectedItem] = useState();
    useState(prop.hideActionbtn ? prop.hideActionbtn : false);
    const [rowReorder, setrowReorder] = useState(prop.rowReorder ? prop.rowReorder : false);
    const [actionId, setActionId] = useState();
    const [editObject, setEditObject] = useState([]);
    useEffect(() => {
        setlazyState(lazyState);
    }, [lazyState]);
    const paginatorTemplate = {
        layout: "RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport ",
        RowsPerPageDropdown: (options) => {
            const dropdownOptions = [
                { label: 5, value: 5 },
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 50, value: 50 },
                { label: 100, value: 100 },
                { label: 200, value: 200 },
                { label: 500, value: 500 },
            ];
            return (React.createElement(React.Fragment, null,
                React.createElement(Dropdown, { value: options.value, scrollHeight: "270px", options: dropdownOptions, onChange: options.onChange })));
        },
        CurrentPageReport: (options) => {
            return (React.createElement("span", { className: "", style: {
                    color: "var(--text-color)",
                    fontSize: "14px",
                    userSelect: "none",
                    marginLeft: "auto",
                    textAlign: "center",
                } },
                options.first,
                " - ",
                options.last,
                " of ",
                options.totalRecords));
        },
    };
    const getActionBtn = (id, object) => {
        setActionId(id);
        setEditObject(object);
    };
    useEffect(() => {
        const compareJsonjs = document.createElement("script");
        compareJsonjs.src =
            "https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js";
        compareJsonjs.async = true;
        document.body.appendChild(compareJsonjs);
    }, []);
    const getGridData = () => __awaiter(void 0, void 0, void 0, function* () {
        let id;
        if (language === "en")
            id = 1;
        else if (language === "hi")
            id = 2;
        else
            id = 3;
        const gridData = yield axios.get(`api/grid-user-settings/${gridId}/${id}/${menuItemId}/1`);
        (yield gridData.data.data.length) > 0
            ? setColumn(gridData.data.data)
            : setColumn(prop.column);
        const pageData = {
            first: lazyState.first,
            rows: parseInt(gridData.data.data[0].gridPageSize),
            page: lazyState.page,
            sortField: lazyState.sortField,
            sortOrder: lazyState.sortOrder,
        };
        setlazyState(pageData);
        setfilter(gridData.data.data[0].filterEnable);
        yield prepareRowAction(gridData.data.data);
    });
    useEffect(() => {
        column == undefined ? setColumn(prop.column) : "";
    }, [prop.column]);
    useEffect(() => {
        setActionId(actionId);
        setEditObject(editObject);
        prepareRowAction(column);
    }, [actionId, editObject]);
    useEffect(() => {
        setTotalRecords(prop.totalRecords);
    }, [prop.totalRecords]);
    useEffect(() => {
        setlazyState(prop.pagination);
    }, [prop.pagination]);
    useEffect(() => {
        setData(prop.data);
        // setitemsAction(prop.actionFlag);
    }, [prop.data]);
    const labelbtnFlag = {
        yes: React.createElement(Translate, { contentKey: "yes" }),
        no: React.createElement(Translate, { contentKey: "no" }),
        edit: React.createElement(Translate, { contentKey: "edit" }),
        delete: React.createElement(Translate, { contentKey: "delete" }),
        keySearch: React.createElement(Translate, { contentKey: "keywordSearch" }),
        hierarchy: React.createElement(Translate, { contentKey: "hierarchy" }),
        export: React.createElement(Translate, { contentKey: "export" }),
        activeradio: React.createElement(Translate, { contentKey: "activeradio" }),
        allradio: React.createElement(Translate, { contentKey: "allradio" }),
        inactiveradio: React.createElement(Translate, { contentKey: "inactiveradio" }),
    };
    const prepareRowAction = (actionArr) => {
        let tmpRowAction = [];
        if (actionArr) {
            for (let i = 0; i < actionArr.length; i++) {
                if (actionArr[i]["type"] == "Action") {
                    let actinObj = actionArr[i].actionJson;
                    if (actinObj) {
                        for (let j = 0; j < actinObj.length; j++) {
                            let item = {
                                className: actinObj[j]["className"] != null &&
                                    actinObj[j]["className"] != ""
                                    ? actinObj[j]["className"]
                                    : "icon",
                                label: (React.createElement(Translate, { contentKey: actinObj[j]["label"] })),
                                icon: actinObj[j]["icon"],
                                id: actinObj[j]["id"],
                                visible: actinObj[j]["visible"],
                                askReason: actinObj[j]["askReason"],
                                command: () => {
                                    actinObj[j]["id"] == "Delete"
                                        ? deleteConfirmOnAction(actionId, actinObj[j]["askReason"], editObject)
                                        : eval(prop[actinObj[j].command](actionId, gridId, actinObj[j]["askReason"], editObject));
                                },
                            };
                            tmpRowAction.push(item);
                            setitemsAction(tmpRowAction);
                        }
                    }
                }
                if (actionArr[i]["type"] == "Button") {
                    let butonObj = actionArr[i].actionJson;
                    setButtonAction(butonObj);
                }
            }
        }
    };
    useEffect(() => {
        setSelectedItem(prop.sendSelectedItem ? prop.sendSelectedItem : "");
        setSelectCheckboxRc(prop.sendSelectedItem);
    }, [prop.sendSelectedItem]);
    useEffect(() => {
        getGridData();
        setRedioFilterPublish("All");
        if (!redioFilter) {
            setRedioFilter("Active");
        }
        if (gridId === "dmsClientID" ||
            gridId === "dmsParameterID" ||
            gridId === "ParameterCategoriesID") {
            setifShowHeader(true);
        }
        if (gridId === "documentWorkspaceID") {
            setifHideHeader(false);
        }
        setSearchPlaceholder(String(React.createElement(Translate, { contentKey: "export" })));
    }, []);
    const toggle = (e) => {
        setExportType(e);
        setModalExport(true);
    };
    const edit = (id) => {
        prop.onEdit(id);
    };
    const items = [
        {
            label: "CSV",
            icon: "fa-solid fa-file-csv",
            command: () => toggle("CSV"),
        },
        {
            label: "Excel",
            icon: "fa-solid fa-file-excel",
            command: () => toggle("EXCEL"),
        },
        {
            label: "PDF",
            icon: "fa-solid fa-file-pdf",
            command: () => toggle("PDF"),
        },
        {
            label: "Json",
            icon: "fa-solid fa-file-arrow-down",
            command: () => exportToJson(),
        },
        { label: "Print", icon: "fa-solid fa-print" },
    ];
    const settingChanges = (coulmnData, filterToggle, pagesize) => {
        setModal(false);
        setColumn(coulmnData);
        setfilter(filterToggle);
        const pageData = {
            first: 0,
            rows: parseInt(pagesize.size),
            page: 0,
            sortField: lazyState.sortField,
            sortOrder: lazyState.sortOrder,
        };
        setlazyState(pageData);
        prop.onPageChange(pageData);
    };
    const settingChangesExport = (coulmnData) => {
        setModalExport(false);
        setExportCol(coulmnData);
        const exportData = data;
        const headers = [];
        coulmnData.map((col) => {
            if (col.visible)
                headers.push(col.field);
        });
        const newData = [];
        exportData.map((element) => {
            const newObj = {};
            headers.forEach((name) => {
                newObj[name] = element[name];
            });
            newData.push(newObj);
        });
        switch (exportType) {
            case "PDF":
                exportPdf(newData, headers, coulmnData);
                break;
            case "EXCEL":
                exportExcel(newData);
                break;
            case "CSV":
                exportCSV(newData);
                break;
        }
    };
    const exportToJson = () => {
        downloadFile({
            body: JSON.stringify(data),
            fileName: "users.json",
            fileType: "text/json",
        });
    };
    const downloadFile = ({ body, fileName, fileType }) => {
        const blob = new Blob([body], { type: fileType });
        const a = document.createElement("a");
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        const clickEvt = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        a.dispatchEvent(clickEvt);
        a.remove();
    };
    const convertToCSV = (objArray) => {
        const array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
        let str = "";
        for (let i = 0; i < array.length; i++) {
            let line = "";
            // eslint-disable-next-line guard-for-in
            for (const index in array[i]) {
                if (line !== "")
                    line += ",";
                line += array[i][index];
            }
            str += line + "\r\n";
        }
        return str;
    };
    const exportCSV = (newData, headers) => {
        // Convert Object to JSON
        const jsonObject = JSON.stringify(newData);
        const csv = convertToCSV(jsonObject);
        const exportedFilenmae = "report" + ".csv" ;
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            // feature detection
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    const exportPdf = (newData, headers, coulmnData) => {
        const headerss = coulmnData.map((col) => {
            if (col.visible)
                headers.push({ title: col.header, dataKey: col.field });
        });
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";
        const doc = new jsPDF(orientation, unit, size);
        const title = "Report";
        const content = {
            startY: 50,
            head: headerss,
            body: newData,
        };
        doc.text(title, 40, 40);
        autoTable(doc, content);
        doc.save("Task.pdf");
    };
    const exportExcel = (newData) => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(newData);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFile(excelBuffer, "products");
        });
    };
    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                const EXCEL_EXTENSION = ".xlsx";
                const dataa = new Blob([buffer], {
                    type: EXCEL_TYPE,
                });
                module.default.saveAs(dataa, fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };
    const closeSettingModal = () => {
        setModal(false);
    };
    const [reasonIdDelete, setReasonIdDelete] = useState();
    const deleteConfirmOnAction = (id, flag, record) => __awaiter(void 0, void 0, void 0, function* () {
        setMsgLangKeyInSessionStorage(prop.msgLangKey);
        const idObj = {};
        idObj["id"] = id;
        setReasonIdDelete(idObj);
        confirmDialog({
            message: deletemsg,
            header: deleteHeader,
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-danger",
            rejectClassName: "p-button-success",
            acceptLabel: labelbtnFlag.yes ? labelbtnFlag.yes : "Yes",
            rejectLabel: labelbtnFlag.no ? labelbtnFlag.no : "No",
            accept: () => __awaiter(void 0, void 0, void 0, function* () {
                flag == true ? yield setReasonFlag(!reasonFlag) : accept(id, record);
            }),
            reject: () => reject(),
        });
    });
    const reject = () => {
        // toast.warn('You have cancel your delete request.');
    };
    const accept = (data, record) => {
        prop.onDelete(data, record);
        setReasonFlag(false);
    };
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        const _filters = Object.assign({}, filters);
        _filters["global"].value = value;
        setfilters(_filters);
        setGlobalFilterValue(value);
        if (gridId === "dmsParameterID") {
            prop.onSearch(value);
        }
    };
    const handleCloseForReason = () => {
        setReasonFlag(!reasonFlag);
        setData(prop.data);
        setSelectCheckboxRc(prop.sendSelectedItem);
    };
    const redioFilterSelection = (name) => {
        setRedioFilter(name);
        sessionStorage.setItem("FilterStatus", name);
        prop.onFilterChanges(name, prop.gridId);
    };
    const [selectCheckboxRc, setSelectCheckboxRc] = useState([]);
    useState();
    const defaultChecked = (fieldName, data1) => {
        let flag;
        flag = data1[fieldName] ? typeof data1[fieldName] : undefined;
        if (flag != undefined) {
            if (flag == "boolean") {
                return data1[fieldName];
            }
            else if (flag == "string" || flag == "number") {
                let returnValue;
                if (flag == "string") {
                    returnValue = data1[fieldName] == "Yes" ? true : false;
                }
                return returnValue;
            }
            return data1[fieldName];
        }
        else {
            if (selectCheckboxRc != undefined) {
                for (let i = 0; i < selectCheckboxRc.length; i++) {
                    if (selectCheckboxRc[i].id == data1.id) {
                        return true;
                    }
                }
            }
        }
    };
    const radioSelectRecord = (record, fieldName) => {
        prop.radioEvent(record, fieldName);
    };
    const filterColumnGlobal = () => {
        const globalFilterData = [];
        if (column) {
            column.forEach((element) => {
                if (element.visible)
                    globalFilterData.push(element.field);
            });
        }
        return globalFilterData;
    };
    const onSelectCheckBox = (e, obj, fieldName) => {
        console.log("e, obj, fieldName", e, obj, fieldName);
        let selectedItemsArray = selectCheckboxRc != undefined ? [...selectCheckboxRc] : [];
        const checked = e.checked;
        if (obj[fieldName] != undefined) {
            obj[fieldName] == e.checked;
            if (e.checked) {
                if (selectedItemsArray.length == 0) {
                    selectedItemsArray.push(obj);
                }
                else {
                    selectedItemsArray.push(obj);
                    // for (let i = 0; i < selectedItemsArray.length; i++) {
                    //   if (obj.id != selectedItemsArray[i].id || selectedItemsArray.legth == 0) {
                    //   }
                    // }
                }
            }
            else {
                selectedItemsArray.splice(selectedItemsArray.indexOf(obj), 1);
            }
        }
        else {
            checked == true
                ? selectedItemsArray.push(obj)
                : selectedItemsArray.splice(selectedItemsArray.indexOf(obj), 1);
        }
        setSelectCheckboxRc(selectedItemsArray);
        setReasonIdDelete(obj);
        prop.selectCheckbox(checked, obj, selectedItemsArray);
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: "d-flex justify-content-between align-items-center" },
            React.createElement("div", { className: "d-flex globlFilter" }, filter && (React.createElement("span", { className: "p-input-icon-left" },
                React.createElement("i", { className: "pi pi-search" }),
                React.createElement(InputText, { value: globalFilterValue, onChange: (e) => onGlobalFilterChange(e) })))),
            React.createElement("div", { className: "d-flex flex-wrap" },
                ifShowHeader && (React.createElement(Button, { onClick: () => edit(""), className: "btn btn-primary btnStyle", "data-cy": "entityCreateButton" },
                    React.createElement(FontAwesomeIcon, { icon: "plus" }),
                    "Add")),
                prop.statusFilter === true && (React.createElement("span", { className: "d-flex justify-content-center m-r-15 statusFilter" },
                    React.createElement("span", { style: { marginLeft: "10px" }, className: "d-flex align-items-center" },
                        React.createElement(RadioButton, { inputId: gridId + "gridActive", name: "filter", value: "Active", onChange: (e) => redioFilterSelection(e.value), checked: redioFilter === "Active" }),
                        React.createElement("label", { htmlFor: gridId + "gridActive", style: { marginBottom: 0 } }, labelbtnFlag.activeradio
                            ? labelbtnFlag.activeradio
                            : "Active")),
                    React.createElement("span", { style: { marginLeft: "10px" }, className: "d-flex align-items-center" },
                        React.createElement(RadioButton, { inputId: gridId + "gridInactive", name: "filter", value: "Inactive", onChange: (e) => redioFilterSelection(e.value), checked: redioFilter === "Inactive" }),
                        React.createElement("label", { htmlFor: gridId + "gridInactive", style: { marginBottom: 0 } }, labelbtnFlag.inactiveradio
                            ? labelbtnFlag.inactiveradio
                            : "Inactive")),
                    React.createElement("span", { style: { marginLeft: "10px" }, className: "d-flex align-items-center" },
                        React.createElement(RadioButton, { inputId: gridId + "All", name: "filter", value: "All", onChange: (e) => redioFilterSelection(e.value), checked: redioFilter === "All" }),
                        React.createElement("label", { htmlFor: gridId + "All", style: { marginBottom: 0 } }, labelbtnFlag.allradio ? labelbtnFlag.allradio : "All")))),
                React.createElement(Button, { color: "secondary", className: "iconBtn", onClick: () => {
                        setModal(!modal);
                    }, tooltip: "Setting", tooltipOptions: { position: "top" } },
                    React.createElement(FontAwesomeIcon, { icon: "cogs" })),
                React.createElement(SplitButton, { tooltip: "Export", tooltipOptions: { position: "top" }, label: labelbtnFlag.export ? labelbtnFlag.export : "Export", className: "tableExportMenu", model: items }))),
        modal && (React.createElement(Setting, { show: modal, gridId: gridId, gridData: apiGridData, filter: filter, columns: column, onClose: closeSettingModal, onSetting: settingChanges })),
        modalExport && (React.createElement(ExportSetting, { show: modalExport, columns: column, onSetting: settingChangesExport })),
        React.createElement("div", { className: "dataTable" },
            React.createElement(React.Fragment, null,
                data && data.length > 0 ? (React.createElement(React.Fragment, null,
                    React.createElement(DataTable, { ref: dt, sortMode: "multiple", value: data, globalFilterFields: filterColumnGlobal(), filters: filters, 
                        // header={header}
                        filterDisplay: filter ? "row" : "menu", scrollable: true, scrollHeight: "400px", id: gridId, selectionMode: "single", selection: selectedItem, onSelectionChange: (e) => {
                            setSelectedItem(e.value);
                            prop.onSelect ? prop.onSelect(e.value) : {};
                        }, responsiveLayout: "scroll", onRowReorder: (e) => prop.onAddReorderRow(e.value, gridId), reorderableRows: true, removableSort: true },
                        rowReorder && (React.createElement(Column, { rowReorder: true, style: { minWidth: "3rem" } })),
                        column &&
                            column.map((e, i) => {
                                if (e.visible) {
                                    if (e.type === "Radio") {
                                        return (React.createElement(Column, { header: e.header, body: (data2) => (React.createElement(React.Fragment, null,
                                                React.createElement(RadioButton, { inputId: data2, name: data2.id, value: e.field, onChange: (x) => radioSelectRecord(data2, e.field), checked: data2[e.field] === true }))) }));
                                    }
                                    if (e.type === "CheckBox") {
                                        return (React.createElement(Column, { header: e.header, body: (data2) => (React.createElement(React.Fragment, null,
                                                React.createElement(Checkbox, { key: Math.random(), name: data2.id, value: e.field, onChange: (x) => {
                                                        onSelectCheckBox(x, data2, e.field);
                                                    }, checked: defaultChecked(e.field, data2) }))) }));
                                    }
                                    if (e.type === "Action") {
                                        return (React.createElement(Column, { style: { width: "20px" }, header: e.header, body: (data2) => (React.createElement(React.Fragment, null,
                                                React.createElement(SplitButton, { icon: "fa-solid fa-ellipsis", className: "tableActionMenu", model: itemsAction, onFocus: () => getActionBtn(data2.id, data2) }))) }));
                                        //  <Column header="Field Name" body={rowData => <span>Hello</span>} />;
                                    }
                                    if (e.type === "Button") {
                                        return (React.createElement(Column, { header: e.header, body: (data2) => (React.createElement(React.Fragment, null, buttonAction.length > 0 &&
                                                buttonAction.map((button) => (React.createElement(React.Fragment, null, button.visible == true && (React.createElement(Button, { tooltip: button.label, tooltipOptions: { position: "top" }, className: button.className + " gridIcon", onClick: () => button["id"] == "Delete"
                                                        ? deleteConfirmOnAction(data2.id, button["askReason"], data2)
                                                        : eval(prop[buttonAction[0].command](data2.id, gridId, true, editObject)) },
                                                    React.createElement("i", { className: button.icon })))))))) }));
                                    }
                                    // if (data[e.field] != '') {
                                    //   return <Button>Delete</Button>;
                                    // }
                                    return (React.createElement(Column, { key: i, columnKey: e.field, field: e.field, header: e.header, style: { width: e.width }, sortable: true }));
                                    /* <Column>
                                        <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
                                      </Column> */
                                }
                            })),
                    React.createElement(Paginator, { template: paginatorTemplate, rows: lazyState === null || lazyState === void 0 ? void 0 : lazyState.rows, first: lazyState === null || lazyState === void 0 ? void 0 : lazyState.first, onPageChange: (e) => {
                            setlazyState(e);
                            prop.onPageChange(e);
                        }, pageLinkSize: 3, totalRecords: totalRecords, className: "justify-content-end" }))) : (React.createElement("div", { className: "alert alert-warning" }, "No records found")),
                reasonFlag && (React.createElement(AskReason, { data: reasonIdDelete, deleteObject: editObject, action: "delete", visible: reasonFlag, saveWithReason: accept, onClose: handleCloseForReason }))))));
};

const Treetable = (prop) => {
    const dt = useRef();
    const [data, setData] = useState();
    const [nodes, setNodes] = useState();
    const [column, setColumn] = useState(prop.column);
    const [exportCol, setExportCol] = useState([]);
    useState(prop.documentTypeId);
    const [filter, setfilter] = useState(prop.toggleFilter);
    const [filters, setfilters] = useState(prop.filters);
    const [gridId, setGridId] = useState(prop.gridId);
    const [apiGridData, setApiGridData] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalExport, setModalExport] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [exportType, setExportType] = useState();
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [ifShowHeader, setifShowHeader] = useState(false);
    const [ifHideHeader, setifHideHeader] = useState(true);
    const [language, setlanguage] = useState(sessionStorage.getItem("Language"));
    const [redioFilter, setRedioFilter] = useState(sessionStorage.getItem("FilterStatus"));
    useState(prop.reasonAsk ? prop.reasonAsk : false);
    const menuItemId = sessionStorage.getItem("menuItemId");
    const [deleteHeader, setdeleteHeader] = useState(React.createElement(Translate$1, { contentKey: "global.deleteConfirm" }));
    const [deletemsg, setdeletemsg] = useState(React.createElement(Translate$1, { contentKey: "home.deleteMsg" }));
    const [updatedJson, setUpdatedJson] = useState();
    const getGridData = () => __awaiter(void 0, void 0, void 0, function* () {
        let id;
        if (language === "en")
            id = 1;
        else if (language === "hi")
            id = 2;
        else
            id = 3;
        // const menuItemId = gridId;
        const gridData = yield axios.get(`api/grid-user-settings/${gridId}/${id}/${menuItemId}/1`);
        yield setColumn(gridData.data.data.length > 0 ? gridData.data.data : prop.column);
        const pageData = {
            first: lazyState.first,
            rows: parseInt(gridData.data.data[0].gridPageSize),
            page: lazyState.page,
            sortField: lazyState.sortField,
            sortOrder: lazyState.sortOrder,
        };
        setlazyState(pageData);
        setfilter(gridData.data.data[0].filterEnable);
        yield prepareRowAction(gridData.data.data);
    });
    useEffect(() => {
        setNodes((pre) => {
            if (!prop.data)
                return pre;
            else
                return prop.data;
        });
        setData((pre) => {
            if (!prop.data)
                return pre;
            else
                return prop.data;
        });
    }, [prop.data]);
    useEffect(() => {
        getGridData();
        if (!redioFilter) {
            setRedioFilter("Active");
        }
        if (gridId === "dmsClientID" ||
            gridId === "dmsParameterID" ||
            gridId === "ParameterCategoriesID") {
            setifShowHeader(true);
        }
        if (gridId === "documentWorkspaceID") {
            setifHideHeader(false);
        }
    }, []);
    const toggle = (e) => {
        setExportType(e);
        setModalExport(true);
    };
    useRef(null);
    const edit = (id) => {
        prop.onEdit(id);
    };
    const save = () => {
        prop.saveJson(nodes);
    };
    const items = [
        {
            label: "CSV",
            icon: "fa-solid fa-file-csv",
            command: () => toggle("CSV"),
        },
        {
            label: "Excel",
            icon: "fa-solid fa-file-excel",
            command: () => toggle("EXCEL"),
        },
        {
            label: "PDF",
            icon: "fa-solid fa-file-pdf",
            command: () => toggle("PDF"),
        },
        {
            label: "Json",
            icon: "fa-solid fa-file-arrow-down",
            command: () => exportToJson(),
        },
        { label: "Print", icon: "fa-solid fa-print" },
    ];
    const settingChanges = (coulmnData, filterToggle, pagesize) => {
        setModal(false);
        setColumn(coulmnData);
        setfilter(filterToggle);
        const pageData = {
            first: 0,
            rows: parseInt(pagesize.size),
            page: 0,
            sortField: lazyState.sortField,
            sortOrder: lazyState.sortOrder,
        };
        setlazyState(pageData);
        prop.onPageChange(pageData);
    };
    const settingChangesExport = (coulmnData) => {
        setModalExport(false);
        setExportCol(coulmnData);
        switch (exportType) {
            case "PDF":
                exportPdf();
                break;
            case "EXCEL":
                exportExcel();
                break;
            case "CSV":
                exportCSV();
                break;
        }
    };
    const exportToJson = () => {
        downloadFile({
            body: JSON.stringify(data),
            fileName: "users.json",
            fileType: "text/json",
        });
    };
    const downloadFile = ({ body, fileName, fileType }) => {
        const blob = new Blob([body], { type: fileType });
        const a = document.createElement("a");
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        const clickEvt = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        a.dispatchEvent(clickEvt);
        a.remove();
    };
    const exportColumns = exportCol.map((col) => {
        if (col.visible)
            ({ title: col.header, dataKey: col.field });
    });
    const exportCSV = useCallback(() => {
        dt.current.api.exportDataAsCsv(data);
    }, []);
    const exportPdf = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";
        const doc = new jsPDF(orientation, unit, size);
        const title = "Report";
        const dataBody = data;
        const headers = exportColumns;
        const content = {
            startY: 50,
            head: headers,
            body: dataBody,
        };
        doc.text(title, 40, 40);
        autoTable(doc, content);
        doc.save("Task.pdf");
    };
    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(data);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFile(excelBuffer, "products");
        });
    };
    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                const EXCEL_EXTENSION = ".xlsx";
                const dataa = new Blob([buffer], {
                    type: EXCEL_TYPE,
                });
                module.default.saveAs(dataa, fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };
    const getSubDocType = (e) => {
        setSelectedProduct(e);
        // prop.onSelect(e);
    };
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        const _filters = Object.assign({}, filters);
        _filters["global"].value = value;
        setfilters(_filters);
        setGlobalFilterValue(value);
        if (gridId === "dmsParameterID") {
            prop.onSearch(value);
        }
    };
    const closeSettingModal = () => {
        setModal(false);
    };
    const redioFilterSelection = (name) => {
        setRedioFilter(name);
        sessionStorage.setItem("FilterStatus", name);
        prop.onFilterChanges(name);
    };
    var labelbtnFlag = {
        yes: React.createElement(Translate$1, { contentKey: "yes" }),
        no: React.createElement(Translate$1, { contentKey: "no" }),
        edit: React.createElement(Translate$1, { contentKey: "edit" }),
        delete: React.createElement(Translate$1, { contentKey: "delete" }),
        keySearch: React.createElement(Translate$1, { contentKey: "keywordSearch" }),
        hierarchy: React.createElement(Translate$1, { contentKey: "hierarchy" }),
        export: React.createElement(Translate$1, { contentKey: "export" }),
        activeradio: React.createElement(Translate$1, { contentKey: "activeradio" }),
        allradio: React.createElement(Translate$1, { contentKey: "allradio" }),
        inactiveradio: React.createElement(Translate$1, { contentKey: "inactiveradio" }),
    };
    const [itemsAction, setitemsAction] = useState([]);
    const [buttonAction, setButtonAction] = useState([]);
    const [reasonIdDelete, setReasonIdDelete] = useState();
    const [reasonFlag, setReasonFlag] = useState(false);
    const deleteConfirmOnAction = (id, flag, record) => __awaiter(void 0, void 0, void 0, function* () {
        setMsgLangKeyInSessionStorage(prop.msgLangKey);
        const idObj = {};
        idObj["id"] = id;
        setReasonIdDelete(idObj);
        confirmDialog({
            message: deletemsg,
            header: deleteHeader,
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-danger",
            rejectClassName: "p-button-success",
            acceptLabel: labelbtnFlag.yes ? labelbtnFlag.yes : "Yes",
            rejectLabel: labelbtnFlag.no ? labelbtnFlag.no : "No",
            accept: () => __awaiter(void 0, void 0, void 0, function* () {
                flag == true ? yield setReasonFlag(!reasonFlag) : accept(id, record);
            }),
            reject: () => reject(),
        });
    });
    const reject = () => {
        // toast.warn('You have cancel your delete request.');
    };
    const accept = (data, record) => {
        prop.onDelete(data, record);
        setReasonFlag(false);
    };
    useState();
    useState();
    const onEditorValueChange = (options, value) => __awaiter(void 0, void 0, void 0, function* () {
        const newNodes = JSON.parse(JSON.stringify(nodes));
        let indexs = options.rowIndex;
        let typeValue = typeof options.rowIndex;
        if (typeValue == "string") {
            indexs = options.rowIndex.split("_");
        }
        let obj = newNodes;
        if (typeof indexs == "number") {
            obj = obj[indexs];
        }
        else {
            for (let idx = 0; idx < indexs.length; idx++) {
                if (idx == 0) {
                    obj = obj[parseInt(indexs[idx])];
                }
                else {
                    obj = obj["children"][parseInt(indexs[idx])];
                }
            }
        }
        obj["data"][options.field] = yield value;
        let finaljson = {};
        yield setNodes(newNodes);
        finaljson["data"] = [obj];
        setUpdatedJson(finaljson);
        // makeJsonObject(nodes);
    });
    const inputTextEditor = (options) => {
        return (React.createElement(InputText, { type: "text", value: options.rowData[options.field], onChange: (e) => onEditorValueChange(options, e.target.value) }));
    };
    const [editObject, setEditObject] = useState([]);
    const getActionBtn = (id, object) => {
        setActionId(id);
        setEditObject(object);
    };
    const [actionId, setActionId] = useState();
    const prepareRowAction = (actionArr) => {
        let tmpRowAction = [];
        if (actionArr) {
            for (let i = 0; i < actionArr.length; i++) {
                if (actionArr[i]["type"] == "Action") {
                    let actinObj = actionArr[i].actionJson;
                    if (actinObj) {
                        for (let j = 0; j < actinObj.length; j++) {
                            let item = {
                                className: actinObj[j]["className"] != null &&
                                    actinObj[j]["className"] != ""
                                    ? actinObj[j]["className"]
                                    : "icon",
                                label: (React.createElement(Translate$1, { contentKey: actinObj[j]["label"] })),
                                icon: actinObj[j]["icon"],
                                id: actinObj[j]["id"],
                                visible: actinObj[j]["visible"],
                                command: () => {
                                    actinObj[j]["id"] == "Delete"
                                        ? deleteConfirmOnAction(actionId, true, editObject)
                                        : eval(prop[actinObj[j].command](actionId, gridId, actinObj[j].askReason, editObject));
                                },
                            };
                            tmpRowAction.push(item);
                        }
                        setitemsAction(tmpRowAction);
                    }
                }
                if (actionArr[i]["type"] == "Button") {
                    let butonObj = actionArr[i].actionJson;
                    setButtonAction(butonObj);
                }
            }
        }
    };
    const typeEditor = (options) => {
        return inputTextEditor(options);
    };
    useEffect(() => {
        setColumn(prop.column);
    }, [prop.column]);
    useEffect(() => {
        setActionId(actionId);
        setEditObject(editObject);
        prepareRowAction(column);
    }, [actionId]);
    const defaultChecked = (fieldName, data1) => {
        let flag;
        flag = typeof data1.data[fieldName]
            ? typeof data1.data[fieldName]
            : undefined;
        if (flag != undefined) {
            if (flag == "boolean") {
                return data1.data[fieldName];
            }
            else if (flag == "string" || flag == "number") {
                let returnValue;
                if (flag == "string") {
                    returnValue = data1.data[fieldName] == "Yes" ? true : false;
                }
                return returnValue;
            }
            return data1.data[fieldName];
        }
        else {
            if (selectCheckboxRc != undefined) {
                for (let i = 0; i < selectCheckboxRc.length; i++) {
                    if (selectCheckboxRc[i].id == data1.id) {
                        return true;
                    }
                }
            }
        }
    };
    useEffect(() => {
        setData(prop.data);
    }, [prop.data]);
    const handleCloseForReason = () => {
        setReasonFlag(!reasonFlag);
    };
    useState();
    const onNodeExpand = (e) => {
        prop.setPid(e.node.data.id);
    };
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectCheckboxRc, setSelectCheckboxRc] = useState([]);
    const onSelectCheckBox = (e, obj, fieldName) => {
        console.log("e, obj, fieldName", e, obj, fieldName);
        let selectedItemsArray = selectCheckboxRc != undefined ? [...selectCheckboxRc] : [];
        const checked = e.checked;
        if (obj[fieldName] != undefined) {
            obj[fieldName] == e.checked;
            if (e.checked) {
                if (selectedItemsArray.length == 0) {
                    selectedItemsArray.push(obj);
                }
                else {
                    selectedItemsArray.push(obj);
                    // for (let i = 0; i < selectedItemsArray.length; i++) {
                    //   if (obj.id != selectedItemsArray[i].id || selectedItemsArray.legth == 0) {
                    //   }
                    // }
                }
            }
            else {
                selectedItemsArray.splice(selectedItemsArray.indexOf(obj), 1);
            }
        }
        else {
            checked == true
                ? selectedItemsArray.push(obj)
                : selectedItemsArray.splice(selectedItemsArray.indexOf(obj), 1);
        }
        setSelectCheckboxRc(selectedItemsArray);
        setReasonIdDelete(obj);
        prop.selectCheckbox(checked, obj, selectedItemsArray);
    };
    /* pagination code */
    const [totalRecords, setTotalRecords] = useState(prop.totalRecords);
    const [lazyState, setlazyState] = useState(prop.pagination);
    useEffect(() => {
        setTotalRecords(prop.totalRecords);
    }, [prop.totalRecords]);
    useEffect(() => {
        setlazyState(lazyState);
    }, [lazyState]);
    const paginatorTemplate = {
        layout: "RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport ",
        RowsPerPageDropdown: (options) => {
            const dropdownOptions = [
                { label: 5, value: 5 },
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 50, value: 50 },
                { label: 100, value: 100 },
                { label: 200, value: 200 },
                { label: 500, value: 500 },
            ];
            return (React.createElement(React.Fragment, null,
                React.createElement(Dropdown, { value: options.value, scrollHeight: "270px", options: dropdownOptions, onChange: options.onChange })));
        },
        CurrentPageReport: (options) => {
            return (React.createElement("span", { className: "", style: {
                    color: "var(--text-color)",
                    fontSize: "14px",
                    userSelect: "none",
                    marginLeft: "auto",
                    textAlign: "center",
                } },
                options.first,
                " - ",
                options.last,
                " of ",
                options.totalRecords));
        },
    };
    return (React.createElement("div", null,
        ifHideHeader && (React.createElement("div", { className: "d-flex justify-content-between align-items-center  " },
            React.createElement("div", { className: "d-flex globlFilter" },
                React.createElement("span", { className: "p-input-icon-left" },
                    React.createElement("i", { className: "pi pi-search" }),
                    React.createElement(InputText, { value: globalFilterValue, onChange: (e) => onGlobalFilterChange(e), placeholder: "Keyword Search" }))),
            React.createElement("div", { className: "d-flex flex-wrap" },
                ifShowHeader && (React.createElement(Button$1, { onClick: () => edit(""), className: "btn btn-primary btnStyle", "data-cy": "entityCreateButton" },
                    React.createElement(FontAwesomeIcon, { icon: "plus" }),
                    "Add")),
                prop.statusFilter === true && (React.createElement("span", { className: "d-flex justify-content-center m-r-15 statusFilter" },
                    React.createElement("span", { style: { marginLeft: "10px" }, className: "d-flex align-items-center" },
                        React.createElement(RadioButton, { inputId: gridId + "gridActive", name: "filter", value: "Active", onChange: (e) => redioFilterSelection(e.value), checked: redioFilter === "Active" }),
                        React.createElement("label", { htmlFor: gridId + "gridActive", style: { marginBottom: 0 } }, labelbtnFlag.activeradio
                            ? labelbtnFlag.activeradio
                            : "Active")),
                    React.createElement("span", { style: { marginLeft: "10px" }, className: "d-flex align-items-center" },
                        React.createElement(RadioButton, { inputId: gridId + "gridInactive", name: "filter", value: "Inactive", onChange: (e) => redioFilterSelection(e.value), checked: redioFilter === "Inactive" }),
                        React.createElement("label", { htmlFor: gridId + "gridInactive", style: { marginBottom: 0 } }, labelbtnFlag.inactiveradio
                            ? labelbtnFlag.inactiveradio
                            : "Inactive")),
                    React.createElement("span", { style: { marginLeft: "10px" }, className: "d-flex align-items-center" },
                        React.createElement(RadioButton, { inputId: gridId + "All", name: "filter", value: "All", onChange: (e) => redioFilterSelection(e.value), checked: redioFilter === "All" }),
                        React.createElement("label", { htmlFor: gridId + "All", style: { marginBottom: 0 } }, labelbtnFlag.allradio ? labelbtnFlag.allradio : "All")))),
                React.createElement(Button$1, { color: "secondary", className: "iconBtn", onClick: () => {
                        setModal(!modal);
                    } },
                    React.createElement(FontAwesomeIcon, { icon: "cogs" })),
                React.createElement(SplitButton, { tooltip: "Export", tooltipOptions: { position: "top" }, label: labelbtnFlag.export ? labelbtnFlag.export : "Export", className: "tableExportMenu", model: items })))),
        modal && (React.createElement(Setting$1, { show: modal, onClose: closeSettingModal, gridId: gridId, gridData: apiGridData, filter: filter, columns: column, onSetting: settingChanges })),
        modalExport && (React.createElement(ExportSetting, { show: modalExport, columns: column, onSetting: settingChangesExport })),
        React.createElement("div", { className: "dataTable" },
            React.createElement(React.Fragment, null,
                prop.data && prop.data.length > 0 ? (React.createElement(React.Fragment, null,
                    React.createElement(TreeTable, { ref: dt, sortMode: "multiple", value: nodes, filters: filters, 
                        // header={header}
                        rows: 5, id: "table", selectionMode: "single", selectionKeys: selectedProduct, onSelectionChange: (e) => getSubDocType(e.value), onExpand: onNodeExpand, 
                        // onToggle={e => setParentId2(e.value)}
                        tableStyle: { minWidth: "50rem" } },
                        React.createElement(Column, { style: { width: "30px" }, expander: true }),
                        column.map((e, i) => {
                            if (e.visible) {
                                if (e.type === "Radio") {
                                    return (React.createElement(Column, { header: e.header, body: (data2) => (React.createElement(React.Fragment, null,
                                            React.createElement(RadioButton, { inputId: data2, name: data2.id, value: selectedCategory, onChange: (e) => setSelectedCategory(data2), checked: selectedCategory === data2 }))) }));
                                }
                                if (e.type === "CheckBox") {
                                    return (React.createElement(Column, { key: i, header: e.header, body: (data) => (React.createElement(Checkbox, { key: Math.random(), name: data.id, value: e.field, onChange: (x) => {
                                                onSelectCheckBox(x, e.field, data);
                                            }, checked: defaultChecked(e.field, data) })
                                        // <input
                                        //   key={Math.random()}
                                        //   type="checkbox"
                                        //   onChange={ele => {
                                        //     data.data.checkBoxSelected = ele.target.checked;
                                        //   }}
                                        //   defaultChecked={data.data.checkBoxSelected}
                                        //   style={{ width: '15px', height: '15px' }}
                                        // />
                                        ) }));
                                }
                                if (e.type === "Action") {
                                    return (React.createElement(Column, { header: e.header, body: (data2) => (React.createElement(React.Fragment, null,
                                            React.createElement(SplitButton, { icon: "fa-solid fa-bars", className: "tableActionMenu", model: itemsAction, 
                                                //model= {!data2.isLastNode && itemsAction.id === 'Add' ? data2.isLastNode : itemsAction}
                                                onFocus: () => getActionBtn(data2.data.id, data2.data) }))) }));
                                    //  <Column header="Field Name" body={rowData => <span>Hello</span>} />;
                                }
                                if (e.type === "Button") {
                                    return (React.createElement(Column, { header: e.header, body: (data2) => (React.createElement(React.Fragment, null, buttonAction.map((button) => (React.createElement(React.Fragment, null, button.visible == true && (React.createElement(Button$1, { tooltip: button.label, tooltipOptions: { position: "top" }, className: button.className + " gridIcon", onClick: () => button["id"] == "Delete"
                                                ? deleteConfirmOnAction(data2.id, button["askReason"], editObject)
                                                : eval(prop[buttonAction[0].command](data2.id, gridId, true, editObject)) },
                                            React.createElement("i", { className: button.icon })))))))) }));
                                }
                                if (e.editable == true) {
                                    return (React.createElement(Column, { key: i, field: e.field, header: e.header, editor: typeEditor, expander: e.expander, sortable: true }));
                                }
                                else {
                                    return (React.createElement(Column, { key: i, field: e.field, header: e.header, expander: e.expander, sortable: true }));
                                }
                                // return <Column key={i} field={e.field} header={e.header} editor={typeEditor} expander={e.expander} sortable />;
                            }
                            else
                                return null;
                        })),
                    React.createElement(Paginator, { template: paginatorTemplate, rows: lazyState === null || lazyState === void 0 ? void 0 : lazyState.rows, first: lazyState === null || lazyState === void 0 ? void 0 : lazyState.first, onPageChange: (e) => {
                            setlazyState(e);
                            prop.onPageChange(e);
                        }, pageLinkSize: 3, totalRecords: totalRecords, className: "justify-content-end" }))) : (React.createElement("div", { className: "alert alert-warning" },
                    React.createElement(Translate$1, { contentKey: "home.notFound" }, "No records found"))),
                reasonFlag && (React.createElement(AskReason, { data: reasonIdDelete, action: "delete", visible: reasonFlag, saveWithReason: accept, onClose: handleCloseForReason }))),
            prop.flag && (React.createElement("div", { className: "p-dialog-footer" },
                React.createElement(Button$1, { color: "primary", id: "save-entity", onClick: save, className: "btnStyle", "data-cy": "entityCreateSaveButton", type: "submit" },
                    React.createElement(FontAwesomeIcon, { icon: "save" }),
                    React.createElement(Translate$1, { contentKey: "home.save" })))))));
};

const LoadingSpinner = (prop) => {
    const visible = prop.visible;
    /*var Loader = require('react-loader');
    var options = {
      lines: 13,
      length: 20,
      width: 10,
      radius: 30,
      scale: 1.0,
      corners: 1,
      color: '#000',
      opacity: 0.25,
      rotate: 0,
      direction: 1,
      speed: 1,
      trail: 60,
      fps: 20,
      zIndex: 2e9,
      top: '50%',
      left: '50%',
      shadow: false,
      hwaccel: false,
      position: 'absolute',
    };
    
    return (
      //   <ProgressSpinner
      //     style={{ width: '100%', height: '100%' }}
      //     strokeWidth="8"
      //     className="spinner"
      //     fill="var(--surface-ground)"
      //     animationDuration="5.0s"
      //   />
      <Loader loaded={!visible} options={options} className="spinner"></Loader>
    );*/
    return (React.createElement(React.Fragment, null, visible && (
    // <div className="loading">Loading</div>
    React.createElement("div", { className: "spinner-container" },
        React.createElement("div", { className: "waveform" },
            React.createElement("div", { className: "waveform__bar" }),
            React.createElement("div", { className: "waveform__bar" }),
            React.createElement("div", { className: "waveform__bar" }),
            React.createElement("div", { className: "waveform__bar" }))))));
};

const varForSetDate = "SetDateFormate";
const varForDisplayDate = "DisplayDateAndTime";
const VarFordisplayeDate = "DisplayDate";
const getDateFormat = () => {
    const dateSetFormate = "services/gateway/api/getGlobalDateSystemConfigurations";
    axios.get(dateSetFormate).then((res) => __awaiter(void 0, void 0, void 0, function* () {
        for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].configurationName == "front_end_datetime_display_format") {
                sessionStorage.setItem(varForDisplayDate, res.data[i].configurationValue);
            }
            else if (res.data[i].configurationName == "front_end_date_display_format") {
                sessionStorage.setItem(VarFordisplayeDate, res.data[i].configurationValue);
            }
            else if (res.data[i].configurationName == "front_end_moment_datetime_format") {
                sessionStorage.setItem(varForSetDate, res.data[i].configurationValue);
            }
        }
    }));
};
const convertDateObjToDateString = (date) => {
    let dateFormate;
    if (sessionStorage.getItem(varForSetDate)) {
        dateFormate = sessionStorage.getItem(varForSetDate);
    }
    else {
        dateFormate = "DD-MM-YYYY HH:mm:ss";
    }
    return moment(date).format(dateFormate);
};
const convertDateStringToDateObj = (date) => {
    let dateFormate;
    if (sessionStorage.getItem(varForSetDate)) {
        dateFormate = sessionStorage.getItem(varForSetDate);
    }
    else {
        dateFormate = "DD-MM-YYYY HH:mm:ss";
    }
    return moment(date, dateFormate)["_d"];
};
const getDateAndTimeFormate = () => {
    let dateAndTimeFormate;
    if (sessionStorage.getItem(varForDisplayDate)) {
        dateAndTimeFormate = sessionStorage.getItem(varForDisplayDate);
    }
    else {
        dateAndTimeFormate = "DD-MM-YYYY HH:mm:ss";
    }
    return dateAndTimeFormate;
};
const getCalendarDateFormat = () => {
    let dateDisplayFormate;
    if (sessionStorage.getItem(VarFordisplayeDate)) {
        dateDisplayFormate = sessionStorage.getItem(VarFordisplayeDate);
    }
    else {
        dateDisplayFormate = "dd-mm-yy";
    }
    return dateDisplayFormate;
};

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  convertDateObjToDateString: convertDateObjToDateString,
  convertDateStringToDateObj: convertDateStringToDateObj,
  getCalendarDateFormat: getCalendarDateFormat,
  getDateAndTimeFormate: getDateAndTimeFormate,
  getDateFormat: getDateFormat
});

export { AskReason, index as DateFormat, ExportSetting, LoadingSpinner, Setting, Table, Translate, Treetable, breadCrumbsFlag, checkReasonFlag, checkStatus, convertDateObjToDateString, convertDateStringToDateObj, getCalendarDateFormat, getControlValidationObj, getDateAndTimeFormate, getDateFormat, getDisplay, isFieldMandatory, screenConfigration, setMsgLangKeyInSessionStorage };
//# sourceMappingURL=index.js.map
