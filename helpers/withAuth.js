import { route } from 'next/dist/next-server/server/router';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { logOut } from '~/store/auth/action';
import routeConfig from './RouteConfig';

const withAuth = (Component) => (allowedRole) => (props) => {
  // getting the auth state from redux store
  const store = useStore();
  const { isLoggedIn, user } = store.getState().auth;
  const role = user.data && user.data.user.category;
  const router = useRouter();

  // using a state to keep track if user is in correct state or path
  const [isValidRoute, setIsValidRoute] = useState(false);

  useEffect(() => {
    if (user && user.accessToken) {
      const jwtPayload = JSON.parse(window.atob(user.accessToken.split('.')[1]));
      let dateNow = new Date();
      if (jwtPayload.exp * 1000 < dateNow.getTime()) {
        localStorage.removeItem('ikimina');
        props.dispatch(logOut());
      }
    }
    // first condition is to check if logged in and if on wrong path
    // then route to default route of the particular role user is of
    if (isLoggedIn && (allowedRole.indexOf(role) == -1 || !routeConfig[role][router.pathname])) {
      setIsValidRoute(false);
      router.push(routeConfig[role].default);
    }

    // second condition is to check if not logged in and if on wrong path
    // then route to default not authenticated path
    else if (!isLoggedIn && !routeConfig.auth[router.pathname]) {
      setIsValidRoute(false);
      router.push(routeConfig.auth.default);
    }

    // if upper two conditions are not met then the route user is in correct and return the component
    else setIsValidRoute(true);
  }, []);

  return isValidRoute ? <Component {...props} /> : null;
};

export default withAuth;
