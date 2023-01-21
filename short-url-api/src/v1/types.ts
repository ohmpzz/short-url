export type Dimension = 'short-url';
export type Action =
  | 'created'
  | 'succeeded'
  | 'updated'
  | 'deleted'
  | 'something-went-wrong';

export type BadRequestCode = 'bad-request';

export type Code = `${Dimension}/${Action}`;

export interface ResBody<T = any, C = Code | BadRequestCode> {
  code: C;
  data?: T;
  message?: string;
}
