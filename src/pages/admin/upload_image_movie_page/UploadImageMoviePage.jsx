import React, { useEffect, useState } from "react";
import UploadImageMovieContext from "./UploadImageMovieContext";
import { FilterMovie, ModalImage, TableMovie } from "./components";
import { getAllDocuments } from "../../../services/firebaseService";

export default function UploadImageMoviePage() {
  const [filterMovie, setFilterMovie] = useState(null);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [dataTable, setDataTable] = useState([]);

  const [isModalImage, setIsModalImage] = useState(false);
  const [dataImage, setDataImage] = useState(null);

  const loadManga = () => {
    setIsLoadingTable(true);
    getAllDocuments("movie")
      .then(setDataTable)
      .finally(() => setIsLoadingTable(false));
  };

  useEffect(() => {
    loadManga();
  }, []);

  const state = {
    dataTable,
    setDataTable,
    isLoadingTable,
    setIsLoadingTable,
    loadManga,
    isModalImage,
    setIsModalImage,
    dataImage,
    setDataImage,
  };

  return (
    <UploadImageMovieContext.Provider value={state}>
      <FilterMovie />
      <TableMovie />
      <ModalImage />
    </UploadImageMovieContext.Provider>
  );
}
