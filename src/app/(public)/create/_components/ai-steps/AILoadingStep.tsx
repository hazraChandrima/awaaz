"use client";

export default function AILoadingStep() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <p className="text-lg font-semibold">Generating your petition...</p>
      <div className="mt-4 w-12 h-12 border-4 border-[#CA3C25] border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-sm text-gray-600 max-w-md">
        AI is powerful but not perfect—it may generate content with errors. Please review your petition to ensure accuracy before proceeding.
      </p>
    </div>
  );
}
