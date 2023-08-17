/* eslint-disable react-hooks/exhaustive-deps */
import { PlusOutlined } from "@ant-design/icons";
import {
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Switch,
  Upload,
} from "antd";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { SelectTag } from "../../../../components";
import Config from "../../../../config";
import { addDocument, uploadFile } from "../../../../services/firebaseService";
import MangaPageContext from "../MangaPageContext";

// function base64ToFile(base64, filename, mimeType) {
//   const arr = base64.split(",");
//   const byteString = atob(arr[1]);

//   let ab = new ArrayBuffer(byteString.length);
//   let ia = new Uint8Array(ab);

//   for (let i = 0; i < byteString.length; i++) {
//     ia[i] = byteString.charCodeAt(i);
//   }

//   const file = new File([ab], filename, { type: mimeType });
//   file.base64Data = base64; // Thêm dữ liệu base64 vào tệp
//   return file;
// }
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

function ModalEditManga(props) {
  const context = useContext(MangaPageContext);
  const { dataEdit, isShowModalEdit, setIsShowModalEdit, loadManga } = context;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [fileListMain, setFileListMain] = useState([]);
  const [fileListCover, setFileListCover] = useState([]);

  const handleChangeMain = ({ fileList: newFileList }) =>
    setFileListMain(newFileList);
  const handleChangeCover = ({ fileList: newFileList }) =>
    setFileListCover(newFileList);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handlePreview = async (file) => {
    console.log("File to preview:", file.imgUrl);

    if (!file.url && !file.preview) {
      file.preview = file.imgUrl; // Sử dụng dữ liệu base64 cho việc xem trước
      // file.preview = await getBase64(file.originFileObj);
    }

    console.log(file.preview);
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

  useEffect(() => {
    if (dataEdit && isShowModalEdit) {
      dataEdit.updateAt = moment(dataEdit.updateAt, Config.dateFormat);
      if (
        typeof dataEdit.imgMainFile === "string" ||
        typeof dataEdit.imgCoverFile === "string"
      ) {
        dataEdit.imgMainFile = JSON.parse(dataEdit.imgMainFile);
        dataEdit.imgCoverFile = JSON.parse(dataEdit.imgCoverFile);
      }
      console.log(dataEdit);
      setFileListMain(dataEdit.imgMainFile);
      setFileListCover(dataEdit.imgCoverFile);
      form.setFieldsValue(dataEdit);
    }
  }, [dataEdit, isShowModalEdit]);

  return (
    <Modal
      title={
        <span>
          Sửa manga <b>{dataEdit.nameManga}</b>
        </span>
      }
      open={isShowModalEdit}
      onCancel={() => setIsShowModalEdit(false)}
      okText="Cập nhật"
      cancelText="Đóng"
      onOk={() => form.submit()}
      width={1000}
      confirmLoading={isLoading}
      destroyOnClose={true}
    >
      <Form
        form={form}
        onFinish={async (values) => {
          setIsLoading(true);
          values.updateAt = moment(values.updateAt).format(Config.dateFormat);
          values.imgMain = await uploadFile(
            values.imgMain[0].originFileObj,
            `manga/${values.nameManga}/${values.imgMain[0].name}`
          );
          values.imgCover = await uploadFile(
            values.imgCover[0].originFileObj,
            `manga/${values.nameManga}/${values.imgCover[0].name}`
          );

          if (values.imgIndex !== undefined) {
            values.imgIndex = await uploadFile(
              values.imgIndex[0].originFileObj,
              `manga/${values.nameManga}/${values.imgIndex[0].name}`
            );
          }
          addDocument(`manga`, values).finally(() => setIsLoading(false));
          setIsShowModalEdit(false);
          loadManga();
        }}
      >
        <Row align="middle" gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item
              name="nameManga"
              label="Tên manga"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <Input placeholder="" allowClear></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="nameMangaVie"
              label="Tên manga (Việt)"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <Input placeholder="" allowClear></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row align="middle" gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item
              name="otherName"
              label="Tên khác"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <Input placeholder="" allowClear></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="author"
              label="Tác giả"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <Input placeholder="" allowClear></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row align="middle" gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item
              name="tags"
              label="Thể loại"
              required
              rules={[
                {
                  validator: (_, value) => {
                    if (value && value.length > 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Vui lòng chọn thể loại");
                  },
                },
              ]}
              validateTrigger={["onChange"]} // Validate on tag selection change
            >
              <SelectTag
                onChange={(e) =>
                  form.setFieldsValue({
                    tags: e,
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="updateAt"
              label="Ngày cập nhật"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <DatePicker
                format={Config.dateFormat}
                className="w-full"
                placeholder="Chọn ngày cập nhật"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="isStatusManga"
          label="Trạng thái"
          valuePropName="checked"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng nhập ${label}",
            },
          ]}
        >
          <Switch
            unCheckedChildren="Không hoạt động"
            checkedChildren="Hoạt động"
          ></Switch>
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng nhập ${label}",
            },
          ]}
        >
          <Input.TextArea rows={3} placeholder="" allowClear></Input.TextArea>
        </Form.Item>
        <Row align="middle" gutter={[12, 12]}>
          <Col span={8}>
            <Form.Item
              name="imgMainFile"
              label="imgMainFile"
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
                fileList={fileListMain}
                onPreview={handlePreview}
                onChange={handleChangeMain}
                maxCount={1}
                customRequest={dummyRequest}
              >
                {fileListMain.length === 0 ? (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                ) : null}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="imgCoverFile"
              label="imgCoverFile"
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
                fileList={fileListCover}
                onPreview={handlePreview}
                onChange={handleChangeCover}
                maxCount={1}
                customRequest={dummyRequest}
              >
                {fileListCover.length === 0 ? (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                ) : null}
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
export default ModalEditManga;
