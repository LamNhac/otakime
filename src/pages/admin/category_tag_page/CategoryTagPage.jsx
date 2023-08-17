import { message } from "antd";
import { useEffect, useState } from "react";
import tinycolor from "tinycolor2";
import {
  addDocument,
  deleteDocument,
  getAllDocuments,
  updateDocument,
} from "../../../services/firebaseService";
import CategoryTagPageContext from "./CategoryTagPageContext";
import {
  FilterCategory,
  ModalAddCategory,
  ModalEditCategory,
  TableCategory,
} from "./components";

import { removeDiacritics } from "../../../utils/func";

function CategoryTagPage() {
  const [data, setData] = useState([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [filter, setFilter] = useState("");

  const [isShowModalAdd, setIsShowModalAdd] = useState(false); //Lưu state dành cho hiên thị modal thêm thể loại
  const [isShowModalEdit, setIsShowModalEdit] = useState(false); //Lưu state dành cho hiên thị modal sửa thể loại

  const [dataCategoryEdit, setDataCategoryEdit] = useState({});

  const loadTag = () => {
    setIsLoadingTable(true);
    getAllDocuments("tag")
      .then((data) => setData(data))
      .finally(() => setIsLoadingTable(false));
  };

  useEffect(() => {
    loadTag();
  }, []);

  const filteredData = data.filter((item) => {
    const searchTerm = filter.toLowerCase();
    const nameCatergory = item.nameCategory.toLowerCase();
    return nameCatergory.includes(removeDiacritics(searchTerm));
  });



  
  return (
    <CategoryTagPageContext.Provider value={{}}>
      <div className="flex gap-2 flex-col">
        <FilterCategory
          onChange={(e) => setFilter(e.target.value)}
          onAdd={() => {
            setIsShowModalAdd(true);
          }}
        />
        <TableCategory
          dataSource={filteredData}
          isLoadingTable={isLoadingTable}
          onEdit={(e) => {
            setIsShowModalEdit(true);
            setDataCategoryEdit(e);
          }}
          onDelete={(e) =>
            deleteDocument("tag", e.id).then(() => {
              message.success(
                <span>
                  Sửa thể loại <b>{e.nameCategory}</b>
                </span>
              );
              loadTag();
            })

            
          }
        />

        <ModalAddCategory
          isShowModalAdd={isShowModalAdd}
          onCancel={() => setIsShowModalAdd(false)}
          onOK={(values) => {
            values.bgColorCategory = tinycolor(
              values.bgColorCategory
            ).toHexString();
            values.textColorCategory = tinycolor(
              values.textColorCategory
            ).toHexString();
            addDocument("tag", values).then((data) => {
              message.success(
                <span>
                  Thêm thể loại <b>{data.nameCategory}</b>
                </span>
              );
              loadTag(); // Load lại loadTag
              setIsShowModalAdd(false);
            });
          }}
        />
        <ModalEditCategory
          isShowModalEdit={isShowModalEdit}
          data={dataCategoryEdit}
          onOk={(values) => {
            values.bgColorCategory = tinycolor(
              values.bgColorCategory
            ).toHexString();
            values.textColorCategory = tinycolor(
              values.textColorCategory
            ).toHexString();
            updateDocument("tag", values.id, values).then((data) => {
              console.log(data);
              message.success(
                <span>
                  Sửa thể loại <b>{data.nameCategory}</b>
                </span>
              );
              loadTag(); // Load lại loadTag
              setIsShowModalEdit(false);
            });
          }}
          onCancel={() => setIsShowModalEdit(false)}
        />
      </div>
    </CategoryTagPageContext.Provider>
  );
}
export default CategoryTagPage;
