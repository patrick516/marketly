import { useState, useEffect } from "react";
import api from "../../../lib/api";
import type { Message } from "../../../types";
import toast from "react-hot-toast";

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMessages = async () => {
    try {
      const { data } = await api.get("/messages");
      setMessages(data);
    } catch (error) {
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await api.put(`/messages/${id}/read`);
      toast.success("Message marked as read");
      await fetchMessages();
    } catch (error) {
      toast.error("Failed to mark message as read");
      throw error;
    }
  };

  const sendReply = async (id: string, reply: string) => {
    try {
      await api.post(`/messages/${id}/reply`, { reply });
      toast.success("Reply sent successfully");
      await fetchMessages();
    } catch (error) {
      toast.error("Failed to send reply");
      throw error;
    }
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    fetchMessages();
  }, []);

  return {
    messages: filteredMessages,
    allMessages: messages,
    loading,
    searchTerm,
    setSearchTerm,
    markAsRead,
    sendReply,
    refetch: fetchMessages,
  };
};
