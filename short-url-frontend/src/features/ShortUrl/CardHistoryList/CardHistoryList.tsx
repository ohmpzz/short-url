import React from 'react';
import { Card, CardContent, Grid, Button } from '@mui/material';
import { css } from '@emotion/css';

import * as fromShortUrl from 'features/ShortUrl/slice';
import { useAppDispatch, useAppSelector } from 'store';
import * as Type from 'features/ShortUrl/type';

export function CardHistoryList() {
  const dispatch = useAppDispatch();
  const shortUrlList = useAppSelector(fromShortUrl.selectShortUrlList);

  function handleUpdateClick(payload: Type.ShortUrl) {
    dispatch(fromShortUrl.setOpenDialogEdit(true));
    dispatch(fromShortUrl.setSelectedShortUrl(payload));
  }

  function handleRemoveClick(payload: Type.ShortUrl) {
    const confirm = window.confirm(`ต้องการลบข้อมูล ${payload.code}?`);
    if (!confirm) return;
    dispatch(fromShortUrl.remove({ code: payload.code })).catch((err) =>
      alert(err?.message)
    );
  }

  return (
    <Card>
      <CardContent>
        <h2>
          <span>รายการประวัติ</span>
        </h2>
        {!shortUrlList.length ? <p>ไม่มีรายการ</p> : null}
        <Grid
          container
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
        >
          {shortUrlList.map((item, i) => (
            <React.Fragment key={item.code}>
              <Grid item xs={8}>
                {i + 1}.{' '}
                <a href={item.long_url} target="_blank">
                  <span
                    className={css`
                      border-bottom: 1px solid #646cff;
                      :hover {
                        border-bottom: 1px solid #535bf2;
                      }
                    `}
                  >{`${import.meta.env.VITE_URL}/${item.code}`}</span>
                </a>
              </Grid>
              <Grid
                item
                xs={4}
                className={css`
                  text-align: right;
                `}
              >
                <Button variant="text" onClick={() => handleUpdateClick(item)}>
                  <span>แก้ไข</span>
                </Button>
                <Button
                  color="error"
                  variant="text"
                  onClick={() => handleRemoveClick(item)}
                >
                  <span>ลบ</span>
                </Button>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
