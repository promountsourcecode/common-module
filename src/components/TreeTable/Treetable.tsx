import React, { useState, useEffect, useRef } from "react";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { confirmDialog } from "primereact/confirmdialog";
import { overridePaginationStateWithQueryParams } from "app/shared/util/entity-utils";
import { getSortState } from "react-jhipster";
import { ITEMS_PER_PAGE } from "app/shared/util/pagination.constants";
import { useAppDispatch } from "app/config/store";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ExportSetting from "../Export-Column";
import axios from "axios";
import { TreeTable } from "primereact/treetable";
import { MenuItem } from "primereact/menuitem";
import { SplitButton } from "primereact/splitbutton";
import { Translate } from "@promountsourcecode/common_module";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { AskReason } from "@promountsourcecode/common_module";
import { setMsgLangKeyInSessionStorage } from "@promountsourcecode/common_module";
import { Paginator } from "primereact/paginator";
import { Dropdown } from "primereact/dropdown";
import { getColumns } from "../ValidationMethod/validationMethod";
import Setting from "../Setting";
import { InputSwitch } from "primereact/inputswitch";
import { toast } from "react-toastify";
import { CORE_BASE_URL } from "../constants/apiConstant";
import { useAppDispatch, useAppSelector } from "app/config/store";
import { FilterMatchMode } from "primereact/api";

import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

