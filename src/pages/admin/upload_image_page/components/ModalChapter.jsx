import { Modal } from "antd";
import { useContext } from "react";
import UploadImageContext from "../UploadImageContext";

function ModalChapter() {
  const context = useContext(UploadImageContext);
  const { isModalChapter, setIsModalChapter } = context;
  return (
    <Modal
      open={isModalChapter}
      onCancel={() => setIsModalChapter(false)}
    ></Modal>
  );
}
export default ModalChapter;
