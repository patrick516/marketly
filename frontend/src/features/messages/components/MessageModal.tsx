import React from "react";
import { X, Send, FileText } from "lucide-react";
import type { Message } from "../../../types";

interface MessageModalProps {
  message: Message | null;
  onClose: () => void;
  onReply: (e: React.FormEvent) => void;
  replyText: string;
  setReplyText: (text: string) => void;
  replying: boolean;
  onQuotation?: (message: Message) => void;
}

const MessageModal: React.FC<MessageModalProps> = ({
  message,
  onClose,
  onReply,
  replyText,
  setReplyText,
  replying,
  onQuotation,
}) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-gray-800">
            Message Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase font-medium">
                From
              </label>
              <p className="text-gray-900 font-medium mt-1">{message.name}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase font-medium">
                Email
              </label>
              <p className="text-gray-900 mt-1">{message.email}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase font-medium">
                Phone
              </label>
              <p className="text-gray-900 mt-1">
                {message.phone || "Not provided"}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase font-medium">
                Received
              </label>
              <p className="text-gray-900 mt-1">
                {new Date(message.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="col-span-2">
              <label className="text-xs text-gray-500 uppercase font-medium">
                Subject
              </label>
              <p className="text-gray-900 font-medium mt-1">
                {message.subject}
              </p>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 uppercase font-medium">
              Message
            </label>
            <div className="mt-2 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap">
                {message.message}
              </p>
            </div>
          </div>

          {message.reply && (
            <div>
              <label className="text-xs text-gray-500 uppercase font-medium">
                Your Reply
              </label>
              <div className="mt-2 p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {message.reply}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Replied on: {new Date(message.repliedAt).toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {message.status !== "Replied" && (
            <div className="border-t border-gray-200 pt-4 mt-4">
              {/* Create Quote Button */}
              {onQuotation && (
                <div className="mb-4">
                  <button
                    onClick={() => onQuotation(message)}
                    className="w-full mb-3 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <FileText size={18} />
                    Create Quotation
                  </button>
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">OR</span>
                    </div>
                  </div>
                </div>
              )}

              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Reply to Customer
              </label>
              <form onSubmit={onReply}>
                <textarea
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  placeholder="Type your reply here..."
                />
                <div className="flex gap-3 mt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={replying}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    {replying ? "Sending..." : "Send Reply"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
