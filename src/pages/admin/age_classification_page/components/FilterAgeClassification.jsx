import { Button, Card, Input, Space } from "antd";
import React, { useContext } from "react";
import AgeClassificationContext from "../AgeClassificationContext";

export default function FilterAgeClassification() {
  const { setFilter, setIsShowModalAdd } = useContext(AgeClassificationContext);
  return (
    <Card>
      <Space>
        <Input
          placeholder="Tìm kiếm..."
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
        <Button type="primary">Tìm kiếm</Button>
        <Button onClick={() => setIsShowModalAdd(true)}>
          Tạo phân loại tuổi
        </Button>
      </Space>
    </Card>
  );
}
