import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { Report } from "./models/ReportSchema.js";

const app = express();
const PORT = 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mousehealthlab.eqwzkrx.mongodb.net/`;

mongoose
  .connect(MONGO_URI, {
    dbName: "mouse_health_db",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error: ", err));

app.post("/submit_report", async (req, res) => {
  try {
    const { deviceName, doubleClicks , scrollGlitches } = req.body;
    let status = "OK";
    if (doubleClicks > 0 || scrollGlitches > 0) {
      status = "N/G";
    }
    const newReport = new Report({
      deviceName: deviceName,
      doubleClicks: doubleClicks,
      scrollGlitches: scrollGlitches,
      status: status,
    });

    await newReport.save();
    return res.status(201).send({ message: "Report has been created successfully!" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).send({message: 'Server error!'})
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
