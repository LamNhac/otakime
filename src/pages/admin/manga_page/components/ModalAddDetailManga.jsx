import { PlusOutlined } from "@ant-design/icons";
import {
  Col,
  DatePicker,
  Form,
  Image,
  InputNumber,
  Modal,
  Row,
  Upload,
  message,
} from "antd";
import moment from "moment";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Config from "../../../../config";
import {
  getDocument,
  updateDocument,
  uploadFile,
} from "../../../../services/firebaseService";
import MangaPageContext from "../MangaPageContext";
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
function ModalAddDetailManga() {
  const {
    isShowModalAddDetailUpload,
    setIsShowModalAddDetailUpload,
    dataUpload,
    loadMangaChapter,
  } = useContext(MangaPageContext);

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
      title="Thêm manga"
      open={isShowModalAddDetailUpload}
      onCancel={() => setIsShowModalAddDetailUpload(false)}
      onOk={() => form.submit()}
      okText="Lưu"
      cancelText="Đóng"
      confirmLoading={isLoading}
      destroyOnClose={true}
      width={1024}
    >
      <Form
        form={form}
        onFinish={async (values) => {
          setIsLoading(true);
          values.nameChapter = values.nameChapter.toString().padStart(2, "0");
          values.updateChapterAt = moment(values.updateChapterAt).format(
            Config.dateFormat
          );
          let isChapterExist = false;
          const _data = await getDocument("manga", dataUpload.id); //Lấy dataChapter trong dataUpload
          _data.chapter.forEach((e) => {
            if (e.nameChapter === values.nameChapter) {
              isChapterExist = true;
            }
          });
          if (isChapterExist) {
            setIsLoading(false);
            return message.info(`Chapter ${values.nameChapter} đã tồn tại!`);
          }
          let updatedChapterArray = [..._data.chapter, values];

          const promises = values.imgChapterFile.map(async (e) => {
            e.imgChapterUrl = await uploadFile(
              e.originFileObj,
              `manga/${dataUpload.nameManga}/Chapter/${values.nameChapter
                .toString()
                .padStart(2, "0")}/${e.name}`
            );
            message.success(`Thêm ảnh vào database ${e.name}`);
            return e.imgChapterUrl;
          });

          values.id = uuidv4(); //Tạo trường id

          updatedChapterArray.sort(
            (a, b) => parseInt(a.nameChapter) - parseInt(b.nameChapter)
          );

          //Cover File sang String -> base64

          console.log(updatedChapterArray);

          Promise.all(promises)
            .then((imgChapterUrls) => {
              values.imgChapterUrl = imgChapterUrls;
              values.imgChapterFile = JSON.stringify(values.imgChapterFile);
            })
            .finally(() => {
              console.log(values);

              // updatePerChapter(dataUpload, updatedChapterArray);
              updateDocument("manga", dataUpload.id, {
                chapter: updatedChapterArray,
              })
                .then(() => {
                  message.success(
                    `Thêm chapter ${values.nameChapter} thành công!`
                  );
                  setIsLoading(false);
                  loadMangaChapter(dataUpload.id);
                })
                .finally(() => setIsShowModalAddDetailUpload(false));
            });
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
            listType="picture-card"
            multiple
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChangeMain}
            customRequest={dummyRequest}
          >
            {fileList.length >= 0 ? (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            ) : null}
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
export default ModalAddDetailManga;
