'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var checkbox = require('primereact/checkbox');
var dialog = require('primereact/dialog');
var button = require('primereact/button');
var datatable = require('primereact/datatable');
var column = require('primereact/column');
var inputtext = require('primereact/inputtext');
var dropdown = require('primereact/dropdown');
var axios = require('axios');
var reactFontawesome = require('@fortawesome/react-fontawesome');
var freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');
var reactRouterDom = require('react-router-dom');
var splitbutton = require('primereact/splitbutton');
var confirmdialog = require('primereact/confirmdialog');
var jsPDF = require('jspdf');
var autoTable = require('jspdf-autotable');
require('app/shared/export-column');
require('primereact/paginator');
var store = require('app/config/store');
var radiobutton = require('primereact/radiobutton');
require('lodash');
var form_reducer = require('app/entities/form/form.reducer');
var utils = require('primereact/utils');
var reactHookForm = require('react-hook-form');
var reactstrap = require('reactstrap');
var inputtextarea = require('primereact/inputtextarea');
var treetable = require('primereact/treetable');
var moment = require('moment');
var entityUtils = require('app/shared/util/entity-utils');
var reactJhipster = require('react-jhipster');
var pagination_constants = require('app/shared/util/pagination.constants');
var inputswitch = require('primereact/inputswitch');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var jsPDF__default = /*#__PURE__*/_interopDefaultLegacy(jsPDF);
var autoTable__default = /*#__PURE__*/_interopDefaultLegacy(autoTable);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

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

function __awaiter$1(thisArg, _arguments, P, generator) {
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

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

// const dataSC1: any = JSON.parse(sessionStorage.getItem('LanguageData'));
// const dataSc = dataSC1 ? dataSC1.translations[2].validations.validateDetails : '';
sessionStorage.getItem("Language");
// let screenDataSc1 = JSON.parse(sessionStorage.getItem('LanguageData'));
sessionStorage.getItem("LanguageData")
    ? JSON.parse(sessionStorage.getItem("LanguageData"))["translations"]
    : "";

// const dataSC1: any = JSON.parse(sessionStorage.getItem('LanguageData'));
// const dataSc = dataSC1 ? dataSC1.translations[2].validations.validateDetails : '';
sessionStorage.getItem("Language");
// let screenDataSc1 = JSON.parse(sessionStorage.getItem('LanguageData'));
sessionStorage.getItem("LanguageData")
    ? JSON.parse(sessionStorage.getItem("LanguageData"))["translations"]
    : "";

const Translate$1 = (prop) => {
    const [selectLanguage, setSelectLanguage] = React.useState(sessionStorage.getItem("Language"));
    React.useState();
    const [isMandatory, setIsMandatory] = React.useState([]);
    React.useState();
    const [lableFlag, setLableFlag] = React.useState(false);
    const [finalValue, setFinalValue] = React.useState();
    React.useState(sessionStorage.getItem("menuItemId"));
    const navigate = reactRouterDom.useNavigate();
    React.useEffect(() => {
        fetchData();
    }, [""]);
    const fetchData = () => {
        const languageDataLocal = JSON.parse(sessionStorage.getItem("LanguageData"));
        if (languageDataLocal == undefined) {
            navigate("/logout");
        }
        console.log("props", prop.contentKey, languageDataLocal["translations"][selectLanguage][prop.contentKey]);
        if (languageDataLocal["translations"][selectLanguage][prop.contentKey] !=
            undefined)
            setFinalValue(languageDataLocal["translations"][selectLanguage][prop.contentKey]["text"]);
        setIsMandatory(languageDataLocal["translations"][selectLanguage][prop.contentKey]);
        // if (languageDataLocal['translations'][selectLanguage][prop.contentKey]['type'] != undefined) {
        console.log("prop", languageDataLocal["translations"][selectLanguage][prop.contentKey], prop.contentKey);
        const obj = languageDataLocal["translations"][selectLanguage][prop.contentKey]["type"]
            ? languageDataLocal["translations"][selectLanguage][prop.contentKey]["type"]
            : "";
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
        // }
    };
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        isMandatory != undefined ? React__default["default"].createElement("span", null,
            isMandatory.text,
            " ") : "",
        isMandatory != undefined ? (isMandatory.mandatory === true ? (lableFlag == true ? (React__default["default"].createElement(React__default["default"].Fragment, null,
            " ",
            React__default["default"].createElement("span", null, ":"),
            React__default["default"].createElement("span", { className: "reqsign" }, "*"))) : ("")) : lableFlag == true ? (React__default["default"].createElement("span", null, ":")) : ("")) : ("")));
};

// const dataSC1: any = JSON.parse(sessionStorage.getItem('LanguageData'));
// const dataSc = dataSC1 ? dataSC1.translations[2].validations.validateDetails : '';
sessionStorage.getItem("Language");
// let screenDataSc1 = JSON.parse(sessionStorage.getItem('LanguageData'));
sessionStorage.getItem("LanguageData")
    ? JSON.parse(sessionStorage.getItem("LanguageData"))["translations"]
    : "";
function getControlValidationObj$1(field) {
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

class Setting$1 extends React.Component {
    constructor(props) {
        var _a, _b, _c, _d;
        super(props);
        this.state = {
            visible: this.props.show,
            columns: this.props.columns,
            filter: (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.columns[0]) === null || _b === void 0 ? void 0 : _b.filterEnable,
            gridData: this.props.gridData,
            prop: this.props,
            pageSize: [{ size: '10' }, { size: '20' }, { size: '50' }, { size: '100' }, { size: '200' }, { size: '500' }],
            language: sessionStorage.getItem('Language'),
            selectedPageSize: {
                size: (_d = (_c = this.props) === null || _c === void 0 ? void 0 : _c.columns[0]) === null || _d === void 0 ? void 0 : _d.gridPageSize,
            },
        };
        this.toggle = e => {
            e.preventDefault();
            this.setState({ visible: !this.state.visible });
        };
        this.checkboxChange = (event, index) => {
            const data = this.tableColumns;
            data[index].visible = event.checked;
            this.setState({ columns: data });
        };
        this.footerContent = () => {
            return (React__default["default"].createElement("div", null,
                React__default["default"].createElement(button.Button, { label: "Apply", icon: "pi pi-check", onClick: () => this.handleChange(), autoFocus: true }),
                React__default["default"].createElement(button.Button, { label: "Reset", onClick: () => this.resetSettings() }),
                React__default["default"].createElement(button.Button, { label: "Cancel", icon: "pi pi-times", onClick: () => {
                        this.handleCancel();
                    }, className: "p-button-text" })));
        };
        if (this.state.gridData.length === 0) {
            this.tableColumns = this.state.columns;
            console.log('this.props?.columns[0]?.gridPageSize', this.state.selectedPageSize, this.state.filter);
        }
        else {
            this.tableColumns = this.state.gridData;
            console.log('this.props?.columns[0]?.gridPageSize', this.state.selectedPageSize, this.state.filter);
        }
        //  const [language, setlanguage] = useState(sessionStorage.getItem('Language'));
    }
    getcolumns() {
        return __awaiter$1(this, void 0, void 0, function* () {
            let data = [];
            this.props.columns.forEach(column => {
                column['gridPageSize'] = this.state.selectedPageSize.size;
                column['filterEnable'] = this.state.filter;
            });
            const entity = {
                gridId: this.state.prop.gridId,
                gridSettingDetailText: JSON.stringify(this.props.columns),
                menuItemId: sessionStorage.getItem('menuItemId'),
                userMasterId: 1,
                hierarchyLevelId: 352,
                languageId: 1,
            };
            data = yield axios__default["default"].put('api/grid-user-settings/saveUpdateData', entity);
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
    //const coldata: any = [];
    setSelectedPageSize(e) {
        return __awaiter$1(this, void 0, void 0, function* () {
            console.log('e', e);
            this.setState({
                selectedPageSize: e,
            });
            //this.coldata = e;
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
    resetSettings() {
        this.resetFromServer();
        this.props.onReset();
    }
    resetFromServer() {
        return __awaiter$1(this, void 0, void 0, function* () {
            let id;
            if (this.state.language === 'en')
                id = 1;
            else if (this.state.language === 'hi')
                id = 2;
            else
                id = 3;
            yield axios__default["default"].delete(`/api/grid-user-settings/deleteByUserIdAndHierarchyIdAndGridIdAndMenuItemId?userMasterId=${1}&languageId=${id}&gridId=${this.state.prop.gridId}`);
        });
    }
    getTabelHeaderData() {
        return __awaiter$1(this, void 0, void 0, function* () {
            let data1 = [];
            let id;
            if (this.state.language === 'en')
                id = 1;
            else if (this.state.language === 'hi')
                id = 2;
            else
                id = 3;
            this.props.columns.forEach(column => {
                column['gridPageSize'] = this.state.selectedPageSize.size;
                column['filterEnable'] = this.state.filter;
            });
            const entity = {
                gridId: String(this.props.gridId),
                gridSettingDetailText: JSON.stringify(this.state.columns),
                menuItemId: sessionStorage.getItem('menuItemId'),
                userMasterId: 1,
                hierarchyLevelId: 1,
                languageId: id,
            };
            data1 = yield axios__default["default"].put('api/grid-user-settings/saveUpdateData', entity, {
                headers: { menuItemId: this.props.gridId },
            });
            JSON.parse(data1.data.gridSettingDetailText);
        });
    }
    render() {
        const cellEditor = options => {
            return textEditor(options);
        };
        const textEditor = options => {
            return React__default["default"].createElement(inputtext.InputText, { type: "text", value: options.value, onChange: e => options.editorCallback(e.target.value) });
        };
        const onCellEditComplete = e => {
            const { rowData, newValue, field, originalEvent: event } = e;
            switch (field) {
                case 'quantity':
                default:
                    if (newValue.trim().length > 0)
                        rowData[field] = newValue;
                    else
                        event.preventDefault();
                    break;
            }
        };
        const rowReorder = e => {
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
        return (React__default["default"].createElement(dialog.Dialog, { header: "Settings", 
            //footer={this.footerContent}
            visible: this.state.visible, style: { width: '80vw' }, onHide: () => {
                this.handleCancel();
            }, draggable: false, resizable: false, maximizable: true },
            React__default["default"].createElement("div", null,
                React__default["default"].createElement("div", { className: "modal-content" },
                    React__default["default"].createElement("div", { className: "row" },
                        React__default["default"].createElement("div", { className: "col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-xs-12" },
                            React__default["default"].createElement("div", { className: "d-flex justify-content-left align-items-left" },
                                React__default["default"].createElement("label", { className: "form-label" }, "Filter: "),
                                React__default["default"].createElement(checkbox.Checkbox, { style: { marginLeft: '10px' }, onChange: event => this.setState({ filter: !this.state.filter }), checked: this.state.filter })),
                            ' '),
                        React__default["default"].createElement("div", { className: "col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-xs-12 " },
                            React__default["default"].createElement("div", { className: "d-flex justify-content-end align-items-center" },
                                React__default["default"].createElement("label", { className: "form-label", style: { marginRight: '10px' } }, "Page Size:"),
                                React__default["default"].createElement(dropdown.Dropdown, { value: this.state.selectedPageSize, onChange: e => this.setSelectedPageSize(e.value), options: this.state.pageSize, optionLabel: "size", placeholder: "Select a Page Size" })))),
                    React__default["default"].createElement("div", { className: "tableWrap", style: { marginTop: '10px' } },
                        React__default["default"].createElement(datatable.DataTable, { value: this.tableColumns, reorderableRows: true, onRowReorder: e => rowReorder(e), responsiveLayout: "scroll", rows: this.tableColumns.length, scrollable: true },
                            React__default["default"].createElement(column.Column, { rowReorder: true, style: { width: '3rem' } }),
                            React__default["default"].createElement(column.Column, { field: "header", header: "Columns", editor: options => cellEditor(options), onCellEditComplete: onCellEditComplete }),
                            React__default["default"].createElement(column.Column, { field: "width", header: "Width", editor: options => cellEditor(options), onCellEditComplete: onCellEditComplete }),
                            React__default["default"].createElement(column.Column, { header: "Display", body: (data, props) => (React__default["default"].createElement("div", null,
                                    React__default["default"].createElement(checkbox.Checkbox, { onChange: event => this.checkboxChange(event, props.rowIndex), checked: data.visible }))) })))),
                React__default["default"].createElement("div", { className: "p-dialog-footer" },
                    React__default["default"].createElement(button.Button, { className: "btnStyle btn btn-success", onClick: () => this.handleChange(), autoFocus: true },
                        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCheck }),
                        " ",
                        React__default["default"].createElement(Translate$1, { contentKey: "home.apply" })),
                    React__default["default"].createElement(button.Button, { className: "btnStyle btn btn-info", onClick: () => this.resetSettings() },
                        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faRepeat }),
                        " ",
                        React__default["default"].createElement(Translate$1, { contentKey: "home.reset" })),
                    React__default["default"].createElement(button.Button, { className: "btnStyle btn btn-danger", onClick: () => this.handleCancel() },
                        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: "times" }),
                        React__default["default"].createElement(Translate$1, { contentKey: "home.close" }))))));
    }
}

const Translate$2 = (prop) => {
    const [selectLanguage, setSelectLanguage] = React.useState(sessionStorage.getItem("Language"));
    React.useState();
    const [isMandatory, setIsMandatory] = React.useState([]);
    React.useState();
    const [lableFlag, setLableFlag] = React.useState(false);
    const [finalValue, setFinalValue] = React.useState();
    React.useState(sessionStorage.getItem("menuItemId"));
    const navigate = reactRouterDom.useNavigate();
    React.useEffect(() => {
        fetchData();
    }, [""]);
    const fetchData = () => {
        const languageDataLocal = JSON.parse(sessionStorage.getItem("LanguageData"));
        if (languageDataLocal == undefined) {
            navigate("/logout");
        }
        console.log("props", prop.contentKey, languageDataLocal["translations"][selectLanguage][prop.contentKey]);
        if (languageDataLocal["translations"][selectLanguage][prop.contentKey] !=
            undefined)
            setFinalValue(languageDataLocal["translations"][selectLanguage][prop.contentKey]["text"]);
        setIsMandatory(languageDataLocal["translations"][selectLanguage][prop.contentKey]);
        // if (languageDataLocal['translations'][selectLanguage][prop.contentKey]['type'] != undefined) {
        console.log("prop", languageDataLocal["translations"][selectLanguage][prop.contentKey], prop.contentKey);
        const obj = languageDataLocal["translations"][selectLanguage][prop.contentKey]["type"]
            ? languageDataLocal["translations"][selectLanguage][prop.contentKey]["type"]
            : "";
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
        // }
    };
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        isMandatory != undefined ? React__default["default"].createElement("span", null,
            isMandatory.text,
            " ") : "",
        isMandatory != undefined ? (isMandatory.mandatory === true ? (lableFlag == true ? (React__default["default"].createElement(React__default["default"].Fragment, null,
            " ",
            React__default["default"].createElement("span", null, ":"),
            React__default["default"].createElement("span", { className: "reqsign" }, "*"))) : ("")) : lableFlag == true ? (React__default["default"].createElement("span", null, ":")) : ("")) : ("")));
};

