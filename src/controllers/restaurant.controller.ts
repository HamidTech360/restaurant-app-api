import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Restaurant from "../models/restaurant.model";


//@Route /api/v1/restaurant
//@Method POST
//@Access:  unauthenticated
export const createRestaurant = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { name, recipes, ratings, star } = req.body;

      const restaurant = await Restaurant.create({
        name,
        recipes,
        ratings,
        star
      });
  

      res.status(201).json({ msg: "Restaurant created", restaurant });
    }
  );

//@Route /api/v1/restaurant
//@Method GET
//@Access: unauthenticated
export const getRestaurants = expressAsyncHandler(
    async (req:Request, res:Response)=>{
        try{
            const {recipe,  sortBy} = req.query
            const totalRestaurants= await Restaurant.countDocuments()
            
            console.log(recipe);
            
            
            const restaurants = await Restaurant.find( 
                    //@ts-ignore
                  recipe &&  { recipes: { $in: recipe }  }, 
            )
            .sort({ 
                ...(sortBy=='newest' && { createdAt:-1 }), 
                ...(sortBy=='ratings' && { ratings:-1 }),
                ...(sortBy=='star' && { star:-1 })
            })
            res.json({
                message:'Restaurant fetched successfully',
                restaurants,
                totalRestaurants,   
            })

        }catch(error){
            res.status(500).send({
                message:'Server Error' ,
                error 
            }) 
        }
    }
)

//@Route /api/v1/restaurant/search
//@Method GET
//@Access:  unauthenticated
export const searchRestaurant = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { keyword } = req.query;

      const restaurants = await Restaurant.find(
          { name: { $regex: keyword, $options: "i" } }   
      )
  

      res.status(201).json({ msg: "Restaurant fetched", restaurants });
    }
  );



