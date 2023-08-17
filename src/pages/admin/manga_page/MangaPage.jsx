import { useEffect, useState } from "react";
import {
  FilterManga,
  ModalAddManga,
  ModalEditManga,
  ModalUploadManga,
  TableManga,
} from "./components";

import {
  getAllDocuments,
  getDocument,
} from "../../../services/firebaseService";
import { isEmpty, removeDiacritics } from "../../../utils/func";
import MangaPageContext from "./MangaPageContext";

function MangaPage() {
  const [data, setData] = useState([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [isLoadingDetailTableUpload, setIsLoadingDetailTableUpload] =
    useState(false);
  const [filter, setFilter] = useState("");
  const [filterChapter, setFilterChapter] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalUpload, setIsShowModalUpload] = useState(false);

  const [isShowModalAddDetailUpload, setIsShowModalAddDetailUpload] =
    useState(false);
  const [isShowModalEditDetailUpload, setIsShowModalEditDetailUpload] =
    useState(false);

  const [dataEdit, setDataEdit] = useState({});
  const [dataUpload, setDataUpload] = useState({});
  const [dataEditUpload, setDataEditUpload] = useState({});
  const [dataChapter, setDataChapter] = useState([]);

  const [valueSelectChapter, setValueSelectChapter] = useState(null);

  useEffect(() => {
    const searchTerm = removeDiacritics(filter.toLowerCase());
    const filtered = data.filter((item) => {
      const nameManga = removeDiacritics(item.nameManga.toLowerCase());
      return nameManga.includes(searchTerm);
    });
    setFilteredData(filtered);
  }, [filter, data]);

  const loadManga = () => {
    setIsLoadingTable(true);
    getAllDocuments("manga")
      .then((newData) => {
        if (!isEmpty(newData)) {
          setData(newData);
          setFilteredData(newData); // Initialize filteredData with all data
        } else {
          setData([]);
        }
      })
      .finally(() => setIsLoadingTable(false));
  };

  const loadChapterManga = (id) => {
    setIsLoadingDetailTableUpload(true);
    getDocument("manga", id)
      .then((newData) => setDataChapter(newData.chapter))
      .finally(() => setIsLoadingDetailTableUpload(false));
  };

  useEffect(() => {
    loadManga();
  }, []);

  const handleStatusChange = (status) => {
    if (status === 0) {
      setFilteredData(data); // Use original data when "Tất cả" is selected
    } else {
      let newStatus = status === 1 ? true : false;
      const filteredByStatus = data.filter(
        (item) => item.isStatusManga === newStatus
      );
      setFilteredData(filteredByStatus);
    }
  };

  const state = {
    data,
    setData,
    loadManga,
    loadChapterManga,
    filter,
    setFilter,
    filterChapter,
    setFilterChapter,
    filteredData,
    setFilteredData,
    isLoadingTable,
    setIsLoadingTable,
    isLoadingDetailTableUpload,
    setIsLoadingDetailTableUpload,
    isShowModalAdd,
    setIsShowModalAdd,
    isShowModalEdit,
    setIsShowModalEdit,
    isShowModalUpload,
    setIsShowModalUpload,
    isShowModalAddDetailUpload,
    setIsShowModalAddDetailUpload,
    isShowModalEditDetailUpload,
    setIsShowModalEditDetailUpload,
    dataEdit,
    setDataEdit,
    dataUpload,
    setDataUpload,
    dataEditUpload,
    dataChapter,
    setDataChapter,
    setDataEditUpload,
    valueSelectChapter,
    setValueSelectChapter,
    handleStatusChange,
  };
  return (
    <MangaPageContext.Provider value={state}>
      <div className="flex gap-1 flex-col">
        <FilterManga />
        <TableManga />
        <ModalAddManga />
        <ModalEditManga />
        {isShowModalUpload && <ModalUploadManga />}
      </div>
    </MangaPageContext.Provider>
  );
}
export default MangaPage;
