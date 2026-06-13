import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type PublicProfile = {
  dogName: string;
  breed?: string | null;
  kId: string;
  companyName: string;
  emergencyContactPhone?: string | null;
};

export default function PublicDogProfilePage() {
  const { kId } = useParams();
  const [profile, setProfile] = useState<PublicProfile | null>(null);

  useEffect(() => {
    if (!kId) return;
    const base = import.meta.env.VITE_API_URL ?? "";
    fetch(`${base}/api/v1/nfc/k/${encodeURIComponent(kId)}`)
      .then((r) => r.json())
      .then(setProfile)
      .catch(() => setProfile(null));
  }, [kId]);

  if (!profile) {
    return <p className="p-8 text-center text-gray-500">Loading public profile…</p>;
  }

  return (
    <div className="min-h-screen bg-[#f7f9f7] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl border p-8 space-y-4 text-center">
        <p className="text-xs font-black uppercase tracking-widest text-gray-400">{profile.kId}</p>
        <h1 className="text-2xl font-black">{profile.dogName}</h1>
        {profile.breed ? <p className="text-gray-600">{profile.breed}</p> : null}
        <p className="text-sm text-gray-500">This dog belongs to {profile.companyName}</p>
        {profile.emergencyContactPhone ? (
          <a href={`tel:${profile.emergencyContactPhone}`} className="block py-3 bg-[#2D4D31] text-white rounded-xl font-bold">
            Emergency contact
          </a>
        ) : null}
      </div>
    </div>
  );
}
