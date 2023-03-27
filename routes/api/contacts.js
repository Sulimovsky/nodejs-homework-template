const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers");
const {
  contacts: { schemas },
} = require("../../models");
const { authenticate, validateBody, isValidId } = require("../../middlewares");

router.get("/", authenticate, ctrl.contacts.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.contacts.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.contacts.create
);

router.delete("/:contactId", authenticate, isValidId, ctrl.contacts.remove);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.contacts.update
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema, "missing field favorite"),
  ctrl.contacts.updateStatusContact
);

module.exports = router;