export const Treetable = (prop) => {
  const dispatch = useAppDispatch();
  const dt = useRef<any>();
  const [data, setData] = useState<any>();
  const [nodes, setNodes] = useState<any>();
  const [column, setColumn] = useState(prop.column);
  const [exportCol, setExportCol] = useState<any>([]);
  const [filter, setfilter] = useState(prop.toggleFilter);
  const [filters, setfilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [gridId, setGridId] = useState(prop.gridId);
  const [apiGridData, setApiGridData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalExport, setModalExport] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [exportType, setExportType] = useState();
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [columnfilters, setColumnfilters] = useState(true);
  const [ifShowHeader, setifShowHeader] = useState(false);
  const [ifHideHeader, setifHideHeader] = useState(true);
  const [lazyState, setlazyState] = useState(prop.pagination);
  const [exportColumnData, setColumnData] = useState([]);
  const [language, setlanguage] = useState(
    sessionStorage.getItem("LanguageId")
  );
  const [redioFilter, setRedioFilter] = useState("Active");
  const menuItemId = sessionStorage.getItem("menuItemId");
  const [deleteHeader, setdeleteHeader] = useState(
    <Translate contentKey="global.deleteConfirm"></Translate>
  );
  const [deletemsg, setdeletemsg] = useState(
    <Translate contentKey="home.deleteMsg"></Translate>
  );
  const [updatedJson, setUpdatedJson] = useState<any>();
  const finalObject = [];

  useEffect(() => {
    setlazyState(lazyState);
  }, [lazyState]);
  const getGridData = async () => {
    let id;
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
        await setColumn(
          gridData.data.data.length > 0 ? gridData.data.data : prop.column
        );
        const pageData = {
          first: lazyState.first,
          rows:
            gridData.data.data.length > 0
              ? parseInt(gridData.data.data[0].gridPageSize)
              : 10,
          page: lazyState.page,
          sortField: lazyState.sortField,
          sortOrder: lazyState.sortOrder,
        };
        setlazyState(pageData);
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
        setfilters(filterObject);
        await prepareRowAction(gridData.data.data);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };
  useEffect(() => {
    setNodes((pre: any) => {
      if (!prop.data) return pre;
      else return prop.data;
    });
    setData((pre: any) => {
      if (!prop.data) return pre;
      else return prop.data;
    });
  }, [prop.data, columnfilters]);

  useEffect(() => {
    getGridData();
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
  }, []);

  const toggle = (e) => {
    let exportColumn = [
      ...column.filter((col) => col.type !== "Action" && col.type !== "Button"),
    ];
    setColumnData(exportColumn);
    setExportType(e);
    setModalExport(!modalExport);
  };
  const edit = (id) => {
    prop.onEdit(id);
  };
  const save = () => {
    prop.saveJson(nodes);
  };

  const [key, setKey] = useState(0);

  const resetFilters = () => {
    // Increment the key to force re-rendering
    setKey(key + 1);
  };
  const settingChanges = async (
    coulmnData,
    filterToggle,
    selectedPageSize,
    columnFilter
  ) => {
    setModal(false);
    await setColumn(coulmnData);
    setfilter(filterToggle);
    if (!columnFilter) {
      await resetFilters();
    }
    await setColumnfilters(columnFilter);
    const pageData = {
      first: lazyState.first,
      rows: selectedPageSize,
      page: lazyState.page,
      sortField: lazyState.sortField,
      sortOrder: lazyState.sortOrder,
    };
    setlazyState(pageData);
  };

  const getDataForPdfXls = (data) => {
    if (data.length > 0) {
      data.forEach((element) => {
        if (element["data"]) {
          finalObject.push(element["data"]);
        }
        if (element["children"]) {
          getDataForPdfXls(element["children"]);
        }
      });
    }
  };

  const settingChangesExport = (coulmnData) => {
    getDataForPdfXls(data);
    setModalExport(false);
    setExportCol(coulmnData);
    const exportData = data;
    const headers = [];
    coulmnData.map((col) => {
      if (col.visible) headers.push(col.field);
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

    switch (exportType) {
      case "PDF":
        exportPdf(newData, headers, coulmnData, finalObject);
        break;
      case "EXCEL":
        exportExcel(newData, coulmnData, finalObject);
        break;
      case "CSV":
        exportCSV(newData, headers);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    setlazyState(lazyState);
  }, [lazyState]);

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

  const exportPdf = (newData, headers, coulmnData, data1) => {
    var out = [];
    for (var i = 0; i < coulmnData.length; i++) {
      if (coulmnData[i].field === headers[i]) {
        out.push(coulmnData[i].header);
      }
    }
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const doc = new jsPDF(orientation, unit, size);
    doc.addFont("/content/fonts/arial-unicode-ms.ttf", "aakar", "normal");
    doc.setFont("aakar");
    const title = prop.title.concat(" Report");
    var dataForExport = data1.map((obj) =>
      column.map((header) => obj[header.field])
    );

    const content = {
      startY: 50,
      head: [out],
      body: dataForExport,
      styles: {
        font: "aakar",
      },
    };
    doc.text(title, 40, 40);
    autoTable(doc, content);
    let fileName = `_Report_${moment(new Date()).format(
      "DD_MM_YYYY_HH_mm_ss"
    )}.pdf`;
    doc.save(prop.title.concat(fileName));
  };

  const exportExcel = (newData, coulmnData, data1) => {
    var dataForExport = data1.map((obj) =>
      column.map((header) => obj[header.field])
    );
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(dataForExport);
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
  const getSubDocType = (e) => {
    setSelectedProduct(e);
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
  const closeSettingModal = async () => {
    let id;
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
        setColumn(gridData.data.data);
        const pageData = {
          first: lazyState.first,
          rows: await parseInt(gridData.data.data[0].gridPageSize),
          page: lazyState.page,
          sortField: lazyState.sortField,
          sortOrder: lazyState.sortOrder,
        };
        setlazyState(pageData);
        if (gridData?.data != null) {
          setfilter(
            gridData.data?.data?.length > 0
              ? gridData?.data?.data[0].filterEnable
              : false
          );
          setColumnfilters(
            gridData?.data?.data?.length > 0
              ? gridData?.data?.data[0].columnsFilterEnable
              : false
          );
        }
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
        await setModal(false);
        setData(prop.data);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };
  const redioFilterSelection = (name) => {
    setRedioFilter(name);
    sessionStorage.setItem("FilterStatus", name);
    prop.onFilterChanges(name);
  };
  var labelbtnFlag: any = {
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
  const [itemsAction, setitemsAction] = useState<any>([]);
  const [buttonAction, setButtonAction] = useState<any>([]);
  const [reasonIdDelete, setReasonIdDelete] = useState<any>();
  const [reasonFlag, setReasonFlag] = useState<boolean>(false);
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
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-success",
      acceptLabel: labelbtnFlag.yes ? labelbtnFlag.yes : "Yes",
      rejectLabel: labelbtnFlag.no ? labelbtnFlag.no : "No",
      accept: async () => {
        flag == true ? await setReasonFlag(!reasonFlag) : accept(id, record);
      },
      reject: () => reject(),
    });
  };
  const reject = () => {};
  const accept = (data: any, record: any) => {
    prop.onDelete(data, record);
    setReasonFlag(false);
  };
  const onEditorValueChange = async (options, value) => {
    const newNodes = JSON.parse(JSON.stringify(nodes));
    let indexs = options.rowIndex;
    let typeValue = typeof options.rowIndex;
    if (typeValue == "string") {
      indexs = options.rowIndex.split("_");
    }
    let obj = newNodes;
    if (typeof indexs == "number") {
      obj = obj[indexs];
    } else {
      for (let idx = 0; idx < indexs.length; idx++) {
        if (idx == 0) {
          obj = obj[parseInt(indexs[idx])];
        } else {
          obj = obj["children"][parseInt(indexs[idx])];
        }
      }
    }

    obj["data"][options.field] = await value;
    let finaljson = {};
    await setNodes(newNodes);
    finaljson["data"] = [obj];
    setUpdatedJson(finaljson);
  };

  const inputTextEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.rowData[options.field]}
        onChange={(e) => onEditorValueChange(options, e.target.value)}
      />
    );
  };
  const [editObject, setEditObject] = useState<any>([]);
  const getActionBtn = (id, object) => {
    setActionId(id);
    setEditObject(object);
  };

  const [actionId, setActionId] = useState<number>();
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
                    <Translate contentKey={actinObj[j]["label"]}></Translate>
                  ),
                  icon: actinObj[j]["icon"],
                  id: actinObj[j]["id"],
                  visible: actinObj[j]["visible"],
                  command: () => {
                    actinObj[j]["id"] == "Delete"
                      ? deleteConfirmOnAction(actionId, true, editObject)
                      : eval(
                          prop[actinObj[j].command](
                            actionId,
                            gridId,
                            actinObj[j].askReason,
                            editObject
                          )
                        );
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
    } catch (error) {
      toast.error(error.toString());
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
    let flag: any;
    flag = typeof data1.data[fieldName]
      ? typeof data1.data[fieldName]
      : undefined;
    if (flag != undefined) {
      if (flag == "boolean") {
        return data1.data[fieldName];
      } else if (flag == "string" || flag == "number") {
        let returnValue: boolean;
        if (flag == "number") {
        }
        if (flag == "string") {
          returnValue = data1.data[fieldName] == "Yes" ? true : false;
        }
        return returnValue;
      }
      return data1.data[fieldName];
    } else {
      if (selectCheckboxRc != undefined) {
        for (let i = 0; i < selectCheckboxRc.length; i++) {
          if (selectCheckboxRc[i].id == data1.id) {
            return true;
          } else {
            false;
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
  const onNodeExpand = (e: any) => {
    prop.setPid(e.node.data.id);
  };
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [selectCheckboxRc, setSelectCheckboxRc] = useState<any>([]);
  const onSelectCheckBox = (e, fieldName, obj) => {
    obj.data[fieldName] = e.target.checked;
    let selectedItemsArray: any =
      selectCheckboxRc != undefined ? [...selectCheckboxRc] : [];
    const checked = e.target.checked;
    try {
      if (e.checked) {
        if (selectedItemsArray.length == 0) {
          selectedItemsArray.push(obj);
        } else {
          for (let i = 0; i < selectCheckboxRc.length; i++) {
            if (
              obj.id != selectCheckboxRc[i].id ||
              selectCheckboxRc.legth == 0
            ) {
              selectedItemsArray.push(obj);
            }
          }
        }
      } else selectedItemsArray.splice(selectedItemsArray.indexOf(obj), 1);
      setSelectCheckboxRc(selectedItemsArray);
      setReasonIdDelete(obj);
      prop.selectCheckbox(checked, obj, selectedItemsArray);
    } catch (error) {
      toast.error(error.toString());
    }
  };
  const [totalRecords, setTotalRecords] = useState(prop.totalRecords);
  let row_per_page: string = useAppSelector(
    (state) => state.commonReducer.RowsPerPage.configurationValue
  );
  const dropdownOptions: any = [];
  useEffect(() => {
    setTotalRecords(prop.totalRecords);
  }, [prop.totalRecords]);
  useEffect(() => {
    setlazyState(prop.pagination);
  }, [prop.pagination]);

  const paginatorTemplate = {
    layout:
      "RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport ",
    RowsPerPageDropdown: (options) => {
      if (row_per_page) {
        let arr = row_per_page ? row_per_page.split(",") : "";
        for (let i = 0; i < arr.length; i++) {
          dropdownOptions.push(Number(arr[i]));
        }
      }
      return (
        <React.Fragment>
          <Dropdown
            value={options.value}
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
            color: "var(--text-color)",
            fontSize: "14px",
            userSelect: "none",
            marginLeft: "auto",
            textAlign: "center",
          }}
        >
          {options.first} - {options.last} of {options.totalRecords}
        </span>
      );
    },
  };
  const onReset = async () => {
    let id;
    setModal(false);
    if (gridId && language && menuItemId) {
      dispatch(
        getColumns({
          gridId: gridId,
          id: language,
          menuItemId: menuItemId,
        })
      ).then(async (res: any) => {
        try {
          setColumn(res.payload.data.data);
          const pageData = {
            first: lazyState.first,
            rows: parseInt(res.payload.data.data[0].gridPageSize),
            page: lazyState.page,
            sortField: lazyState.sortField,
            sortOrder: lazyState.sortOrder,
          };
          setlazyState(pageData);
          if (res?.payload?.data != null) {
            setfilter(
              res?.payload?.data?.data?.length > 0
                ? res?.payload?.data?.data[0].filterEnable
                : false
            );
            setColumnfilters(
              res?.payload?.data?.data?.length > 0
                ? res?.payload?.data?.data[0].columnsFilterEnable
                : false
            );
          }
          await prepareRowAction(res.payload.data.data);
          await prop.onPageChange(pageData);
          setData(prop.data);
        } catch (error) {
          toast.error(error.toString());
        }
      });
    }
  };
  const [expandedKeys, setExpandedKeys] = useState(null);
  const [metaKey, setMetaKey] = useState(false);
  const toggleApplications = () => {
    let _expandedKeys = { ...expandedKeys };
    if (metaKey === true) {
      setExpandedKeys({});
    } else {
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

  const getAllNodeKeys = (nodes) => {
    let keys = [];
    nodes.forEach((node) => {
      keys.push(node.key);
      if (node.children) {
        keys = keys.concat(getAllNodeKeys(node.children));
      }
    });
    return keys;
  };
  const onToggle = (event) => {
    setExpandedKeys(event.value);
  };

  const exportClose = () => {
    setModalExport(!modalExport);
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

  return (
    <div>
      {ifHideHeader && (
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          {
            <div className="d-flex globlFilter">
              {filter && (
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-search"> </InputIcon>
                  <InputText
                    placeholder="Keyword Search"
                    value={globalFilterValue}
                    onChange={(e) => onGlobalFilterChange(e)}
                  />
                </IconField>
                // <span className="p-input-icon-left">
                //   <i className="pi pi-search" />
                //   <InputText value={globalFilterValue} onChange={e => onGlobalFilterChange(e)} placeholder="Keyword Search" />
                // </span>
              )}
            </div>
          }
          <div className="d-flex flex-wrap">
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

            {prop.toggleShow === true && (
              <InputSwitch
                className="d-flex justify-content-center m-r-15 statusFilter"
                inputId="input-metakey"
                style={{ height: 23, marginTop: 5 }}
                checked={metaKey}
                onChange={(e) => {
                  toggleApplications(), setMetaKey(e.value);
                }}
              />
            )}
            {metaKey === false && prop.toggleShow === true && (
              <label htmlFor="input-metakey" style={{ marginTop: 6 }}>
                <Translate contentKey="label.expandAll"></Translate>
              </label>
            )}

            {metaKey === true && prop.toggleShow === true && (
              <label htmlFor="input-metakey" style={{ marginTop: 6 }}>
                <Translate contentKey="label.collapsAll"></Translate>
              </label>
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
              onClick={() => {
                setModal(!modal);
              }}
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
      )}

      {modal && (
        <Setting
          show={modal}
          gridId={gridId}
          gridData={apiGridData}
          filter={filter}
          columns={column}
          menuItemId={menuItemId}
          isColumnfilters={columnfilters}
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
      <div
        ref={dtContainerRef}
        className={columnfilters ? "dataTable" : "dataTable columnFilters"}
      >
        <>
          {prop.data && prop.data.length > 0 ? (
            <>
              <TreeTable
                ref={dt}
                sortMode="multiple"
                value={nodes}
                filters={filter}
                key={key}
                rows={5}
                id="table"
                selectionMode="single"
                selectionKeys={selectedProduct}
                onSelectionChange={(e) => getSubDocType(e.value)}
                onExpand={onNodeExpand}
                expandedKeys={expandedKeys}
                globalFilter={globalFilterValue}
                filterMode={columnfilters ? "lenient" : null}
                onToggle={onToggle}
                tableStyle={{ minWidth: "50rem" }}
              >
                {/* <Column expander={true} style={{ width: '5%' }}></Column> */}
                {column.map((e: any, i: any) => {
                  if (e.visible) {
                    if (e.type === "Radio") {
                      return (
                        <Column
                          header={e.header}
                          style={{
                            width: e.width ? getWidth(e.width) : "65px",
                          }}
                          body={(data2) => (
                            <>
                              <RadioButton
                                inputId={data2}
                                name={data2.id}
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(data2)}
                                checked={selectedCategory === data2}
                              />
                            </>
                          )}
                        />
                      );
                    }
                    if (e.type === "CheckBox") {
                      return (
                        <Column
                          key={i}
                          header={e.header}
                          style={{
                            width: e.width ? getWidth(e.width) : "65px",
                          }}
                          body={(data) => (
                            <Checkbox
                              key={Math.random()}
                              name={data.id}
                              value={e.field}
                              onChange={(x) => {
                                onSelectCheckBox(x, e.field, data);
                              }}
                              checked={defaultChecked(e.field, data)}
                            />
                          )}
                        ></Column>
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
                                icon="fa-solid fa-bars"
                                className="tableActionMenu"
                                model={itemsAction}
                                dropdownIcon="pi pi-list"
                                onFocus={() =>
                                  getActionBtn(data2.data.id, data2.data)
                                }
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
                              {buttonAction.map((button) => (
                                <>
                                  {button.visible == true && (
                                    <Button
                                      tooltip={button.label}
                                      tooltipOptions={{ position: "top" }}
                                      className={button.className + " gridIcon"}
                                      onClick={() =>
                                        button["id"] == "Delete"
                                          ? deleteConfirmOnAction(
                                              data2.id,
                                              button["askReason"],
                                              editObject
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
                              if (data2?.data[e.field] == "Active") {
                                return (
                                  <span className="badge bg-success">
                                    {data2?.data[e.field]}
                                  </span>
                                );
                              } else if (data2?.data[e.field] == "Inactive") {
                                return (
                                  <span className="badge bg-danger">
                                    {data2?.data[e.field]}
                                  </span>
                                );
                              } else {
                                return (
                                  <span className="badge bg-primary">
                                    {data2?.data[e.field]}
                                  </span>
                                );
                              }
                            }
                          }}
                        />
                      );
                    }

                    if (e.editable == true) {
                      return (
                        <Column
                          key={i}
                          field={e.field}
                          header={e.header}
                          style={{ width: getWidth(e.width) }}
                          editor={typeEditor}
                          // expander={e.expander}
                          expander={i == 0 ? true : false}
                          sortable
                        />
                      );
                    } else {
                      return (
                        <Column
                          key={i}
                          field={e.field}
                          filter
                          header={e.header}
                          style={{ width: getWidth(e.width) }}
                          // expander={e.expander}
                          expander={i == 0 ? true : false}
                          sortable
                        />
                      );
                    }
                  } else return null;
                })}
              </TreeTable>
              <Paginator
                template={paginatorTemplate}
                rows={lazyState?.rows}
                first={lazyState?.first}
                onPageChange={(e) => {
                  setlazyState(e);
                  prop.onPageChange(e);
                }}
                pageLinkSize={3}
                totalRecords={totalRecords}
                className="justify-content-end"
              />
            </>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="home.notFound">No records found</Translate>
            </div>
          )}
          {reasonFlag && (
            <AskReason
              data={reasonIdDelete}
              action="delete"
              visible={reasonFlag}
              saveWithReason={accept}
              onClose={handleCloseForReason}
            />
          )}
        </>
        {prop.flag && (
          <div className="p-dialog-footer">
            <Button
              color="primary"
              id="save-entity"
              onClick={save}
              className="btnStyle"
              data-cy="entityCreateSaveButton"
              type="submit"
            >
              <FontAwesomeIcon icon="save" />
              <Translate contentKey="home.save"></Translate>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Treetable;
