import { Schema, model } from 'mongoose';
import isURL from 'validator/lib/isURL';

import { DataSchema } from './type';

export const schema = new Schema<DataSchema>(
  {
    code: {
      type: Schema.Types.String,
      required: true,
      uppercase: true,
      unique: true,
    },
    long_url: { type: Schema.Types.String, required: true, validate: isURL },
    session_id: { type: String, required: true },
  },
  {
    strictQuery: true,
    optimisticConcurrency: true,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

export default model<DataSchema>('short-url', schema);
