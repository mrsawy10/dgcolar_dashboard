import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title>DG Collar | Dashboard </title>
      </Helmet>

      <AppView />
    </>
  );
}
