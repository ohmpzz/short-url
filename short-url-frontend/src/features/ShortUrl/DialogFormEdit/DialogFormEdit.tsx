import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  TextField,
  Toolbar,
} from '@mui/material';
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

export function DialogFormEdit() {
  const formText = {
    long_url: {
      label: 'URL',
    },
    submit: {
      label: 'ยืนยัน',
    },
  };

  const dispatch = useAppDispatch();
  const openDialog = useAppSelector(fromShortUrl.selectOpenDialogEdit);
  const selectedShortUrl = useAppSelector(fromShortUrl.selectSelectedShortUrl);
  const pendingLoading =
    useAppSelector(fromShortUrl.selectUpdateLoading) === 'pending';

  function handleCloseClick() {
    dispatch(fromShortUrl.setOpenDialogEdit(false));
  }

  function handleUpdateClick(payload: { long_url: string }) {
    if (!selectedShortUrl) return;
    dispatch(
      fromShortUrl.update({
        long_url: payload.long_url,
        code: selectedShortUrl?.code,
      })
    );
  }

  return (
    <Dialog fullWidth maxWidth="sm" open={openDialog}>
      <DialogTitle>{`แก้ไขข้อมูล ${import.meta.env.VITE_URL}/${
        selectedShortUrl?.code
      }`}</DialogTitle>
      <DialogContent>
        <FormShortUrl
          defaultValues={{ long_url: selectedShortUrl?.long_url || '' }}
          formText={formText}
          loading={pendingLoading}
          onDiscard={handleCloseClick}
          onSubmit={handleUpdateClick}
        />
      </DialogContent>
    </Dialog>
  );
}

export default DialogFormEdit;

interface FormShortUrlProps {
  defaultValues: { long_url: string };
  formText: { [fieldName: string]: { label: string } };
  onSubmit: (e: { long_url: string }) => void;
  onDiscard: () => void;
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
    defaultValues: props?.defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(props?.onSubmit)}
      noValidate
      autoComplete="off"
      className={css`
        margin-top: 1rem;
      `}
    >
      <TextField
        fullWidth
        {...register('long_url')}
        name="long_url"
        label={formText?.long_url?.label}
        error={Boolean(errors?.long_url?.message)}
      />

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
      <DialogActions>
        <Button color="inherit" variant="text" onClick={props?.onDiscard}>
          ยกเลิก
        </Button>
        <LoadingButton
          type="submit"
          loading={props?.loading}
          variant="contained"
          disabled={!isValid}
        >
          ยืนยัน
        </LoadingButton>
      </DialogActions>
    </form>
  );
}
