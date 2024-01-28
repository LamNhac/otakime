import { useEffect, useState } from "react";
import { getAllDocuments } from "../../../services/firebaseService";
import UploadImageContext from "./UploadImageContext";
import {
  FilterUpload,
  ModalChapter,
  ModalImage,
  TableUploadImage,
} from "./components";

function UploadImagePage() {
  // const [filterManga, setFilterManga] = useState(null);

  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [isLoadingTableChapter, setIsLoadingTableChapter] = useState(false);

  const [dataTable, setDataTable] = useState([]);
  const [dataChapter, setDataChapter] = useState([]);
  const [dataDetailChapter, setDataDetailChapter] = useState({});
  const [dataMangaObj, setDataMangaObj] = useState({});
  const [dataImage, setDataImage] = useState(null);

  const [isModalChapter, setIsModalChapter] = useState(false);
  const [isModalAddChapter, setIsModalAddChapter] = useState(false);
  const [isModalEditDetailChapter, setIsModalEditDetailChapter] =
    useState(false);
  const [isModalImage, setIsModalImage] = useState(false);

  const loadManga = () => {
    setIsLoadingTable(true);
    getAllDocuments("manga")
      .then(setDataTable)
      .finally(() => setIsLoadingTable(false));
  };

  const loadMangaChapter = (data, filter) => {
    setIsLoadingTableChapter(true);
    getAllDocuments(`manga/${data.id}/chapter`)
      .then((newData) => {
        if (filter) {
          newData = newData.filter((chapter) =>
            chapter.id.includes(filter)
          );
        }
        newData.sort((a, b) => a.nameChapter - b.nameChapter);
        setDataChapter(newData);
      })
      .finally(() => setIsLoadingTableChapter(false));
  };

  useEffect(() => {
    loadManga();
  }, []);

  const state = {
    dataMangaObj,
    setDataMangaObj,
    dataTable,
    setDataTable,
    dataChapter,
    setDataChapter,
    dataImage,
    setDataImage,
    isLoadingTable,
    setIsLoadingTable,
    isModalChapter,
    setIsModalChapter,
    isModalImage,
    setIsModalImage,
    isModalAddChapter,
    setIsModalAddChapter,
    isLoadingTableChapter,
    setIsLoadingTableChapter,
    isModalEditDetailChapter,
    setIsModalEditDetailChapter,
    dataDetailChapter,
    setDataDetailChapter,
    loadManga,
    loadMangaChapter,
  };

  return (
    <UploadImageContext.Provider value={state}>
      <FilterUpload />
      <TableUploadImage />
      <ModalImage />
      <ModalChapter />
    </UploadImageContext.Provider>
  );
}
export default UploadImagePage;