const AskReason$1 = (prop) => {
    const [dataForm, setData] = React.useState(prop.data);
    React.useState("");
    const [visible, setVisible] = React.useState(prop.visible);
    const [action, setAction] = React.useState(prop.action);
    const closeModal = () => {
        setVisible(false);
        prop.onClose();
    };
    React.useEffect(() => {
        console.log(prop);
    });
    const defaultValues = Object.assign(Object.assign({}, dataForm), { reasonForChange: "" });
    const getFormErrorMessage = (name) => {
        return errors[name] ? (React__default["default"].createElement("small", { className: "p-error" }, errors[name].message)) : (React__default["default"].createElement("small", { className: "p-error" }, "\u00A0"));
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
    const { control, formState: { errors }, handleSubmit, getValues, reset, } = reactHookForm.useForm({ defaultValues });
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(dialog.Dialog, { header: React__default["default"].createElement(Translate$2, { contentKey: "reasonForConfirmation" }), id: prop.id, visible: visible, onHide: closeModal, style: { width: "30vw" } },
            React__default["default"].createElement("form", { onSubmit: handleSubmit(onSubmit) },
                React__default["default"].createElement("div", { className: "modal-content", style: { overflow: "auto !important" } },
                    React__default["default"].createElement("div", { className: "container-fluid" },
                        React__default["default"].createElement("div", { className: "row form-group" },
                            React__default["default"].createElement(reactHookForm.Controller, { name: "reasonForChange", control: control, rules: getControlValidationObj$1("reason"), render: ({ field, fieldState }) => (React__default["default"].createElement(React__default["default"].Fragment, null,
                                    React__default["default"].createElement("label", { className: "form-label" },
                                        React__default["default"].createElement(Translate$2, { contentKey: "reason" })),
                                    React__default["default"].createElement(inputtextarea.InputTextarea, { id: field.name, value: field.value, className: utils.classNames("form-control", {
                                            "p-invalid": fieldState.error,
                                        }), onChange: (e) => field.onChange(e.target.value), rows: 3, cols: 30 }),
                                    getFormErrorMessage(field.name))) })),
                        prop.passwordFlag && (React__default["default"].createElement("div", { className: "row form-group" },
                            React__default["default"].createElement(reactHookForm.Controller, { name: "password", control: control, rules: getControlValidationObj$1("password.global"), render: ({ field, fieldState }) => (React__default["default"].createElement(React__default["default"].Fragment, null,
                                    React__default["default"].createElement("label", { className: "form-label" },
                                        React__default["default"].createElement(Translate$2, { contentKey: "password.global" })),
                                    React__default["default"].createElement(inputtext.InputText, { id: field.name, value: field.value, className: utils.classNames("form-control", {
                                            "p-invalid": fieldState.error,
                                        }), onChange: (e) => field.onChange(e.target.value) }),
                                    getFormErrorMessage(field.name))) }))),
                        React__default["default"].createElement("div", { className: "p-dialog-footer " },
                            React__default["default"].createElement(reactstrap.Button, { label: "Submit", id: "askReason", type: "submit", color: action == "delete" ? "danger" : "primary", className: "btnStyle", icon: "pi pi-check" },
                                action == "delete" ? (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: "times" })) : (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: "save" })),
                                action == "delete" ? (React__default["default"].createElement(Translate$2, { contentKey: "delete" })) : (React__default["default"].createElement(Translate$2, { contentKey: "home.save" }))))))))));
};

// const dataSC1: any = JSON.parse(sessionStorage.getItem('LanguageData'));
// const dataSc = dataSC1 ? dataSC1.translations[2].validations.validateDetails : '';
sessionStorage.getItem("Language");
// let screenDataSc1 = JSON.parse(sessionStorage.getItem('LanguageData'));
sessionStorage.getItem("LanguageData")
    ? JSON.parse(sessionStorage.getItem("LanguageData"))["translations"]
    : "";
