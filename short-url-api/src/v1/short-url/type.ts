import { Types } from 'mongoose';

export interface APIRequestCreate {
  long_url: string;
}

export interface APIRequestUpdate {
  long_url: string;
  code: string;
}

export interface APIParams {
  code: string;
}

export interface APIResponse {
  long_url: string;
  code: string;
}

export interface DataSchema {
  _id: Types.ObjectId;
  long_url: string;
  code: string;
  session_id: string;
  created_at?: Date;
}
