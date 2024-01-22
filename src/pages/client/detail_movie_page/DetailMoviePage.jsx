/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/iframe-has-title */
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocument } from "../../../services/firebaseService";
function DetailMoviePage() {
  const { movieId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    getDocument("movie", movieId)
      .then(setData)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Spin
      spinning={isLoading}
      className=" items-center justify-center"
      tip="Đang tải dữ liệu..."
    >
      Detail page Movie
    </Spin>
  );
}
export default DetailMoviePage;