function setMsgLangKeyInSessionStorage$1(key) {
    sessionStorage.setItem("msgLangKey", key);
}
function getControlValidationObj$2(field) {
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

class Setting extends React.Component {
    constructor(props) {
        var _a, _b, _c, _d;
        super(props);
        this.state = {
            visible: this.props.show,
            columns: this.props.columns,
            filter: (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.columns[0]) === null || _b === void 0 ? void 0 : _b.filterEnable,
            gridData: this.props.gridData,
            prop: this.props,
            pageSize: [{ size: '10' }, { size: '20' }, { size: '50' }, { size: '100' }, { size: '200' }, { size: '500' }],
            language: sessionStorage.getItem('Language'),
            selectedPageSize: {
                size: (_d = (_c = this.props) === null || _c === void 0 ? void 0 : _c.columns[0]) === null || _d === void 0 ? void 0 : _d.gridPageSize,
            },
        };
        this.toggle = e => {
            e.preventDefault();
            this.setState({ visible: !this.state.visible });
        };
        this.checkboxChange = (event, index) => {
            const data = this.tableColumns;
            data[index].visible = event.checked;
            this.setState({ columns: data });
        };
        this.footerContent = () => {
            return (React__default["default"].createElement("div", null,
                React__default["default"].createElement(button.Button, { label: "Apply", icon: "pi pi-check", onClick: () => this.handleChange(), autoFocus: true }),
                React__default["default"].createElement(button.Button, { label: "Reset", onClick: () => this.resetSettings() }),
                React__default["default"].createElement(button.Button, { label: "Cancel", icon: "pi pi-times", onClick: () => {
                        this.handleCancel();
                    }, className: "p-button-text" })));
        };
        if (this.state.gridData.length === 0) {
            this.tableColumns = this.state.columns;
            console.log('this.props?.columns[0]?.gridPageSize', this.state.selectedPageSize, this.state.filter);
        }
        else {
            this.tableColumns = this.state.gridData;
            console.log('this.props?.columns[0]?.gridPageSize', this.state.selectedPageSize, this.state.filter);
        }
        //  const [language, setlanguage] = useState(sessionStorage.getItem('Language'));
    }
    getcolumns() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = [];
            this.props.columns.forEach(column => {
                column['gridPageSize'] = this.state.selectedPageSize.size;
                column['filterEnable'] = this.state.filter;
            });
            const entity = {
                gridId: this.state.prop.gridId,
                gridSettingDetailText: JSON.stringify(this.props.columns),
                menuItemId: sessionStorage.getItem('menuItemId'),
                userMasterId: 1,
                hierarchyLevelId: 352,
                languageId: 1,
            };
            data = yield axios__default["default"].put('api/grid-user-settings/saveUpdateData', entity);
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
    //const coldata: any = [];
    setSelectedPageSize(e) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('e', e);
            this.setState({
                selectedPageSize: e,
            });
            //this.coldata = e;
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
    resetSettings() {
        this.resetFromServer();
        this.props.onReset();
    }
    resetFromServer() {
        return __awaiter(this, void 0, void 0, function* () {
            let id;
            if (this.state.language === 'en')
                id = 1;
            else if (this.state.language === 'hi')
                id = 2;
            else
                id = 3;
            yield axios__default["default"].delete(`/api/grid-user-settings/deleteByUserIdAndHierarchyIdAndGridIdAndMenuItemId?userMasterId=${1}&languageId=${id}&gridId=${this.state.prop.gridId}`);
        });
    }
    getTabelHeaderData() {
        return __awaiter(this, void 0, void 0, function* () {
            let data1 = [];
            let id;
            if (this.state.language === 'en')
                id = 1;
            else if (this.state.language === 'hi')
                id = 2;
            else
                id = 3;
            this.props.columns.forEach(column => {
                column['gridPageSize'] = this.state.selectedPageSize.size;
                column['filterEnable'] = this.state.filter;
            });
            const entity = {
                gridId: String(this.props.gridId),
                gridSettingDetailText: JSON.stringify(this.state.columns),
                menuItemId: sessionStorage.getItem('menuItemId'),
                userMasterId: 1,
                hierarchyLevelId: 1,
                languageId: id,
            };
            data1 = yield axios__default["default"].put('api/grid-user-settings/saveUpdateData', entity, {
                headers: { menuItemId: this.props.gridId },
            });
            JSON.parse(data1.data.gridSettingDetailText);
        });
    }
    render() {
        const cellEditor = options => {
            return textEditor(options);
        };
        const textEditor = options => {
            return React__default["default"].createElement(inputtext.InputText, { type: "text", value: options.value, onChange: e => options.editorCallback(e.target.value) });
        };
        const onCellEditComplete = e => {
            const { rowData, newValue, field, originalEvent: event } = e;
            switch (field) {
                case 'quantity':
                default:
                    if (newValue.trim().length > 0)
                        rowData[field] = newValue;
                    else
                        event.preventDefault();
                    break;
            }
        };
        const rowReorder = e => {
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
        return (React__default["default"].createElement(dialog.Dialog, { header: React__default["default"].createElement(Translate$2, { contentKey: "setting.label" }), 
            //footer={this.footerContent}
            visible: this.state.visible, style: { width: '80vw' }, onHide: () => {
                this.handleCancel();
            }, draggable: false, resizable: false, maximizable: true },
            React__default["default"].createElement("div", null,
                React__default["default"].createElement("div", { className: "modal-content" },
                    React__default["default"].createElement("div", { className: "row" },
                        React__default["default"].createElement("div", { className: "col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-xs-12" },
                            React__default["default"].createElement("div", { className: "d-flex justify-content-left align-items-left" },
                                React__default["default"].createElement("label", { className: "form-label" },
                                    React__default["default"].createElement(Translate$2, { contentKey: "setting.filters" }),
                                    " "),
                                React__default["default"].createElement(checkbox.Checkbox, { style: { marginLeft: '10px' }, onChange: event => this.setState({ filter: !this.state.filter }), checked: this.state.filter })),
                            ' '),
                        React__default["default"].createElement("div", { className: "col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-xs-12 " },
                            React__default["default"].createElement("div", { className: "d-flex justify-content-end align-items-center" },
                                React__default["default"].createElement("label", { className: "form-label", style: { marginRight: '10px' } },
                                    React__default["default"].createElement(Translate$2, { contentKey: "setting.pageSize" })),
                                React__default["default"].createElement(dropdown.Dropdown, { value: this.state.selectedPageSize, onChange: e => this.setSelectedPageSize(e.value), options: this.state.pageSize, optionLabel: "size", placeholder: "Select a Page Size" })))),
                    React__default["default"].createElement("div", { className: "tableWrap", style: { marginTop: '10px' } },
                        React__default["default"].createElement(datatable.DataTable, { value: this.tableColumns, reorderableRows: true, onRowReorder: e => rowReorder(e), responsiveLayout: "scroll", rows: this.tableColumns.length, scrollable: true },
                            React__default["default"].createElement(column.Column, { rowReorder: true, style: { width: '3rem' } }),
                            React__default["default"].createElement(column.Column, { field: "header", header: React__default["default"].createElement(Translate$2, { contentKey: "setting.grid.colomn" }), editor: options => cellEditor(options), onCellEditComplete: onCellEditComplete }),
                            React__default["default"].createElement(column.Column, { field: "width", header: React__default["default"].createElement(Translate$2, { contentKey: "setting.grid.width" }), editor: options => cellEditor(options), onCellEditComplete: onCellEditComplete }),
                            React__default["default"].createElement(column.Column, { header: React__default["default"].createElement(Translate$2, { contentKey: "setting.grid.display" }), body: (data, props) => (React__default["default"].createElement("div", null,
                                    React__default["default"].createElement(checkbox.Checkbox, { onChange: event => this.checkboxChange(event, props.rowIndex), checked: data.visible }))) })))),
                React__default["default"].createElement("div", { className: "p-dialog-footer" },
                    React__default["default"].createElement(button.Button, { className: "btnStyle btn btn-success", onClick: () => this.handleChange(), autoFocus: true },
                        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCheck }),
                        " ",
                        React__default["default"].createElement(Translate$2, { contentKey: "home.apply" })),
                    React__default["default"].createElement(button.Button, { className: "btnStyle btn btn-info", onClick: () => this.resetSettings() },
                        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faRepeat }),
                        " ",
                        React__default["default"].createElement(Translate$2, { contentKey: "home.reset" })),
                    React__default["default"].createElement(button.Button, { className: "btnStyle btn btn-danger", onClick: () => this.handleCancel() },
                        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: "times" }),
                        React__default["default"].createElement(Translate$2, { contentKey: "home.close" }))))));
    }
}

const Translate = (prop) => {
    const [selectLanguage, setSelectLanguage] = React.useState(sessionStorage.getItem("Language"));
    React.useState();
    const [isMandatory, setIsMandatory] = React.useState([]);
    React.useState();
    const [lableFlag, setLableFlag] = React.useState(false);
    const [finalValue, setFinalValue] = React.useState();
    React.useState(sessionStorage.getItem("menuItemId"));
    const navigate = reactRouterDom.useNavigate();
    React.useEffect(() => {
        fetchData();
    }, [""]);
    const fetchData = () => {
        const languageDataLocal = JSON.parse(sessionStorage.getItem("LanguageData"));
        if (languageDataLocal == undefined) {
            navigate("/logout");
        }
        console.log("props", prop.contentKey, languageDataLocal["translations"][selectLanguage][prop.contentKey]);
        if (languageDataLocal["translations"][selectLanguage][prop.contentKey] !=
            undefined)
            setFinalValue(languageDataLocal["translations"][selectLanguage][prop.contentKey]["text"]);
        setIsMandatory(languageDataLocal["translations"][selectLanguage][prop.contentKey]);
        // if (languageDataLocal['translations'][selectLanguage][prop.contentKey]['type'] != undefined) {
        console.log("prop", languageDataLocal["translations"][selectLanguage][prop.contentKey], prop.contentKey);
        const obj = languageDataLocal["translations"][selectLanguage][prop.contentKey]["type"]
            ? languageDataLocal["translations"][selectLanguage][prop.contentKey]["type"]
            : "";
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
        // }
    };
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        isMandatory != undefined ? React__default["default"].createElement("span", null,
            isMandatory.text,
            " ") : "",
        isMandatory != undefined ? (isMandatory.mandatory === true ? (lableFlag == true ? (React__default["default"].createElement(React__default["default"].Fragment, null,
            " ",
            React__default["default"].createElement("span", null, ":"),
            React__default["default"].createElement("span", { className: "reqsign" }, "*"))) : ("")) : lableFlag == true ? (React__default["default"].createElement("span", null, ":")) : ("")) : ("")));
};

class ExportSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.show,
            columns: this.props.columns,
            prop: this.props,
        };
        this.toggle = e => {
            e.preventDefault();
            this.setState({ visible: !this.state.visible });
        };
        this.checkboxChange = (event, index) => {
            const data = this.state.columns;
            data[index].visible = event.checked;
            this.setState({ columns: data });
        };
        this.state.columns.map(e => {
            e.visible = true;
        });
    }
    handleChange() {
        this.props.onSetting(this.state.columns);
        this.props.onClose();
    }
    handleCancel() {
        this.setState({
            visible: false,
            colums: this.props.columns,
        });
    }
    resetSettings() {
        this.setState({
            columns: this.state.columns.map(e => (e.visible = true)),
        });
    }
    render() {
        const cellEditor = options => {
            return textEditor(options);
        };
        const textEditor = options => {
            return React__default["default"].createElement(inputtext.InputText, { type: "text", value: options.value, onChange: e => options.editorCallback(e.target.value) });
        };
        const onCellEditComplete = e => {
            const { rowData, newValue, field, originalEvent: event } = e;
            switch (field) {
                case 'quantity':
                default:
                    if (newValue.trim().length > 0)
                        rowData[field] = newValue;
                    else
                        event.preventDefault();
                    break;
            }
        };
        const footerContent = (React__default["default"].createElement("div", null,
            React__default["default"].createElement(button.Button, { label: "Export", icon: "pi pi-check", onClick: () => this.handleChange(), autoFocus: true })));
        return (React__default["default"].createElement(dialog.Dialog, { header: React__default["default"].createElement(Translate$2, { contentKey: "exports.title" }), footer: footerContent, maximizable: true, visible: this.state.visible, style: { width: '50vw' }, onHide: () => {
                this.handleCancel();
            } },
            React__default["default"].createElement("div", { className: "modal-content" },
                React__default["default"].createElement(datatable.DataTable
                // reorderableRows
                , { 
                    // reorderableRows
                    dataKey: "id", value: this.state.columns, 
                    // onRowReorder={onRowReorder}
                    responsiveLayout: "scroll", rows: this.state.columns.length },
                    React__default["default"].createElement(column.Column, { field: "header", header: React__default["default"].createElement(Translate$2, { contentKey: "setting.grid.colomn" }), editor: options => cellEditor(options), onCellEditComplete: onCellEditComplete }),
                    React__default["default"].createElement(column.Column, { header: React__default["default"].createElement(Translate$2, { contentKey: "setting.grid.display" }), body: (data, props) => (React__default["default"].createElement("div", null,
                            React__default["default"].createElement(checkbox.Checkbox, { onChange: event => this.checkboxChange(event, props.rowIndex), checked: data.visible }))) }))),
            React__default["default"].createElement("div", { className: "p-dialog-footer" },
                React__default["default"].createElement(button.Button, { className: "btnStyle btn btn-success", onClick: () => this.handleChange(), autoFocus: true },
                    React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCheck }),
                    " ",
                    React__default["default"].createElement(Translate$2, { contentKey: "exports.title" })))));
    }
}

