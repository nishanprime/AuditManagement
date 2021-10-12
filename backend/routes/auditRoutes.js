import express from "express";
import {
  authClient,
  clientDelete,
  createClient,
  fetchClients,
  getClientDetails,
  updateClient,
} from "../controller/clientController.js";
import { authUser } from "../controller/userController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/login").post(authClient);



router
  .route("/")
  .post(protect, isAdmin, createClient)
  .get(protect, isAdmin, fetchClients);
router
  .route("/:id")
  .put(protect, isAdmin, updateClient)
  .get(protect, isAdmin, getClientDetails);
router.route("/:id").delete(protect, isAdmin, clientDelete);
// router.route("/image/:id").delete(protect,isAdmin,imageDelete)
export default router;
