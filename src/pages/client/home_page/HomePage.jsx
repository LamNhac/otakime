/* eslint-disable array-callback-return */
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { analytics, getAllDocuments } from "../../../services/firebaseService";

import { logEvent } from "firebase/analytics";
import CardImage from "../../../components/CardImage";
import SkeletonImage from "../../../components/SkeletonImage";
import dateUtil from "../../../utils/dateUtil";

function HomePage() {
  const [isLoadingManga, setIsLoadingManga] = useState(false);
  const [newMangaUpdate, setNewMangaUpdate] = useState({});

  const [isLoadingMangaViewest, setIsLoadingMangaViewest] = useState(false);
  const [isLoadingMovieViewest, setIsLoadingMovieViewest] = useState(false);

  const [dataMangaViewest, setDataMangaViewest] = useState([]);
  const [dataMovieViewest, setDataMovieViewest] = useState({});

  useEffect(() => {
    setIsLoadingManga(true);
    setIsLoadingMangaViewest(true);
    setIsLoadingMovieViewest(true);

    logEvent(analytics, "notification_received");
    // setUserId(analytics, uuidv4());
    getAllDocuments("manga")
      .then((res) => {
        // Chuyển đổi chuỗi ngày thành đối tượng Date
        const dateObjects = res.map((manga) => {
          return {
            ...manga,
            newDateUpdateChapterAt: dateUtil.convertToDateType(
              manga.newDateUpdateChapterAt
            ),
          };
        });

        // Lấy ngày mới nhất
        const result = dateObjects.reduce(
          (acc, obj, index) => {
            const currentDate = obj.newDateUpdateChapterAt;

            if (!acc.maxDate || currentDate > acc.maxDate) {
              return { maxDate: currentDate, index: index };
            } else {
              return acc;
            }
          },
          { maxDate: null, index: -1 }
        );
        if (result) {
          setNewMangaUpdate(dateObjects[result.index]);
        }

        //Lấy ra manga có lượt view cao nhất
        if (res) {
          const mangaViewest = res.sort((a, b) => a.view - b.view);
          const mangaViewestSlice = mangaViewest.slice(0, 2);
          setDataMangaViewest(mangaViewestSlice);
        }
      })
      .finally(() => {
        setIsLoadingManga(false);
        setIsLoadingMangaViewest(false);
      })
      .catch((error) => {
        console.log(error);
      });

    getAllDocuments("movie")
      .then((res) => {
        if (res.length > 0) {
          const movieViewest = res.sort((a, b) => b.view - a.view);
          const movieViewestSlice = movieViewest.slice(0, 1)[0];
          setDataMovieViewest(movieViewestSlice);
        }
      })
      .finally(() => {
        setIsLoadingMovieViewest(false);
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoadingMovieViewest(false);
      });
  }, []);
  console.log("newMangaUpdate", newMangaUpdate);

  return (
    <div className="flex flex-col">
      {isLoadingManga ? (
        <SkeletonImage />
      ) : (
        Object.keys(newMangaUpdate).length !== 0 && (
          <CardImage
            to={`/manga/${newMangaUpdate?.urlManga}/${newMangaUpdate?.newNameChapter}`}
            src={newMangaUpdate?.imgMain}
            title="Mới cập nhật"
            description={`${newMangaUpdate?.nameManga ?? ""} - Chapter ${
              newMangaUpdate?.newNameChapter?.toString().padStart(2, 0) ?? ""
            }`}
            ageClassification={
              newMangaUpdate?.ageClassification
                ? newMangaUpdate.ageClassification[0]
                : []
            }
            isBackdrop
            isAgeClassification
          />
        )
      )}

      {/* Quảng cáo  */}
      {/* <Card className="mt-2" title="Quảng cáo"></Card> */}
      <div className="mt-4">
        <Row gutter={[12, 12]}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
            <p className="text-lg font-bold text-center">Thêm truyện nổi bật</p>
            <Row gutter={[12, 12]}>
              <Col
                xs={{ span: 12 }}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
              >
                {isLoadingMangaViewest ? (
                  <SkeletonImage />
                ) : (
                  dataMangaViewest[0]?.newNameChapter !== null && (
                    <CardImage
                      isLoading={isLoadingMangaViewest}
                      to={`/manga/${dataMangaViewest[0]?.urlManga}/${dataMangaViewest[0]?.newNameChapter}`}
                      src={dataMangaViewest[0]?.imgMain}
                      title={dataMangaViewest[0]?.nameManga}
                      description={`Chapter ${
                        dataMangaViewest[0]?.newNameChapter
                          ?.toString()
                          .padStart(2, 0) ?? ""
                      }`}
                      ageClassification={
                        dataMangaViewest[0]?.ageClassification
                          ? dataMangaViewest[0]?.ageClassification[0]
                          : []
                      }
                      isBackdrop
                      isAgeClassification
                    />
                  )
                )}
              </Col>
              {dataMangaViewest[1] && (
                <Col
                  xs={{ span: 12 }}
                  sm={{ span: 12 }}
                  md={{ span: 12 }}
                  lg={{ span: 12 }}
                >
                  {isLoadingMangaViewest ? (
                    <SkeletonImage />
                  ) : (
                    <CardImage
                      isLoading={isLoadingMangaViewest}
                      to={`/manga/${dataMangaViewest[1]?.urlManga}/${dataMangaViewest[1]?.newNameChapter}`}
                      src={dataMangaViewest[1]?.imgMain}
                      title={dataMangaViewest[1]?.nameManga}
                      description={`Chapter ${
                        dataMangaViewest[1]?.newNameChapter
                          ?.toString()
                          .padStart(2, 1) ?? ""
                      }`}
                      ageClassification={
                        dataMangaViewest[1]?.ageClassification
                          ? dataMangaViewest[1]?.ageClassification[1]
                          : []
                      }
                      isBackdrop
                      isAgeClassification
                    />
                  )}
                </Col>
              )}
            </Row>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
            <Row gutter={[12, 0]}>
              <Col
                xs={{ span: 12 }}
                sm={{ span: 12 }}
                md={{ span: 24 }}
                lg={{ span: 24 }}
                className=" flex justify-center items-center"
              >
                <p className="text-lg font-bold text-center">Có cả phim nữa!</p>
              </Col>
              <Col
                xs={{ span: 12 }}
                sm={{ span: 12 }}
                md={{ span: 24 }}
                lg={{ span: 24 }}
              >
                {Object.keys(dataMovieViewest).length === 0 ? (
                  <SkeletonImage />
                ) : (
                  <CardImage
                    isLoading={isLoadingMovieViewest}
                    to={`/movie/${dataMovieViewest.urlMovie}`}
                    src={dataMovieViewest.imgMain}
                    title={dataMovieViewest?.nameMovie}
                    description=""
                    ageClassification={
                      dataMovieViewest.ageClassification
                        ? dataMovieViewest.ageClassification[0]
                        : []
                    }
                    isBackdrop
                    isAgeClassification
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HomePage;
