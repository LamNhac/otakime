/* eslint-disable react-hooks/exhaustive-deps */
import { Col, DatePicker, Form, Input, Modal, Row, Spin, message } from "antd";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { SelectAgeClassification, SelectTag } from "../../../../components";
import SelectStatusFilter from "../../../../components/SelectStatusFilter";
import Config from "../../../../config";
import {
  getDocument,
  saveToLog,
  updateDocument,
} from "../../../../services/firebaseService";
import MangaPageContext from "../MangaPageContext";
import { blue } from "@ant-design/colors";

function ModalEditManga(props) {
  const context = useContext(MangaPageContext);
  const { dataEdit, isShowModalEdit, setIsShowModalEdit, loadManga } = context;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  useEffect(() => {
    if (dataEdit?.id && isShowModalEdit) {
      setIsLoadingForm(true);
      getDocument("manga", dataEdit.id)
        .then((data) => {
          dataEdit.updateAt = dayjs(dataEdit.updateAt, Config.dateFormat);
          form.setFieldsValue(dataEdit);
        })
        .finally(() => setIsLoadingForm(false));
    }
  }, [dataEdit?.id, isShowModalEdit]);

  return (
    <Modal
      title={
        <span >
          Sửa Manga <b className={`text-[${blue.primary}]`}>[{dataEdit.nameManga}]</b>
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
      <Spin spinning={isLoadingForm} tip="Đang tải dữ liệu..">
        <Form
          form={form}
          onFinish={async (values) => {
            // Lấy danh sách tất cả các manga
            // const data = await getAllDocuments("manga");

            // Kiểm tra xem manga đã tồn tại chưa
            // const mangaExists = data.some(
            //   (item) => item.urlManga === values.urlManga
            // );
            let mangaExists = false;
            if (mangaExists) {
              return message.warning(`Đã tồn tại manga ${values.urlManga}`);
            } else {
              setIsLoading(true);
              values.updateAt = dayjs(values.updateAt).format(
                Config.dateFormat
              );
              console.log("values", values);
              updateDocument("manga", dataEdit.id, values)
                .then(() => {
                  message.success(
                    <span>
                      Sửa <b>{values.nameManga}</b> thành công
                    </span>
                  );
                  loadManga();
                  setIsLoading(false);
                  saveToLog("update", "manga", values);
                })
                .finally(() => setIsShowModalEdit(false));
            }
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
                <Input
                  placeholder=""
                  allowClear
                  onChange={(e) => {
                    const inputText = e.target.value;
                    const formattedText = inputText
                      .toLowerCase()
                      .replace(/[^a-z0-9\s]/g, "") // Loại bỏ ký tự đặc biệt
                      .replace(/\s+/g, "-"); // Thay thế khoảng trắng bằng dấu gạch ngang
                    form.setFieldsValue({
                      urlManga: formattedText,
                    });
                  }}
                ></Input>
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
              <Form.Item name="ageClassification" label="Phân loại tuổi">
                <SelectAgeClassification
                  onChange={(e) => {
                    form.setFieldsValue({
                      ageClassification: e,
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row align="middle" gutter={[12, 12]}>
            <Col span={12}>
              <Form.Item
                name="updateAt"
                label="Ngày đăng truyện"
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
                  placeholder="Chọn Ngày đăng truyện"
                />
              </Form.Item>
            </Col>
            <Col flex="auto">
              <Form.Item
                name="urlManga"
                label="URL Manga"
                required
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập ${label}",
                  },
                ]}
              >
                <Input placeholder="" allowClear readOnly></Input>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="statusManga"
            label="Tình trạng"
            required
            rules={[
              {
                required: true,
                message: "Vui lòng nhập ${label}",
              },
            ]}
          >
            <SelectStatusFilter
              onChange={(e) => {
                form.setFieldsValue({
                  statusManga: e,
                });
              }}
            />
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
        </Form>
      </Spin>
    </Modal>
  );
}
export default ModalEditManga;
