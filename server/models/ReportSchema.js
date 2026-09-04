import mongoose from "mongoose";

const mouseReportSchema = new mongoose.Schema({
  deviceName: { type: String, required: true },
  doubleClicks: { type: Number, default: 0 },
  scrollGlitches: { type: Number, default: 0 },
  status: { type: String, enum: ["OK", "N/G"] },
  createdAt: { type: Date, default: Date.now },
});

export const Report = mongoose.model("Report", mouseReportSchema);
