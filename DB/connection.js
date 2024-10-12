import { connect } from "mongoose";

export const connectDB = async () => {
  return await connect(process.env.CONNECTION_URL)
    .then(() => console.log("Connection Done Successfully"))
    .catch(() => console.log("Connection Faild"));
};
