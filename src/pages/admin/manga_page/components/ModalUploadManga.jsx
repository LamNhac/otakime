/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Modal } from "antd";
import { useContext, useEffect } from "react";
import MangaPageContext from "../MangaPageContext";
import FilterUploadManga from "./FilterUploadManga";
import ModalAddDetailManga from "./ModalAddDetailManga";
import TableDetailUploadManga from "./TableDetailUploadManga";
import ModalEditDetailManga from "./ModalEditDetailManga";

function ModalUploadManga() {
  const [form] = Form.useForm();
  const context = useContext(MangaPageContext);
  const {
    dataUpload,
    isShowModalUpload,
    isShowModalAddDetailUpload,
    isShowModalEditUpload,
    setIsShowModalUpload,
    loadChapterManga,
  } = context;

  useEffect(() => {
    if (dataUpload) {
      loadChapterManga(dataUpload.id);
    }
  }, [dataUpload]);

  return (
    <Modal
      title={`Upload manga ${dataUpload.nameManga}`}
      open={isShowModalUpload}
      onOk={() => form.submit()}
      onCancel={() => setIsShowModalUpload(false)}
      destroyOnClose={true}
      width={1024}
      footer={null}
    >
      <FilterUploadManga />
      <TableDetailUploadManga />
      {isShowModalAddDetailUpload && <ModalAddDetailManga />}
      {isShowModalEditUpload && <ModalEditDetailManga />}
    </Modal>
  );
}
export default ModalUploadManga;
