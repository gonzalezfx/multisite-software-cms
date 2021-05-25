import createHistory from 'history/createBrowserHistory';
import { adminBaseURI } from '../utils/baseData';

export default createHistory({
  basename: adminBaseURI
});
