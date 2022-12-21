import mongoose from 'mongoose';

const dbConnect = () => {
    if (mongoose.connection.readyState >= 1) {
        return
    }

    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => { console.log("Successfully connected to MongoDB") }).catch((err) => { console.log("Error connecting to MongoDB, Error:", err) })

}

export default dbConnect