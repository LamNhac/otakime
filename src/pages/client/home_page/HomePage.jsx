/* eslint-disable array-callback-return */
import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { analytics, getAllDocuments } from "../../../services/firebaseService";

import { logEvent } from "firebase/analytics";
import { Carousel } from "react-responsive-carousel";
import ViewImage from "../../../components/ViewImage";

const { Meta } = Card;
function HomePage() {
  const [isLoadingManga, setIsLoadingManga] = useState(false);
  const [newMangaUpdate, setNewMangaUpdate] = useState({});

  const [isLoadingMangaViewest, setIsLoadingMangaViewest] = useState(false);
  const [isLoadingMovieViewest, setIsLoadingMovieViewest] = useState(false);

  const [dataMangaViewest, setDataMangaViewest] = useState([]);
  const [dataMovieViewest, setDataMovieViewest] = useState([]);

  useEffect(() => {
    setIsLoadingManga(true);
    setIsLoadingMangaViewest(true);
    setIsLoadingMovieViewest(true);

    logEvent(analytics, "notification_received");
    // setUserId(analytics, uuidv4());
    getAllDocuments("manga")
      .then((res) => {
        // Chuyển đổi chuỗi ngày thành đối tượng Date
        const dateObjects = res.map(
          (manga) => new Date(manga.newDateUpdateChapterAt)
        );

        // Lấy ngày mới nhất
        const newestDate = new Date(Math.max.apply(null, dateObjects));
        const newestManga = res.find(
          (manga) =>
            new Date(manga.newDateUpdateChapterAt).getTime() ===
            newestDate.getTime()
        );
        setNewMangaUpdate(newestManga);

        const mangaViewest = res.sort((a, b) => a.view - b.view);
        const mangaViewestSlice = mangaViewest.slice(0, 2);
        setDataMangaViewest(mangaViewestSlice);
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
        const movieViewest = res.sort((a, b) => a.view - b.view);
        const movieViewestSlice = movieViewest.slice(0, 2);
        setDataMovieViewest(movieViewestSlice);
      })
      .finally(() => {
        setIsLoadingMovieViewest(false);
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoadingMovieViewest(false);
      });
  }, []);

  return (
    <div className="flex flex-col">
      <Link
        to={`/manga/${newMangaUpdate.urlManga}/${newMangaUpdate?.newNameChapter}`}
      >
        <Card
          loading={isLoadingManga}
          hoverable
          style={{ width: "100%" }}
          cover={
            <ViewImage
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              style={{
                height: 300,
                backgroundSize: "cover",
                backgroundPosition: "center",
                objectFit: "cover", // Sử dụng object-fit để scale hình ảnh
                width: "100%", // Đảm bảo rằng hình ảnh sẽ có chiều rộng 100%
              }}
              preview={false}
            />
          }
        >
          <Meta
            title="Mới cập nhật"
            description={`${newMangaUpdate?.nameManga ?? ""} - Chapter ${
              newMangaUpdate?.newNameChapter?.toString().padStart(2, 0) ?? ""
            }`}
          />
        </Card>
      </Link>
      {/* Quảng cáo  */}
      <Card className="mt-2" title="Quảng cáo"></Card>
      <div className="mt-4">
        {/* <Row className="w-[100%] sm:w-[48%] flex flex-row sm:flex-col gap-2">
          <Col className="text-lg font-bold text-center  flex justify-center items-center">
            Thêm truyện nổi bật!
          </Col>
          <Col>
            <Carousel
              autoPlay
              infiniteLoop
              swipeable
              showArrows={false}
              showThumbs={false}
              showStatus={false}
            >
              <div>
                <ViewImage src="https://picsum.photos/200" />
              </div>
              <div>
                <ViewImage src="https://picsum.photos/200" />
              </div>
              <div>
                <ViewImage src="https://picsum.photos/200" />
              </div>
            </Carousel>
          </Col>
        </Row>
        <Row className="w-[100%] sm:w-[48%] flex flex-row sm:flex-col gap-2">
          <Col className="text-lg font-bold text-center  flex justify-center items-center">
            Thêm phim nổi bật!
          </Col>
          <Col>
            <Carousel
              autoPlay
              infiniteLoop
              swipeable
              showArrows={false}
              showThumbs={false}
              showStatus={false}
            >
              <div>
                <ViewImage src="https://picsum.photos/200" />
              </div>
              <div>
                <ViewImage src="https://picsum.photos/200" />
              </div>
              <div>
                <ViewImage src="https://picsum.photos/200" />
              </div>
            </Carousel>
          </Col>
        </Row> */}
        <Row gutter={[12, 12]}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
          >
            <div>
              <p className="text-lg font-bold text-center">
                Thêm truyện nổi bật
              </p>
            </div>
            <Row gutter={[12, 12]}>
              <Col
                xs={{ span: 12 }}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
              >
                <Card
                  loading={isLoadingMangaViewest}
                  cover={
                    <ViewImage
                      alt="example"
                      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                      style={{
                        height: 300,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        objectFit: "cover", // Sử dụng object-fit để scale hình ảnh
                        width: "100%", // Đảm bảo rằng hình ảnh sẽ có chiều rộng 100%
                      }}
                      preview={false}
                    />
                  }
                >
                  <Meta
                    title="Mới cập nhật"
                    description={`${
                      newMangaUpdate?.nameManga ?? ""
                    } - Chapter ${
                      newMangaUpdate?.newNameChapter
                        ?.toString()
                        .padStart(2, 0) ?? ""
                    }`}
                  />
                </Card>
              </Col>
              <Col
                xs={{ span: 12 }}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
              >
                <Card
                  loading={isLoadingMangaViewest}
                  cover={
                    <ViewImage
                      alt="example"
                      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                      style={{
                        height: 300,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        objectFit: "cover", // Sử dụng object-fit để scale hình ảnh
                        width: "100%", // Đảm bảo rằng hình ảnh sẽ có chiều rộng 100%
                      }}
                      preview={false}
                    />
                  }
                >
                  <Meta
                    title="Mới cập nhật"
                    description={`${
                      newMangaUpdate?.nameManga ?? ""
                    } - Chapter ${
                      newMangaUpdate?.newNameChapter
                        ?.toString()
                        .padStart(2, 0) ?? ""
                    }`}
                  />
                </Card>
              </Col>
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
                <Card
                  loading={isLoadingMangaViewest}
                  cover={
                    <ViewImage
                      alt="example"
                      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                      style={{
                        height: 300,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        objectFit: "cover", // Sử dụng object-fit để scale hình ảnh
                        width: "100%", // Đảm bảo rằng hình ảnh sẽ có chiều rộng 100%
                      }}
                      preview={false}
                    />
                  }
                >
                  <Meta
                    title="Mới cập nhật"
                    description={`${
                      newMangaUpdate?.nameManga ?? ""
                    } - Chapter ${
                      newMangaUpdate?.newNameChapter
                        ?.toString()
                        .padStart(2, 0) ?? ""
                    }`}
                  />
                </Card>
              </Col>
            </Row>
          </Col>
          {/* <Col>
            <Card
              loading={isLoadingMangaViewest}
              cover={
                <ViewImage
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  style={{
                    height: 300,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    objectFit: "cover", // Sử dụng object-fit để scale hình ảnh
                    width: "100%", // Đảm bảo rằng hình ảnh sẽ có chiều rộng 100%
                  }}
                  preview={false}
                />
              }
            >
              <Meta
                title="Mới cập nhật"
                description={`${newMangaUpdate?.nameManga ?? ""} - Chapter ${
                  newMangaUpdate?.newNameChapter?.toString().padStart(2, 0) ??
                  ""
                }`}
              />
            </Card>
          </Col> */}
        </Row>
      </div>
    </div>
  );
}

export default HomePage;
