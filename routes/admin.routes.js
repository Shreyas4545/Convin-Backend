import express from "express";
const router = express.Router();
import {details, login, signup , update_user , delete_user, update_category, update_time} from "../Controllers/admin.controller.js"
router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/get-users").get(details);
router.route("/delete_user").put(delete_user);
router.route("/update_user").put(update_user);
router.route("/update_category").put(update_category)
router.route("/update_time").put(update_time);
export default router;