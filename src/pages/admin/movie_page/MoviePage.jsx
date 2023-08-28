import { useEffect, useState } from "react";
import MovieContext from "./MovieContext";
import {
  FilterMovie,
  ModalAddMovie,
  ModalEditMovie,
  TableMovie,
} from "./components";
import { getAllDocuments } from "../../../services/firebaseService";

function MoviePage() {
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);

  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const [dataMovie, setDataMovie] = useState({});

  const loadMovie = () => {
    setIsLoadingTable(true);
    getAllDocuments("movie")
      .then(setDataTable)
      .finally(() => setIsLoadingTable(false));
  };

  useEffect(() => {
    loadMovie();
  }, []);

  const state = {
    isModalAdd,
    setIsModalAdd,
    dataTable,
    setDataTable,
    isLoadingTable,
    loadMovie,
    isModalEdit,
    setIsModalEdit,
    dataMovie,
    setDataMovie,
  };
  return (
    <MovieContext.Provider value={state}>
      <FilterMovie />
      <TableMovie />
      <ModalAddMovie />
      <ModalEditMovie />
    </MovieContext.Provider>
  );
}
export default MoviePage;
