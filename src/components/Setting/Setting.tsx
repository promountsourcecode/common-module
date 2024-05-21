import React, { useState, Component, useEffect } from "react";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { Translate } from "@promountsourcecode/common_module";
import { toast } from "react-toastify";
import { CORE_BASE_URL } from "../constants/apiConstant";

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
  dropdownOptions: any;
  isColumnfilters: any;
}

class Setting extends Component<ModalInputProps> {
  tableColumns: any;

  state = {
    visible: this.props.show,
    columns: this.props.columns,
    filter: this.props?.columns[0]?.filterEnable,
    gridData: this.props.gridData,
    prop: this.props,
    pageSize: this.props.dropdownOptions,
    columnfilters: this.props.isColumnfilters,
    // pageSize: [
    //   { size: '5' },
    //   { size: '10' },
    //   { size: '20' },
    //   { size: '50' },
    //   { size: '100' },
    //   { size: '200' },
    //   { size: '500' },
    //   { size: '1000' },
    //   { size: '2000' },
    //   { size: '5000' },
    // ],
    language: sessionStorage.getItem("Language"),
    selectedPageSize: Number(this.props?.columns[0]?.gridPageSize),
  };

  constructor(props) {
    super(props);
    try {
      if (this.state.gridData.length === 0) {
        this.tableColumns = this.state.columns;
      } else {
        this.tableColumns = this.state.gridData;
      }
    } catch (error) {
      toast.error(error.toString());
    }

    //  const [language, setlanguage] = useState(sessionStorage.getItem('Language'));
  }

  // async getcolumns() {
  //   let data: any = [];

  //   this.props.columns.forEach(column => {
  //     column['gridPageSize'] = Number( this.state.selectedPageSize.size);
  //     column['filterEnable'] = this.state.filter;
  //   });

  //   const entity = {
  //     gridId: this.state.prop.gridId,
  //     gridSettingDetailText: JSON.stringify(this.props.columns),
  //     menuItemId: sessionStorage.getItem('menuItemId'),
  //     userMasterId: 1,
  //     hierarchyLevelId: 352,
  //     languageId: 1,
  //   };

  //   data = await axios.put(CORE_BASE_URL + 'api/grid-user-settings/saveUpdateData', entity);

  //   try {
  //     const dataJson = JSON.parse(data.data.gridSettingDetailText);
  //     this.tableColumns = dataJson;
  //   } catch (error) {
  //     toast.error(error.toString);
  //   }
  // }

  componentDidMount() {
    // this.getcolumns();
  }

  toggle = (e) => {
    e.preventDefault();
    this.setState({ visible: !this.state.visible });
  };

  //const coldata: any = [];
  async setSelectedPageSize(e) {
    this.setState({
      selectedPageSize: e,
    });
    //this.coldata = e;
  }

  checkboxChange = (event, index) => {
    const data: any = this.tableColumns;
    data[index].visible = event.checked;
    this.setState({ columns: data });
  };

  async handleChange() {
    await this.getTabelHeaderData();
    await this.props.onSetting(
      this.tableColumns,
      this.state.filter,
      this.state.selectedPageSize,
      this.state.columnfilters
    );
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

    // this.props.onReset();
  }

