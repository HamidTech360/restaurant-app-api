import { verify } from "jsonwebtoken";

const getUserID = (token: string) => {
  // if(!token)  throw new Error('No token provided')

  try {
    const payload: any = verify(token, process.env.JWT_SECRET || "");
    return payload.sub;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);     
      return null;
    }
  }
};
export default getUserID;
