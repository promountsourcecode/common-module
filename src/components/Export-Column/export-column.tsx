import React, { Component } from "react";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { Translate } from "@promountsourcecode/common_module";

interface ModalInputProps {
  show: boolean;
  onSetting: any;
  columns: any;
  onClose: any;
}
class ExportSetting extends Component<ModalInputProps> {
  state = {
    visible: this.props.show,
    columns: this.props.columns,
    prop: this.props,
  };
  originalColumns;
  constructor(props) {
    super(props);
    const columnsCopy = this.props.columns.map((col) => ({ ...col }));
    this.state = {
      visible: this.props.show,
      columns: columnsCopy,
      prop: this.props,
    };

    columnsCopy.forEach((col) => {
      col.visible = true;
    });
    this.originalColumns = [...this.props.columns];
  }
  toggle = (e) => {
    e.preventDefault();
    this.setState({ visible: !this.state.visible });
  };

  checkboxChange = (event, index) => {
    const data: any = this.state.columns;
    data[index].visible = event.checked;
    this.setState({ columns: data });
  };

  handleChange() {
    this.props.onSetting(this.state.columns);
    this.props.onClose();
  }
  handleCancel() {
    this.setState({
      visible: false,
      colums: this.props.columns,
    });
    this.props.onClose();
  }
  resetSettings() {
    this.setState({
      columns: this.state.columns.map((e) => (e.visible = true)),
    });
  }

  render() {
    const onRowReorder = (e) => {
      this.setState({ columns: e.value });
    };
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
          else event.preventDefault();
          break;
      }
    };
    const footerContent = (
      <div>
        <Button
          label="Export"
          icon="pi pi-check"
          onClick={() => this.handleChange()}
          autoFocus
        />
        {/* <Button label="Reset" onClick={() => this.resetSettings()} />
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => {
            this.handleCancel();
          }}
          className="p-button-text"
        /> */}
      </div>
    );

    return (
      <Dialog
        header={<Translate contentKey="exports.title"></Translate>}
        footer={footerContent}
        className="exportModal"
        maximizable
        visible={this.state.visible}
        style={{ width: "50vw" }}
        onHide={() => {
          this.props.onClose();
        }}
      >
        <div className="modal-content">
          <DataTable
            // reorderableRows
            dataKey="id"
            value={this.state.columns}
            // onRowReorder={onRowReorder}
            responsiveLayout="scroll"
            rows={this.state.columns.length}
          >
            {/* <Column header="ID" body={props => <div>{props.rowIndex}</div>}></Column> */}
            <Column
              field="header"
              header={<Translate contentKey="setting.grid.colomn"></Translate>}
              editor={(options) => cellEditor(options)}
              onCellEditComplete={onCellEditComplete}
            />
            <Column
              header={<Translate contentKey="setting.grid.display"></Translate>}
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
        <div className="p-dialog-footer">
          <Button
            className="btnStyle btn btn-success"
            onClick={() => this.handleChange()}
            autoFocus
          >
            <FontAwesomeIcon icon={faCheck} />{" "}
            <Translate contentKey="exports.title"></Translate>
          </Button>
        </div>
        {/* <Button label="Export" icon="pi pi-check" onClick={() => this.handleChange()} autoFocus /> */}
      </Dialog>
    );
  }
}
export default ExportSetting;