const Table = prop => {
    const menuItemId = sessionStorage.getItem('menuItemId');
    React.useState(sessionStorage.getItem('id'));
    const dt = React.useRef();
    const dispatch = store.useAppDispatch();
    const [reasonFlag, setReasonFlag] = React.useState(false);
    const [data, setData] = React.useState();
    const [column$1, setColumn] = React.useState();
    React.useState([]);
    const [exportCol, setExportCol] = React.useState([]);
    const [filter, setfilter] = React.useState(prop.toggleFilter);
    const [filters, setfilters] = React.useState(prop.filters);
    /* pagination code */
    const [totalRecords, setTotalRecords] = React.useState(prop.totalRecords);
    const [lazyState, setlazyState] = React.useState(prop.pagination);
    const [gridId, setGridId] = React.useState(prop.gridId);
    const [apiGridData, setApiGridData] = React.useState([]);
    const [modal, setModal] = React.useState(false);
    const [modalExport, setModalExport] = React.useState(false);
    React.useState(null);
    const [exportType, setExportType] = React.useState();
    React.useState([]);
    const [globalFilterValue, setGlobalFilterValue] = React.useState('');
    const [deleteHeader, setdeleteHeader] = React.useState(React__default["default"].createElement(Translate$2, { contentKey: "global.deleteConfirm" }));
    const [deletemsg, setdeletemsg] = React.useState(React__default["default"].createElement(Translate$2, { contentKey: "home.deleteMsg" }));
    const [ifShowHeader, setifShowHeader] = React.useState(false);
    const [ifHideHeader, setifHideHeader] = React.useState(true);
    const [language, setlanguage] = React.useState(sessionStorage.getItem('Language'));
    const [redioFilter, setRedioFilter] = React.useState('Active');
    const [redioFilterPublish, setRedioFilterPublish] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState(React__default["default"].createElement(Translate$2, { contentKey: "home.notFound" }));
    const [Searchplaceholder, setSearchPlaceholder] = React.useState('Keyword Search');
    React.useState(prop.reasonAskOnCheck ? prop.reasonAskOnCheck : false);
    const [itemsAction, setitemsAction] = React.useState([]);
    const [buttonAction, setButtonAction] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState();
    React.useState(prop.hideActionbtn ? prop.hideActionbtn : false);
    const [rowReorder, setrowReorder] = React.useState(prop.rowReorder ? prop.rowReorder : false);
    const [actionId, setActionId] = React.useState();
    const [editObject, setEditObject] = React.useState([]);
    React.useState(Number(sessionStorage.getItem('MaxPageSize')));
    const [defaultPageSize, setDefaultPageSize] = React.useState(Number(sessionStorage.getItem('DefaultPageSize')));
    React.useEffect(() => {
        setlazyState(lazyState);
    }, [lazyState]);
    const getActionBtn = (id, object) => {
        setActionId(id);
        setEditObject(object);
    };
    React.useEffect(() => {
        const compareJsonjs = document.createElement('script');
        compareJsonjs.src = 'https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js';
        compareJsonjs.async = true;
        document.body.appendChild(compareJsonjs);
    }, []);
    const getGridData = () => __awaiter(void 0, void 0, void 0, function* () {
        let id;
        if (language === 'en')
            id = 1;
        else if (language === 'hi')
            id = 2;
        else
            id = 3;
        const gridData = yield axios__default["default"].get(`api/grid-user-settings/${gridId}/${id}/${menuItemId}/1`);
        (yield gridData.data.data.length) > 0 ? setColumn(gridData.data.data) : setColumn(prop.column);
        const pageData = {
            first: lazyState.first,
            rows: gridData.data.data.length > 0 ? parseInt(gridData.data.data[0].gridPageSize) : 10,
            page: lazyState.page,
            sortField: lazyState.sortField,
            sortOrder: lazyState.sortOrder,
        };
        setlazyState(pageData);
        setfilter(gridData.data.data.length > 0 ? gridData.data.data[0].filterEnable : false);
        yield prepareRowAction(gridData.data.data);
    });
    const arrForRow = sessionStorage.getItem('RowsPerPage');
    const [perPage, setPerPage] = React.useState([]);
    React.useEffect(() => {
        let arr = arrForRow.split(',').map(Number);
        console.log('arrFor', arr);
        // for (let i = 0; i < arrForRow.length; i++) {
        //   arr.push(Number(arrForRow[i]));
        // }
        setPerPage(arr);
    }, [arrForRow]);
    React.useEffect(() => {
        column$1 == undefined ? setColumn(prop.column) : '';
    }, [prop.column]);
    React.useEffect(() => {
        setActionId(actionId);
        setEditObject(editObject);
        prepareRowAction(column$1);
    }, [actionId, editObject]);
    React.useEffect(() => {
        setTotalRecords(prop.totalRecords);
    }, [prop.totalRecords]);
    React.useEffect(() => {
        setlazyState(prop.pagination);
    }, [prop.pagination]);
    React.useEffect(() => {
        setData(prop.data);
        // prop.data.length > 0 ? setErrorMessage(true) : setErrorMessage(false);
        // setitemsAction(prop.actionFlag);
    }, [prop.data]);
    const labelbtnFlag = {
        yes: React__default["default"].createElement(Translate$2, { contentKey: "yes" }),
        no: React__default["default"].createElement(Translate$2, { contentKey: "no" }),
        edit: React__default["default"].createElement(Translate$2, { contentKey: "edit" }),
        delete: React__default["default"].createElement(Translate$2, { contentKey: "delete" }),
        keySearch: React__default["default"].createElement(Translate$2, { contentKey: "keywordSearch" }),
        hierarchy: React__default["default"].createElement(Translate$2, { contentKey: "hierarchy" }),
        export: React__default["default"].createElement(Translate$2, { contentKey: "export" }),
        activeradio: React__default["default"].createElement(Translate$2, { contentKey: "activeradio" }),
        allradio: React__default["default"].createElement(Translate$2, { contentKey: "allradio" }),
        inactiveradio: React__default["default"].createElement(Translate$2, { contentKey: "inactiveradio" }),
    };
    const prepareRowAction = (actionArr) => {
        let tmpRowAction = [];
        if (actionArr) {
            for (let i = 0; i < actionArr.length; i++) {
                if (actionArr[i]['type'] == 'Action') {
                    let actinObj = actionArr[i].actionJson;
                    if (actinObj) {
                        for (let j = 0; j < actinObj.length; j++) {
                            let item = {
                                className: actinObj[j]['className'] != null && actinObj[j]['className'] != '' ? actinObj[j]['className'] : 'icon',
                                label: (React__default["default"].createElement("span", { style: { color: '#1565c0' } },
                                    React__default["default"].createElement(Translate$2, { contentKey: actinObj[j]['label'] }))),
                                icon: actinObj[j]['icon'],
                                id: actinObj[j]['id'],
                                visible: actinObj[j]['visible'],
                                askReason: actinObj[j]['askReason'],
                                command: () => {
                                    actinObj[j]['id'] == 'Delete'
                                        ? deleteConfirmOnAction(actionId, actinObj[j]['askReason'], editObject)
                                        : eval(prop[actinObj[j].command](actionId, gridId, actinObj[j]['askReason'], editObject));
                                },
                            };
                            tmpRowAction.push(item);
                            setitemsAction(tmpRowAction);
                        }
                    }
                }
                if (actionArr[i]['type'] == 'Button') {
                    let butonObj = actionArr[i].actionJson;
                    setButtonAction(butonObj);
                }
            }
        }
    };
    React.useEffect(() => {
        setSelectedItem(prop.sendSelectedItem ? prop.sendSelectedItem : '');
        setSelectCheckboxRc(prop.sendSelectedItem);
    }, [prop.sendSelectedItem]);
    React.useEffect(() => {
        getGridData();
        setRedioFilterPublish('All');
        if (!redioFilter) {
            setRedioFilter('Active');
        }
        if (gridId === 'dmsClientID' || gridId === 'dmsParameterID' || gridId === 'ParameterCategoriesID') {
            setifShowHeader(true);
        }
        if (gridId === 'documentWorkspaceID') {
            setifHideHeader(false);
        }
        setSearchPlaceholder(String(React__default["default"].createElement(Translate$2, { contentKey: "export" })));
    }, []);
    React.useState('Default Label');
    const toggle = e => {
        setExportType(e);
        setModalExport(!modalExport);
    };
    const edit = id => {
        prop.onEdit(id);
    };
    const settingChangesExport = coulmnData => {
        setModalExport(false);
        setExportCol(coulmnData);
        const exportData = data;
        const headers = [];
        coulmnData.map(col => {
            if (col.visible)
                headers.push(col.field);
        });
        const newData = [];
        exportData.map(element => {
            const newObj = {};
            headers.forEach(name => {
                newObj[name] = element[name];
            });
            newData.push(newObj);
        });
        const newDataExcel = [];
        exportData.map(element => {
            const newObj = {};
            headers.forEach(name => {
                newObj[name.toUpperCase()] = element[name];
            });
            newDataExcel.push(newObj);
        });
        switch (exportType) {
            case 'PDF':
                exportPdf(newData, headers, coulmnData);
                break;
            case 'EXCEL':
                exportExcel(newDataExcel);
                break;
            case 'CSV':
                exportCSV(newData);
                break;
        }
    };
    const convertToCSV = objArray => {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        for (let i = 0; i < array.length; i++) {
            let line = '';
            // eslint-disable-next-line guard-for-in
            for (const index in array[i]) {
                if (line !== '')
                    line += ',';
                line += array[i][index];
            }
            str += line + '\r\n';
        }
        return str;
    };
    const exportCSV = (newData, headers) => {
        // Convert Object to JSON
        const jsonObject = JSON.stringify(newData);
        const csv = convertToCSV(jsonObject);
        const exportedFilenmae = 'report' + '.csv' ;
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            // feature detection
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    const exportPdf = (newData, headers, coulmnData) => __awaiter(void 0, void 0, void 0, function* () {
        var out = [];
        for (var i = 0; i < coulmnData.length; i++) {
            if (coulmnData[i].field === headers[i]) {
                out.push(coulmnData[i].header);
            }
        }
        document.getElementById('tablePdf');
        const unit = 'pt';
        const size = 'A4';
        const orientation = 'portrait';
        const doc = new jsPDF__default["default"](orientation, unit, size);
        const title = prop.title.concat(' Report');
        var data = newData.map(obj => headers.map(header => obj[header]));
        const content = {
            startY: 50,
            head: [out],
            body: data,
        };
        doc.text(title, 40, 40);
        autoTable__default["default"](doc, content);
        doc.save(prop.title.concat(' Report.pdf'));
        //html2pdf(input);
    });
    const exportExcel = newData => {
        Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('xlsx')); }).then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(newData);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array',
            });
            saveAsExcelFile(excelBuffer, prop.title);
        });
    };
    const saveAsExcelFile = (buffer, fileName) => {
        Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('file-saver')); }).then(module => {
            if (module && module.default) {
                const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                const EXCEL_EXTENSION = '.xlsx';
                const dataa = new Blob([buffer], {
                    type: EXCEL_TYPE,
                });
                module.default.saveAs(dataa, fileName + EXCEL_EXTENSION);
            }
        });
    };
    const settingChanges = (coulmnData, filterToggle) => {
        setModal(false);
        setColumn(coulmnData);
        setfilter(filterToggle);
    };
    const onReset = () => __awaiter(void 0, void 0, void 0, function* () {
        let id;
        setModal(false);
        if (language === 'en')
            id = 1;
        else if (language === 'hi')
            id = 2;
        else
            id = 3;
        yield axios__default["default"].get(`api/grid-user-settings/${gridId}/${id}/${menuItemId}/1`);
        dispatch(form_reducer.getColumns({
            gridId: gridId,
            id: id,
            menuItemId: menuItemId,
        })).then((res) => __awaiter(void 0, void 0, void 0, function* () {
            setColumn(res.payload.data.data);
            // setColumn(gridData.data.data)
            const pageData = {
                first: lazyState.first,
                rows: yield parseInt(res.payload.data.data[0].gridPageSize),
                page: lazyState.page,
                sortField: lazyState.sortField,
                sortOrder: lazyState.sortOrder,
            };
            setlazyState(pageData);
            setfilter(res.payload.data.data[0].filterEnable);
            yield prepareRowAction(res.payload.data.data);
            yield prop.onPageChange(pageData);
            setData(prop.data);
            closeSettingModal();
        }));
    });
    const closeSettingModal = () => __awaiter(void 0, void 0, void 0, function* () {
        let id;
        if (language === 'en')
            id = 1;
        else if (language === 'hi')
            id = 2;
        else
            id = 3;
        const gridData = yield axios__default["default"].get(`api/grid-user-settings/${gridId}/${id}/${menuItemId}/1`);
        // (await gridData.data.data.length) > 0 ? setColumn(gridData.data.data) : setColumn(prop.column);
        setColumn(gridData.data.data);
        const pageData = {
            first: lazyState.first,
            rows: yield parseInt(gridData.data.data[0].gridPageSize),
            page: lazyState.page,
            sortField: lazyState.sortField,
            sortOrder: lazyState.sortOrder,
        };
        setlazyState(pageData);
        setfilter(gridData.data.data[0].filterEnable);
        yield prepareRowAction(gridData.data.data);
        yield setModal(false);
        setData(prop.data);
    });
    const [reasonIdDelete, setReasonIdDelete] = React.useState();
    const deleteConfirmOnAction = (id, flag, record) => __awaiter(void 0, void 0, void 0, function* () {
        setMsgLangKeyInSessionStorage$1(prop.msgLangKey);
        const idObj = {};
        idObj['id'] = id;
        setReasonIdDelete(idObj);
        confirmdialog.confirmDialog({
            message: deletemsg,
            header: deleteHeader,
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            rejectClassName: 'p-button-success',
            acceptLabel: labelbtnFlag.yes ? labelbtnFlag.yes : 'Yes',
            rejectLabel: labelbtnFlag.no ? labelbtnFlag.no : 'No',
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
        _filters['global'].value = value;
        setfilters(_filters);
        setGlobalFilterValue(value);
        if (gridId === 'dmsParameterID') {
            prop.onSearch(value);
        }
    };
    const handleCloseForReason = () => {
        setReasonFlag(!reasonFlag);
        setData(prop.data);
        setSelectCheckboxRc(prop.sendSelectedItem);
    };
    const redioFilterSelection = name => {
        setRedioFilter(name);
        sessionStorage.setItem('FilterStatus', name);
        prop.onFilterChanges(name, prop.gridId);
    };
    const [selectCheckboxRc, setSelectCheckboxRc] = React.useState([]);
    React.useState();
    const radioSelectRecord = (record, fieldName) => {
        prop.radioEvent(record, fieldName);
    };
    const filterColumnGlobal = () => {
        const globalFilterData = [];
        if (column$1) {
            column$1.forEach(element => {
                if (element.visible)
                    globalFilterData.push(element.field);
            });
        }
        return globalFilterData;
    };
    const onSelectCheckBox = (e, obj, fieldName) => {
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
            checked == true ? selectedItemsArray.push(obj) : selectedItemsArray.splice(selectedItemsArray.indexOf(obj), 1);
        }
        setSelectCheckboxRc(selectedItemsArray);
        setReasonIdDelete(obj);
        prop.selectCheckbox(checked, obj, selectedItemsArray, fieldName);
    };
    const exportClose = () => {
        setModalExport(false);
    };
    return (React__default["default"].createElement("div", null,
        React__default["default"].createElement("div", { className: "d-flex justify-content-between align-items-center flex-wrap" },
            React__default["default"].createElement("div", { className: "d-flex globlFilter" }, filter && (React__default["default"].createElement("span", { className: "p-input-icon-left" },
                React__default["default"].createElement("i", { className: "pi pi-search" }),
                React__default["default"].createElement(inputtext.InputText, { value: globalFilterValue, onChange: e => onGlobalFilterChange(e) })))),
            React__default["default"].createElement("div", { className: "d-flex flex-wrap" },
                ifShowHeader && (React__default["default"].createElement(button.Button, { onClick: () => edit(''), className: "btn btn-primary btnStyle", "data-cy": "entityCreateButton" },
                    React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: "plus" }),
                    "Add")),
                prop.statusFilter === true && (React__default["default"].createElement("span", { className: "d-flex justify-content-center m-r-15 statusFilter" },
                    React__default["default"].createElement("span", { style: { marginLeft: '10px' }, className: "d-flex align-items-center" },
                        React__default["default"].createElement(radiobutton.RadioButton, { inputId: gridId + 'gridActive', name: "filter", value: "Active", onChange: e => redioFilterSelection(e.value), checked: redioFilter === 'Active' }),
                        React__default["default"].createElement("label", { htmlFor: gridId + 'gridActive', style: { marginBottom: 0 } }, labelbtnFlag.activeradio ? labelbtnFlag.activeradio : 'Active')),
                    React__default["default"].createElement("span", { style: { marginLeft: '10px' }, className: "d-flex align-items-center" },
                        React__default["default"].createElement(radiobutton.RadioButton, { inputId: gridId + 'gridInactive', name: "filter", value: "Inactive", onChange: e => redioFilterSelection(e.value), checked: redioFilter === 'Inactive' }),
                        React__default["default"].createElement("label", { htmlFor: gridId + 'gridInactive', style: { marginBottom: 0 } }, labelbtnFlag.inactiveradio ? labelbtnFlag.inactiveradio : 'Inactive')),
                    React__default["default"].createElement("span", { style: { marginLeft: '10px' }, className: "d-flex align-items-center" },
                        React__default["default"].createElement(radiobutton.RadioButton, { inputId: gridId + 'All', name: "filter", value: "All", onChange: e => redioFilterSelection(e.value), checked: redioFilter === 'All' }),
                        React__default["default"].createElement("label", { htmlFor: gridId + 'All', style: { marginBottom: 0 } }, labelbtnFlag.allradio ? labelbtnFlag.allradio : 'All')))),
                React__default["default"].createElement(button.Button, { color: "secondary", className: "iconBtn", type: "button", onClick: () => {
                        setModal(!modal);
                    }, tooltip: "Setting", tooltipOptions: { position: 'top' } },
                    React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: "cogs" })),
                React__default["default"].createElement("button", { className: "btn btn-outline-secondary dropdown-toggle", type: "button", "data-bs-toggle": "dropdown", "aria-expanded": "false", style: { border: 'none', background: 'white', boxShadow: 'none', color: '#1565c0' } }, labelbtnFlag.export ? labelbtnFlag.export : 'Export'),
                React__default["default"].createElement("ul", { className: "dropdown-menu", style: {} },
                    React__default["default"].createElement("li", null,
                        ' ',
                        React__default["default"].createElement("a", { className: "dropdown-item", onClick: () => toggle('EXCEL') },
                            React__default["default"].createElement("i", { className: "fa-solid fa-file-excel", style: { color: '#1c6c42' } }),
                            " Excel")),
                    React__default["default"].createElement("li", null,
                        ' ',
                        React__default["default"].createElement("a", { className: "dropdown-item", onClick: () => toggle('PDF') },
                            React__default["default"].createElement("i", { className: "fa-solid fa-file-pdf", style: { color: '#f72015' } }),
                            " PDF"))))),
        modal && (React__default["default"].createElement(Setting$1, { show: modal, gridId: gridId, gridData: apiGridData, filter: filter, columns: column$1, menuItemId: menuItemId, onClose: closeSettingModal, onSetting: settingChanges, onReset: onReset })),
        modalExport && React__default["default"].createElement(ExportSetting, { show: modalExport, columns: column$1, onSetting: settingChangesExport, onClose: exportClose }),
        React__default["default"].createElement("div", { className: "dataTable", id: "tablePdf" },
            React__default["default"].createElement(React__default["default"].Fragment, null,
                React__default["default"].createElement(React__default["default"].Fragment, null,
                    React__default["default"].createElement(datatable.DataTable, { ref: dt, emptyMessage: errorMessage, sortMode: "multiple", value: data, globalFilterFields: filterColumnGlobal(), filters: filters, 
                        // header={header}
                        filterDisplay: filter ? 'row' : 'menu', scrollable: true, scrollHeight: "400px", id: gridId, selectionMode: "single", selection: selectedItem, onSelectionChange: e => {
                            setSelectedItem(e.value);
                            prop.onSelect ? prop.onSelect(e.value) : {};
                        }, responsiveLayout: "scroll", onRowReorder: (e) => prop.onAddReorderRow(e.value, gridId), reorderableRows: true, removableSort: true, paginator: true, rows: defaultPageSize, rowsPerPageOptions: perPage },
                        rowReorder && React__default["default"].createElement(column.Column, { rowReorder: true, style: { minWidth: '3rem' } }),
                        column$1 &&
                            column$1.map((e, i) => {
                                if (e.visible) {
                                    if (e.type === 'Radio') {
                                        return (React__default["default"].createElement(column.Column, { header: e.header, body: data2 => (React__default["default"].createElement(React__default["default"].Fragment, null,
                                                React__default["default"].createElement(radiobutton.RadioButton, { inputId: data2, name: data2.id, value: e.field, onChange: x => radioSelectRecord(data2, e.field), checked: data2[e.field] === true }))) }));
                                    }
                                    if (e.type === 'CheckBox') {
                                        return (React__default["default"].createElement(column.Column, { header: e.header, body: data2 => (React__default["default"].createElement(React__default["default"].Fragment, null,
                                                React__default["default"].createElement(checkbox.Checkbox, { key: Math.random(), name: data2.id, value: e.field, onChange: x => {
                                                        onSelectCheckBox(x, data2, e.field);
                                                    }, 
                                                    // checked={defaultChecked(e.field, data2)}
                                                    checked: data2[e.field] === true }))) }));
                                    }
                                    if (e.type === 'Action') {
                                        return (React__default["default"].createElement(column.Column, { style: { width: '100px' }, header: e.header, body: data2 => (React__default["default"].createElement(React__default["default"].Fragment, null,
                                                React__default["default"].createElement(splitbutton.SplitButton, { icon: "fa-solid fa-ellipsis", className: "tableActionMenu", 
                                                    // style={{ color:'red' }}
                                                    model: itemsAction, onFocus: () => getActionBtn(data2.id, data2) }))) }));
                                        //  <Column header="Field Name" body={rowData => <span>Hello</span>} />;
                                    }
                                    if (e.type === 'Button') {
                                        return (React__default["default"].createElement(column.Column, { header: "Action", body: data2 => (React__default["default"].createElement(React__default["default"].Fragment, null, buttonAction.length > 0 &&
                                                buttonAction.map(button$1 => (React__default["default"].createElement(React__default["default"].Fragment, null, button$1.visible == true && (React__default["default"].createElement(button.Button, { style: { marginLeft: '15px' }, 
                                                    // tooltip={button.label}
                                                    tooltipOptions: { position: 'top' }, className: button$1.className + ' gridIcon', onClick: () => button$1['id'] == 'Delete'
                                                        ? deleteConfirmOnAction(data2.id, button$1['askReason'], data2)
                                                        : eval(prop[buttonAction[0].command](data2.id, gridId, true, editObject)) },
                                                    React__default["default"].createElement("i", { className: button$1.icon })))))))) }));
                                    }
                                    return React__default["default"].createElement(column.Column, { key: i, columnKey: e.field, field: e.field, header: e.header, style: { width: e.width }, sortable: true });
                                }
                            }))),
                reasonFlag && (React__default["default"].createElement(AskReason$1, { data: reasonIdDelete, deleteObject: editObject, action: "delete", visible: reasonFlag, saveWithReason: accept, onClose: handleCloseForReason }))))));
};

