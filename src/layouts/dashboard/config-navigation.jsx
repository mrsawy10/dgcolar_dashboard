import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PetsIcon from '@mui/icons-material/Pets';
import SvgColor from 'src/components/svg-color';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Animals',
    path: '/animals',
    icon: <PetsIcon />,
  },
  {
    title: 'To Do List',
    path: '/todo',
    icon: <PlaylistAddCheckIcon />,
  },
  {
    title: 'Finances',
    path: '/finances',
    icon: <RequestQuoteIcon />,
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
