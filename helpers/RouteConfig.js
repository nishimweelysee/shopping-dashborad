import Roles from './role';
import { RouteNames } from './RouteNames';

const routeConfig = {
  auth: {
    default: RouteNames.login,
    [RouteNames.signup]: RouteNames.signup,
    [RouteNames.login]: RouteNames.login,
  },
  [Roles.vendor]: {
    default: RouteNames.login,
    [RouteNames.dashboard]: RouteNames.dashboard,
    [RouteNames.categories]: RouteNames.categories,
    [RouteNames.productBrand]: RouteNames.productBrand,
    [RouteNames.products]: RouteNames.products,
    [RouteNames.settings]: RouteNames.settings,
    [RouteNames.createProduct]: RouteNames.createProduct,
  },
  [Roles.admin]: {
    default: RouteNames.login,
    [RouteNames.dashboard]: RouteNames.dashboard,
    [RouteNames.categories]: RouteNames.categories,
    [RouteNames.productBrand]: RouteNames.productBrand,
    [RouteNames.products]: RouteNames.products,
    [RouteNames.customers]: RouteNames.customers,
    [RouteNames.vendors]: RouteNames.vendors,
    [RouteNames.orders]: RouteNames.orders,
    [RouteNames.settings]: RouteNames.settings,
  },

};

export default routeConfig;
