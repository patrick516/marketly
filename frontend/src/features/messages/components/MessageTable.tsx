import React from "react";
import { Mail, CheckCircle, Reply, Eye, FileText } from "lucide-react";
import type { Message } from "../../../types";

interface MessageTableProps {
  messages: Message[];
  onView: (message: Message) => void;
  onMarkAsRead: (id: string) => void;
  onQuotation: (message: Message) => void;
}

const MessageTable: React.FC<MessageTableProps> = ({
  messages,
  onView,
  onMarkAsRead,
  onQuotation,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <Mail size={12} className="mr-1" /> New
          </span>
        );
      case "Read":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <CheckCircle size={12} className="mr-1" /> Read
          </span>
        );
      case "Replied":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Reply size={12} className="mr-1" /> Replied
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  if (messages.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">No messages found</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              NAME
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              EMAIL
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              SUBJECT
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              DATE
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              STATUS
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {messages.map((message) => (
            <tr key={message._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {message.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {message.email}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {message.subject}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(message.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">{getStatusBadge(message.status)}</td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  {message.status === "New" && (
                    <button
                      onClick={() => onMarkAsRead(message._id)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Mark as read"
                    >
                      <CheckCircle size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => onView(message)}
                    className="text-gray-600 hover:text-gray-800"
                    title="View details"
                  >
                    <Eye size={18} />
                  </button>
                  {message.status !== "Replied" && (
                    <button
                      onClick={() => onQuotation(message)}
                      className="text-green-600 hover:text-green-800"
                      title="Create Quotation"
                    >
                      <FileText size={18} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MessageTable;
