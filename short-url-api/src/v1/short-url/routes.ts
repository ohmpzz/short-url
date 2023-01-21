import express from 'express';
import * as Controller from './controller';
import { ValidateResource } from 'v1/utils/validate-resource';
import * as Schema from './schema';

export const router = express.Router();

router.get(`/`, Controller.GetAllHandler);

router.post(
  `/`,
  ValidateResource({ body: Schema.createBodySchema }),
  Controller.CreateHandler
);
router.get(
  `/:code`,
  ValidateResource({ params: Schema.findParamSchema }),
  Controller.FindByCodeHandler
);

router.patch(
  `/:code`,
  ValidateResource({
    params: Schema.paramSchema,
    body: Schema.updateBodySchema,
  }),
  Controller.UpdateHandler
);

router.delete(
  `/:code`,
  ValidateResource({ params: Schema.paramSchema }),
  Controller.DeleteByCodeHandler
);

export default router;
