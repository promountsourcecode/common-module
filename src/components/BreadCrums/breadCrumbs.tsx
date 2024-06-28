import { BreadCrumb } from "primereact/breadcrumb";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
const BreadCrumbs = (props: any) => {

  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);


  const languageDataLocal = sessionStorage.getItem("Language");
  let menu: any = JSON.parse(
    sessionStorage.getItem("currentMenu" ? "currentMenu" : "")
  );
  let menuItem: any = JSON.parse(
    sessionStorage.getItem("currentMenuItem" ? "currentMenuItem" : "")
  );
  let items: any;
  let languageData;
  if (sessionStorage.getItem("LanguageData") != null) {
    languageData = JSON.parse(sessionStorage.getItem("LanguageData"));
  }
  try {
    if (languageData != null && menu != null && menuItem != null) {
      items = [
        {
          label: menu
            ? languageData?.menuLanguageData?.[languageDataLocal]?.[
            menu.keyName
            ]["text"]
            : "",
        },
        {
          label: menuItem
            ? languageData?.menuItemLanguageData?.[languageDataLocal]?.[
            menuItem.keyName
            ]["text"]
            : "",
        },
      ];
    }
  } catch (error) {
    toast.error(error.toString());
  }
  const home = { icon: "fa-solid fa-home", url: "" };
  const [showbreadCrums, setBreadcrums] = useState<boolean>(true);

  return (
    <>
      {showbreadCrums ? (
        <Helmet>
          <title>
            {menuItem
              ? languageData?.menuItemLanguageData?.[languageDataLocal]?.[
              menuItem.keyName
              ]?.["text"]
              : "Dashboard"}{" "}
            | Quality Management System
          </title>
        </Helmet>
      ) : (
        <Helmet>
          <title>Quality Management System</title>
        </Helmet>
      )}
      {showbreadCrums && menuItem?.subMenuName != "Dashboard" ? (
        <div className="page-header d-flex justify-content-between">
          {id != 'profile' && (
            <div>
              <h4 className="pageTitle">
                <i className={menu?.menuIcon}></i>
                {menuItem
                  ? languageData?.menuItemLanguageData?.[languageDataLocal]?.[
                  menuItem.keyName
                  ]["text"]
                  : "Dashboard"}
              </h4>
            </div>
          )}
          {id == 'profile' && (
            <div>
              <h4 className="pageTitle">
                <i className='fas fa-user'></i>
                Profile
              </h4>
            </div>
          )}
          <div>
            <h4>
              {id != 'profile' && (
                <BreadCrumb
                  className="breadCrumb-header float-right"
                  model={items}
                  home={home}
                />
              )}
            </h4>
          </div>
        </div>
      ) : (
        <>
          <div className="page-header d-flex justify-content-between">
            <div>
              <h4 className="pageTitle">
                <i className={home?.icon}></i>
                {menuItem
                  ? languageData?.menuItemLanguageData?.[languageDataLocal]?.[
                  menuItem.keyName
                  ]["text"]
                  : "Dashboard"}
              </h4>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BreadCrumbs;
