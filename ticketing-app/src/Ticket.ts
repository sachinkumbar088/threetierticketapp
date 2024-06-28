// Ticket.ts
import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  ticketNo: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["New", "In Progress", "Close"],
    default: "New",
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Ticket", TicketSchema);
