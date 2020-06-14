// @flow
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { useAuth0 } from './../../../../react-auth0-spa';
import Api from '../../../../utils/api';
import { IApiMediaItem } from '../../../../utils/interfaces';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
  Typography,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const DetailBox = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const [mediaItem, setMediaItem] = useState<IApiMediaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    if (!mediaItem) loadMediaAsync();
  });

  const loadMediaAsync = async () => {
    const url = new URL(window.location.href);
    const mediaId: string | null = url.searchParams.get('item');
    if (!mediaId) return;
    setLoading(true);
    const api = new Api(getTokenSilently);
    const mediaItem: IApiMediaItem = await api.getMedia(mediaId);
    setMediaItem(mediaItem);
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;
  if (!mediaItem) return;
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form>
        <CardHeader subheader={mediaItem.Name} title="Media Item" />
        <Divider />
        <CardContent>
          <img alt="Media Item" className={classes.image} src={mediaItem.Url} />
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="outlined">
            Save
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

DetailBox.propTypes = {
  className: PropTypes.string
};

export default DetailBox;
