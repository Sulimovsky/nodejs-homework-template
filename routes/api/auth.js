const express = require("express");
const router = express.Router();
const {
  user: { schemas },
} = require("../../models");
const { validateBody, authenticate } = require("../../middlewares");
const ctrl = require("../../controllers");

router.get("/current", authenticate, ctrl.auth.getCurrent);

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrl.auth.register
);

router.post("/login", validateBody(schemas.registerSchema), ctrl.auth.login);

router.post("/logout", authenticate, ctrl.auth.logout);

router.patch(
  "/user",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.auth.updateSubscriptionUser
);

module.exports = router;
