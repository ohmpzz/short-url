import { useEffect } from 'react';
import { Grid, Toolbar } from '@mui/material';
import { CardFormShortUrl } from 'features/ShortUrl/CardFormShortUrl';
import { CardHistoryList } from 'features/ShortUrl/CardHistoryList';
import { DialogFormEdit } from 'features/ShortUrl/DialogFormEdit';
import { css } from '@emotion/css';

import { useAppDispatch } from 'store';
import * as fromShortUrl from 'features/ShortUrl/slice';

export function HomePage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fromShortUrl.fetchAll());
  }, [dispatch]);
  return (
    <>
      <Toolbar />
      <Toolbar />
      <h1
        className={css`
          text-align: center;
        `}
      >
        URL Shortener
      </h1>
      <Toolbar />
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={10} md={6}>
          <CardFormShortUrl />
        </Grid>
      </Grid>
      <Toolbar />
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={10} md={6}>
          <CardHistoryList />
        </Grid>
      </Grid>
      <DialogFormEdit />
      <Toolbar />
    </>
  );
}

export default HomePage;
