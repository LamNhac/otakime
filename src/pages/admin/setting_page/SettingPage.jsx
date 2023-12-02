import { Button, Card, Form, Image, Modal, Space, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
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

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};
export default function SettingPage() {
  const [formIcon] = Form.useForm();
  const [formLogo] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [fileListLogo, setFileListLogo] = useState([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleChangeMain = ({ fileList: newFileList }) =>
    setFileList(newFileList);
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

  const [previewOpenLogo, setPreviewOpenLogo] = useState(false);
  const [previewImageLogo, setPreviewImageLogo] = useState("");
  const [previewTitleLogo, setPreviewTitleLogo] = useState("");

  const handleChangeMainLogo = ({ fileList: newFileList }) =>
  setFileListLogo(newFileList);
  const handlePreviewLogo = async (file) => {
    if (file.imgUrl) {
      return window.open(file.imgUrl);
    }
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImageLogo(file.url || file.preview);
    setPreviewOpenLogo(true);
    setPreviewTitleLogo(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  useEffect(() => {}, []);
  return (
    <div>
      <Card
      title="Setting"
      >
        <Form
          form={formIcon}
          onFinish={(values) => {
            console.log(values);
          }}
        >
          <Space>
            <Form.Item
              name="iconImg"
              label="Ảnh Icon"
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
                maxCount={1}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChangeMain}
                customRequest={dummyRequest}
                className="upload-list-inline"
              >
                <Button icon={<UploadOutlined />}>Upload Icon</Button>
              </Upload>
            </Form.Item>
          </Space>

          <Button
            className="ml-2"
            onClick={() => {
              formIcon.submit();
            }}
          >
            Lưu
          </Button>
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
        </Form>
        <Form
          form={formLogo}
          onFinish={(values) => {
            console.log(values);
          }}
        >
          <Space>
            <Form.Item
              name="logoImg"
              label="Ảnh Logo"
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
                maxCount={1}
                fileList={fileListLogo}
                onPreview={handlePreviewLogo}
                onChange={handleChangeMainLogo}
                customRequest={dummyRequest}
                className="upload-list-inline"
              >
                <Button icon={<UploadOutlined />}>Upload Logo</Button>
              </Upload>
            </Form.Item>
          </Space>
          <Button
            className="ml-2"
            onClick={() => {
              formLogo.submit();
            }}
          >
            Lưu
          </Button>
          <Modal
            open={previewOpenLogo}
            title={previewTitleLogo}
            footer={null}
            onCancel={() => setPreviewOpenLogo(false)}
          >
            <Image
              alt="example"
              style={{
                width: "100%",
              }}
              src={previewImageLogo}
            />
          </Modal>
        </Form>
      </Card>
    </div>
  );
}
