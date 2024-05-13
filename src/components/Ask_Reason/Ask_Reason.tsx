import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import Translate from "../Translate";
import axios from "axios";
import { InputTextarea } from "primereact/inputtextarea";
import { getControlValidationObj } from "@promountsourcecode/common_module";
export const AskReason = (prop) => {
  const [dataForm, setData] = useState(prop.data);
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(prop.visible);
  const [action, setAction] = useState(prop.action);
  const closeModal = () => {
    setVisible(false);
    prop.onClose();
  };

  const defaultValues = {
    ...dataForm,
    reasonForChange: "",
  };
  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error"></small>
    );
  };

  const onSubmit = (data) => {
    if (prop.passwordFlag) {
      if (true) {
        data.reasonForChange = data.reasonForChange;
        const entity = {
          ...data,
          reasonForChange: data.reasonForChange,
        };

        prop.saveWithReason(entity, prop.deleteObject);
        prop.onClose();
      } else {
      }
    } else {
      data.reasonForChange = data.reasonForChange;
      const entity = {
        ...data,
        reasonForChange: data.reasonForChange,
      };

      prop.saveWithReason(entity, prop.deleteObject);
      prop.onClose();
    }
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({ defaultValues });
  return (
    <>
      <Dialog
        header={<Translate contentKey="reasonForConfirmation"></Translate>}
        id={prop.id}
        visible={visible}
        onHide={closeModal}
        style={{ width: "30vw" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className="modal-content"
            style={{ overflow: "auto !important" }}
          >
            <div className="form-group">
              <Controller
                name="reasonForChange"
                control={control}
                rules={getControlValidationObj("reason")}
                render={({ field, fieldState }) => (
                  <>
                    {/* <div className="col-lg-4 col-md-4"> */}
                    <label className="form-label">
                      <Translate contentKey="reason"></Translate>
                    </label>
                    {/* </div> */}
                    {/* <div className="col-lg-8 col-md-8"> */}
                    <InputTextarea
                      id={field.name}
                      value={field.value}
                      className={classNames("form-control", {
                        "p-invalid": fieldState.error,
                      })}
                      onChange={(e) => field.onChange(e.target.value)}
                      rows={3}
                      cols={30}
                    />
                    {/* </div> */}

                    {/* <InputText
                      id={field.name}
                      value={field.value}
                      className={classNames({ 'p-invalid': fieldState.error })}
                      onChange={e => field.onChange(e.target.value)}
                    /> */}
                    {getFormErrorMessage(field.name)}
                  </>
                )}
              />
            </div>
            {prop.passwordFlag && (
              <div className="row form-group">
                <Controller
                  name="password"
                  control={control}
                  rules={getControlValidationObj("password.global")}
                  render={({ field, fieldState }) => (
                    <>
                      {/* <div className="col-lg-4 col-md-4"> */}
                      <label className="form-label">
                        <Translate contentKey="password.global"></Translate>
                      </label>

                      {/* </div> */}
                      {/* <div className="col-lg-8 col-md-8"> */}
                      <InputText
                        id={field.name}
                        value={field.value}
                        className={classNames("form-control", {
                          "p-invalid": fieldState.error,
                        })}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      {/* </div> */}
                      {/* <InputText
                      id={field.name}
                      value={field.value}
                      className={classNames({ 'p-invalid': fieldState.error })}
                      onChange={e => field.onChange(e.target.value)}
                    /> */}
                      {getFormErrorMessage(field.name)}
                    </>
                  )}
                />
              </div>
            )}
          </div>
          <div className="p-dialog-footer ">
            <Button
              id="askReason"
              type="submit"
              className={
                action == "delete"
                  ? "btn btn-danger btnStyle"
                  : "btn btn-success btnStyle"
              }
            >
              {action == "delete" ? (
                <FontAwesomeIcon icon="times" />
              ) : (
                <FontAwesomeIcon icon="save" />
              )}
              {action == "delete" ? (
                <Translate contentKey="delete"></Translate>
              ) : (
                <Translate contentKey="home.save"></Translate>
              )}
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default AskReason;
