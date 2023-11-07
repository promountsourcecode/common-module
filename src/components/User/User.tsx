import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { Button } from "primereact/button";
import { getSortState } from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { overridePaginationStateWithQueryParams } from "app/shared/util/entity-utils";
import { useAppDispatch, useAppSelector } from "app/config/store";

import { getEntities, deleteEntity, reset } from "./user-master.reducer";
// import UserMasterUpdate from "./user-master-update";

import { Table } from "@Himanshu0510/shared";
import { FilterMatchMode } from "primereact/api";
import { Toast } from "primereact/toast";
import { Translate } from "@Himanshu0510/shared";

const User = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useRef(null);
  const [filter, setFilter] = useState(true);

  const columns = [
    { field: "userName", header: "User Name", visible: true },
    { field: "firstName", header: "First Name", visible: true },
    { field: "lastName", header: "Last Name", visible: true },
  ];
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    userName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const [selectColumns, setSelectColumns] = useState(columns);
  const [userGrid, setUserGridId] = useState("userMasterGrid");
  const userMasterList = useAppSelector(
    (state: any) => state.userMaster.entities
  );
  const loading = useAppSelector((state: any) => state.userMaster.loading);
  const [visibleUserModal, setVisibleUserModal] = useState<boolean>(false);
  const [isUserEdit, setUserEdit] = useState(false);
  const [editUserData, setEditUserData] = useState<number>(null);
  const updateSuccess = useAppSelector(
    (state: any) => state.userMaster.updateSuccess
  );
  const [userGridStatus, setUserGridStatus] = useState<any>(true);
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(
      getSortState(location, 10, "id"),
      location.search
    )
  );

  const openUserCreateModel = (index: any) => {
    setVisibleUserModal(true);
  };

  const openUserEditModel = (index: any) => {
    setVisibleUserModal(!visibleUserModal);
    setUserEdit(true);
    setEditUserData(index);
  };

  const onUserCreateclose = () => {
    setVisibleUserModal(!visibleUserModal);
    setUserEdit(false);
    setEditUserData(null);
    getAllUserEntities();
  };

  const confirmUserDelete = (index: any) => {
    // setMsgLangKeyInSessionStorage("usermaster.title");
    dispatch(deleteEntity(index));
    if (index) {
      resetAll();
    }
  };

  const resetAll = () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    getAllUserEntities();
  };

  const [action, setAction] = useState([
    {
      className: "icon-info",
      label: "Edit",
      icon: "fa-solid fa-edit",
      command: "edit",
    },
    {
      className: "icon-danger",
      label: "Delete",
      icon: "fa-solid fa-trash",
      command: "deleteConfirm",
    },
  ]);

  const sortUserEntities = () => {
    getAllUserEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (location.search !== endURL) {
      navigate(`${location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortUserEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  const getAllUserEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
        status: userGridStatus,
      })
    );
  };

  const handleUserFilterChanges = (name: any, gridId: any) => {
    if (name === "Active") setUserGridStatus(true);
    else if (name === "Inactive") setUserGridStatus(false);
    else setUserGridStatus("");
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
        status: name === "All" ? "" : name === "Active" ? true : false,
      })
    );
  };

  //   useEffect(() => {
  //     screenConfigration(34);
  //   }, []);

  return (
    <div>
      <div className="page-header">
        <div className="d-flex justify-content-between">
          <h4>
            {" "}
            <Translate contentKey="usermaster.title">User</Translate>
          </h4>
        </div>
      </div>
      <div className="content">
        <Row className="justify-content-center">
          <Col xl={12} md={12} sm={12} xs={12}>
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="card-title">
                  {" "}
                  <Translate contentKey="usermaster.gridTitle">
                    User List
                  </Translate>
                </h6>
                <Button
                  onClick={() => openUserCreateModel("")}
                  className="btn btn-primary  btnStyle"
                  id="jh-create-entity"
                  data-cy="entityCreateButton"
                >
                  <FontAwesomeIcon icon="plus" />
                  <Translate contentKey="home.add">Add</Translate>
                </Button>
              </div>
              <div className="card-body">
                <div className="tableWrap">
                  <Table
                    column={selectColumns}
                    data={userMasterList}
                    filters={filters}
                    filter={true}
                    toggleFilter={filter}
                    onEdit={openUserEditModel}
                    onDelete={confirmUserDelete}
                    actionFlag={action}
                    statusFilter={true}
                    gridId={userGrid}
                    onFilterChanges={handleUserFilterChanges}
                    title="User"
                    reasonAsk={true}
                  ></Table>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* {visibleUserModal ? (
        <UserMasterUpdate
          onClose={onUserCreateclose}
          onChange={onUserCreateclose}
          onShow={visibleUserModal}
          editFlag={editUserData}
          editIndex={editUserData}
        />
      ) : (
        ""
      )} */}
      <Toast ref={toast} />
    </div>
  );
};

export default User;
