import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { BsCheckSquare, BsSquare } from "react-icons/bs";
import ShareModal from "../_components/ShareModal";
import { IPetition } from "@/interfaces/Petition";

interface PetitionPageProps {
  params: { id: string };
}

interface Petition {
  id: string;
  title: string;
  description: string;
  scope: string;
  category: string;
  location: string;
  image: string;
  startedDate: string;
  petitionTo: string;
  currentSignatures: number;
  goalSignatures: number;
  weeklySignatures: number;
}

const PetitionPage = ({ params }: PetitionPageProps) => {
  const petitionId = params.id;
  const [petition, setPetition] = useState<Petition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [signature, setSignature] = useState("");
  const [displayName, setDisplayName] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPetition = async () => {
      try {
        const response = await fetch(`/api/petitions/${petitionId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch petition");
        }
        const data: Petition = await response.json();
        setPetition(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPetition();
  }, [petitionId]);

  if (!petitionId) {
    return notFound();
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-[#E8EBE4] text-[#223843] p-6">
      <h1 className="text-[#223843] text-3xl font-bold text-center mt-4 leading-snug">
        {petition.title}
      </h1>
      <p className="text-center text-sm text-gray-600 mt-2">
        <strong>Scope:</strong> {petition.scope} | <strong>Category:</strong>{" "}
        {petition.category} | <strong>Location:</strong> {petition.location}
      </p>
      <div className="mt-6 flex flex-col lg:flex-row lg:items-start lg:gap-2.5">
        <div className="lg:w-2/3">
          <img
            src={petition.image}
            alt="Petition Image"
            className="rounded-xl shadow-md"
          />
          <p className="text-[#223843] mt-4 leading-relaxed text-lg">
            {petition.description}
          </p>
        </div>

        {/* Petition Sign Box */}
        <div className="bg-white p-6 rounded-xl shadow-md lg:w-1/3">
          <h3 className="text-[#223843] font-bold text-xl">
            Sign this petition
          </h3>
          <div className="text-center">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-[#CA3C25]">
                {petition.currentSignatures.toLocaleString()}
              </span>
              <span className="text-xl font-bold text-gray-600">
                {petition.goalSignatures.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-300 h-2 rounded-full mt-1">
              <div
                className="bg-[#CA3C25] h-2 rounded-full"
                style={{
                  width: `${
                    (petition.currentSignatures / petition.goalSignatures) * 100
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-gray-700 mt-2 font-semibold">
              🤝 {petition.weeklySignatures} people signed this week
            </p>
          </div>

          {/* Signature Form */}
          <div className="mt-6">
            <h3 className="text-[#223843] font-bold text-xl">
              Sign this petition
            </h3>
            <div className="flex items-center gap-2 mt-3">
              <FaUserCircle className="text-2xl text-gray-600" />
              <span className="font-bold">Your Name</span>
              <MdModeEdit className="text-gray-500 cursor-pointer" />
            </div>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mt-3"
              placeholder="I'm signing because... (optional)"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
            />
            <div className="flex items-center gap-2 mt-2">
              <button onClick={() => setDisplayName(!displayName)}>
                {displayName ? (
                  <BsCheckSquare className="text-[#CA3C25] text-lg" />
                ) : (
                  <BsSquare className="text-gray-600 text-lg" />
                )}
              </button>
              <span className="text-gray-700">
                Display my name and comment on this petition
              </span>
            </div>
            <button
              className="w-full py-3 mt-4 bg-[#CA3C25] hover:bg-red-700 text-white text-lg font-bold rounded-lg"
              onClick={() => setIsModalOpen(true)}
            >
              Sign this petition
            </button>
          </div>
        </div>
      </div>
      <ShareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        shareUrl={`http://localhost:3000/petition/${petitionId}`}
        signatureCount={petition.currentSignatures}
      />
    </div>
  );
};

export default PetitionPage;
