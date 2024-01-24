import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllDocuments } from "../../../services/firebaseService";
import { Spin } from "antd";

export default function DetailMovieUrlPage() {
  const { movieId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    getAllDocuments("movie")
      .then(setData)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Spin
      spinning={isLoading}
      className=" items-center justify-center"
      tip="Đang tải dữ liệu..."
    >
      
    </Spin>
  );
}
