/* eslint-disable jsx-a11y/iframe-has-title */
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllDocuments } from "../../../services/firebaseService";
import { Spin } from "antd";
function DetailMoviePage() {
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
      <iframe
        style={{
          width: "100%",
          minHeight: "100vh",
        }}
        src="https://short.ink/iRMfxXMZf"
        allowFullscreen
        allowTransparency
        allow="autoplay"
      ></iframe>
    </Spin>
  );
}
export default DetailMoviePage;
