import React from "react";
import { Link } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarStyles = {
  iconButton: {},
};

function CustomToolbar({
  classes,
  tooltipAdd,
  hrefAdd,
  setModalAddVisible,
  showAdd,
}) {
  return (
    <React.Fragment>
      <Tooltip title={tooltipAdd}>
        {setModalAddVisible ? (
          <IconButton
            className={"datatable-background-success"}
            onClick={() => {
              setModalAddVisible();
            }}
          >
            <AddIcon className={classes.deleteIcon} fontSize="small" />
          </IconButton>
        ) : showAdd ? (
          <Link to={hrefAdd}>
            <IconButton className={"datatable-background-success"}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Link>
        ) : (
          <></>
        )}
      </Tooltip>
    </React.Fragment>
  );
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(
  CustomToolbar
);
