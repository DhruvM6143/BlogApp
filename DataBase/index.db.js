import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionINstance = await mongoose.connect(`${process.env.DB_URI}`);
        console.log(`\n MOngoDb connected!! DB HOST : ${connectionINstance.connection.host}`);


    } catch (error) {
        console.log("MongoDb connection failed", error);
        process.exit(1);
    }
}
export default connectDB;