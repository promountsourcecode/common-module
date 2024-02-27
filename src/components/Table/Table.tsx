import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { getSortState } from 'react-jhipster';
// import { ITEMS_PER_PAGE } from '../constants/index';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {Setting} from '@promountsourcecode/common_module';
import ExportSetting from '../Export-Column';
import axios from 'axios';
import { Paginator } from 'primereact/paginator';
import { Translate } from '@promountsourcecode/common_module';
import { InputText } from 'primereact/inputtext';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import {
  faArrowUp19,
  faBoxArchive,
  faCloudUpload,
  faDownload,
  faFileWord,
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primereact/menuitem';
// import { Translate } from 'app/shared/translation';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { AskReason } from '@promountsourcecode/common_module';
import { Dropdown } from 'primereact/dropdown';
import { setMsgLangKeyInSessionStorage } from '@promountsourcecode/common_module';
import { OverlayPanel } from 'primereact/overlaypanel';
import _ from 'lodash';
import { boolean, object } from 'yup';
import  {getColumns}  from '../ValidationMethod';


export const Table = prop => {
  const menuItemId = sessionStorage.getItem('menuItemId');
  const [userId, setUserId] = useState(sessionStorage.getItem('id'));
  const dt = useRef<any>();
  const dispatch = useAppDispatch();
  const [reasonFlag, setReasonFlag] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [column, setColumn] = useState<any>();
  const [filterColumn, setFilterColumn] = useState([]);
  const [exportCol, setExportCol] = useState<any>([]);
  const [filter, setfilter] = useState(prop.toggleFilter);
  const [filters, setfilters] = useState(prop.filters);
  /* pagination code */
  const [totalRecords, setTotalRecords] = useState(prop.totalRecords);
  const [lazyState, setlazyState] = useState(prop.pagination);
  const [gridId, setGridId] = useState(prop.gridId);
  const [apiGridData, setApiGridData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalExport, setModalExport] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [exportType, setExportType] = useState();
  const [selectedRecord, setSelectedRecord] = useState<any>([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [deleteHeader, setdeleteHeader] = useState(<Translate contentKey="global.deleteConfirm"></Translate>);
  const [deletemsg, setdeletemsg] = useState(<Translate contentKey="home.deleteMsg"></Translate>);
  const [ifShowHeader, setifShowHeader] = useState(false);
  const [ifHideHeader, setifHideHeader] = useState(true);
  const [language, setlanguage] = useState(sessionStorage.getItem('Language'));
  const [redioFilter, setRedioFilter] = useState('Active');
  const [redioFilterPublish, setRedioFilterPublish] = useState('');
  const [errorMessage, setErrorMessage] = useState<any>(<Translate contentKey="home.notFound" />);
  const [Searchplaceholder, setSearchPlaceholder] = useState('Keyword Search');
  const [configurableReasonOnCheck, setConfigurableReasonOnCheck] = useState<boolean>(
    prop.reasonAskOnCheck ? prop.reasonAskOnCheck : false
  );
  const [itemsAction, setitemsAction] = useState<any>([]);
  const [buttonAction, setButtonAction] = useState<any>([]);
  const [selectedItem, setSelectedItem] = useState<any>();

  const [hideActionbtn, sethideActionbtn] = useState(prop.hideActionbtn ? prop.hideActionbtn : false);
  const [rowReorder, setrowReorder] = useState(prop.rowReorder ? prop.rowReorder : false);

  const [actionId, setActionId] = useState<number>();
  const [editObject, setEditObject] = useState<any>([]);
  const [maxPageSize, setMaxPageSize] = useState(Number(sessionStorage.getItem('MaxPageSize')));
  const [defaultPageSize, setDefaultPageSize] = useState(Number(sessionStorage.getItem('DefaultPageSize')));

  useEffect(() => {
    setlazyState(lazyState);
  }, [lazyState]);
  const paginatorTemplate = {
    layout: 'RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport ',
    RowsPerPageDropdown: options => {
      const dropdownOptions = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
        { label: 100, value: 100 },
        { label: 200, value: 200 },
        { label: 500, value: 500 },
      ];

      return (
        <React.Fragment>
          <Dropdown value={options.value} scrollHeight={'270px'} options={dropdownOptions} onChange={options.onChange} />
        </React.Fragment>
      );
    },
    CurrentPageReport: options => {
      return (
        <span
          className="totalPages"
          style={{
            //color: 'var(--text-color)',
            fontSize: '14px',
            userSelect: 'none',
            marginLeft: 'auto',
            textAlign: 'center',
          }}
        >
          {options.first} - {options.last} of {options.totalRecords}
        </span>
      );
    },
  };

  const getActionBtn = (id, object) => {
    setActionId(id);
    setEditObject(object);
  };
  useEffect(() => {
    const compareJsonjs = document.createElement('script');
    compareJsonjs.src = 'https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js';
    compareJsonjs.async = true;
    document.body.appendChild(compareJsonjs);
  }, []);

  const getGridData = async () => {
    let id;
    if (language === 'en') id = 1;
    else if (language === 'hi') id = 2;
    else id = 3;
    const gridData = await axios.get(`api/grid-user-settings/${gridId}/${id}/${menuItemId}/1`);
    (await gridData.data.data.length) > 0 ? setColumn(gridData.data.data) : setColumn(prop.column);
    const pageData = {
      first: lazyState.first,
      rows: gridData.data.data.length > 0 ? parseInt(gridData.data.data[0].gridPageSize) : 10,
      page: lazyState.page,
      sortField: lazyState.sortField,
      sortOrder: lazyState.sortOrder,
    };
    setlazyState(pageData);
    setfilter(gridData.data.data.length > 0 ? gridData.data.data[0].filterEnable : false);

    await prepareRowAction(gridData.data.data);
  };

  const arrForRow = sessionStorage.getItem('RowsPerPage');
  const [perPage, setPerPage] = useState([]);
  useEffect(() => {
    let arr = arrForRow.split(',').map(Number);
    console.log('arrFor', arr);

    // for (let i = 0; i < arrForRow.length; i++) {
    //   arr.push(Number(arrForRow[i]));
    // }

    setPerPage(arr);
  }, [arrForRow]);




  useEffect(() => {
    column == undefined ? setColumn(prop.column) : '';
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

    // prop.data.length > 0 ? setErrorMessage(true) : setErrorMessage(false);
    // setitemsAction(prop.actionFlag);
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
    if (actionArr) {
      for (let i = 0; i < actionArr.length; i++) {
        if (actionArr[i]['type'] == 'Action') {
          let actinObj = actionArr[i].actionJson;
          if (actinObj) {
            for (let j = 0; j < actinObj.length; j++) {
              let item = {
                className: actinObj[j]['className'] != null && actinObj[j]['className'] != '' ? actinObj[j]['className'] : 'icon',
                label: (
                  <span style={{ color: '#1565c0' }}>
                    <Translate contentKey={actinObj[j]['label']}></Translate>
                  </span>
                ),
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

  useEffect(() => {
    setSelectedItem(prop.sendSelectedItem ? prop.sendSelectedItem : '');
    setSelectCheckboxRc(prop.sendSelectedItem);
  }, [prop.sendSelectedItem]);

  useEffect(() => {
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

    setSearchPlaceholder(String(<Translate contentKey="export"></Translate>));
  }, []);
  const [label, setLabel] = useState('Default Label');
  const toggle = e => {
    setExportType(e);
    setModalExport(!modalExport);
  };

  const edit = id => {
    prop.onEdit(id);
  };

  const items: MenuItem[] = [
    {
      label: 'CSV',
      icon: 'fa-solid fa-file-csv',
      command: () => toggle('CSV'),
    },
    {
      label: 'Excel',
      icon: 'fa-solid fa-file-excel',
      command: () => toggle('EXCEL'),
    },
    {
      label: 'PDF',
      icon: 'fa-solid fa-file-pdf',
      command: () => toggle('PDF'),
    },
    {
      label: 'Json',
      icon: 'fa-solid fa-file-arrow-down',
      command: () => exportToJson(),
    },
    { label: 'Print', icon: 'fa-solid fa-print' },
  ];

  const settingChangesExport = coulmnData => {
    setModalExport(false);
    setExportCol(coulmnData);
    const exportData = data;
    const headers = [];
    coulmnData.map(col => {
      if (col.visible) headers.push(col.field);
    });

    const newData = [];
    exportData.map(element => {
      const newObj = {};

      headers.forEach(name => {
        newObj[name] = element[name];
      });
      newData.push(newObj);
      newObj;
    });

    const newDataExcel = [];
    let headersExcel: any = [];
    coulmnData.map(col => {
      if (col.visible) headersExcel.push({ title: col.header, field: col.field });
    });

    exportData.map(element => {
      const newObj = {};
      headersExcel.forEach(name => {
        newObj[name.title] = element[name.field]
      })
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
        exportCSV(newData, headers);
        break;
      default:
        break;
    }
  };
  const exportToJson = () => {
    downloadFile({
      body: JSON.stringify(data),
      fileName: 'users.json',
      fileType: 'text/json',
    });
  };
  const downloadFile = ({ body, fileName, fileType }) => {
    const blob = new Blob([body], { type: fileType });
    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };
  const convertToCSV = objArray => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    for (let i = 0; i < array.length; i++) {
      let line = '';
      // eslint-disable-next-line guard-for-in
      for (const index in array[i]) {
        if (line !== '') line += ',';
        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  };

  const exportCSV = (newData, headers) => {
    
    const jsonObject = JSON.stringify(newData);
    const csv = convertToCSV(jsonObject);
    const exportedFilenmae = 'report' + '.csv' || 'export.csv';
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', exportedFilenmae);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const exportPdf = async (newData, headers, coulmnData) => {
    var out: any = [];
    for (var i = 0; i < coulmnData.length; i++) {
      if (coulmnData[i].field === headers[i]) {
        out.push(coulmnData[i].header);
      }
    }
    const input = document.getElementById('tablePdf');
    const unit = 'pt';
    const size = 'A4';
    const orientation = 'portrait';
    const doc = new jsPDF(orientation, unit, size);
    
    doc.addFont("/content/fonts/ARIALUNI.TTF", "aakar", "normal");
    doc.setFont("aakar");
    const title = prop.title.concat(' Report');
    var data = newData.map(obj => headers.map(header => obj[header]));
    const content = {
      startY: 50,
      head: [out],
      body: data,
      styles: {
        font: 'aakar',
      },
    };
    doc.text(title, 40, 40);
    autoTable(doc, content);
    doc.save(prop.title.concat(' Report.pdf'));
  };

  const exportExcel = (newData) => {
    import('xlsx').then(xlsx => {
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
    import('file-saver').then(module => {
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

  const onReset = async () => {
    let id;
    setModal(false);
    if (language === 'en') id = 1;
    else if (language === 'hi') id = 2;
    else id = 3;
    var gridData = await axios.get(`api/grid-user-settings/${gridId}/${id}/${menuItemId}/1`);
    dispatch(
      getColumns({
        gridId: gridId,
        id: id,
        menuItemId: menuItemId,
      })
    ).then(async (res: any) => {
      setColumn(res.payload.data.data);
      // setColumn(gridData.data.data)
      const pageData = {
        first: lazyState.first,
        rows: await parseInt(res.payload.data.data[0].gridPageSize),
        page: lazyState.page,
        sortField: lazyState.sortField,
        sortOrder: lazyState.sortOrder,
      };
      setlazyState(pageData);
      setfilter(res.payload.data.data[0].filterEnable);
      await prepareRowAction(res.payload.data.data);
      await prop.onPageChange(pageData);
      setData(prop.data);
      closeSettingModal();
    });
  };

  const closeSettingModal = async () => {
    let id;
    if (language === 'en') id = 1;
    else if (language === 'hi') id = 2;
    else id = 3;

    const gridData = await axios.get(`api/grid-user-settings/${gridId}/${id}/${menuItemId}/1`);
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
  };

  const [reasonIdDelete, setReasonIdDelete] = useState<any>();
  const deleteConfirmOnAction = async (id: number, flag: boolean, record: any) => {
    setMsgLangKeyInSessionStorage(prop.msgLangKey);
    const idObj = {};
    idObj['id'] = id;
    setReasonIdDelete(idObj);
    confirmDialog({
      message: deletemsg,
      header: deleteHeader,
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      rejectClassName: 'p-button-success',
      acceptLabel: labelbtnFlag.yes ? labelbtnFlag.yes : 'Yes',
      rejectLabel: labelbtnFlag.no ? labelbtnFlag.no : 'No',
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
  const redioFilterPublishSelection = name => {
    setRedioFilterPublish(name);
    sessionStorage.setItem('FilterPublish', name);
    prop.onPublishFilterChanges(name, prop.gridId);
  };

  const htmlString = '<p>This is a <strong>bold</strong> text.</p>';

  let arr = [];

  const setRecordForChecked = event => {
    if (event.checked) {
      arr.push(event.value);
    } else {
      let tmparr = [];
      for (let i = 0; i < arr.length; i++) {
        if (!_.isEqual(event.value, arr[i])) {
          tmparr.push(arr[i]);
        }
      }
      arr = tmparr;
    }

    setSelectedRecord(arr);
  };

  const [selectCheckboxRc, setSelectCheckboxRc] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const defaultChecked = (fieldName, data1) => {


    let flag: any;
    flag = data1[fieldName] ? typeof data1[fieldName] : undefined;
    if (flag != undefined) {
      if (flag == 'boolean') {
        return data1[fieldName];
      } else if (flag == 'string' || flag == 'number') {
        let returnValue: boolean;
        if (flag == 'number') {
          // returnValue = parseFloat(data1[fieldName]);
        }
        if (flag == 'string') {
          returnValue = data1[fieldName] == 'Yes' ? true : false;
        }
        return returnValue;
      }
      return data1[fieldName];
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

  const radioSelectRecord = (record, fieldName) => {
    prop.radioEvent(record, fieldName);
  };

  const filterColumnGlobal = () => {
    const globalFilterData = [];
    if (column) {
      column.forEach(element => {
        if (element.visible) globalFilterData.push(element.field);
      });
    }
    return globalFilterData;
  };

  const onSelectCheckBox = (e, obj, fieldName) => {
    let selectedItemsArray: any = selectCheckboxRc != undefined ? [...selectCheckboxRc] : [];
    const checked = e.checked;

    if (obj[fieldName] != undefined) {
      obj[fieldName] == e.checked;
      if (e.checked) {
        if (selectedItemsArray.length == 0) {
          selectedItemsArray.push(obj);
        } else {
          selectedItemsArray.push(obj);
          // for (let i = 0; i < selectedItemsArray.length; i++) {
          //   if (obj.id != selectedItemsArray[i].id || selectedItemsArray.legth == 0) {
          //   }
          // }
        }
      } else {
        selectedItemsArray.splice(selectedItemsArray.indexOf(obj), 1);
      }
    } else {
      checked == true ? selectedItemsArray.push(obj) : selectedItemsArray.splice(selectedItemsArray.indexOf(obj), 1);
    }
    setSelectCheckboxRc(selectedItemsArray);
    setReasonIdDelete(obj);
    prop.selectCheckbox(checked, obj, selectedItemsArray, fieldName);
  };

  const exportClose = () => {
    setModalExport(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        {
          <div className="d-flex globlFilter">
            {filter && (
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={e => onGlobalFilterChange(e)} />
              </span>
            )}
          </div>
        }
        <div className="d-flex flex-wrap">
          {ifShowHeader && (
            <Button onClick={() => edit('')} className="btn btn-primary btnStyle" data-cy="entityCreateButton">
              <FontAwesomeIcon icon="plus" />
              Add
            </Button>
          )}
          {prop.statusFilter === true && (
            <span className="d-flex justify-content-center m-r-15 statusFilter">
              <span style={{ marginLeft: '10px' }} className="d-flex align-items-center">
                <RadioButton
                  inputId={gridId + 'gridActive'}
                  name="filter"
                  value="Active"
                  onChange={e => redioFilterSelection(e.value)}
                  checked={redioFilter === 'Active'}
                />
                <label htmlFor={gridId + 'gridActive'} style={{ marginBottom: 0 }}>
                  {labelbtnFlag.activeradio ? labelbtnFlag.activeradio : 'Active'}
                </label>
              </span>
              <span style={{ marginLeft: '10px' }} className="d-flex align-items-center">
                <RadioButton
                  inputId={gridId + 'gridInactive'}
                  name="filter"
                  value="Inactive"
                  onChange={e => redioFilterSelection(e.value)}
                  checked={redioFilter === 'Inactive'}
                />
                <label htmlFor={gridId + 'gridInactive'} style={{ marginBottom: 0 }}>
                  {labelbtnFlag.inactiveradio ? labelbtnFlag.inactiveradio : 'Inactive'}
                </label>
              </span>
              <span style={{ marginLeft: '10px' }} className="d-flex align-items-center">
                <RadioButton
                  inputId={gridId + 'All'}
                  name="filter"
                  value="All"
                  onChange={e => redioFilterSelection(e.value)}
                  checked={redioFilter === 'All'}
                />
                <label htmlFor={gridId + 'All'} style={{ marginBottom: 0 }}>
                  {labelbtnFlag.allradio ? labelbtnFlag.allradio : 'All'}
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
            tooltip="Setting"
            tooltipOptions={{ position: 'top' }}
          >
            <FontAwesomeIcon icon="cogs" />
          </Button>
          {/* <SplitButton
            tooltip="Export"
            tooltipOptions={{ position: 'top' }}
            label={labelbtnFlag.export ? labelbtnFlag.export : 'Export'}
            className="tableExportMenu"
            model={items}
          /> */}

          {/* <div className="input-group"> */}
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ border: 'none', background: 'white', boxShadow: 'none', color: '#1565c0' }}
          >
            {labelbtnFlag.export ? labelbtnFlag.export : 'Export'}
          </button>
          <ul className="dropdown-menu" style={{}}>
            {/* <li> <a className="dropdown-item" onClick={() => toggle('CSV')}><i className="fa-solid fa-file-csv" style={{color:'#1d7dc8'}}></i> CSV</a></li> */}
            <li>
              {' '}
              <a className="dropdown-item" onClick={() => toggle('EXCEL')}>
                <i className="fa-solid fa-file-excel" style={{ color: '#1c6c42' }}></i> Excel
              </a>
            </li>
            <li>
              {' '}
              <a  className="dropdown-item" onClick={() => toggle('PDF')}>
                <i className="fa-solid fa-file-pdf" style={{ color: '#f72015' }}></i> PDF
              </a>
            </li>
            {/* <li> <a className="dropdown-item" onClick={() => exportToJson()}><i className="fa-solid fa-file-arrow-down" style={{color:'#53d1e5'}}></i>  Json</a></li> */}
            {/* <li> <a className="dropdown-item" ><i className="fa-solid fa-print" style={{color:'#f08080'}}></i>  Print</a></li> */}
          </ul>
          {/* </div> */}
        </div>
      </div>

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
        />
      )}

      {modalExport && <ExportSetting show={modalExport} columns={column} onSetting={settingChangesExport} onClose={exportClose} />}

      <div className="dataTable" id="tablePdf">
        <>
          <>
            <DataTable
              ref={dt}
              emptyMessage={errorMessage}
              sortMode="multiple"
              value={data}
              globalFilterFields={filterColumnGlobal()}
              filters={filters}
              // header={header}
              filterDisplay={filter ? 'row' : 'menu'}
              scrollable
              scrollHeight="400px"
              id={gridId}
              selectionMode="single"
              selection={selectedItem}
              onSelectionChange={e => {
                setSelectedItem(e.value);
                prop.onSelect ? prop.onSelect(e.value) : {};
              }}
              responsiveLayout="scroll"
              onRowReorder={(e: any): void => prop.onAddReorderRow(e.value, gridId)}
              reorderableRows
              removableSort
              paginator
              rows={defaultPageSize}
              rowsPerPageOptions={perPage}
            >
              {rowReorder && <Column rowReorder style={{ minWidth: '3rem' }} />}
              {column &&
                column.map((e: any, i: any) => {
                  if (e.visible) {
                    if (e.type === 'Radio') {
                      return (
                        <Column
                          header={e.header}
                          body={data2 => (
                            <>
                              <RadioButton
                                inputId={data2}
                                name={data2.id}
                                value={e.field}
                                onChange={x => radioSelectRecord(data2, e.field)}
                                checked={data2[e.field] === true}
                              />
                            </>
                          )}
                        />
                      );
                    }

                    if (e.type === 'CheckBox') {
                      return (
                        <Column
                          header={e.header}
                          body={data2 => (
                            <>
                              <Checkbox
                                key={Math.random()}
                                name={data2.id}
                                value={e.field}
                                onChange={x => {
                                  onSelectCheckBox(x, data2, e.field);
                                }}
                                // checked={defaultChecked(e.field, data2)}
                                checked={data2[e.field] === true}
                              />
                            </>
                          )}
                        />
                      );
                    }

                    if (e.type === 'Action') {
                      return (
                        <Column
                          style={{ width: '100px' }}
                          header={e.header}
                          body={data2 => (
                            <>
                              <SplitButton
                                icon="fa-solid fa-ellipsis"
                                className="tableActionMenu"
                                // style={{ color:'red' }}
                                model={itemsAction}
                                onFocus={() => getActionBtn(data2.id, data2)}
                              />
                            </>
                          )}
                        />
                      );

                      //  <Column header="Field Name" body={rowData => <span>Hello</span>} />;
                    }
                    if (e.type === 'Button') {
                      return (
                        <Column
                          header="Action"
                          body={data2 => (
                            <>
                              {buttonAction.length > 0 &&
                                buttonAction.map(button => (
                                  <>
                                    {button.visible == true && (
                                      <Button
                                        style={{ marginLeft: '15px' }}
                                        // tooltip={button.label}
                                        tooltipOptions={{ position: 'top' }}
                                        className={button.className + ' gridIcon'}
                                        onClick={() =>
                                          button['id'] == 'Delete'
                                            ? deleteConfirmOnAction(data2.id, button['askReason'], data2)
                                            : eval(prop[buttonAction[0].command](data2.id, gridId, true, editObject))
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
                    return <Column key={i} columnKey={e.field} field={e.field} header={e.header} style={{ width: e.width }} sortable />;
                  }
                })}
            </DataTable>
            {/* <Paginator
              template={paginatorTemplate}
              rows={lazyState.rows}
              first={lazyState.first}
              onPageChange={e => {
                setlazyState(e);
                prop.onPageChange(e);
              }}
              pageLinkSize={3}
              totalRecords={totalRecords}
              className="justify-content-end"
            /> */}
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
  );
};


export default Table;
