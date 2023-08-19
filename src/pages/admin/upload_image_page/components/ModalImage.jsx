import { Modal } from "antd";
import { useContext } from "react";
import UploadImageContext from "../UploadImageContext";

function ModalImage() {
  const context = useContext(UploadImageContext);
  const { isModalImage, setIsModalImage } = context;
  return (
    <Modal open={isModalImage} onCancel={() => setIsModalImage(false)}></Modal>
  );
}
export default ModalImage;
