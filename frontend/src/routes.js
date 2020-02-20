import Add from './components/Add';
import Home from './components/Home';
import Random from './components/Random';
import NotFound from './components/NotFound';
import loadData from './helpers/loadData';

const Routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/random',
    component: Random,
    loadData: (api) => loadData(api, 'sentences/random')
  },
  {
    path: '/add',
    component: Add,
  },
  {
    component: NotFound
  }
];

export default Routes;