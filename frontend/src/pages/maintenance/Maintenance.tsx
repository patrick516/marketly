// src/pages/maintenance/Maintenance.tsx
import { Lock, AlertTriangle, DollarSign, Clock } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        {/* WARNING BADGE */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full">
            <Lock className="w-3 h-3" />
            Official Developer Notice
          </span>
        </div>

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-600/10 border border-red-500/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-9 h-9 text-red-400" />
          </div>
        </div>

        {/* HEADING */}
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-4 leading-snug">
          Admin Panel Access Suspended
        </h1>

        {/* MAIN NOTICE */}
        <div className="bg-red-950/30 border border-red-500/20 rounded-2xl p-5 mb-4 text-center">
          <p className="text-red-300 text-sm leading-relaxed">
            This admin panel has been temporarily suspended by the{" "}
            <span className="font-semibold text-red-200">
              contracted developer
            </span>
            . Administrative access has been restricted pending the settlement
            of{" "}
            <span className="font-semibold text-red-200">
              outstanding invoices
            </span>{" "}
            for professional web development services rendered. This action is
            in accordance with standard developer contractual rights.
          </p>
        </div>

        {/* ADMIN NOTICE */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-6">
          <div className="flex items-start gap-3 mb-3">
            <DollarSign className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white text-sm font-medium mb-1">
                Administrator Notice:
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                This admin dashboard is currently locked. To restore access,
                please settle the outstanding development fees. The system will
                automatically reactivate within 24 hours of payment
                confirmation.
              </p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-800">
            <p className="text-gray-500 text-xs text-center">
              For payment arrangements or inquiries, contact the development
              team directly.
            </p>
          </div>
        </div>

        {/* ACTION REQUIRED */}
        <div className="flex items-center justify-center gap-3 bg-red-950/20 border border-red-500/20 rounded-xl p-4 mb-6">
          <Clock className="w-4 h-4 text-red-400" />
          <span className="text-red-400 text-sm font-medium">
            Action Required: Payment Settlement
          </span>
        </div>

        {/* FOOTER NOTE */}
        <p className="text-gray-600 text-xs text-center mt-4 leading-relaxed">
          Full admin access will be restored within 24 hours of payment
          confirmation.
          <br />
          This notice will be removed automatically upon resolution.
        </p>
      </div>
    </div>
  );
}
