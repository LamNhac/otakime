import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";

function UploadImage(props) {
  const { fileList, onPreview, onChange, maxCount = 1, customRequest } = props;
  const handleChange = ({ fileList: newFileList }) => {
    onChange(newFileList);
  };
  if (fileList === undefined) {
    return;
  }
  console.log("fileList", fileList);

  return (
    <Upload
      listType="picture-card"
      fileList={fileList}
      onPreview={onPreview}
      onChange={handleChange}
      maxCount={maxCount}
      customRequest={customRequest}
    >
      {fileList.length === 0 ? (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      ) : null}
    </Upload>
  );
}

export default UploadImage;
