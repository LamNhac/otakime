/* eslint-disable react-hooks/exhaustive-deps */
import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Form, Image, Input, Modal, Space, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { auth } from "../../../services/firebase";
import {
  getAllDocumentsRealtime,
  updateDocumentRealtime,
  uploadFile,
} from "../../../services/firebaseService";
import dayjs from "dayjs";
import Config from "../../../config";
import { v4 as uuidv4 } from "uuid";

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
  const [form] = Form.useForm();

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

  useEffect(() => {
    getAllDocumentsRealtime("/setting").then((res) => {
      console.log("Res", res);
      let iconLogo = res.iconLogo;
      iconLogo.iconLogoFile = JSON.parse(iconLogo.iconLogoFile);
      formIcon.setFieldsValue({ ...iconLogo });
    });
  }, []);
  return (
    <div>
      <Card title="Setting">
        <Form
          form={formIcon}
          onFinish={async (values) => {
            const user = auth.currentUser;
            console.log(user);
            if (user) {
              uploadFile(values.iconLogoFile[0].originFileObj, "app").then(
                (url) => {
                  values.iconLogoFile[0] = {
                    ...values.iconLogoFile[0],
                    imgUrl: url,
                  };

                  const updates = {};
                  updates["setting/iconLogo/id"] = uuidv4();
                  updates["setting/iconLogo/dateUpdate"] = dayjs(
                    new Date()
                  ).format(Config.dateFormat);
                  updates["setting/iconLogo/name"] = "iconLogo";
                  updates["setting/iconLogo/type"] =
                    values.iconLogoFile[0].type;
                  updates["setting/iconLogo/iconLogoFile"] = JSON.stringify(
                    values.iconLogoFile
                  );

                  updateDocumentRealtime("/setting", updates);
                }
              );
            }
          }}
        >
          <Space>
            <Form.Item
              name="iconLogoFile"
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
                onPreview={handlePreviewLogo}
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

        <Form
          form={form}
          onFinish={(values) => {
            console.log(values);
          }}
        >
          <Space>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ${label}",
                },
              ]}
            >
              <Input allowClear />
            </Form.Item>
          </Space>
          <Button
            className="ml-2"
            onClick={() => {
              form.submit();
            }}
          >
            Lưu
          </Button>
        </Form>
      </Card>
    </div>
  );
}
