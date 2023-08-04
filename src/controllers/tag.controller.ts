
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Tag from "../models/tags.model";
//@Route /api/v1/restaurant/tags
//@Method GET
//@Access:  unauthenticated
export const getTags = expressAsyncHandler(
    async (req: Request, res: Response) => {
        try{
            
             const tags = await Tag.find()
            res.status(201).json({ msg: "Tags fetched", tags });
        }catch(error){
            res.status(500).send({
                message:'server error',
                error
            })
        }
    }
  );
