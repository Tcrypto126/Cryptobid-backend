import express from "express";
const router = express.Router();
import {SomeUserFunction} from "../controllers/UserController";

router.get("/", SomeUserFunction);
//router.post('/login',login);

export=router;
