import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth0 } from 'react-auth0-spa';

const RouteWithLayout = ({
  restricted,
  layout: Layout,
  component: Component,
  path,
  props,
  ...rest
}) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();
  if (restricted === undefined) restricted = true;

  useEffect(() => {
    if (loading || isAuthenticated || !restricted) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: window.location.pathname }
      });
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
