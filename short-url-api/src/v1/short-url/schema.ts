import * as yup from 'yup';

export const createBodySchema = yup
  .object({
    long_url: yup.string().url().required(),
  })
  .noUnknown()
  .required();

export const paramSchema = yup
  .object({
    code: yup.string().required(),
  })
  .noUnknown()
  .required();

export const updateBodySchema = yup
  .object({
    long_url: yup.string().url().required(),
  })
  .noUnknown()
  .required();

export const findParamSchema = yup
  .object({
    code: yup.string().required(),
  })
  .noUnknown()
  .required();
