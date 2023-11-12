/* eslint-disable linebreak-style */
import List from '../views/pages/list';
import Detail from '../views/pages/detail';
import Like from '../views/pages/like';

const routes = {
  '/': List, // default page
  '/detail/:id': Detail,
  '/like': Like,
};

export default routes;
