import React from "react";
import { Link } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

import { withStyles } from "@material-ui/core/styles";

const defaultToolbarSelectStyles = {
  iconButton: {},
  iconContainer: {
    marginRight: "24px",
  },
  inverseIcon: {
    transform: "rotate(90deg)",
  },
};

function CustomToolbarSelect({
  classes,
  selectedRowsData,
  setSelectedRows,
  handleOpenModal,
}) {
  return (
    <div className={classes.iconContainer}>
      <Tooltip title={"Pagar"}>
        {/* <IconButton
          className={(classes.iconButton, "text-success")}
          onClick={() => handleOpenModal(selectedRowsData)}
        >
          <AttachMoneyIcon className={classes.icon} />
        </IconButton> */}
      </Tooltip>
    </div>
  );
}

export default withStyles(defaultToolbarSelectStyles, {
  name: "CustomToolbarSelect",
})(CustomToolbarSelect);
