import { AnyZodObject } from "zod";
import asyncFunc from "../utils/asyncFunc";
import { NextFunction, Request, Response } from "express";

const validateRequest = (schema: AnyZodObject) => {
    return asyncFunc(async (req: Request, res: Response, next:NextFunction) => {
        const validatation = await schema.parseAsync(req.body)
        req.body = validatation
        next()
    })
}
export default validateRequest