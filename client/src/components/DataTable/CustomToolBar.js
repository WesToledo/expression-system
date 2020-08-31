import React from 'react';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

const defaultToolbarStyles = {
  iconButton: {}
};

function CustomToolbar({ classes, tooltipAdd, hrefAdd }) {
  return (
    <React.Fragment>
      <Tooltip title={tooltipAdd}>
        <Link to={hrefAdd}>
          <IconButton
            className={'datatable-background-success'}
          >
            <AddIcon className={classes.deleteIcon} fontSize="small" />
          </IconButton>
        </Link>
      </Tooltip>
    </React.Fragment>
  );
}

export default withStyles(defaultToolbarStyles, { name: 'CustomToolbar' })(
  CustomToolbar
);
