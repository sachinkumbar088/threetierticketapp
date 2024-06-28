import { Router } from "express";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
} from "../controllers/ticketController";
import auth from "../middleware/auth"; // Assuming you have an auth middleware for authentication

const router = Router();

router.post("/tickets", auth, createTicket);
router.get("/tickets", auth, getTickets);
router.get("/tickets/:id", auth, getTicketById);
router.put("/tickets/:id", auth, updateTicket);

export default router;
