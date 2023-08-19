/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { values } from "lodash";
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
function ModalEditDetailManga(props) {
  const { isShowModalEditUpload, data, onCancel, onCancelWhenLoading } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const handleChangeMain = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handlePreview = async (file) => {
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

  useEffect(() => {
    if (data && isShowModalEditUpload) {
      const tempImgChapterFile = [];

      if (typeof data.imgChapterFile === "string") {
        data.imgChapterFile = JSON.parse(data.imgChapterFile);
      }
      data.imgChapterFile.forEach((e) => {
        tempImgChapterFile.push(JSON.parse(e));
      });
      data.imgChapterFile = tempImgChapterFile;
      console.log(data);
      setFileList(data.imgChapterFile);
      form.setFieldsValue(data);
    }
  }, [data, isShowModalEditUpload]);

  return (
    <Modal
      // title={`Xem chi tiết ${data.nameChapter}}`}
      open={isShowModalEditUpload}
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={(values) => values}>
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
            {fileList.length > 0 ? (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            ) : null}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default ModalEditDetailManga;
