import { create } from "zustand";

// axios
import api from "../lib/axios";

// Toast
import { toast } from "react-toastify";

export const useTicketStore = create((set, get) => ({
  tickets: [],
  selectedTickets: [],
  ticketComments: [],
  ticketRating: null,
  selectedTicket: null,
  isCreatingTicket: false,
  showDeleteTicketsModal: false,
  isCommenting: false,

  ticketSocketListeners: (socket) => {
    // Ticket listeners
    const handleTicketCreated = (newTicket) => {
      console.log("Created ticket adding...");
      
      set({ tickets: [...get().tickets, newTicket] });
    };
    const handleTicketUpdated = (updatedTicket) => {
      set({
        tickets: get().tickets.map((ticket) =>
          ticket._id === updatedTicket._id ? updatedTicket : ticket
        ),
      });
    };
    const handleTicketDeleted = (deletedId) => {
      set({
        tickets: get().tickets.filter((ticket) => ticket._id !== deletedId),
      });
    };

    // Ticket comment listeners
    const handleTicketCommentCreated = (newTicketComment) => {
      const selectedTicket = get().selectedTicket;
      if (!selectedTicket) return;
      if (selectedTicket.ticketId === newTicketComment.ticketId) {
        set({ ticketComments: [...get().ticketComments, newTicketComment] });
      }
    };
    const handleTicketCommentDeleted = (deletedId) => {
      const selectedTicket = get().selectedTicket;
      if (!selectedTicket) return;
      set({
        ticketComments: get().ticketComments.filter(
          (comment) => comment._id !== deletedId
        ),
      });
    };

    // Ticket rating listener
    const handleTicketRatingCreated = (ticketRating) => {
      const selectedTicket = get().selectedTicket;
      if (!selectedTicket) return;
      if (selectedTicket.ticketId === ticketRating.ticketId) {
        set({ ticketRating });
      }
    };

    // Ticket socket listeners
    socket.on("ticketCreated", handleTicketCreated);
    socket.on("ticketUpdated", handleTicketUpdated);
    socket.on("ticketDeleted", handleTicketDeleted);

    // Ticket Comment socket listeners
    socket.on("ticketCommentCreated", handleTicketCommentCreated);
    socket.on("ticketCommentDeleted", handleTicketCommentDeleted);

    // Ticket Rating socket listener
    socket.on("ticketRatingCreated", handleTicketRatingCreated);
  },

  getTickets: async () => {
    try {
      const tickets = await api.get("/tickets/by-role");
      set({ tickets: tickets.data });
    } catch (error) {
      console.error(error);
    }
  },

  createTicket: async (data) => {
    try {
      set({ isCreatingTicket: true });
      await api.post("/tickets", data);
      toast.success("Ticket created successfully");
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error);
      return false;
    } finally {
      set({ isCreatingTicket: false });
    }
  },

  deleteSelectedTicket: async (ticketId) => {
    try {
      await api.delete(`/tickets/${ticketId}`);
      set({selectedTicket: null})
      toast.success("Ticket deleted successfully");
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error);
      return false;
    }
  },

  deleteSelectedTickets: async (tickets) => {
    try {
      await api.delete("/tickets/bulk-delete", {
        data: { ticketIds: tickets },
      });
      toast.success("Successfully deleted tickets");
      set({ selectedTickets: [] });
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error);
    }
  },

  fetchTicketInfo: async (id) => {
    try {
      const res = await api.get(`/tickets/${id}`);
      set({ selectedTicket: res.data });

      // Fetch selected ticket related data
      get().fetchTicketComments();
      get().fetchTicketRating();
    } catch (error) {
      console.error(error.response.data.error);
    }
  },

  changeTicketStatus: async (status) => {
    try {
      await api.patch(`/tickets/${get().selectedTicket.ticketId}`, {
        status,
      });
      toast.success(`Ticket is now "${status}"`);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error);
    }
  },

  handleToggleTicketSelection: (ticketId) => {
    const selectedTickets = get().selectedTickets;
    set({
      selectedTickets: selectedTickets.includes(ticketId)
        ? selectedTickets.filter((t) => t != ticketId)
        : [...selectedTickets, ticketId],
    });
  },

  setDeleteTicketsModal: (value) => {
    set({ showDeleteTicketsModal: value });
  },

  fetchTicketRating: async () => {
    try {
      const ticketRating = await api.get(
        `/ticket-ratings/${get().selectedTicket.ticketId}`
      );
      set({ ticketRating: ticketRating.data });
    } catch (error) {
      console.error(error);
    }
  },

  addTicketRating: async (rating, comment) => {
    try {
      if (!rating) {
        return toast.error("Please select a rating");
      }
      await api.post(`/ticket-ratings`, {
        ticketId: get().selectedTicket.ticketId,
        rating,
        comment,
      });
      toast.success("Rating submitted successfully");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error);
    }
  },

  fetchTicketComments: async () => {
    try {
      const ticketComments = await api.get(
        `/ticket-comments/${get().selectedTicket.ticketId}`
      );
      set({ ticketComments: ticketComments.data });
    } catch (error) {
      console.error(error);
    }
  },

  addTicketComment: async (comment) => {
    try {
      set({ isCommenting: true });
      const newComment = {
        ticketId: get().selectedTicket.ticketId,
        comment,
      };
      const res = await api.post(`/ticket-comments`, newComment);

      // set({ ticketComments: [...get().ticketComments, res.data] });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      set({ isCommenting: false });
    }
  },

  deleteTicketComment: async (commentId) => {
    try {
      await api.delete(`/ticket-comments/${commentId}`);
      // set({
      //   ticketComments: get().ticketComments.filter(
      //     (comment) => comment._id != commentId
      //   ),
      // });
    } catch (error) {
      console.error(error);
    }
  },
}));
