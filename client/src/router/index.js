import Auth from '../page/Auth';
import Posts from '../page/Posts';

export const publicRoutes = [{ path: '/', component: Auth, exact: true }];

export const auhtRoutes = [{ path: '/posts', component: Posts, exact: true }];
