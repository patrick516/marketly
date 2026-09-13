import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSettings, updateSettings } from "@/lib/api";
import type { StoreSettings } from "@/lib/api";

export default function Settings() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [draft, setDraft] = useState<StoreSettings | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSettings().then((data) => {
      setSettings(data);
      setDraft(data);
    });
  }, []);

  function startEditing() {
    setDraft(settings);
    setEditing(true);
  }

  function cancelEditing() {
    setDraft(settings);
    setEditing(false);
  }

  async function handleSave() {
    if (!draft) return;
    setSaving(true);
    try {
      const updated = await updateSettings(draft);
      setSettings(updated);
      setEditing(false);
      toast.success("Settings saved");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  if (!settings || !draft) {
    return <p className="text-sm text-ink-muted">Loading…</p>;
  }

  const fields: { key: keyof StoreSettings; label: string; hint?: string }[] = [
    { key: "storeName", label: "Store name" },
    {
      key: "whatsappNumber",
      label: "WhatsApp number",
      hint: "International format, no + or leading 0.",
    },
  ];

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold text-ink">Settings</h1>
        <p className="text-ink-muted text-sm mt-1">
          Store details used across the website.
        </p>
      </div>

      <div className="bg-white rounded-2xl border shadow-card p-6 space-y-5">
        {!editing ? (
          <>
            {fields.map(({ key, label }) => (
              <div key={key}>
                <p className="text-xs font-medium text-ink-muted uppercase tracking-wide">
                  {label}
                </p>
                <p className="text-base text-ink mt-1">{settings[key]}</p>
              </div>
            ))}

            <Button
              onClick={startEditing}
              variant="outline"
              className="rounded-xl gap-1.5"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
          </>
        ) : (
          <>
            {fields.map(({ key, label, hint }) => (
              <div key={key}>
                <Label htmlFor={key}>{label}</Label>
                <Input
                  id={key}
                  className="rounded-xl mt-1"
                  value={draft[key]}
                  onChange={(e) =>
                    setDraft({ ...draft, [key]: e.target.value })
                  }
                />
                {hint && <p className="text-xs text-ink-muted mt-1">{hint}</p>}
              </div>
            ))}

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={cancelEditing}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="rounded-xl bg-coral-500 hover:bg-coral-600 text-white"
              >
                {saving ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