  async resetFromServer() {
    let id;

    try {
      if (this.state.language === "en") id = 1;
      else if (this.state.language === "hi") id = 2;
      else id = 3;
      const reset = await axios
        .delete(
          `${CORE_BASE_URL}api/grid-user-settings/deleteByUserIdAndHierarchyIdAndGridIdAndMenuItemId?userMasterId=${1}&languageId=${id}&gridId=${
            this.state.prop.gridId
          }&menuItemId=${sessionStorage.getItem("menuItemId")}`
        )
        .then((res: any) => {
          this.setState({
            visible: false,
            colums: this.props.columns,
          });
          this.props.onClose();
        });
    } catch (error) {
      toast.error(error.toString());
    }
  }
  footerContent = () => {
    return (
      <div>
        <Button
          label="Apply"
          icon="pi pi-check"
          onClick={() => this.handleChange()}
          autoFocus
        />
        <Button label="Reset" onClick={() => this.resetSettings()} />
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => {
            this.handleCancel();
          }}
          className="p-button-text"
        />
      </div>
    );
  };

  async getTabelHeaderData() {
    let data1: any = [];
    let id;
    if (this.state.language === "en") id = 1;
    else if (this.state.language === "hi") id = 2;
    else id = 3;
    this.props.columns.forEach((column) => {
      column["gridPageSize"] = this.state.selectedPageSize;
      column["filterEnable"] = this.state.filter;
      column["columnsFilterEnable"] = this.state.columnfilters;
    });

    const entity = {
      gridId: String(this.props.gridId),
      gridSettingDetailText: JSON.stringify(this.state.columns),
      menuItemId: sessionStorage.getItem("menuItemId"),
      userMasterId: 1,
      hierarchyLevelId: 1,
      languageId: id,
    };

    data1 = await axios.put(
      "services/coreweb/api/grid-user-settings/saveUpdateData",
      entity,
      {
        headers: { menuItemId: this.props.gridId },
      }
    );
    const dataJson = JSON.parse(data1.data.gridSettingDetailText);
  }
  render() {
    const cellEditor = (options) => {
      return textEditor(options);
    };
    const textEditor = (options) => {
      return (
        <InputText
          type="text"
          value={options.value}
          onChange={(e) => options.editorCallback(e.target.value)}
        />
      );
    };
    const onCellEditComplete = (e) => {
      const { rowData, newValue, field, originalEvent: event } = e;

      switch (field) {
        case "quantity":
        default:
          if (newValue.trim().length > 0) rowData[field] = newValue;
          //else event.preventDefault();
          else rowData[field] = "";
          break;
      }
    };
    const rowReorder = (e) => {
      // this.tableColumns = null;
      // this.tableColumns = e.value;
      if (this.state.gridData.length === 0) {
        this.setState({ columns: e.value });
        this.tableColumns = this.state.columns;
      } else {
        this.setState({ gridData: e.value });
        this.tableColumns = this.state.gridData;
      }
    };

    return (
      <Dialog
        header={<Translate contentKey="setting.label"></Translate>}
        className="settingModal"
        //footer={this.footerContent}
        visible={this.state.visible}
        style={{ width: "80vw" }}
        onHide={() => {
          this.handleCancel();
        }}
        draggable={false}
        resizable={false}
        maximizable
      >
        <div>
          <div className="modal-content">
            <div className="row">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-xs-12 d-flex">
                {/* <h4> */}
                <div className="d-flex justify-content-left align-items-left m-r-20">
                  <label className="form-label">
                    <Translate contentKey="setting.filters"></Translate>{" "}
                  </label>
                  <Checkbox
                    style={{ marginLeft: "10px" }}
                    onChange={(event) =>
                      this.setState({ filter: !this.state.filter })
                    }
                    checked={this.state.filter}
                  ></Checkbox>
                </div>
                <div className="d-flex justify-content-left align-items-left">
                  <label className="form-label">
                    <Translate contentKey="setting.columnFilter"></Translate>{" "}
                  </label>
                  <Checkbox
                    style={{ marginLeft: "10px" }}
                    onChange={(event) =>
                      this.setState({
                        columnfilters: !this.state.columnfilters,
                      })
                    }
                    checked={this.state.columnfilters}
                  ></Checkbox>
                </div>{" "}
                {/* </h4> */}
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-xs-12 ">
                <div className="d-flex justify-content-end align-items-center">
                  <label className="form-label" style={{ marginRight: "10px" }}>
                    <Translate contentKey="setting.pageSize"></Translate>
                  </label>
                  <Dropdown
                    value={this.state.selectedPageSize}
                    onChange={(e) => this.setSelectedPageSize(e.value)}
                    options={this.state.pageSize}
                    placeholder="Select a Page Size"
                  />
                </div>
              </div>
            </div>
            <div className="tableWrap" style={{ marginTop: "10px" }}>
              <DataTable
                value={this.tableColumns}
                reorderableRows
                onRowReorder={(e) => rowReorder(e)}
                responsiveLayout="scroll"
                rows={this.tableColumns.length}
                scrollable
              >
                {/* <Column header="ID" body={props => <div>{props.rowIndex}</div>}></Column> */}
                <Column rowReorder style={{ width: "3rem" }} />
                <Column
                  field="header"
                  header={
                    <Translate contentKey="setting.grid.colomn"></Translate>
                  }
                  editor={(options) => cellEditor(options)}
                  onCellEditComplete={onCellEditComplete}
                />
                <Column
                  field="width"
                  header={
                    <Translate contentKey="setting.grid.width"></Translate>
                  }
                  editor={(options) => cellEditor(options)}
                  onCellEditComplete={onCellEditComplete}
                />
                <Column
                  header={
                    <Translate contentKey="setting.grid.display"></Translate>
                  }
                  body={(data, props) => (
                    <div>
                      <Checkbox
                        onChange={(event) =>
                          this.checkboxChange(event, props.rowIndex)
                        }
                        checked={data.visible}
                      ></Checkbox>
                    </div>
                  )}
                ></Column>
                {/* {dynamicColumns} */}
              </DataTable>
            </div>
          </div>
          <div className="p-dialog-footer">
            <Button
              className="btnStyle btn btn-success"
              onClick={() => this.handleChange()}
              autoFocus
            >
              <FontAwesomeIcon icon={faCheck} />{" "}
              <Translate contentKey="home.apply"></Translate>
            </Button>
            <Button
              className="btnStyle btn btn-info"
              onClick={() => this.resetSettings()}
            >
              <FontAwesomeIcon icon={faRepeat} />{" "}
              <Translate contentKey="home.reset"></Translate>
            </Button>

            <Button
              className="btnStyle btn btn-danger"
              onClick={() => this.handleCancel()}
            >
              <FontAwesomeIcon icon="times" />
              <Translate contentKey="home.close"></Translate>
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}
export default Setting;
