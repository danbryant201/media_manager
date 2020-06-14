import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { useAuth0 } from 'react-auth0-spa';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  // const user = {
  //   name: 'Shen Zhi',
  //   avatar: '/images/avatars/avatar_11.png',
  //   bio: 'Brain Director'
  // };

  let { loading, user } = useAuth0();

  if (loading || !user) {
    user = {
      name: 'Welcome',
      picture: '/images/avatars/avatar_11.png',
      email: 'Please log in'
    };
  }
  const { getTokenSilently } = useAuth0();
  console.log(getTokenSilently());

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.picture}
        to="/settings"
      />
      <Typography className={classes.name} variant="h4">
        {user.name}
      </Typography>
      <Typography variant="body2">{user.email}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
