import { useEffect, useState } from "react";
import {
  FilterManga,
  ModalAddManga,
  ModalEditManga,
  TableManga,
} from "./components";

import { getAllDocuments } from "../../../services/firebaseService";
import { isEmpty, removeDiacritics } from "../../../utils/func";
import MangaPageContext from "./MangaPageContext";

function MangaPage() {
  const [data, setData] = useState([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  const [filter, setFilter] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalUpload, setIsShowModalUpload] = useState(false);

  const [dataEdit, setDataEdit] = useState({});

  useEffect(() => {
    if (filter) {
      const searchTerm = removeDiacritics(filter.nameManga.toLowerCase());

      let filtered = data.filter((item) => {
        const nameManga = removeDiacritics(item.nameManga.toLowerCase());
        return nameManga.includes(searchTerm);
      });

      if (filter.isStatusManga !== undefined) {
        if (filter.isStatusManga === 0) {
          // Show all data
          setFilteredData(data);
        } else {
          const statusFilterValue = filter.isStatusManga === 1; // true for "active", false for "inactive"
          filtered = filtered.filter(
            (item) => item.isStatusManga === statusFilterValue
          );
          setFilteredData(filtered);
        }
      } else {
        setFilteredData(filtered);
      }
    }
  }, [filter, data]);

  const loadManga = () => {
    setIsLoadingTable(true);
    getAllDocuments("manga")
      .then((newData) => {
        console.log("newData", newData);

        if (!isEmpty(newData)) {
          setData(newData);
          setFilteredData(newData); // Initialize filteredData with all data
        } else {
          setData([]);
        }
      })
      .finally(() => setIsLoadingTable(false));
  };

  useEffect(() => {
    loadManga();
  }, []);

  const state = {
    data,
    setData,
    loadManga,
    filter,
    setFilter,
    filteredData,
    setFilteredData,
    isLoadingTable,
    setIsLoadingTable,
    isShowModalAdd,
    setIsShowModalAdd,
    isShowModalEdit,
    setIsShowModalEdit,
    isShowModalUpload,
    setIsShowModalUpload,
    dataEdit,
    setDataEdit,
  };
  return (
    <MangaPageContext.Provider value={state}>
      <div className="flex gap-1 flex-col">
        <FilterManga />
        <TableManga />
        <ModalAddManga />
        <ModalEditManga />
      </div>
    </MangaPageContext.Provider>
  );
}
export default MangaPage;
