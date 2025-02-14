interface ManualTitleProps {
    title: string;
    setTitle: (title: string) => void;
    nextStep: () => void;
    prevStep: () => void;
  }
  
  const ManualTitle: React.FC<ManualTitleProps> = ({ title, setTitle, nextStep, prevStep }) => {
    return (
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
        {/* Title Section */}
        <h1 className="text-3xl font-bold text-[#223843]">Write your petition title</h1>
        <p className="text-gray-600 mt-1">Tell people what you want to change.</p>
  
        {/* Petition Title Input */}
        <label className="block mt-4 font-semibold text-[#223843]">Petition title</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-[#223843] text-lg"
          maxLength={90}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Example: Save our neighborhood park from destruction"
        />
        <span className="text-gray-500 text-sm block mt-1">{90 - title.length} characters left</span>
  
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            className="px-5 py-2 bg-[#E8EBE4] text-[#223843] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-200"
            onClick={prevStep}
          >
            Back
          </button>
  
          <button
            className={`px-5 py-2 rounded-lg font-semibold shadow-md transition duration-200 ${
              title.trim()
                ? "bg-[#CA3C25] text-white hover:bg-red-700"
                : "bg-[#CA3C25] text-white cursor-not-allowed"
            }`}
            onClick={nextStep}
            disabled={!title.trim()}
          >
            Continue
          </button>
        </div>
  
        {/* Tips Section */}
        <div className="mt-6 p-4 bg-[#E8EBE4] rounded-lg">
          <h2 className="text-lg font-semibold text-[#223843]">Tips</h2>
          <ul className="mt-2 text-gray-700 text-sm space-y-2">
            <li>
              <span className="font-bold">Keep it short and to the point</span><br />
              Example: "Buy organic, free-range eggs for your restaurants."
            </li>
            <li>
              <span className="font-bold">Focus on the solution</span><br />
              Example: "Raise the minimum wage to ₹300 a day."
            </li>
            <li>
              <span className="font-bold">Communicate urgency</span><br />
              Example: "Approve life-saving medication for my daughter's insurance before it’s too late."
            </li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default ManualTitle;
  