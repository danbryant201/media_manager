// @flow
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import { IMediaItem } from '../../../../utils/interfaces';
import { IProductCardProps } from './';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: '350px',
    width: '100%',
    margin: '0 auto',
    borderRadius: '5px',
    // border: `1px solid ${theme.palette.divider}`,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    borderRadius: '5px'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const ProductCard = (props: IProductCardProps) => {
  const { className, mediaItem } = props;
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
      <CardContent>
        <Link to={'/media-detail?item=' + mediaItem.id}>
          <Typography align="center" gutterBottom variant="h4">
            {mediaItem.title}
          </Typography>
        </Link>
        <div className={classes.imageContainer}>
          <img
            alt="Media Item"
            className={classes.image}
            src={mediaItem.imageUrl}
          />
        </div>

        <Typography align="center" variant="body1">
          {mediaItem.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography display="inline" variant="body2">
              Updated 2hr ago
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item>
            <GetAppIcon className={classes.statsIcon} />
            <Typography display="inline" variant="body2">
              {mediaItem.views} Views
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
