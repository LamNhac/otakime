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
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  const [dataTable, setDataTable] = useState([]);
  const [dataChapter, setDataChapter] = useState([]);
  const [dataImage, setDataImage] = useState(null);

  const [isModalChapter, setIsModalChapter] = useState(false);
  const [isModalImage, setIsModalImage] = useState(false);

  const state = {
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
  };
  useEffect(() => {
    setIsLoadingTable(true);
    getAllDocuments("manga")
      .then(setDataTable)
      .finally(() => setIsLoadingTable(false));
  }, []);
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
