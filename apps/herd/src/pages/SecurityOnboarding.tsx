import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTerm } from "@wafrivet/utils";

export default function SecurityOnboardingPage() {
  const navigate = useNavigate();
  const role = "security_company";
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-xl mx-auto py-10 space-y-8">
      <h1 className="text-2xl font-black text-gray-900">
        {getTerm("my_herd", role)} setup — step {step} of 3
      </h1>

      {step === 1 && (
        <div className="space-y-4 bg-white rounded-3xl border p-6">
          <p className="text-sm text-gray-500">Company profile (prefilled from signup where available)</p>
          <input className="w-full border rounded-xl px-4 py-3" placeholder="Company address" />
          <input className="w-full border rounded-xl px-4 py-3" placeholder="Number of active dogs" type="number" />
          <button type="button" onClick={() => setStep(2)} className="w-full py-3 bg-[#2D4D31] text-white rounded-xl font-bold">
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 bg-white rounded-3xl border p-6">
          <p className="text-sm text-gray-600">
            Each dog gets a Wafrivet {getTerm("ear_tag", role).toLowerCase()}. Tap any phone to the collar — the dog&apos;s record opens instantly.
          </p>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="tags" defaultChecked /> I need to order collar tags
          </label>
          <button type="button" onClick={() => setStep(3)} className="w-full py-3 bg-[#2D4D31] text-white rounded-xl font-bold">
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 bg-white rounded-3xl border p-6">
          <p className="font-bold">Register your first {getTerm("animal", role).toLowerCase()}</p>
          <input className="w-full border rounded-xl px-4 py-3" placeholder="Dog name" />
          <select className="w-full border rounded-xl px-4 py-3">
            <option>German Shepherd</option>
            <option>Rottweiler</option>
            <option>Belgian Malinois</option>
          </select>
          <button
            type="button"
            onClick={() => navigate("/kennel")}
            className="w-full py-3 bg-[#2D4D31] text-white rounded-xl font-bold"
          >
            {getTerm("register_animal", role)}
          </button>
        </div>
      )}

      <Link to="/kennel" className="text-sm text-gray-400 block text-center">
        Skip for now
      </Link>
    </div>
  );
}