const AskReason = (prop) => {
    const [dataForm, setData] = React.useState(prop.data);
    React.useState("");
    const [visible, setVisible] = React.useState(prop.visible);
    const [action, setAction] = React.useState(prop.action);
    const closeModal = () => {
        setVisible(false);
        prop.onClose();
    };
    React.useEffect(() => {
        console.log(prop);
    });
    const defaultValues = Object.assign(Object.assign({}, dataForm), { reasonForChange: "" });
    const getFormErrorMessage = (name) => {
        return errors[name] ? (React__default["default"].createElement("small", { className: "p-error" }, errors[name].message)) : (React__default["default"].createElement("small", { className: "p-error" }, "\u00A0"));
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
    const { control, formState: { errors }, handleSubmit, getValues, reset, } = reactHookForm.useForm({ defaultValues });
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(dialog.Dialog, { header: React__default["default"].createElement(Translate, { contentKey: "reasonForConfirmation" }), id: prop.id, visible: visible, onHide: closeModal, style: { width: "30vw" } },
            React__default["default"].createElement("form", { onSubmit: handleSubmit(onSubmit) },
                React__default["default"].createElement("div", { className: "modal-content", style: { overflow: "auto !important" } },
                    React__default["default"].createElement("div", { className: "container-fluid" },
                        React__default["default"].createElement("div", { className: "row form-group" },
                            React__default["default"].createElement(reactHookForm.Controller, { name: "reasonForChange", control: control, rules: getControlValidationObj$2("reason"), render: ({ field, fieldState }) => (React__default["default"].createElement(React__default["default"].Fragment, null,
                                    React__default["default"].createElement("label", { className: "form-label" },
                                        React__default["default"].createElement(Translate, { contentKey: "reason" })),
                                    React__default["default"].createElement(inputtextarea.InputTextarea, { id: field.name, value: field.value, className: utils.classNames("form-control", {
                                            "p-invalid": fieldState.error,
                                        }), onChange: (e) => field.onChange(e.target.value), rows: 3, cols: 30 }),
                                    getFormErrorMessage(field.name))) })),
                        prop.passwordFlag && (React__default["default"].createElement("div", { className: "row form-group" },
                            React__default["default"].createElement(reactHookForm.Controller, { name: "password", control: control, rules: getControlValidationObj$2("password.global"), render: ({ field, fieldState }) => (React__default["default"].createElement(React__default["default"].Fragment, null,
                                    React__default["default"].createElement("label", { className: "form-label" },
                                        React__default["default"].createElement(Translate, { contentKey: "password.global" })),
                                    React__default["default"].createElement(inputtext.InputText, { id: field.name, value: field.value, className: utils.classNames("form-control", {
                                            "p-invalid": fieldState.error,
                                        }), onChange: (e) => field.onChange(e.target.value) }),
                                    getFormErrorMessage(field.name))) }))),
                        React__default["default"].createElement("div", { className: "p-dialog-footer " },
                            React__default["default"].createElement(reactstrap.Button, { label: "Submit", id: "askReason", type: "submit", color: action == "delete" ? "danger" : "primary", className: "btnStyle", icon: "pi pi-check" },
                                action == "delete" ? (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: "times" })) : (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: "save" })),
                                action == "delete" ? (React__default["default"].createElement(Translate, { contentKey: "delete" })) : (React__default["default"].createElement(Translate, { contentKey: "home.save" }))))))))));
};

