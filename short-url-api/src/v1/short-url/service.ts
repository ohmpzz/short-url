import db from './model';
import { DataSchema } from './type';

export function FindAllBySessionId(filter: { session_id: string }) {
  return db.find(filter).setOptions({
    sanitizeFilter: true,
  });
}

export function FindByCode(code: string) {
  return db.findOne({ code }).setOptions({
    sanitizeFilter: true,
  });
}

export function Create(
  payload: Pick<DataSchema, 'code' | 'long_url' | 'session_id'>
) {
  return db.create(payload);
}

export async function Update(payload: {
  long_url: string;
  code: string;
  session_id: string;
}) {
  const data = await db.findOne({
    session_id: payload.session_id,
    code: payload.code,
  });

  if (!data) throw 'not found';

  data.long_url = payload.long_url;
  return data.save();
}

export async function Delete(filter: { code: string; session_id: string }) {
  return db.findOneAndDelete(filter).setOptions({
    sanitizeFilter: true,
  });
}
