import { useState } from 'react';
import { Card, CardContent, TextField, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { css } from '@emotion/css';

import { useAppDispatch, useAppSelector } from 'store';
import * as fromShortUrl from 'features/ShortUrl/slice';

const schema = yup.object({
  long_url: yup
    .string()
    .url('ต้องเป็น URL ที่ถูกต้อง')
    .required('กรุณากรอกข้อมูล'),
});

export function CardFormShortUrl() {
  const dispatch = useAppDispatch();
  const pendingLoading =
    useAppSelector(fromShortUrl.selectCreateLoading) === 'pending';
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const formText = {
    long_url: {
      label: 'URL',
    },
    submit: {
      label: 'ยืนยัน',
    },
  };

  function handleSubmit(e: { long_url: string }) {
    dispatch(fromShortUrl.create(e))
      .unwrap()
      .then((res) => setShortUrl(`${import.meta.env.VITE_URL}/${res.code}`))
      .catch((e) => setErrorMsg(e?.message));
  }

  return (
    <Card>
      <CardContent>
        <FormShortUrl
          loading={pendingLoading}
          formText={formText}
          onSubmit={handleSubmit}
        />
        {shortUrl ? (
          <p>
            Short URL:{' '}
            <a href={shortUrl} target="_blank">
              <span
                className={css`
                  border-bottom: 1px solid #646cff;
                  :hover {
                    border-bottom: 1px solid #535bf2;
                  }
                `}
              >
                {shortUrl}
              </span>
            </a>
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default CardFormShortUrl;

interface FormShortUrlProps {
  formText: { [fieldName: string]: { label: string } };
  onSubmit: (e: { long_url: string }) => void;
  loading: boolean;
}

function FormShortUrl(props: FormShortUrlProps) {
  const formText = props?.formText;
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<{ long_url: string }>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(props?.onSubmit)}
      noValidate
      autoComplete="off"
    >
      <Stack spacing={2} direction="row">
        <TextField
          fullWidth
          {...register('long_url')}
          name="long_url"
          label={formText?.long_url?.label}
          error={Boolean(errors?.long_url?.message)}
        />
        <LoadingButton
          loading={props?.loading}
          disabled={!isValid}
          variant="contained"
          type="submit"
        >
          {props?.formText?.submit?.label}
        </LoadingButton>
      </Stack>

      <p
        className={css`
          font-size: 0.75em;
          margin-bottom: 0;
        `}
      >
        {Boolean(errors?.long_url?.message) ? (
          <span
            className={css`
              color: red;
            `}
          >
            {errors?.long_url?.message}
          </span>
        ) : null}
      </p>
    </form>
  );
}
