import { QuestionOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import React from "react";

function RowAction(props) {
  const { title, icon, onClick, type } = props;

  const renderClassName = () => `cursor-pointer text-${type}`;

  return (
    <div className={renderClassName()} onClick={onClick}>
      {icon} {title}
    </div>
  );
}

RowAction.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
  onclick: PropTypes.func,
  type: PropTypes.string,
};

RowAction.defaultProps = {
  title: "Title",
  icon: <QuestionOutlined />,
  onclick: () => {},
  type: "primary",
};

export default RowAction;