const Treetable = prop => {
    const dispatch = store.useAppDispatch();
    const dt = React.useRef();
    const [data, setData] = React.useState();
    const [nodes, setNodes] = React.useState();
    const [column$1, setColumn] = React.useState(prop.column);
    const [exportCol, setExportCol] = React.useState([]);
    React.useState(prop.documentTypeId);
    const [filter, setfilter] = React.useState(prop.toggleFilter);
    const [filters, setfilters] = React.useState(prop.filters);
    const [gridId, setGridId] = React.useState(prop.gridId);
    const [apiGridData, setApiGridData] = React.useState([]);
    const [modal, setModal] = React.useState(false);
    const [modalExport, setModalExport] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [exportType, setExportType] = React.useState();
    const [globalFilterValue, setGlobalFilterValue] = React.useState('');
    const [ifShowHeader, setifShowHeader] = React.useState(false);
    const [ifHideHeader, setifHideHeader] = React.useState(true);
    const [language, setlanguage] = React.useState(sessionStorage.getItem('Language'));
    const [redioFilter, setRedioFilter] = React.useState(sessionStorage.getItem('FilterStatus'));
    React.useState(prop.reasonAsk ? prop.reasonAsk : false);
    const menuItemId = sessionStorage.getItem('menuItemId');
    const [deleteHeader, setdeleteHeader] = React.useState(React__default["default"].createElement(Translate$2, { contentKey: "global.deleteConfirm" }));
    const [deletemsg, setdeletemsg] = React.useState(React__default["default"].createElement(Translate$2, { contentKey: "home.deleteMsg" }));
    const [updatedJson, setUpdatedJson] = React.useState();
    React.useState(Number(sessionStorage.getItem('MaxPageSize')));
    const [defaultPageSize, setDefaultPageSize] = React.useState(Number(sessionStorage.getItem('DefaultPageSize')));
    const finalObject = [];
    const getGridData = () => __awaiter(void 0, void 0, void 0, function* () {
        let id;
        if (language === 'en')
            id = 1;
        else if (language === 'hi')
            id = 2;
        else
            id = 3;
        // const menuItemId = gridId;
        const gridData = yield axios__default["default"].get(`api/grid-user-settings/${gridId}/${id}/${menuItemId}/1`);
        yield setColumn(gridData.data.data.length > 0 ? gridData.data.data : prop.column);
        yield prepareRowAction(gridData.data.data);
    });
    React.useEffect(() => {
        setNodes((pre) => {
            if (!prop.data)
                return pre;
            else
                return prop.data;
            //  prepareRowAction(gridData.data.data);
        });
        setData((pre) => {
            if (!prop.data)
                return pre;
            else
                return prop.data;
        });
    }, [prop.data]);
    React.useEffect(() => {
        getGridData();
        if (!redioFilter) {
            setRedioFilter('Active');
        }
        if (gridId === 'dmsClientID' || gridId === 'dmsParameterID' || gridId === 'ParameterCategoriesID') {
            setifShowHeader(true);
        }
        if (gridId === 'documentWorkspaceID') {
            setifHideHeader(false);
        }
    }, []);
    const toggle = e => {
        setExportType(e);
        setModalExport(!modalExport);
    };
    const arrForRow = sessionStorage.getItem('RowsPerPage');
    const [perPage, setPerPage] = React.useState([]);
    React.useEffect(() => {
        let arr = arrForRow.split(',').map(Number);
        console.log('arrFor', arr);
        // for (let i = 0; i < arrForRow.length; i++) {
        //   arr.push(Number(arrForRow[i]));
        // }
        setPerPage(arr);
    }, [arrForRow]);
    React.useState(entityUtils.overridePaginationStateWithQueryParams(reactJhipster.getSortState(location, pagination_constants.ITEMS_PER_PAGE, 'id'), location.search));
    React.useRef(null);
    const edit = id => {
        prop.onEdit(id);
    };
    const save = () => {
        prop.saveJson(nodes);
    };
    const settingChanges = (coulmnData, filterToggle) => {
        setModal(false);
        setColumn(coulmnData);
        setfilter(filterToggle);
    };
    // const settingChangesExport = coulmnData => {
    //   setModalExport(false);
    //   setExportCol(coulmnData);
    //   switch (exportType) {
    //     case 'PDF':
    //       exportPdf();
    //       break;
    //     case 'EXCEL':
    //       exportExcel();
    //       break;
    //     case 'CSV':
    //       exportCSV();
    //       break;
    //     default:
    //       break;
    //   }
    // };
    const getDataForPdfXls = data => {
        if (data.length > 0) {
            data.forEach(element => {
                if (element['data']) {
                    finalObject.push(element['data']);
                }
                if (element['children']) {
                    getDataForPdfXls(element['children']);
                }
            });
        }
    };
    const settingChangesExport = coulmnData => {
        getDataForPdfXls(data);
        setModalExport(false);
        setExportCol(coulmnData);
        const exportData = data;
        const headers = [];
        coulmnData.map(col => {
            if (col.visible)
                headers.push(col.field);
        });
        const newData = [];
        console.log('exportData', exportData);
        exportData.map(element => {
            const newObj = {};
            headers.forEach(name => {
                newObj[name] = element[name];
            });
            newData.push(newObj);
        });
        switch (exportType) {
            case 'PDF':
                exportPdf(newData, headers, coulmnData, finalObject);
                break;
            case 'EXCEL':
                exportExcel(newData, coulmnData, finalObject);
                break;
            case 'CSV':
                exportCSV(newData);
                break;
        }
    };
    exportCol.map(col => {
        if (col.visible)
            ({ title: col.header, dataKey: col.field });
    });
    const convertToCSV = objArray => {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        for (let i = 0; i < array.length; i++) {
            let line = '';
            // eslint-disable-next-line guard-for-in
            for (const index in array[i]) {
                if (line !== '')
                    line += ',';
                line += array[i][index];
            }
            str += line + '\r\n';
        }
        return str;
    };
    const exportCSV = (newData, headers) => {
        // Convert Object to JSON
        const jsonObject = JSON.stringify(newData);
        const csv = convertToCSV(jsonObject);
        const exportedFilenmae = 'report' + '.csv' ;
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            // feature detection
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    const exportPdf = (newData, headers, coulmnData, data1) => {
        var out = [];
        for (var i = 0; i < coulmnData.length; i++) {
            if (coulmnData[i].field === headers[i]) {
                out.push(coulmnData[i].header);
            }
        }
        const unit = 'pt';
        const size = 'A4';
        const orientation = 'portrait';
        const doc = new jsPDF__default["default"](orientation, unit, size);
        const title = prop.title.concat(' Report');
        var dataForExport = data1.map(obj => column$1.map(header => obj[header.field]));
        const content = {
            startY: 50,
            head: [out],
            body: dataForExport,
        };
        doc.text(title, 40, 40);
        autoTable__default["default"](doc, content);
        doc.save(prop.title.concat(' Report.pdf'));
    };
    const exportExcel = (newData, coulmnData, data1) => {
        var dataForExport = data1.map(obj => column$1.map(header => obj[header.field]));
        // console.log("DATA1",data1);
        // console.log("newData",newData);
        Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('xlsx')); }).then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(dataForExport);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array',
            });
            saveAsExcelFile(excelBuffer, prop.title);
        });
    };
    const saveAsExcelFile = (buffer, fileName) => {
        Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('file-saver')); }).then(module => {
            if (module && module.default) {
                const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                const EXCEL_EXTENSION = '.xlsx';
                const dataa = new Blob([buffer], {
                    type: EXCEL_TYPE,
                });
                module.default.saveAs(dataa, fileName + EXCEL_EXTENSION);
            }
        });
    };
    const getSubDocType = e => {
        setSelectedProduct(e);
        // prop.onSelect(e);
    };
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        const _filters = Object.assign({}, filters);
        _filters['global'].value = value;
        setfilters(_filters);
        setGlobalFilterValue(value);
        if (gridId === 'dmsParameterID') {
            prop.onSearch(value);
        }
    };
    const closeSettingModal = () => {
        setModal(false);
    };
    const redioFilterSelection = name => {
        setRedioFilter(name);
        sessionStorage.setItem('FilterStatus', name);
        prop.onFilterChanges(name);
    };
    var labelbtnFlag = {
        yes: React__default["default"].createElement(Translate$2, { contentKey: "yes" }),
        no: React__default["default"].createElement(Translate$2, { contentKey: "no" }),
        edit: React__default["default"].createElement(Translate$2, { contentKey: "edit" }),
        delete: React__default["default"].createElement(Translate$2, { contentKey: "delete" }),
        keySearch: React__default["default"].createElement(Translate$2, { contentKey: "keywordSearch" }),
        hierarchy: React__default["default"].createElement(Translate$2, { contentKey: "hierarchy" }),
        export: React__default["default"].createElement(Translate$2, { contentKey: "export" }),
        activeradio: React__default["default"].createElement(Translate$2, { contentKey: "activeradio" }),
        allradio: React__default["default"].createElement(Translate$2, { contentKey: "allradio" }),
        inactiveradio: React__default["default"].createElement(Translate$2, { contentKey: "inactiveradio" }),
    };
    const [itemsAction, setitemsAction] = React.useState([]);
    const [buttonAction, setButtonAction] = React.useState([]);
    const [reasonIdDelete, setReasonIdDelete] = React.useState();
    const [reasonFlag, setReasonFlag] = React.useState(false);
    const deleteConfirmOnAction = (id, flag, record) => __awaiter(void 0, void 0, void 0, function* () {
        setMsgLangKeyInSessionStorage$1(prop.msgLangKey);
        const idObj = {};
        idObj['id'] = id;
        setReasonIdDelete(idObj);
        confirmdialog.confirmDialog({
            message: deletemsg,
            header: deleteHeader,
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            rejectClassName: 'p-button-success',
            acceptLabel: labelbtnFlag.yes ? labelbtnFlag.yes : 'Yes',
            rejectLabel: labelbtnFlag.no ? labelbtnFlag.no : 'No',
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
    React.useState();
    React.useState();
    const onEditorValueChange = (options, value) => __awaiter(void 0, void 0, void 0, function* () {
        const newNodes = JSON.parse(JSON.stringify(nodes));
        let indexs = options.rowIndex;
        let typeValue = typeof options.rowIndex;
        if (typeValue == 'string') {
            indexs = options.rowIndex.split('_');
        }
        let obj = newNodes;
        if (typeof indexs == 'number') {
            obj = obj[indexs];
        }
        else {
            for (let idx = 0; idx < indexs.length; idx++) {
                if (idx == 0) {
                    obj = obj[parseInt(indexs[idx])];
                }
                else {
                    obj = obj['children'][parseInt(indexs[idx])];
                }
            }
        }
        obj['data'][options.field] = yield value;
        let finaljson = {};
        yield setNodes(newNodes);
        finaljson['data'] = [obj];
        setUpdatedJson(finaljson);
        // makeJsonObject(nodes);
    });
    const inputTextEditor = options => {
        return React__default["default"].createElement(inputtext.InputText, { type: "text", value: options.rowData[options.field], onChange: e => onEditorValueChange(options, e.target.value) });
    };
    const [editObject, setEditObject] = React.useState([]);
    const getActionBtn = (id, object) => {
        setActionId(id);
        setEditObject(object);
    };
    const [actionId, setActionId] = React.useState();
    const prepareRowAction = (actionArr) => {
        let tmpRowAction = [];
        if (actionArr) {
            for (let i = 0; i < actionArr.length; i++) {
                if (actionArr[i]['type'] == 'Action') {
                    let actinObj = actionArr[i].actionJson;
                    if (actinObj) {
                        for (let j = 0; j < actinObj.length; j++) {
                            let item = {
                                className: actinObj[j]['className'] != null && actinObj[j]['className'] != '' ? actinObj[j]['className'] : 'icon',
                                label: React__default["default"].createElement(Translate$2, { contentKey: actinObj[j]['label'] }),
                                icon: actinObj[j]['icon'],
                                id: actinObj[j]['id'],
                                visible: actinObj[j]['visible'],
                                command: () => {
                                    actinObj[j]['id'] == 'Delete'
                                        ? deleteConfirmOnAction(actionId, true, editObject)
                                        : eval(prop[actinObj[j].command](actionId, gridId, actinObj[j].askReason, editObject));
                                },
                            };
                            tmpRowAction.push(item);
                        }
                        setitemsAction(tmpRowAction);
                    }
                }
                if (actionArr[i]['type'] == 'Button') {
                    let butonObj = actionArr[i].actionJson;
                    setButtonAction(butonObj);
                }
            }
        }
    };
    const typeEditor = options => {
        return inputTextEditor(options);
    };
    React.useEffect(() => {
        setColumn(prop.column);
    }, [prop.column]);
    React.useEffect(() => {
        setActionId(actionId);
        setEditObject(editObject);
        prepareRowAction(column$1);
    }, [actionId]);
    const defaultChecked = (fieldName, data1) => {
        let flag;
        flag = typeof data1.data[fieldName] ? typeof data1.data[fieldName] : undefined;
        if (flag != undefined) {
            if (flag == 'boolean') {
                return data1.data[fieldName];
            }
            else if (flag == 'string' || flag == 'number') {
                let returnValue;
                if (flag == 'string') {
                    returnValue = data1.data[fieldName] == 'Yes' ? true : false;
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
    React.useEffect(() => {
        setData(prop.data);
    }, [prop.data]);
    const handleCloseForReason = () => {
        setReasonFlag(!reasonFlag);
    };
    React.useState();
    const onNodeExpand = (e) => {
        prop.setPid(e.node.data.id);
    };
    const [selectedCategory, setSelectedCategory] = React.useState();
    const [selectCheckboxRc, setSelectCheckboxRc] = React.useState([]);
    const onSelectCheckBox = (e, fieldName, obj) => {
        obj.data[fieldName] = e.target.checked;
        let selectedItemsArray = selectCheckboxRc != undefined ? [...selectCheckboxRc] : [];
        const checked = e.target.checked;
        // prop.selectCheckbox(checked, e.value, gridId);
        if (e.checked) {
            if (selectedItemsArray.length == 0) {
                selectedItemsArray.push(obj);
            }
            else {
                for (let i = 0; i < selectCheckboxRc.length; i++) {
                    if (obj.id != selectCheckboxRc[i].id || selectCheckboxRc.legth == 0) {
                        selectedItemsArray.push(obj);
                    }
                }
            }
        }
        else
            selectedItemsArray.splice(selectedItemsArray.indexOf(obj), 1);
        setSelectCheckboxRc(selectedItemsArray);
        setReasonIdDelete(obj);
        prop.selectCheckbox(checked, obj, selectedItemsArray);
    };
    /* pagination code */
    const [totalRecords, setTotalRecords] = React.useState(prop.totalRecords);
    const [lazyState, setlazyState] = React.useState(prop.pagination);
    React.useEffect(() => {
        setTotalRecords(prop.totalRecords);
    }, [prop.totalRecords]);
    React.useEffect(() => {
        setlazyState(prop.pagination);
    }, [prop.pagination]);
    const onReset = () => __awaiter(void 0, void 0, void 0, function* () {
        let id;
        setModal(false);
        if (language === 'en')
            id = 1;
        else if (language === 'hi')
            id = 2;
        else
            id = 3;
        yield axios__default["default"].get(`api/grid-user-settings/${gridId}/${id}/${menuItemId}/1`);
        dispatch(form_reducer.getColumns({
            gridId: gridId,
            id: id,
            menuItemId: menuItemId,
        })).then((res) => __awaiter(void 0, void 0, void 0, function* () {
            setColumn(res.payload.data.data);
            const pageData = {
                first: lazyState.first,
                rows: parseInt(res.payload.data.data[0].gridPageSize),
                page: lazyState.page,
                sortField: lazyState.sortField,
                sortOrder: lazyState.sortOrder,
            };
            setlazyState(pageData);
            setfilter(res.payload.data.data[0].filterEnable);
            yield prepareRowAction(res.payload.data.data);
            yield prop.onPageChange(pageData);
            setData(prop.data);
        }));
    });
    const [expandedKeys, setExpandedKeys] = React.useState(null);
    const [metaKey, setMetaKey] = React.useState(false);
    const toggleApplications = () => {
        let _expandedKeys = Object.assign({}, expandedKeys);
        if (metaKey === true) {
            setExpandedKeys({});
        }
        else {
            for (let node of nodes) {
                expandNode(node, _expandedKeys);
            }
            setExpandedKeys(_expandedKeys);
        }
    };
    const expandNode = (node, _expandedKeys) => {
        if (node.children && node.children.length) {
            _expandedKeys[node.key] = true;
            for (let child of node.children) {
                expandNode(child, _expandedKeys);
            }
        }
    };
    const onToggle = event => {
        // Update the expandedKeys state when a node is expanded/collapsed
        setExpandedKeys(event.value);
    };
    const exportClose = () => {
        setModalExport(!modalExport);
    };
    return (React__default["default"].createElement("div", null,
        ifHideHeader && (React__default["default"].createElement("div", { className: "d-flex justify-content-between align-items-center flex-wrap" },
            React__default["default"].createElement("div", { className: "d-flex globlFilter" },
                React__default["default"].createElement("span", { className: "p-input-icon-left" },
                    React__default["default"].createElement("i", { className: "pi pi-search" }),
                    React__default["default"].createElement(inputtext.InputText, { value: globalFilterValue, onChange: e => onGlobalFilterChange(e), placeholder: "Keyword Search" }))),
            React__default["default"].createElement("div", { className: "d-flex flex-wrap" },
                ifShowHeader && (React__default["default"].createElement(reactstrap.Button, { onClick: () => edit(''), className: "btn btn-primary btnStyle", "data-cy": "entityCreateButton" },
                    React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: "plus" }),
                    "Add")),
                prop.toggleShow === true && (React__default["default"].createElement(inputswitch.InputSwitch, { className: "d-flex justify-content-center m-r-15 statusFilter", inputId: "input-metakey", style: { height: 23, marginTop: 5 }, checked: metaKey, 
                    // onChange={(e) => setMetaKey(e.value)}
                    onChange: e => {
                        toggleApplications(), setMetaKey(e.value);
                    } })),
                metaKey === false && prop.toggleShow === true && (React__default["default"].createElement("label", { htmlFor: "input-metakey", style: { marginTop: 6 } },
                    React__default["default"].createElement(Translate$2, { contentKey: "label.expandAll" }))),
                metaKey === true && prop.toggleShow === true && (React__default["default"].createElement("label", { htmlFor: "input-metakey", style: { marginTop: 6 } },
                    React__default["default"].createElement(Translate$2, { contentKey: "label.collapsAll" }))),
                prop.statusFilter === true && (React__default["default"].createElement("span", { className: "d-flex justify-content-center m-r-15 statusFilter" },
                    React__default["default"].createElement("span", { style: { marginLeft: '10px' }, className: "d-flex align-items-center" },
                        React__default["default"].createElement(radiobutton.RadioButton, { inputId: gridId + 'gridActive', name: "filter", value: "Active", onChange: e => redioFilterSelection(e.value), checked: redioFilter === 'Active' }),
                        React__default["default"].createElement("label", { htmlFor: gridId + 'gridActive', style: { marginBottom: 0 } }, labelbtnFlag.activeradio ? labelbtnFlag.activeradio : 'Active')),
                    React__default["default"].createElement("span", { style: { marginLeft: '10px' }, className: "d-flex align-items-center" },
                        React__default["default"].createElement(radiobutton.RadioButton, { inputId: gridId + 'gridInactive', name: "filter", value: "Inactive", onChange: e => redioFilterSelection(e.value), checked: redioFilter === 'Inactive' }),
                        React__default["default"].createElement("label", { htmlFor: gridId + 'gridInactive', style: { marginBottom: 0 } }, labelbtnFlag.inactiveradio ? labelbtnFlag.inactiveradio : 'Inactive')),
                    React__default["default"].createElement("span", { style: { marginLeft: '10px' }, className: "d-flex align-items-center" },
                        React__default["default"].createElement(radiobutton.RadioButton, { inputId: gridId + 'All', name: "filter", value: "All", onChange: e => redioFilterSelection(e.value), checked: redioFilter === 'All' }),
                        React__default["default"].createElement("label", { htmlFor: gridId + 'All', style: { marginBottom: 0 } }, labelbtnFlag.allradio ? labelbtnFlag.allradio : 'All')))),
                React__default["default"].createElement(reactstrap.Button, { color: "secondary", className: "iconBtn", onClick: () => {
                        setModal(!modal);
                    } },
                    React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: "cogs" })),
                React__default["default"].createElement("button", { className: "btn btn-outline-secondary dropdown-toggle", type: "button", "data-bs-toggle": "dropdown", "aria-expanded": "false", style: { border: 'none', background: 'white', boxShadow: 'none', color: '#1565c0' } }, labelbtnFlag.export ? labelbtnFlag.export : 'Export'),
                React__default["default"].createElement("ul", { className: "dropdown-menu", style: {} },
                    React__default["default"].createElement("li", null,
                        ' ',
                        React__default["default"].createElement("a", { className: "dropdown-item", onClick: () => toggle('EXCEL') },
                            React__default["default"].createElement("i", { className: "fa-solid fa-file-excel", style: { color: '#1c6c42' } }),
                            " Excel")),
                    React__default["default"].createElement("li", null,
                        ' ',
                        React__default["default"].createElement("a", { className: "dropdown-item", onClick: () => toggle('PDF') },
                            React__default["default"].createElement("i", { className: "fa-solid fa-file-pdf", style: { color: '#f72015' } }),
                            " PDF")))))),
        modal && (React__default["default"].createElement(Setting$1, { show: modal, gridId: gridId, gridData: apiGridData, filter: filter, columns: column$1, menuItemId: menuItemId, onClose: closeSettingModal, onSetting: settingChanges, onReset: onReset })),
        modalExport && React__default["default"].createElement(ExportSetting, { show: modalExport, columns: column$1, onSetting: settingChangesExport, onClose: exportClose }),
        React__default["default"].createElement("div", { className: "dataTable" },
            React__default["default"].createElement(React__default["default"].Fragment, null,
                prop.data && prop.data.length > 0 ? (React__default["default"].createElement(React__default["default"].Fragment, null,
                    React__default["default"].createElement(treetable.TreeTable, { ref: dt, sortMode: "multiple", value: nodes, filters: filters, 
                        // header={header}
                        rows: 5, id: "table", selectionMode: "single", selectionKeys: selectedProduct, onSelectionChange: e => getSubDocType(e.value), onExpand: onNodeExpand, expandedKeys: expandedKeys, 
                        // onToggle={(e) => setExpandedKeys(e.value)}
                        onToggle: onToggle, 
                        // onToggle={e => setParentId2(e.value)}
                        tableStyle: { minWidth: '50rem' }, paginator: true, rows: defaultPageSize, rowsPerPageOptions: perPage },
                        React__default["default"].createElement(column.Column, { expander: true, style: { marginRight: '50px' } }),
                        column$1.map((e, i) => {
                            if (e.visible) {
                                if (e.type === 'Radio') {
                                    return (React__default["default"].createElement(column.Column, { header: e.header, body: data2 => (React__default["default"].createElement(React__default["default"].Fragment, null,
                                            React__default["default"].createElement(radiobutton.RadioButton, { inputId: data2, name: data2.id, value: selectedCategory, onChange: e => setSelectedCategory(data2), checked: selectedCategory === data2 }))) }));
                                }
                                if (e.type === 'CheckBox') {
                                    return (React__default["default"].createElement(column.Column, { key: i, header: e.header, body: data => (React__default["default"].createElement(checkbox.Checkbox, { key: Math.random(), name: data.id, value: e.field, onChange: x => {
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
                                if (e.type === 'Action') {
                                    return (React__default["default"].createElement(column.Column, { style: { width: '100px' }, header: e.header, body: data2 => (React__default["default"].createElement(React__default["default"].Fragment, null,
                                            React__default["default"].createElement(splitbutton.SplitButton, { icon: "fa-solid fa-bars", className: "tableActionMenu", model: itemsAction, 
                                                //model= {!data2.isLastNode && itemsAction.id === 'Add' ? data2.isLastNode : itemsAction}
                                                onFocus: () => getActionBtn(data2.data.id, data2.data) }))) }));
                                    //  <Column header="Field Name" body={rowData => <span>Hello</span>} />;
                                }
                                if (e.type === 'Button') {
                                    return (React__default["default"].createElement(column.Column, { header: e.header, body: data2 => (React__default["default"].createElement(React__default["default"].Fragment, null, buttonAction.map(button => (React__default["default"].createElement(React__default["default"].Fragment, null, button.visible == true && (React__default["default"].createElement(reactstrap.Button, { tooltip: button.label, tooltipOptions: { position: 'top' }, className: button.className + ' gridIcon', onClick: () => button['id'] == 'Delete'
                                                ? deleteConfirmOnAction(data2.id, button['askReason'], editObject)
                                                : eval(prop[buttonAction[0].command](data2.id, gridId, true, editObject)) },
                                            React__default["default"].createElement("i", { className: button.icon })))))))) }));
                                }
                                if (e.editable == true) {
                                    return (React__default["default"].createElement(column.Column, { key: i, field: e.field, header: e.header, style: { width: e.width }, editor: typeEditor, expander: e.expander, sortable: true }));
                                }
                                else {
                                    return React__default["default"].createElement(column.Column, { key: i, field: e.field, header: e.header, style: { width: e.width }, expander: e.expander, sortable: true });
                                }
                                // return <Column key={i} field={e.field} header={e.header} editor={typeEditor} expander={e.expander} sortable />;
                            }
                            else
                                return null;
                        })))) : (React__default["default"].createElement("div", { className: "alert alert-warning" },
                    React__default["default"].createElement(Translate$2, { contentKey: "home.notFound" }, "No records found"))),
                reasonFlag && (React__default["default"].createElement(AskReason$1, { data: reasonIdDelete, action: "delete", visible: reasonFlag, saveWithReason: accept, onClose: handleCloseForReason }))),
            prop.flag && (React__default["default"].createElement("div", { className: "p-dialog-footer" },
                React__default["default"].createElement(reactstrap.Button, { color: "primary", id: "save-entity", onClick: save, className: "btnStyle", "data-cy": "entityCreateSaveButton", type: "submit" },
                    React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: "save" }),
                    React__default["default"].createElement(Translate$2, { contentKey: "home.save" })))))));
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
    return (React__default["default"].createElement(React__default["default"].Fragment, null, visible && (
    // <div className="loading">Loading</div>
    React__default["default"].createElement("div", { className: "spinner-container" },
        React__default["default"].createElement("div", { className: "waveform" },
            React__default["default"].createElement("div", { className: "waveform__bar" }),
            React__default["default"].createElement("div", { className: "waveform__bar" }),
            React__default["default"].createElement("div", { className: "waveform__bar" }),
            React__default["default"].createElement("div", { className: "waveform__bar" }))))));
};

const varForSetDate = "SetDateFormate";
const varForDisplayDate = "DisplayDateAndTime";
const VarFordisplayeDate = "DisplayDate";
const getDateFormat = () => {
    const dateSetFormate = "services/gateway/api/getGlobalDateSystemConfigurations";
    axios__default["default"].get(dateSetFormate).then((res) => __awaiter(void 0, void 0, void 0, function* () {
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
    return moment__default["default"](date).format(dateFormate);
};
const convertDateStringToDateObj = (date) => {
    let dateFormate;
    if (sessionStorage.getItem(varForSetDate)) {
        dateFormate = sessionStorage.getItem(varForSetDate);
    }
    else {
        dateFormate = "DD-MM-YYYY HH:mm:ss";
    }
    return moment__default["default"](date, dateFormate)["_d"];
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
        const getDataSC = yield axios__default["default"].get(`/api/screen-configurations/getAllScreenConfigurationsAndScreenControlValidations/${menuItemId}/${sessionStorage.getItem("lastSyncTime")
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
    axios__default["default"].get(configurationUrl).then((res) => {
        sessionStorage.setItem('breadCrumbsFlag', res.data.configurationValue);
    });
}

exports.AskReason = AskReason;
exports.DateFormat = index;
exports.ExportSetting = ExportSetting;
exports.LoadingSpinner = LoadingSpinner;
exports.Setting = Setting;
exports.Table = Table;
exports.Translate = Translate;
exports.Treetable = Treetable;
exports.breadCrumbsFlag = breadCrumbsFlag;
exports.checkReasonFlag = checkReasonFlag;
exports.checkStatus = checkStatus;
exports.convertDateObjToDateString = convertDateObjToDateString;
exports.convertDateStringToDateObj = convertDateStringToDateObj;
exports.getCalendarDateFormat = getCalendarDateFormat;
exports.getControlValidationObj = getControlValidationObj;
exports.getDateAndTimeFormate = getDateAndTimeFormate;
exports.getDateFormat = getDateFormat;
exports.getDisplay = getDisplay;
exports.isFieldMandatory = isFieldMandatory;
exports.screenConfigration = screenConfigration;
exports.setMsgLangKeyInSessionStorage = setMsgLangKeyInSessionStorage;
//# sourceMappingURL=index.js.map
