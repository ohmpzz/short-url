import { useRoutes } from 'react-router-dom';

import { HomePage } from './Home';
import { ShortUrlPage } from './ShortUrl';

export function WrappedRoutes() {
  const elements = useRoutes([
    {
      path: '/',
      element: <HomePage />,
      index: true,
    },
    {
      path: '/:id',
      element: <ShortUrlPage />,
    },
    {
      path: '*',
      element: <HomePage />,
    },
  ]);

  return elements;
}
