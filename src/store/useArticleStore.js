import { create } from "zustand";

// axios
import api from "../lib/axios";

// Toast
import { toast } from "react-toastify";

export const useArticleStore = create((set, get) => ({
  articles: [],
  selectedArticle: null,
  showDeleteArticleModal: false,
  recentSelectedArticleRating: 0,

  getArticles: async () => {
    try {
      const articles = await api.get("/knowledge-base");
      set({ articles: articles.data });
    } catch (error) {
      console.error(error);
    }
  },

  articleSocketListeners: (socket) => {
    const handleArticleCreated = (newArticle) => {
      set({ articles: [...get().articles, newArticle] });
    };

    const handleArticleUpdated = (updatedArticle) => {
      set({
        articles: get().articles.map((article) =>
          article._id === updatedArticle._id ? updatedArticle : article
        ),
      });
    };
    const handleArticleDeleted = (deletedId) => {
      set({
        articles: get().articles.filter((article) => article._id !== deletedId),
      });
    };

    socket.on("articleCreated", handleArticleCreated);
    socket.on("articleUpdated", handleArticleUpdated);
    socket.on("articleDeleted", handleArticleDeleted);
  },

  createArticle: async (data) => {
    try {
      await api.post("/knowledge-base", data);
      toast.success("Created article successfully");
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error);
      return false;
    }
  },

  updateArticle: async (slug, updatedFields) => {
    try {
      await api.put(`/knowledge-base/${slug}`, updatedFields);
      toast.success("Updated article successfully");
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error);
      return false;
    }
  },

  deleteArticle: async (slug) => {
    try {
      await api.delete(`/knowledge-base/${slug}`);
      toast.success("Deleted article successfully");
      set({ selectedArticle: null });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error);
    }
  },

  fetchArticleInfo: async (slug) => {
    try {
      const res = await api.get(`/knowledge-base/${slug}`);
      set({ selectedArticle: res.data });
      get().getRecentRating();
      get().submitViewedArticle();
    } catch (error) {
      console.error(error);
    }
  },

  submitArticleRating: async (rating) => {
    try {
      await api.post(`/article-ratings`, {
        articleId: get().selectedArticle._id,
        rating,
      });
      toast.success("Rated article successfully");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error);
    }
  },

  getRecentRating: async () => {
    try {
      const rating = await api.get(
        `/article-ratings/${get().selectedArticle._id}`
      );
      set({ recentSelectedArticleRating: rating.data });
    } catch (error) {
      console.error(error);
    }
  },

  submitViewedArticle: async () => {
    try {
      const res = await api.post(`/article-views`, {
        articleId: get().selectedArticle._id,
      });
    } catch (err) {
      console.error("Error creating view article:", err);
    }
  },

  setShowDeleteArticleModal: (value) => {
    set({ showDeleteArticleModal: value });
  },

  setSelectedArticle: (selectedArticle) => {
    set({ selectedArticle });
  },
}));
