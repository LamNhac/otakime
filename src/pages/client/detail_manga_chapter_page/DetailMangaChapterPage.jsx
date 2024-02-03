/* eslint-disable react-hooks/exhaustive-deps */
import {
  HomeOutlined,
  LeftOutlined,
  RightOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  FloatButton,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ViewImage } from "../../../components";
import IMAGES from "../../../constants/images";
import {
  getAllDocuments,
  updateDocument,
} from "../../../services/firebaseService";

function DetailMangaChapterPage() {
  let { mangaId, chapterId } = useParams();
  // const [isTypeRead] = useState(localStorage.getItem("isTypeRead"));

  const [data, setData] = useState(null);
  const [dataChapter, setDataChapter] = useState({});
  const [selectChapter, setSelectChapter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastView] = useState(localStorage.getItem("lastViewManga"));

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    //Lấy danh sách manga
    getAllDocuments("manga")
      .then((resManga) => {
        const manga = resManga.find((item) => item.urlManga === mangaId);
        setData(manga);

        //Lấy danh sách chapter
        getAllDocuments(`manga/${manga.id}/chapter`).then((res) => {
          const chapterFilterName = res.sort(
            (a, b) => b.nameChapter - a.nameChapter
          );
          const chapter = chapterFilterName.find(
            (item) => item.nameChapter === parseFloat(chapterId)
          );

          if (chapter) {
            //Tạo danh sách select chapter
            const options = chapterFilterName.map((item) => ({
              label: `Chapter ${item.nameChapter}`,
              chapter: item.nameChapter,
              value: item.id,
              id: item.id,
            }));
            setSelectChapter(options);
            chapter.imgChapterFile = JSON.parse(chapter.imgChapterFile); //Convert ảnh
            setDataChapter(chapter);
          } else {
            message.error(`Chapter ${chapterId} không tồn tại!`);
            setDataChapter(null);
            setSelectChapter(null);
          }

          //Cập nhật lượt View
          // Nếu vượt quá 1 phút thì mới update lại view
          if (!lastView || Date.now() - parseInt(lastView) > 60000) {
            updateLastView();
            const cloneDatatoUpdateView = {
              ...chapter,
              imgChapterFile: JSON.stringify(chapter.imgChapterFile),
              view: chapter.view + 1,
            };
            updateDocument(
              `manga/${manga.id}/chapter`,
              chapter.id,
              cloneDatatoUpdateView
            );
          }

          document.title = `Otakime - ${
            manga?.nameManga
          } - ${chapter?.nameChapter.toString().padStart(2, "0")}`;
          const el = document.querySelector("meta[name='description']");
          el.setAttribute("content", manga?.description);
        });
      })
      .finally(() => setIsLoading(false));
  }, [chapterId]);

  const updateLastView = () => {
    localStorage.setItem("lastViewManga", Date.now());
    // Thực hiện các bước khác để set view theo logic của bạn
    console.log("View updated!");
  };
  // console.log("chapterId", chapterId);
  // const handleKeyDown = (event) => {
  //   switch (event.keyCode) {
  //     case 37: // Mũi tên bên trái
  //       const previousChapterId = parseInt(chapterId) - 1;
  //       console.log("previousChapterId", previousChapterId);
  //       navigate(`/manga/${mangaId}/${previousChapterId}`);
  //       break;
  //     case 39: // Mũi tên bên phải
  //       const nextChapterId = parseInt(chapterId) + 1;
  //       console.log("nextChapterId", nextChapterId);

  //       navigate(`/manga/${mangaId}/${nextChapterId}`);
  //       break;
  //     default:
  //       // Xử lý cho các trường hợp khác (nếu cần)
  //       break;
  //   }
  // };

  // useEffect(() => {
  //   // Thêm sự kiện lắng nghe khi component được mount
  //   document.addEventListener("keydown", handleKeyDown);

  //   // Hủy sự kiện lắng nghe khi component bị unmount
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []); // Thêm mảng rỗng để đảm bảo sự kiện chỉ được thêm một lần khi component mount

  //Xử lý cho chapter
  const currentChapterId = chapterId ? parseInt(chapterId, 10) : null;

  const isBackDisabled = currentChapterId === 1 || !currentChapterId;

  const isForwardDisabled =
    currentChapterId === null ||
    selectChapter?.length === 0 ||
    currentChapterId === selectChapter?.length;

  return (
    <Spin spinning={isLoading}>
      <FloatButton.BackTop style={{ insetBlockEnd: 20, insetInlineEnd: 20 }} />

      <Card className="mb-5" loading={isLoading}>
        <h3 className=" font-bold text-xl mb-2">
          {data?.nameManga} / Chapter {dataChapter?.nameChapter}
        </h3>
        <Space className="mb-2" wrap>
          Thể loại:
          {data?.tags?.map((item, index) => {
            return (
              <Tag key={index} color="blue">
                {item.label}
              </Tag>
            );
          })}
        </Space>
        {/* <p className="mb-0 italic">
          Bạn có thể bấm phím <LeftOutlined /> hoặc <RightOutlined /> để chuyển
          chap
        </p> */}
      </Card>

      <div className="sticky top-0 z-[10] descreased-padding w-[100%] bg-white p-2 drop-shadow-lg">
        <Row align="center" style={{ gap: 10 }}>
          <Link to="/">
            <Button shape="circle" icon={<HomeOutlined />}></Button>
          </Link>
          <Link to={`/manga/${mangaId}`}>
            <Button shape="circle" icon={<UnorderedListOutlined />}></Button>
          </Link>
          <Button
            shape="circle"
            icon={<LeftOutlined />}
            onClick={() => {
              let indexPreviosChapter = selectChapter.findIndex(
                (item) => item.chapter === parseFloat(chapterId)
              );

              if (indexPreviosChapter !== -1) {
                navigate(
                  `/manga/${mangaId}/${
                    selectChapter[indexPreviosChapter + 1].chapter
                  }`
                );
              }
            }}
            disabled={isBackDisabled}
          ></Button>
          <Select
            defaultActiveFirstOption={false}
            options={selectChapter}
            value={`Chapter ${chapterId}`}
            onChange={(selectedItems) => {
              const selectedLabelsAndValues = selectChapter.find(
                (item) => item.id === selectedItems
              );
              navigate(`/manga/${mangaId}/${selectedLabelsAndValues.chapter}`);
            }}
            placeholder="Chọn chapter..."
            style={{ width: 150 }}
          ></Select>
          <Button
            shape="circle"
            icon={<RightOutlined />}
            onClick={() => {
              let indexBeforeChapter = selectChapter.findIndex(
                (item) => item.chapter === parseFloat(chapterId)
              );
              //Nếu tìm thấy chapter
              if (indexBeforeChapter !== -1) {
                navigate(
                  `/manga/${mangaId}/${
                    selectChapter[indexBeforeChapter - 1].chapter
                  }`
                );
              }
            }}
            disabled={isForwardDisabled}
          ></Button>
        </Row>
      </div>

      {dataChapter?.imgChapterFile && dataChapter?.imgChapterFile.length > 0 ? (
        <div className="flex flex-col justify-center items-center">
          {dataChapter?.imgChapterFile?.map((item, index) => {
            return (
              <ViewImage
                key={index}
                src={item.imgUrl ? item.imgUrl : IMAGES.imgDefault}
                style={{ width: 800 }}
              />
            );
          })}
        </div>
      ) : null}
    </Spin>
  );
}
export default DetailMangaChapterPage;
