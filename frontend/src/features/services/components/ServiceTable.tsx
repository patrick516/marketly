import React from "react";
import { Edit, Trash2 } from "lucide-react";
import type { Service } from "../../../types";

interface ServiceTableProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
}

const ServiceTable: React.FC<ServiceTableProps> = ({
  services,
  onEdit,
  onDelete,
}) => {
  if (services.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No services found. Click "Add New Service" to get started.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Service Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Price (ZAR)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Date Added
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {services.map((service) => (
            <tr key={service._id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {service.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {service.description.substring(0, 50)}...
                  </p>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {service.category}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                R{service.price.toLocaleString()}.00
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    service.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {service.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(service.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(service)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(service._id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;
