import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Image, Modal, Row, Upload, message } from "antd";
import { useContext, useState } from "react";
import {
  saveToLog,
  updateDocument,
  uploadFile,
} from "../../../../services/firebaseService";
import UploadImageMovieContext from "../UploadImageMovieContext";

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
function ModalImage() {
  const context = useContext(UploadImageMovieContext);
  const { isModalImage, setIsModalImage, dataImage, loadManga } = context;
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);

  const [fileListMain, setFileListMain] = useState([]);
  const [fileListCoverDesktop, setFileListCoverDesktop] = useState([]);
  const [fileListCoverMobile, setFileListCoverMobile] = useState([]);

  const handleChangeMain = ({ fileList: newFileList }) =>
    setFileListMain(newFileList);

  const handleChangeCoverDesktop = ({ fileList: newFileList }) =>
    setFileListCoverDesktop(newFileList);

  const handleChangeCoverMobile = ({ fileList: newFileList }) =>
    setFileListCoverMobile(newFileList);

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
      title={`Sửa ảnh bìa ${dataImage?.nameMovie}`}
      open={isModalImage}
      onCancel={() => setIsModalImage(false)}
      onOk={() => form.submit()}
      width={768}
      confirmLoading={isLoading}
    >
      <Form
        form={form}
        onFinish={async (values) => {
          setIsLoading(true);
          const urlMain = await uploadFile(
            values.imgMain[0].originFileObj,
            `manga/${dataImage.nameMovie}/logo/${values.imgMain[0].name
              .toString()
              .padStart(2, "0")}`
          );

          const urlCoverDesktop = await uploadFile(
            values.imgCoverDesktop[0].originFileObj,
            `manga/${dataImage.nameMovie}/logo/${values.imgCoverDesktop[0].name
              .toString()
              .padStart(2, "0")}`,
            values.imgCoverDesktop[0].type
          );

          const urlCoverMobile = await uploadFile(
            values.imgCoverMobile[0].originFileObj,
            `manga/${dataImage.nameMovie}/logo/${values.imgCoverMobile[0].name
              .toString()
              .padStart(2, "0")}`,
            values.imgCoverMobile[0].type
          );

          const params = {
            ...dataImage,
            imgCoverDesktop: urlCoverDesktop,
            imgCoverMobile: urlCoverMobile,
            imgMain: urlMain,
          };

          values.imgCoverDesktop = JSON.stringify(values.imgCoverDesktop);
          values.imgCoverMobile = JSON.stringify(values.imgCoverMobile);

          values.imgMain = JSON.stringify(values.imgMain);

          updateDocument("movie", dataImage.id, params)
            .then(() => {
              message.success("Cập nhật ảnh bìa thành công!");
              loadManga();
              setIsModalImage(false);
            })
            .finally(() => {
              saveToLog("update", "uploadImage", values);
              setIsLoading(false);
            });
        }}
      >
        <Row gutter={[12, 12]}>
          <Col>
            <Form.Item
              name="imgMain"
              label="imgMain"
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
                fileList={fileListMain}
                onPreview={handlePreview}
                onChange={handleChangeMain}
                customRequest={dummyRequest}
                className="upload-list-inline"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item
              name="imgCoverDesktop"
              label="imgCoverDesktop"
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
                fileList={fileListCoverDesktop}
                onPreview={handlePreview}
                onChange={handleChangeCoverDesktop}
                customRequest={dummyRequest}
                className="upload-list-inline"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item
              name="imgCoverMobile"
              label="imgCoverMobile"
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
                fileList={fileListCoverMobile}
                onPreview={handlePreview}
                onChange={handleChangeCoverMobile}
                customRequest={dummyRequest}
                className="upload-list-inline"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
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
export default ModalImage;
