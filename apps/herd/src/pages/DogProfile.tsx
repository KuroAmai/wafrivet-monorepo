import { useParams, Link } from "react-router-dom";
import { getTerm } from "@wafrivet/utils";
import AnimalDetail from "./AnimalDetail";

export default function DogProfilePage() {
  const { id } = useParams();
  const role = "security_company";
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-black">{getTerm("animal", role)} profile</h1>
        <Link to={`/dogs/${id}/taps`} className="text-sm font-bold text-[#2D4D31]">
          Tap history
        </Link>
      </div>
      <AnimalDetail />
    </div>
  );
}
