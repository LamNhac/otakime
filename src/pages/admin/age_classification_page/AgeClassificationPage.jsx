import React, { useState } from "react";
import AgeClassificationContext from "./AgeClassificationContext";

import {
  getAllDocuments,
  getDocument,
} from "../../../services/firebaseService";
import {
  AgeClassificationTable,
  FilterAgeClassification,
  ModalAddAgeClassification,
  ModalEditAgeClassification,
} from "./components";
import { useEffect } from "react";
export default function AgeClassificationPage() {
  const [data, setData] = useState(null);
  const [dataFilter, setDataFilter] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);

  const [filter, setFilter] = useState(null);

  const [isLoadingTable, setIsLoadingTable] = useState(false);

  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);

  const loadDataTable = () => {
    setIsLoadingTable(true);
    getAllDocuments("age-classification")
      .then((data) => {
        setData(data);
        setDataFilter(data);
      })
      .finally(() => setIsLoadingTable(false));
  };

  useEffect(() => {
    loadDataTable();
  }, []);
  const state = {
    data,
    setData,
    dataFilter,
    setDataFilter,
    dataEdit,
    setDataEdit,
    filter,
    setFilter,
    isLoadingTable,
    isShowModalAdd,
    setIsShowModalAdd,
    isShowModalEdit,
    setIsShowModalEdit,
    loadDataTable,
  };
  return (
    <div>
      <AgeClassificationContext.Provider value={state}>
        <FilterAgeClassification />
        <AgeClassificationTable />
        <ModalAddAgeClassification />
        <ModalEditAgeClassification />
      </AgeClassificationContext.Provider>
    </div>
  );
}
