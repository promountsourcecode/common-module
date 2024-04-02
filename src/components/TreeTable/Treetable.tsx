import React, { useState, useEffect, useRef, useCallback, useMemo, Children } from 'react';
import { Column } from 'primereact/column';
import { Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { getSortState } from 'react-jhipster';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { useAppDispatch } from 'app/config/store';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExportSetting from "../Export-Column";
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { TreeTable } from 'primereact/treetable';
import { faCloudUpload, faDownload, faFileWord, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primereact/menuitem';
import { SplitButton } from 'primereact/splitbutton';
import { Translate } from '@promountsourcecode/common_module';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { AskReason } from '@promountsourcecode/common_module';
import { setMsgLangKeyInSessionStorage } from '@promountsourcecode/common_module';
import { Paginator } from 'primereact/paginator';
import { Dropdown } from 'primereact/dropdown';
import {getColumns} from 'app/shared/common.reducer'; 
import { Setting } from "@promountsourcecode/common_module";
import { InputSwitch } from 'primereact/inputswitch';
import { toast } from 'react-toastify';
import { CORE_BASE_URL } from "../constants/apiConstant";
import { useAppDispatch, useAppSelector } from 'app/config/store';
export const Treetable = (prop) => {
  const dispatch = useAppDispatch();
  const dt = useRef<any>();
  const [data, setData] = useState<any>();
  const [nodes, setNodes] = useState<any>();
  const [column, setColumn] = useState(prop.column);
  const [exportCol, setExportCol] = useState<any>([]);
  const [documentTypeId, setdocumentypeId] = useState(prop.documentTypeId);
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

  const [language, setlanguage] = useState(
    sessionStorage.getItem("LanguageId")
  );
  const [redioFilter, setRedioFilter] = useState(
    sessionStorage.getItem("FilterStatus")
  );
  const [configurableReason, setConfigurableReason] = useState<boolean>(
    prop.reasonAsk ? prop.reasonAsk : false
  );
  const menuItemId = sessionStorage.getItem("menuItemId");
  const [deleteHeader, setdeleteHeader] = useState(
    <Translate contentKey="global.deleteConfirm"></Translate>
  );
  const [deletemsg, setdeletemsg] = useState(
    <Translate contentKey="home.deleteMsg"></Translate>
  );
  const [updatedJson, setUpdatedJson] = useState<any>();
  const [maxPageSize, setMaxPageSize] = useState(
    Number(sessionStorage.getItem("MaxPageSize"))
  );
  const [defaultPageSize, setDefaultPageSize] = useState(
    Number(sessionStorage.getItem("DefaultPageSize"))
  );
  const finalObject = [];
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
      //  prepareRowAction(gridData.data.data);
    });
    setData((pre: any) => {
      if (!prop.data) return pre;
      else return prop.data;
    });
  }, [prop.data]);

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
    setExportType(e);
    setModalExport(!modalExport);
  };

  //const arrForRow = sessionStorage.getItem("RowsPerPage");
  //const [perPage, setPerPage] = useState([]);
  // useEffect(() => {
  //   let arr = arrForRow.split(",").map(Number);
  //   setPerPage(arr);
  // }, [arrForRow]);

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(
      getSortState(location, ITEMS_PER_PAGE, "id"),
      location.search
    )
  );
  const edit = (id) => {
    prop.onEdit(id);
  };
  const editSub = (id) => {
    prop.subTemp(id);
  };

  const preview = (id) => {
    prop.onPreview("true");
  };
  const save = () => {
    prop.saveJson(nodes);
  };
  const handleLoadMore = () => {
    if ((window as any).pageYOffset > 0) {
      setPaginationState({
        ...paginationState,
        activePage: paginationState.activePage + 1,
      });
    }
  };

  const items: MenuItem[] = [
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

  const settingChanges = (coulmnData, filterToggle, selectedPageSize) => {
    setModal(false);
    setColumn(coulmnData);
    setfilter(filterToggle);
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
    if (col.visible) ({ title: col.header, dataKey: col.field });
  });

  const convertToCSV = (objArray) => {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = "";

    for (let i = 0; i < array.length; i++) {
      let line = "";
      // eslint-disable-next-line guard-for-in
      for (const index in array[i]) {
        if (line !== "") line += ",";
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

    const exportedFilenmae = "report" + ".csv" || "export.csv";

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
    doc.save(prop.title.concat(" Report.pdf"));
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
      saveAsExcelFile(excelBuffer, prop.title);
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
    // prop.onSelect(e);
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
        gridId != '' &&
        gridId != undefined &&
        language != null &&
        language != '' &&
        language != undefined &&
        menuItemId != null &&
        menuItemId != '' &&
        menuItemId != undefined
      ) {
        const gridData = await axios.get(`${CORE_BASE_URL}api/grid-user-settings/${gridId}/${language}/${menuItemId}/1`);
        // (await gridData.data.data.length) > 0 ? setColumn(gridData.data.data) : setColumn(prop.column);
        setColumn(gridData.data.data);
        const pageData = {
          first: lazyState.first,
          rows: await parseInt(gridData.data.data[0].gridPageSize),
          page: lazyState.page,
          sortField: lazyState.sortField,
          sortOrder: lazyState.sortOrder,
        };
        setlazyState(pageData);
        setfilter(gridData.data.data[0].filterEnable);
        await prepareRowAction(gridData.data.data);
        await setModal(false);
        setData(prop.data);
      }
    } catch (error) {
      toast.error(error.toString());
    }
  };
  const getBoolean = (id) => {
    const field: any = document.querySelector("#" + id);
    return !!field.checked;
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
  const reject = () => {
    // toast.warn('You have cancel your delete request.');
  };
  const accept = (data: any, record: any) => {
    prop.onDelete(data, record);
    setReasonFlag(false);
  };
  const revice = (id: number) => {
    confirmDialog({
      message: "Are you sure you want to revise this Template?",
      header: "Revise Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-success",
      accept: () => acceptRevice(id),
      reject: () => rejectRevice(),
    });
  };
  const rejectRevice = () => {
    // toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    toast.error("You have rejected");
  };
  const acceptRevice = (id) => {
    // prop.onDelete(id);
    prop.onRevice(id);
  };
  const [newData, setNewData] = useState<any>();
  const [newNodeValue, setNewNodeValue] = useState<any>();
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
    // makeJsonObject(nodes);
  };

  const findNodeByKey = (nodes, key) => {
    let path = [];
    path = key.toString().split("-");

    let node;

    while (path.length) {
      const list = node ? node.children : nodes;
      node = list;
      path.shift();
    }

    return node;
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
          // returnValue = parseFloat(data1[fieldName]);
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

  const getParentId = (acttioId, id, levelId) => {
    prop.setParentId(id);
    prop.setLevelId(levelId);
  };

  const toggleEdit = (id, levelId) => {
    prop.setEditId(id);
    prop.setLevelId(levelId);
  };
  const handleCloseForReason = () => {
    setReasonFlag(!reasonFlag);
  };

  const [pid, setPid] = useState<any>();
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
    // prop.selectCheckbox(checked, e.value, gridId);

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

  /* pagination code */

  const [totalRecords, setTotalRecords] = useState(prop.totalRecords);
  const [lazyState, setlazyState] = useState(prop.pagination);
  let row_per_page:string = useAppSelector(state =>state.commonReducer.RowsPerPage.configurationValue);
  const dropdownOptions : any = []
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
      // const dropdownOptions = [
      //   { label: 5, value: 5 },
      //   { label: 10, value: 10 },
      //   { label: 20, value: 20 },
      //   { label: 50, value: 50 },
      //   { label: 100, value: 100 },
      //   { label: 500, value: 500 },
      //   { label: 1000, value: 1000 },
      //   { label: 2000, value: 2000 },
      //   { label: 5000, value: 5000 },
      // ];
      if(row_per_page){
        let arr =  row_per_page ? row_per_page.split(',') : ''
        for(let i = 0; i < arr.length ; i++ ){
          dropdownOptions.push(Number(arr[i]))
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
          setfilter(res.payload.data.data[0].filterEnable);

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
    // Update the expandedKeys state when a node is expanded/collapsed
    setExpandedKeys(event.value);
  };

  const exportClose = () => {
    setModalExport(!modalExport);
  };

  return (
    <div>
      {ifHideHeader && (
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          {
            <div className="d-flex globlFilter">
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                  value={globalFilterValue}
                  onChange={(e) => onGlobalFilterChange(e)}
                  placeholder="Keyword Search"
                />
              </span>
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
                // onChange={(e) => setMetaKey(e.value)}
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
              <FontAwesomeIcon icon="cogs" />
            </Button>

            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                border: "none",
                background: "white",
                boxShadow: "none",
                color: "#1565c0",
              }}
            >
              {labelbtnFlag.export ? labelbtnFlag.export : "Export"}
            </button>
            <ul className="dropdown-menu" style={{}}>
              {/* <li> <a className="dropdown-item" onClick={() => toggle('CSV')}><i className="fa-solid fa-file-csv" style={{ color: '#1d7dc8' }}></i> CSV</a></li> */}
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
              {/* <li> <a className="dropdown-item" onClick={() => exportToJson()}><i className="fa-solid fa-file-arrow-down" style={{ color: '#53d1e5' }}></i>  Json</a></li> */}
              {/* <li> <a className="dropdown-item" ><i className="fa-solid fa-print" style={{ color: '#f08080' }}></i>  Print</a></li> */}
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
          onClose={closeSettingModal}
          onSetting={settingChanges}
          onReset={onReset}
          dropdownOptions={dropdownOptions}
        />
      )}

      {modalExport && (
        <ExportSetting
          show={modalExport}
          columns={column}
          onSetting={settingChangesExport}
          onClose={exportClose}
        />
      )}

      <div className="dataTable">
        <>
          {prop.data && prop.data.length > 0 ? (
            <>
              <TreeTable
                ref={dt}
                sortMode="multiple"
                value={nodes}
                filters={filter}
                // header={header}
                rows={5}
                id="table"
                selectionMode="single"
                selectionKeys={selectedProduct}
                onSelectionChange={(e) => getSubDocType(e.value)}
                onExpand={onNodeExpand}
                expandedKeys={expandedKeys}
                globalFilter={globalFilterValue}
                // onToggle={(e) => setExpandedKeys(e.value)}
                onToggle={onToggle}
                // onToggle={e => setParentId2(e.value)}
                tableStyle={{ minWidth: "50rem" }}
                // paginator
                // rows={defaultPageSize}
                // rowsPerPageOptions={perPage}
              >
                <Column
                  expander={true}
                  style={{ marginRight: "50px" }}
                ></Column>
                {column.map((e: any, i: any) => {
                  if (e.visible) {
                    if (e.type === "Radio") {
                      return (
                        <Column
                          header={e.header}
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
                          style={{ width: e.width ? e.width : "15px" }}
                          header={e.header}
                          body={(data2) => (
                            <>
                              <SplitButton
                                icon="fa-solid fa-bars"
                                className="tableActionMenu"
                                model={itemsAction}
                                //model= {!data2.isLastNode && itemsAction.id === 'Add' ? data2.isLastNode : itemsAction}
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
                          style={{ width: e.width ? e.width : "15px" }}
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
                    if (e.editable == true) {
                      return (
                        <Column
                          key={i}
                          field={e.field}
                          header={e.header}
                          style={{ width: e.width }}
                          editor={typeEditor}
                          expander={e.expander}
                          sortable
                        />
                      );
                    } else {
                      return (
                        <Column
                          key={i}
                          field={e.field}
                          header={e.header}
                          style={{ width: e.width }}
                          expander={e.expander}
                          sortable
                        />
                      );
                    }
                    // return <Column key={i} field={e.field} header={e.header} editor={typeEditor} expander={e.expander} sortable />;
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

        {/* </InfiniteScroll> */}

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
