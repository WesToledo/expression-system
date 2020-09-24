import React from "react";
import { Link } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
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
  tooltipEdit,
  tooltipDelete,
  currentRowSelected,
  setModalDelete,
  setModalDeleteVisible,
  showEdit,
}) {
  return (
    <div className={classes.iconContainer}>
      <Tooltip title={tooltipEdit}>
        {showEdit ? (
          <Link
            to={currentRowSelected.get().hrefEdit + currentRowSelected.get().id}
          >
            <IconButton className={(classes.iconButton, "text-primary")}>
              <EditIcon className={classes.icon} />
            </IconButton>
          </Link>
        ) : (
          <></>
        )}
      </Tooltip>
      <Tooltip title={tooltipDelete}>
        {setModalDeleteVisible ? (
          <IconButton
            className={(classes.iconButton, "text-danger")}
            onClick={() => {
              setModalDeleteVisible();
            }}
          >
            <DeleteIcon className={classes.icon} />
          </IconButton>
        ) : (
          <IconButton
            className={(classes.iconButton, "text-danger")}
            onClick={() => {
              setModalDelete({ show: true, id: currentRowSelected.get().id });
            }}
          >
            <DeleteIcon className={classes.icon} />
          </IconButton>
        )}
      </Tooltip>
    </div>
  );
}

export default withStyles(defaultToolbarSelectStyles, {
  name: "CustomToolbarSelect",
})(CustomToolbarSelect);
