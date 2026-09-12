import { useState, useEffect } from "react";
import api from "../../lib/api";
import type { Service } from "../../types";
import toast from "react-hot-toast";

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchServices = async () => {
    try {
      const { data } = await api.get("/services");
      setServices(data);
    } catch (error) {
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  const createService = async (serviceData: any) => {
    try {
      const { data } = await api.post("/services", serviceData);
      toast.success("Service created successfully");
      await fetchServices();
      return data;
    } catch (error) {
      toast.error("Failed to create service");
      throw error;
    }
  };

  const updateService = async (id: string, serviceData: any) => {
    try {
      const { data } = await api.put(`/services/${id}`, serviceData);
      toast.success("Service updated successfully");
      await fetchServices();
      return data;
    } catch (error) {
      toast.error("Failed to update service");
      throw error;
    }
  };

  const deleteService = async (id: string) => {
    try {
      await api.delete(`/services/${id}`);
      toast.success("Service deleted successfully");
      await fetchServices();
    } catch (error) {
      toast.error("Failed to delete service");
      throw error;
    }
  };

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services: filteredServices,
    allServices: services, // Expose all services for autocomplete
    loading,
    searchTerm,
    setSearchTerm,
    createService,
    updateService,
    deleteService,
    refetch: fetchServices,
  };
};
