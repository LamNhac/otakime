/* eslint-disable react-hooks/exhaustive-deps */
import { Col, DatePicker, Form, Input, Modal, Row, Switch } from "antd";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { SelectTag } from "../../../../components";
import Config from "../../../../config";
import {
  updateDocument,
  uploadFile,
} from "../../../../services/firebaseService";
import MangaPageContext from "../MangaPageContext";

function ModalEditManga(props) {
  const context = useContext(MangaPageContext);
  const { dataEdit, isShowModalEdit, setIsShowModalEdit, loadManga } = context;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (dataEdit && isShowModalEdit) {
      dataEdit.updateAt = moment(dataEdit.updateAt, Config.dateFormat);
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
          console.log(values);
          setIsLoading(true);
          values.updateAt = moment(values.updateAt).format(Config.dateFormat);
          console.log(values);
          values.imgMainUrl = await uploadFile(
            values.imgMainFile[0].originFileObj,
            `manga/${values.nameManga}/${values.imgMainFile[0].name}`
          );
          values.imgCoverUrl = await uploadFile(
            values.imgCoverFile[0].originFileObj,
            `manga/${values.nameManga}/${values.imgCoverFile[0].name}`
          );
          updateDocument("manga", dataEdit.id, values)
            .then(() => {
              loadManga();
              setIsLoading(false);
            })
            .finally(() => setIsShowModalEdit(false));
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
        <Row align="middle" gutter={[12, 12]}>
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
      </Form>
    </Modal>
  );
}
export default ModalEditManga;
