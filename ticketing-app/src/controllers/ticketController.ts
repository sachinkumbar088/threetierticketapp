import { Request, Response } from "express";
import Ticket from "../Ticket";

// Create a new ticket
export const createTicket = async (req: Request, res: Response) => {
  const { title, description, status } = req.body;
  const ticketNo = `TICKET-${Date.now()}`;
  const userId = req.user.id; // Assuming req.user is set by an authentication middleware

  try {
    const newTicket = new Ticket({
      ticketNo,
      title,
      description,
      status,
      userId,
    });
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Get tickets with pagination and filtering
export const getTickets = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, ...filters } = req.query;

  try {
    const tickets = await Ticket.find({ userId: req.user.id, ...filters })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Ticket.countDocuments({
      userId: req.user.id,
      ...filters,
    });
    res.json({ tickets, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Get a single ticket by ID
export const getTicketById = async (req: Request, res: Response) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket || ticket.userId.toString() !== req.user.id) {
      return res.status(404).json({ msg: "Ticket not found" });
    }
    res.json(ticket);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Update a ticket by ID
export const updateTicket = async (req: Request, res: Response) => {
  const { title, description, status } = req.body;

  try {
    let ticket = await Ticket.findById(req.params.id);
    if (!ticket || ticket.userId.toString() !== req.user.id) {
      return res.status(404).json({ msg: "Ticket not found" });
    }

    ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true }
    );

    res.json(ticket);
  } catch (err) {
    res.status(500).send("Server error");
  }
};
