/* eslint-disable no-loop-func */
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  InputNumber,
  Modal,
  Row,
  message,
} from "antd";
import Upload from "antd/es/upload/Upload";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import Config from "../../../../../config";
import {
  addDocument,
  getAllDocuments,
  updateDocument,
  uploadFile,
} from "../../../../../services/firebaseService";
import UploadImageContext from "../../UploadImageContext";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
function ModalAddChapter() {
  const {
    isModalAddChapter,
    setIsModalAddChapter,
    dataMangaObj,
    loadMangaChapter,
  } = useContext(UploadImageContext);

  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);

  const [fileList, setFileList] = useState([]);

  const handleChangeMain = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const handlePreview = async (file) => {
    if (file.imgUrl) {
      return window.open(file.imgUrl);
    }
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <Modal
      title={
        <span>
          Thêm chapter{" "}
          <span className="text-[#1677ff]">[{dataMangaObj.nameManga}]</span>
        </span>
      }
      open={isModalAddChapter}
      onCancel={() => setIsModalAddChapter(false)}
      width={1024}
      onOk={() => form.submit()}
      confirmLoading={isLoading}
    >
      <Form
        form={form}
        onFinish={async (values) => {
          //Kiểm tra chapter của values có trùng với các chapter hiện tại trong truyện không?
          const dataChapter = await getAllDocuments(
            `manga/${dataMangaObj.id}/chapter`
          );
          const chapterExist = dataChapter.some(
            (item) => item.nameChapter === values.nameChapter
          );
          if (chapterExist) {
            return message.warning(`Chapter ${values.nameChapter} đã tồn tại!`);
          } else {
            setIsLoading(true);
            values.updateChapterAt = dayjs(values.updateChapterAt).format(
              Config.dateFormat
            );
            for (var i in values.imgChapterFile) {
              const urlPromise = await uploadFile(
                values.imgChapterFile[i].originFileObj,
                `manga/${
                  dataMangaObj.nameManga
                }/chapter/${values.imgChapterFile[i].name
                  .toString()
                  .padStart(2, "0")}`
              );
              values.imgChapterFile[i] = {
                ...values.imgChapterFile[i],
                imgUrl: urlPromise,
              };
            }
            Promise.all(values.imgChapterFile)
              .then(() => {
                values.imgChapterFile = JSON.stringify(values.imgChapterFile);
                const cloneDataMangaObj = {
                  ...dataMangaObj,
                  newDateUpdateChapterAt: values.updateChapterAt,
                };

                //Cập nhật newDateUpdateChapterAt vào trong Manga để lấy ra truyện mới cập nhật
                updateDocument("manga", dataMangaObj.id, cloneDataMangaObj);

                addDocument(`manga/${dataMangaObj.id}/chapter`, values)
                  .then(() => {
                    setIsLoading(false);
                    loadMangaChapter(dataMangaObj);
                    message.success(
                      <span>
                        Thêm chapter{" "}
                        <b>{values.nameChapter.toString().padStart(2, "0")}</b>{" "}
                        - <b>{dataMangaObj.nameManga}</b>
                      </span>
                    );
                  })
                  .finally(() => {
                    setIsModalAddChapter(false);
                    form.resetFields();
                  });
              })
              .finally(() => form.resetFields())
              .catch((error) => {
                console.error("Upload error:", error);
                message.error(error);
              });
          }
        }}
        initialValues={{
          updateChapterAt: dayjs(dayjs(), Config.dateFormat),
        }}
      >
        <Row gutter={[12, 12]}>
          <Col>
            <Form.Item
              name="nameChapter"
              label="Chapter"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ${label}",
                },
              ]}
              initialValue={1}
            >
              <InputNumber type="number" placeholder="Chapter"></InputNumber>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="updateChapterAt"
              label="Thời gian cập nhật"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ${label}",
                },
              ]}
            >
              <DatePicker format={Config.dateFormat} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="imgChapterFile"
          label="Ảnh chapter"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          required
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ${label}",
            },
          ]}
        >
          <Upload
            multiple
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChangeMain}
            customRequest={dummyRequest}
            className="upload-list-inline"
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <Image
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </Modal>
  );
}
export default ModalAddChapter;
