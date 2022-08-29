// import e, { NextFunction, Request, Response } from "express";

// import User from "../models/User";
// import getUserID from "../utils/get-userID";

// //to add : Proper user interface
// export const loggedIn = async (
//   req: Request & { user?: Record<string, any> },
//   res: Response,
//   next: NextFunction
// ) => {
//   let token: string;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       const user = await User.findById(getUserID(token)).select("-password");

//       if (!user) {
//         res.status(401).json("Unauthorized");
//       }
//       req.user = user;
//      //console.log(req.user);
      
//       next();
//     } catch (error) {
//       res.status(401).send('unauthorized');
//       throw new Error("Unauthorized");
//     }
//   }else{
//     res.status(401).send('Invalid token format');
//   }
// };
