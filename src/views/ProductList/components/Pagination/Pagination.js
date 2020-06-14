// @flow
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { IPaginationProps } from './';

const useStyles = makeStyles(theme => ({
  root: {},
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const Pagination = (props: IPaginationProps) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  if (props.page === 0) return <div />;

  return (
    <div className={classes.pagination}>
      <Typography variant="caption">
        {(props.page - 1) * props.itemsPerPage + 1}-
        {props.page == props.pageCount
          ? props.itemCount
          : props.page * props.itemsPerPage}{' '}
        of {props.itemCount}
      </Typography>
      <IconButton>
        <ChevronLeftIcon />
      </IconButton>
      <IconButton>
        <ChevronRightIcon />
      </IconButton>
    </div>
  );
};

export default Pagination;
