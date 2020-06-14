// @flow
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Api from '../../utils/api';
import { ProductsToolbar, ProductCard, Pagination } from './components';
import { IApiMediaItem } from './../../utils/interfaces';
import { IPagination, IPaginationProps } from './components/Pagination';
import { useAuth0 } from './../../react-auth0-spa';
import { SimpleReactFileUpload } from '../Account/components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

export interface IMediaItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  views: number;
}

const ProductList = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [mediaItems: IMediaItem[], setMediaItems] = useState<IMediaItem[]>([]);
  const [pagination: IPagination, setPagination] = useState({
    page: 0,
    pageCount: 0,
    itemCount: 0,
    itemsPerPage: 0
  });

  const setMedia = (data: IApiMediaItem[]) => {
    const mediaItems: IMediaItem[] = [];
    if (data && data.length > 0) {
      data.forEach(item => {
        const url = item.Url;
        const mediaItem: IMediaItem = {
          id: item.Id,
          title: item.Name,
          description: item.Description,
          imageUrl: url,
          views: 0
        };
        mediaItems.push(mediaItem);
      });
    }
    setMediaItems(mediaItems);
    setPagination({
      page: 1,
      pageCount: 1,
      itemCount: mediaItems.length,
      itemsPerPage: 100
    });
    setLoading(false);
  };

  const { getTokenSilently } = useAuth0();

  const loadMediaAsync = async (category, page) => {
    setLoading(true);
    const api = new Api(getTokenSilently);
    const mediaItems: IApiMediaItem[] = await api.getMediaList(category, page);
    setMedia(mediaItems);
  };

  useEffect(() => {
    if (!mediaItems || mediaItems.length == 0) loadMediaAsync('Something', 1);
  });

  if (loading) {
    return (
      <div className={classes.root}>
        <ProductsToolbar />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <ProductsToolbar />
      <div className={classes.content}>
        <Grid container spacing={3}>
          {mediaItems.map(mediaItem => (
            <Grid item key={mediaItem.id} lg={4} md={6} xs={12}>
              <ProductCard mediaItem={mediaItem} />
            </Grid>
          ))}
        </Grid>
      </div>
      <Pagination className="" {...pagination} />
      <SimpleReactFileUpload />
    </div>
  );
};

export default ProductList;
