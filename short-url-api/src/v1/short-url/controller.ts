import { Response, Request } from 'express';
import { ResBody } from 'v1/types';
import * as Service from './service';
import {
  APIResponse,
  APIRequestCreate,
  APIRequestUpdate,
  APIParams,
} from './type';
import { GenerateCode } from 'v1/utils/generate-code';

export async function GetAllHandler(
  req: Request,
  res: Response<ResBody<APIResponse[]>>
) {
  try {
    const data = await Service.FindAllBySessionId({
      session_id: req.sessionID || '',
    });

    return res.status(200).json({ code: 'short-url/succeeded', data });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ code: 'short-url/something-went-wrong' });
  }
}

export async function UpdateHandler(
  req: Request<APIParams, {}, APIRequestUpdate>,
  res: Response<ResBody<APIResponse>>
) {
  try {
    const updated = await Service.Update({
      code: req.params.code,
      long_url: req.body.long_url,
      session_id: req.sessionID,
    }).then((res) => ({ code: res.code, long_url: res.long_url }));

    return res.status(200).json({ code: 'short-url/updated', data: updated });
  } catch (e) {
    console.log(e);
    if (e === 'not found') return res.sendStatus(404);

    return res.status(500).json({ code: 'short-url/something-went-wrong' });
  }
}

export async function DeleteByCodeHandler(
  req: Request<APIParams>,
  res: Response<ResBody>
) {
  try {
    const deleted = await Service.Delete({
      code: req.params.code,
      session_id: req.sessionID,
    });

    if (!deleted) throw 'not found';

    return res.status(200).json({ code: 'short-url/succeeded' });
  } catch (e) {
    console.log(e);
    if (e === 'not found') return res.sendStatus(404);

    return res.status(500).json({ code: 'short-url/something-went-wrong' });
  }
}

export async function CreateHandler(
  req: Request<{}, {}, APIRequestCreate>,
  res: Response<ResBody<APIResponse>>
) {
  try {
    const created = await Service.Create({
      code: GenerateCode(),
      long_url: req.body.long_url,
      session_id: req.session.id,
    }).then((res) => ({
      long_url: res.long_url,
      code: res.code,
    }));

    return res.status(201).json({ code: 'short-url/created', data: created });
  } catch (e: any) {
    console.log(e);
    if (e?.code === 11000) {
      return res
        .status(400)
        .json({ code: 'bad-request', message: 'duplicated' });
    }
    return res.status(500).json({ code: 'short-url/something-went-wrong' });
  }
}

export async function FindByCodeHandler(
  req: Request<{ code: string }>,
  res: Response<ResBody<APIResponse>>
) {
  try {
    const found = await Service.FindByCode(req.params.code)
      .lean()
      .then((res) => {
        if (!res) return null;

        return {
          long_url: res.long_url,
          code: res.code,
        };
      });

    if (!found) throw 'not found';

    return res.status(200).json({ code: 'short-url/succeeded', data: found });
  } catch (e) {
    console.log(e);
    if (e === 'not found') return res.sendStatus(404);
    return res.status(500).json({ code: 'short-url/something-went-wrong' });
  }
}
