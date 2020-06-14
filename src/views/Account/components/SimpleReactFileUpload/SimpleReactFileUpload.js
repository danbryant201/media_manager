import React, { useState, useEffect } from 'react';
import axios, { post } from 'axios';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  TextField,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid
} from '@material-ui/core';
import { useAuth0 } from 'react-auth0-spa';

const useStyles = makeStyles(() => ({
  root: {}
}));

const SimpleReactFileUpload = props => {
  const { getTokenSilently } = useAuth0();
  const classes = useStyles();
  const [name, setName] = useState('');
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState('');
  const [fileCount, setFileCount] = useState(0);

  const fileUpload = async (file, name) => {
    const token = await getTokenSilently();
    const url = `http://djbhost01.azurewebsites.net/api/PostMedia?code=fxhOQMIpHr4b5mShofsN66P73NTaIQHlEiRycF6wD3WRVYUX9FNA5Q==&name=${name}`;
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'image/jpeg',
        Authorization: `Bearer ${token}`
      }
    };
    setUploading(name);
    return post(url, file, config);
  };

  const onFormSubmit = e => {
    e.preventDefault(); // Stop form submit
    setUploading(true);
    [...files].forEach(file => {
      fileUpload(file, fileCount == 1 ? name : file.name).then(response => {
        console.log(response.data);
        setUploading('');
      });
    });
  };

  if (!classes) return <div />;

  if (uploading !== '') {
    return <div>Uploading... {uploading}</div>;
  }

  return (
    <Card className={clsx(classes.root, '')}>
      <form onSubmit={e => onFormSubmit(e)}>
        <CardHeader
          subheader="You can upload an image into this category"
          title="Image Upload"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <input
                color="primary"
                name="file"
                accept="image/*"
                type="file"
                multiple
                onChange={e => {
                  setFiles(e.target.files);
                  setName(e.target.files[0].name);
                  setFileCount(e.target.files.length);
                }}
              />
              <TextField
                fullWidth
                label="Name"
                margin="dense"
                name="name"
                onChange={e => setName(e.target.value)}
                required
                value={name}
                variant="outlined"
                style={
                  fileCount !== 1
                    ? { display: 'none', 'margin-top': '15px' }
                    : undefined
                }
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained" type="submit">
            Upload
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default SimpleReactFileUpload;
