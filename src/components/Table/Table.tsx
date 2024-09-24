import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { confirmDialog } from "primereact/confirmdialog";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Setting from "../Setting";
import ExportSetting from "../Export-Column/export-column";
import axios from "axios";
import { Paginator } from "primereact/paginator";
import { Translate } from "@promountsourcecode/common_module";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "app/config/store";
import { CORE_BASE_URL } from "../constants/apiConstant";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { AskReason } from "@promountsourcecode/common_module";
import { Dropdown } from "primereact/dropdown";
import { setMsgLangKeyInSessionStorage } from "@promountsourcecode/common_module";
import _ from "lodash";
import { getColumns, placeholder } from "../ValidationMethod/validationMethod";
import { FilterMatchMode } from "primereact/api";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";

import moment from "moment";
import $ from "jquery";

export const Table = (prop) => {
  const menuItemId = sessionStorage.getItem("menuItemId");
  let row_per_page: string = useAppSelector(
    (state) => state.commonReducer.RowsPerPage.configurationValue
  );
  const dt = useRef<any>();
  const [reasonFlag, setReasonFlag] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [column, setColumn] = useState<any>();
  const [exportCol, setExportCol] = useState<any>([]);
  const [filter, setfilter] = useState(
    useAppSelector(
      (state) => state.commonReducer.GridColumnGlobal.configurationValue
    )
  );
  const [columnfilters, setColumnfilters] = useState(
    useAppSelector(
      (state) => state.commonReducer.coloumnGlobal.configurationValue
    )
  );
  const [filters, setfilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  /* pagination code */
  const [totalRecords, setTotalRecords] = useState(prop.totalRecords);
  const [lazyState, setlazyState] = useState(prop.pagination);
  const [gridId, setGridId] = useState(prop.gridId);
  const [reOrderRowValue, setReOrderRowValue] = useState<boolean>(
    prop?.isReOrderableRows
  );
  const [apiGridData, setApiGridData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalExport, setModalExport] = useState(false);
  const [exportType, setExportType] = useState();
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [deleteHeader, setdeleteHeader] = useState(
    <Translate contentKey="global.deleteConfirm"></Translate>
  );
  const [deletemsg, setdeletemsg] = useState(
    <Translate contentKey="home.deleteMsg"></Translate>
  );
  const [ifShowHeader, setifShowHeader] = useState(false);
  const [ifHideHeader, setifHideHeader] = useState(true);
  const [language, setlanguage] = useState(
    sessionStorage.getItem("LanguageId")
  );
  const [redioFilter, setRedioFilter] = useState("Active");
  const [redioFilterPublish, setRedioFilterPublish] = useState("");
  const [errorMessage, setErrorMessage] = useState<any>(prop.emptyMessage);
  const [Searchplaceholder, setSearchPlaceholder] = useState("Keyword Search");
  const [itemsAction, setitemsAction] = useState<any>([]);
  const [buttonAction, setButtonAction] = useState<any>([]);
  const [selectedItem, setSelectedItem] = useState<any>();
  const [rowReorder, setrowReorder] = useState(
    prop.rowReorder ? prop.rowReorder : false
  );
  const [actionId, setActionId] = useState<number>();
  const [editObject, setEditObject] = useState<any>([]);
  const [columnLengthForExport, setColumnLengthForExport] = useState<any>();

  let dropdownOptions: any = [];
  const getColumnLength = async () => {
    const columnLengthForExport = await axios.get(
      `${CORE_BASE_URL}api/getSystemConfigurationByName/column_length`
    );
    setColumnLengthForExport(columnLengthForExport.data.configurationValue);
  };

  useEffect(() => {
    setlazyState(lazyState);
  }, [lazyState]);

  const paginatorTemplate = {
    layout:
      "RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport ",
    RowsPerPageDropdown: (options) => {
      if (row_per_page) {
        let arr = row_per_page ? row_per_page.split(",") : "";
        for (let i = 0; i < arr.length; i++) {
          dropdownOptions.push({ value: Number(arr[i]) });
        }
      }
      return (
        <React.Fragment>
          <Dropdown
            value={options.value}
            optionLabel="value"
            optionValue="value"
            scrollHeight={"270px"}
            options={dropdownOptions}
            onChange={options.onChange}
          />
        </React.Fragment>
      );
    },
    CurrentPageReport: (options) => {
      return (
        <span
          className="totalPages"
          style={{
            fontSize: "14px",
            userSelect: "none",
            marginLeft: "auto",
            textAlign: "center",
          }}
        >
          Record {options.first} - {options.last} of {options.totalRecords}
        </span>
      );
    },
  };

  const getActionBtn = (id, object) => {
    setActionId(id);
    setEditObject(object);
    setSelectedItem(object);
  };
  useEffect(() => {
    const compareJsonjs = document.createElement("script");
    compareJsonjs.src =
      "https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js";
    compareJsonjs.async = true;
    document.body.appendChild(compareJsonjs);
    getColumnLength();
  }, []);

  useEffect(() => {
    setColumn(column);
  }, [column]);

  const getGridData = async () => {
    try {
      if (
        gridId != null &&
        gridId != "" &&
        gridId != undefined &&
        language != null &&
        language != "" &&
        language != undefined &&
        menuItemId != null &&
        menuItemId != "" &&
        menuItemId != undefined
      ) {
        const gridData = await axios.get(
          `${CORE_BASE_URL}api/grid-user-settings/${gridId}/${language}/${menuItemId}/1`
        );
        (await gridData.data.data.length) > 0
          ? setColumn(gridData.data.data)
          : setColumn(prop.column);
        const pageData = {
          first: lazyState.first,
          rows: lazyState.rows,
          page: lazyState.page,
          sortField: lazyState.sortField,
          sortOrder: lazyState.sortOrder,
        };
        setlazyState(pageData);
        setfilter(
          gridData.data.data.length > 0
            ? gridData.data.data[0].filterEnable
            : false
        );
        setColumnfilters(
          gridData.data.data.length > 0
            ? gridData.data.data[0].columnsFilterEnable
            : false
        );
        const filterObject = {
          global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        };

        if (gridData?.data?.data != null) {
          if (gridData?.data?.data.length > 0) {
            gridData.data.data.forEach((item) => {
              if (
                item.field != "radio" &&
                item.field != "checkbox" &&
                item.field != "action" &&
                item.field != "button"
              )
                filterObject[item.field] = {
                  value: null,
                  matchMode: FilterMatchMode.CONTAINS,
                };
            });
          }
        }
        setfilters(filterObject);
        await prepareRowAction(gridData.data.data);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };

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
  }, [prop.data]);

  const labelbtnFlag: any = {
    yes: <Translate contentKey="yes"></Translate>,
    no: <Translate contentKey="no"></Translate>,
    edit: <Translate contentKey="edit"></Translate>,
    delete: <Translate contentKey="delete"></Translate>,
    keySearch: <Translate contentKey="keywordSearch"></Translate>,
    hierarchy: <Translate contentKey="hierarchy"></Translate>,
    export: <Translate contentKey="export"></Translate>,
    activeradio: <Translate contentKey="activeradio"></Translate>,
    allradio: <Translate contentKey="allradio"></Translate>,
    inactiveradio: <Translate contentKey="inactiveradio"></Translate>,
  };

  const prepareRowAction = (actionArr: any[]) => {
    let tmpRowAction = [];
    try {
      if (actionArr) {
        for (let i = 0; i < actionArr.length; i++) {
          if (actionArr[i]["type"] == "Action") {
            let actinObj = actionArr[i].actionJson;
            if (actinObj) {
              for (let j = 0; j < actinObj.length; j++) {
                let item = {
                  className:
                    actinObj[j]["className"] != null &&
                    actinObj[j]["className"] != ""
                      ? actinObj[j]["className"]
                      : "icon",
                  label: (
                    <span style={{ color: "#1565c0" }}>
                      <Translate contentKey={actinObj[j]["label"]}></Translate>
                    </span>
                  ),
                  icon: actinObj[j]["icon"],
                  id: actinObj[j]["id"],
                  visible: actinObj[j]["visible"],
                  askReason: actinObj[j]["askReason"],
                  command: () => {
                    actinObj[j]["id"] == "Delete"
                      ? deleteConfirmOnAction(
                          actionId,
                          actinObj[j]["askReason"],
                          editObject
                        )
                      : eval(
                          prop[actinObj[j].command](
                            actionId,
                            gridId,
                            actinObj[j]["askReason"],
                            editObject
                          )
                        );
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
    } catch (error) {
      toast.error(error.toString());
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
    if (
      gridId === "dmsClientID" ||
      gridId === "dmsParameterID" ||
      gridId === "ParameterCategoriesID"
    ) {
      setifShowHeader(true);
    }
    if (gridId === "documentWorkspaceID") {
      setifHideHeader(false);
    }
    setSearchPlaceholder(String(<Translate contentKey="export"></Translate>));
  }, []);
  const [exportColumnData, setExportColumnData] = useState([]);
  const getErrorMessage = () => {
    const getMsg =
      CORE_BASE_URL +
      `api/getErrorMessageByCodeLanguageJson?errorCode=${1404}&languageId=${sessionStorage.getItem(
        "LanguageId"
      )}`;
    axios.get(getMsg).then(async (res) => {
      toast.error(res.data);
    });
  };
  const toggle = (e) => {
    if (data.length > 0) {
      let exportColumn = [
        ...column.filter(
          (col) => col.type !== "Action" && col.type !== "Button"
        ),
      ];
      setExportColumnData(exportColumn);
      setExportType(e);
      setModalExport(!modalExport);
    } else {
      getErrorMessage();
    }
  };
  const edit = (id) => {
    prop.onEdit(id);
  };
  const settingChangesExport = (coulmnData) => {
    setModalExport(false);
    setExportCol(coulmnData);
    const exportData = data;
    const headers = [];
    const colData = [];
    coulmnData.map((col) => {
      if (col.visible) headers.push(col.field);
    });
    coulmnData.map((col) => {
      if (col.visible) colData.push(col);
    });
    const newData = [];
    exportData.map((element) => {
      const newObj = {};
      headers.forEach((name) => {
        newObj[name] = element[name];
      });
      newData.push(newObj);
      newObj;
    });

    const newDataExcel = [];
    let headersExcel: any = [];
    coulmnData.map((col) => {
      if (col.visible)
        headersExcel.push({ title: col.header, field: col.field });
    });

    exportData.map((element) => {
      const newObj = {};
      headersExcel.forEach((name) => {
        newObj[name.title] = element[name.field];
      });
      newDataExcel.push(newObj);
    });

    switch (exportType) {
      case "PDF":
        exportPdf(newData, headers, colData);
        break;
      case "EXCEL":
        exportExcel(newDataExcel);
        break;
      case "CSV":
        exportCSV(newData, headers);
        break;
      default:
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
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = "";

    for (let i = 0; i < array.length; i++) {
      let line = "";
      for (const index in array[i]) {
        if (line !== "") line += ",";
        line += array[i][index];
      }
      str += line + "\r\n";
    }

    return str;
  };

  const exportCSV = (newData, headers) => {
    const jsonObject = JSON.stringify(newData);
    const csv = convertToCSV(jsonObject);
    const exportedFilenmae = "report" + ".csv" || "export.csv";
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const exportPdf = async (newData, headers, colData) => {
    var out: any = [];
    for (var i = 0; i < colData.length; i++) {
      if (colData[i]?.field === headers[i]) {
        out.push(colData[i].header);
      }
    }
    const input = document.getElementById("tablePdf");
    const unit = "pt";
    const size = "A4";
    const columnLength = Number(columnLengthForExport);
    const orientation = colData.length >= columnLength ? "l" : "p";
    const doc = new jsPDF(orientation, unit, size);
    doc.addFont("/content/fonts/arial-unicode-ms.ttf", "aakar", "normal");
    doc.setFont("aakar");
    const title = prop.title.concat(" Report");
    var data = newData.map((obj) => headers.map((header) => obj[header]));
    const content = {
      startY: 50,
      head: [out],
      body: data,
      styles: {
        font: "aakar",
      },
    };
    doc.text(title, 40, 40);
    autoTable(doc, content);
    const totalPage = doc.getNumberOfPages();
    for (let i = 1; i <= totalPage; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      let pageStr = `Page ${i} of ${totalPage}`;
      doc.text(pageStr, 510, 820);
    }

    let fileName = `_Report_${moment(new Date()).format(
      "DD_MM_YYYY_HH_mm_ss"
    )}.pdf`;
    doc.save(prop.title.concat(fileName));
  };

  const exportExcel = (newData) => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(newData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      let fileName = `${prop.title}_Report_${moment(new Date()).format(
        "DD_MM_YYYY_HH_mm_ss"
      )}`;
      saveAsExcelFile(excelBuffer, fileName);
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        const EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const EXCEL_EXTENSION = ".xlsx";
        const dataa = new Blob([buffer], {
          type: EXCEL_TYPE,
        });
        module.default.saveAs(dataa, fileName + EXCEL_EXTENSION);
      }
    });
  };

  const settingChanges = async (
    coulmnData,
    filterToggle,
    selectedPageSize,
    columnFilter
  ) => {
    if (gridId && language && menuItemId) {
      setModal(false);
      getColumns({
        gridId: gridId,
        id: language,
        menuItemId: menuItemId,
      }).then(async (res: any) => {
        await setColumn(res.data.data);
        const pageData = {
          first: lazyState.first,
          rows: selectedPageSize,
          page: lazyState.page,
          sortField: lazyState.sortField,
          sortOrder: lazyState.sortOrder,
        };
        setlazyState(pageData);

        if (res?.data != null) {
          setfilter(
            res?.data?.data?.length > 0
              ? res?.data?.data[0].filterEnable
              : false
          );
          setColumnfilters(
            res?.data?.data?.length > 0
              ? res?.data?.data[0].columnsFilterEnable
              : false
          );
        }
        await prepareRowAction(res.data.data);
        await prop.onPageChange(pageData);
        setData(prop.data);
        setModal(false);
      });
    }
  };

  const onReset = async () => {
    let id;
    if (gridId && language && menuItemId) {
      setModal(false);
      getColumns({
        gridId: gridId,
        id: language,
        menuItemId: menuItemId,
      }).then(async (res: any) => {
        await setColumn(res.data.data);
        const pageData = {
          first: lazyState.first,
          rows: parseInt(res.data.data[0].gridPageSize.size),
          page: lazyState.page,
          sortField: lazyState.sortField,
          sortOrder: lazyState.sortOrder,
        };
        if (res?.data != null) {
          setfilter(
            res?.data?.data?.length > 0
              ? res?.data?.data[0].filterEnable
              : false
          );
          setColumnfilters(
            res?.data?.data?.length > 0
              ? res?.data?.data[0].columnsFilterEnable
              : false
          );
        }
        await prepareRowAction(res.data.data);
        await prop.onPageChange(pageData);
        setData(prop.data);
        setModal(false);
      });
    }
  };
  const closeSettingModal = async () => {
    await setModal(false);
  };

  const [reasonIdDelete, setReasonIdDelete] = useState<any>();
  const deleteConfirmOnAction = async (
    id: number,
    flag: boolean,
    record: any
  ) => {
    setMsgLangKeyInSessionStorage(prop.msgLangKey);
    const idObj = {};
    idObj["id"] = id;
    setReasonIdDelete(idObj);
    confirmDialog({
      message: deletemsg,
      header: deleteHeader,
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-success",
      rejectClassName: "p-button-danger",
      className: "confirmationModal",
      acceptLabel: labelbtnFlag.yes ? labelbtnFlag.yes : "Yes",
      rejectLabel: labelbtnFlag.no ? labelbtnFlag.no : "No",
      accept: async () => {
        flag == true ? await setReasonFlag(!reasonFlag) : accept(id, record);
      },
      reject: () => reject(),
    });
  };
  const reject = () => {
    // toast.warn('You have cancel your delete request.');
  };
  const accept = (data: any, record: any) => {
    prop.onDelete(data, record);
    setReasonFlag(false);
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...filters };
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
  const [selectCheckboxRc, setSelectCheckboxRc] = useState<any>([]);
  const radioSelectRecord = (record, fieldName) => {
    prop.radioEvent(record, fieldName);
  };

  const filterColumnGlobal = () => {
    const globalFilterData = [];
    if (column) {
      column.forEach((element) => {
        if (element.visible) globalFilterData.push(element.field);
      });
    }
    return globalFilterData;
  };

  const onSelectCheckBox = (e, obj, fieldName) => {
    let selField = { ...obj };
    let selectedItemsArray: any =
      selectCheckboxRc != undefined ? [...selectCheckboxRc] : [];
    const checked = e.checked;

    if (selField[fieldName] != undefined) {
      selField[fieldName] = e.checked;

      if (e.checked) {
        if (selectedItemsArray.length == 0) {
          selectedItemsArray.push(selField);
        } else {
          selectedItemsArray.push(selField);
        }
      } else {
        selectedItemsArray.splice(selectedItemsArray.indexOf(selField), 1);
      }
    } else {
      checked == true
        ? selectedItemsArray.push(selField)
        : selectedItemsArray.splice(selectedItemsArray.indexOf(selField), 1);
    }
    setSelectCheckboxRc(selectedItemsArray);
    setReasonIdDelete(selField);
    prop.selectCheckbox(checked, selField, selectedItemsArray, fieldName);

    let newData = data.map((item) => {
      if (item.id === obj.id) {
        return { ...item, [fieldName]: e.checked };
      }
      return item;
    });
    setData(newData);
  };

  const exportClose = () => {
    setModalExport(false);
  };

  const dtContainerRef = useRef(null);
  const [tableWidth, setTableWidth] = useState(0);

  useEffect(() => {
    if (dtContainerRef.current) {
      const containerWidth = dtContainerRef.current.offsetWidth;
      setTableWidth(containerWidth);
    }
  }, [dtContainerRef.current]);

  const getWidth = (width) => {
    if (width) {
      if (width.includes("%")) {
        width = width.replace("%", "");
        const widthFloat = parseFloat(width);
        if (!isNaN(widthFloat)) {
          const widthInPixels = (widthFloat / 100) * tableWidth;
          return `${widthInPixels}px`;
        }
      } else if (width.includes("px") || width.includes("PX")) {
        return width;
      } else {
        return "auto";
      }
    }
    return "auto";
  };

  const bodyTemplate = (rowData, column) => {
    const field = column.field;
    const value = rowData[field];
    const tooltip = value;
    return (
      <>
        <span id={`${field}`} data-pr-tooltip={tooltip}>
          {value}
        </span>
        <Tooltip
          mouseTrack
          mouseTrackLeft={10}
          style={{ fontSize: "14px" }}
          target={`#${field}`}
        />
      </>
    );
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          {
            <div className="d-flex globlFilter">
              {filter && (
                <>
                  <IconField iconPosition="left">
                    <InputIcon className="pi pi-search"> </InputIcon>
                    <InputText
                      value={globalFilterValue}
                      placeholder="Keyword Search"
                      onChange={(e) => onGlobalFilterChange(e)}
                    />
                  </IconField>
                </>
              )}
            </div>
          }
          <div className="d-flex gridSetting flex-wrap">
            {ifShowHeader && (
              <Button
                onClick={() => edit("")}
                className="btn btn-primary btnStyle"
                data-cy="entityCreateButton"
              >
                <FontAwesomeIcon icon="plus" />
                Add
              </Button>
            )}
            {prop.statusFilter === true && (
              <span className="d-flex justify-content-center m-r-15 statusFilter">
                <span
                  style={{ marginLeft: "10px" }}
                  className="d-flex align-items-center"
                >
                  <RadioButton
                    inputId={gridId + "gridActive"}
                    name="filter"
                    value="Active"
                    onChange={(e) => redioFilterSelection(e.value)}
                    checked={redioFilter === "Active"}
                  />
                  <label
                    htmlFor={gridId + "gridActive"}
                    style={{ marginBottom: 0 }}
                  >
                    {labelbtnFlag.activeradio
                      ? labelbtnFlag.activeradio
                      : "Active"}
                  </label>
                </span>
                <span
                  style={{ marginLeft: "10px" }}
                  className="d-flex align-items-center"
                >
                  <RadioButton
                    inputId={gridId + "gridInactive"}
                    name="filter"
                    value="Inactive"
                    onChange={(e) => redioFilterSelection(e.value)}
                    checked={redioFilter === "Inactive"}
                  />
                  <label
                    htmlFor={gridId + "gridInactive"}
                    style={{ marginBottom: 0 }}
                  >
                    {labelbtnFlag.inactiveradio
                      ? labelbtnFlag.inactiveradio
                      : "Inactive"}
                  </label>
                </span>
                <span
                  style={{ marginLeft: "10px" }}
                  className="d-flex align-items-center"
                >
                  <RadioButton
                    inputId={gridId + "All"}
                    name="filter"
                    value="All"
                    onChange={(e) => redioFilterSelection(e.value)}
                    checked={redioFilter === "All"}
                  />
                  <label htmlFor={gridId + "All"} style={{ marginBottom: 0 }}>
                    {labelbtnFlag.allradio ? labelbtnFlag.allradio : "All"}
                  </label>
                </span>
              </span>
            )}
            <Button
              color="secondary"
              className="iconBtn"
              type="button"
              onClick={() => {
                setModal(!modal);
              }}
              tooltip={placeholder("setting.label")}
              tooltipOptions={{ position: "top" }}
            >
              <i className="fa-solid fa-gear"></i>
            </Button>
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                border: "none",
                background: "#1565C00D",
                marginLeft: "15px",
                boxShadow: "none",
                color: "#1565c0",
              }}
            >
              {labelbtnFlag.export ? labelbtnFlag.export : "Export"}
            </button>
            <ul className="dropdown-menu" style={{}}>
              <li>
                {" "}
                <a className="dropdown-item" onClick={() => toggle("EXCEL")}>
                  <i
                    className="fa-solid fa-file-excel"
                    style={{ color: "#1c6c42" }}
                  ></i>{" "}
                  Excel
                </a>
              </li>
              <li>
                {" "}
                <a className="dropdown-item" onClick={() => toggle("PDF")}>
                  <i
                    className="fa-solid fa-file-pdf"
                    style={{ color: "#f72015" }}
                  ></i>{" "}
                  PDF
                </a>
              </li>
            </ul>
          </div>
        </div>
        {modal && (
          <Setting
            show={modal}
            gridId={gridId}
            gridData={apiGridData}
            filter={filter}
            isColumnfilters={columnfilters}
            columns={column}
            menuItemId={menuItemId}
            onClose={closeSettingModal}
            onSetting={settingChanges}
            onReset={onReset}
            dropdownOptions={dropdownOptions}
          />
        )}
        {modalExport && (
          <ExportSetting
            show={modalExport}
            columns={exportColumnData}
            onSetting={settingChangesExport}
            onClose={exportClose}
          />
        )}

        <div className="dataTable" id="tablePdf" ref={dtContainerRef}>
          <>
            <>
              <DataTable
                ref={dt}
                emptyMessage={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      textAlign: "start",
                      backgroundColor: "#a1bce50D",
                      height: "3rem",
                      fontSize: "0.90rem",
                      fontFamily: "Inter, sans-serif",
                      margin: "-5px",
                      marginTop: "2.5px",
                      marginBottom: "2.5px",
                    }}
                  >
                    <div style={{ marginLeft: "0.25rem", color: "#2c79d1" }}>
                      {prop.emptyMessage
                        ? prop.emptyMessage
                        : "No record found!"}
                    </div>
                  </div>
                }
                sortMode="multiple"
                value={data}
                globalFilterFields={filterColumnGlobal()}
                filters={filters}
                filterDisplay={columnfilters ? "row" : null}
                scrollable
                scrollHeight="400px"
                id={gridId}
                selectionMode="single"
                selection={selectedItem}
                onSelectionChange={(e) => {
                  setSelectedItem(e.value);
                  prop.onSelect ? prop.onSelect(e.value) : {};
                }}
                onRowReorder={(e: any): void =>
                  prop.onAddReorderRow(e.value, gridId)
                }
                reorderableRows={reOrderRowValue}
                removableSort
                virtualScrollerOptions={
                  prop.virtualScrollerOptions === true && totalRecords > "30"
                    ? { itemSize: 36 }
                    : {}
                }
              >
                {rowReorder && <Column rowReorder style={{ width: "40px" }} />}
                {column &&
                  column.map((e: any, i: any) => {
                    if (e.visible) {
                      if (e.type === "Radio") {
                        return (
                          <Column
                            style={{
                              width: e.width ? getWidth(e.width) : "65px",
                            }}
                            header={e.header}
                            body={(data2) => (
                              <>
                                <RadioButton
                                  inputId={data2}
                                  name={data2.id}
                                  value={e.field}
                                  onChange={(x) =>
                                    radioSelectRecord(data2, e.field)
                                  }
                                  checked={data2[e.field] === true}
                                />
                              </>
                            )}
                          />
                        );
                      }

                      if (e.type === "CheckBox") {
                        return (
                          <Column
                            style={{
                              width: e.width ? getWidth(e.width) : "65px",
                            }}
                            header={e.header}
                            body={(data2) => (
                              <>
                                <Checkbox
                                  key={Math.random()}
                                  name={data2.id}
                                  value={e.field}
                                  onChange={(x) => {
                                    onSelectCheckBox(x, data2, e.field);
                                  }}
                                  checked={data2[e.field] === true}
                                />
                              </>
                            )}
                          />
                        );
                      }

                      if (e.type === "Action") {
                        return (
                          <Column
                            style={{
                              width: e.width ? getWidth(e.width) : "65px",
                            }}
                            header={e.header}
                            body={(data2) => (
                              <>
                                <SplitButton
                                  icon="fa-solid fa-ellipsis"
                                  className="tableActionMenu"
                                  dropdownIcon="pi pi-list"
                                  model={itemsAction}
                                  onFocus={() => getActionBtn(data2.id, data2)}
                                />
                              </>
                            )}
                          />
                        );
                      }
                      if (e.type === "Button") {
                        return (
                          <Column
                            header={e.header}
                            style={{
                              width: e.width ? getWidth(e.width) : "65px",
                            }}
                            body={(data2) => (
                              <>
                                {buttonAction.length > 0 &&
                                  buttonAction.map((button) => (
                                    <>
                                      {button.visible == true && (
                                        <Button
                                          style={{ marginLeft: "15px" }}
                                          tooltipOptions={{ position: "top" }}
                                          className={
                                            button.className + " gridIcon"
                                          }
                                          disabled={
                                            data2[prop.disabledflag]
                                              ? true
                                              : false
                                          }
                                          onClick={() =>
                                            button["id"] == "Delete"
                                              ? deleteConfirmOnAction(
                                                  data2.id,
                                                  button["askReason"],
                                                  data2
                                                )
                                              : eval(
                                                  prop[buttonAction[0].command](
                                                    data2.id,
                                                    gridId,
                                                    true,
                                                    editObject
                                                  )
                                                )
                                          }
                                        >
                                          <i className={button.icon}></i>
                                        </Button>
                                      )}
                                    </>
                                  ))}
                              </>
                            )}
                          />
                        );
                      }
                      if (e.type === "Status") {
                        return (
                          <Column
                            key={i}
                            header={e.header}
                            filter
                            columnKey={e.field}
                            field={e.field}
                            style={{ width: getWidth(e.width) }}
                            sortable
                            body={(data2) => {
                              if (data2) {
                                if (data2[e.field] == "Active") {
                                  return (
                                    <span className="badge bg-success">
                                      {data2[e.field]}
                                    </span>
                                  );
                                } else if (data2[e.field] == "Inactive") {
                                  return (
                                    <span className="badge bg-danger">
                                      {data2[e.field]}
                                    </span>
                                  );
                                } else if (data2[e.field] == "Completed") {
                                  return (
                                    <span className="badge bg-primary">
                                      {data2[e.field]}
                                    </span>
                                  );
                                } else if (data2[e.field] == "Not Started") {
                                  return (
                                    <span className="badge bg-secondary">
                                      {data2[e.field]}
                                    </span>
                                  );
                                } else if (data2[e.field] == "Rejected") {
                                  return (
                                    <span className="badge bg-danger">
                                      {data2[e.field]}
                                    </span>
                                  );
                                } else if (data2[e.field] == "In-Progress") {
                                  return (
                                    <span className="badge bg-warning">
                                      {data2[e.field]}
                                    </span>
                                  );
                                } else {
                                  return (
                                    <span className="badge bg-primary">
                                      {data2[e.field]}
                                    </span>
                                  );
                                }
                              }
                            }}
                          />
                        );
                      }
                      return (
                        <Column
                          key={i}
                          filter
                          columnKey={e.field}
                          field={e.field}
                          header={e.header}
                          style={{ width: getWidth(e.width) }}
                          sortable
                          className="tooltipClass"
                          body={(rowData) => bodyTemplate(rowData, e)}
                        />
                      );
                    }
                  })}
              </DataTable>
              <Paginator
                template={paginatorTemplate}
                rows={lazyState.rows}
                first={lazyState.first}
                onPageChange={(e) => {
                  setlazyState(e);
                  prop.onPageChange(e);
                }}
                pageLinkSize={3}
                totalRecords={totalRecords}
                className="justify-content-end"
              />
            </>
            {reasonFlag && (
              <AskReason
                data={reasonIdDelete}
                deleteObject={editObject}
                action="delete"
                visible={reasonFlag}
                saveWithReason={accept}
                onClose={handleCloseForReason}
              />
            )}
          </>
        </div>
      </div>
    </>
  );
};
export default Table;
