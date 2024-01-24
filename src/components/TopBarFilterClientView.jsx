import { Col, Input, Row } from "antd";
import React from "react";

export default function TopBarFilterClientView(props) {
  const { title, onChangeFilter } = props;
  return (
    <Row align="middle">
      <Col xs={12} sm={12} md={16} lg={16}>
        <h3 className="sm:text-lg md:text-2xl font-bold">{title}</h3>
      </Col>
      <Col xs={12} sm={12} md={8} lg={8}>
        <Input placeholder="Tìm kiếm..." onChange={onChangeFilter} />
      </Col>
    </Row>
  );
}
