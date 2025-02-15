import { NextFunction, Request, Response } from "express";
import User from "../models/User";

async function SomeUserFunction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(200).json({ message: "Hello World" });
}

export { SomeUserFunction };