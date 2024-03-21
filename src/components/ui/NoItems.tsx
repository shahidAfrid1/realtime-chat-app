import { CopyX } from "lucide-react";

const NoItems = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-5 max-w-56 mx-auto my-10">
      <div className="p-5 border-2 border-gray-200 rounded-full">
        <CopyX className="w-10 h-10 text-gray-400" />
      </div>
      <p className="text-gray-900 text-sm text-center">
        You don&apos;t have any items yet to show here.
      </p>
    </div>
  );
};

export default NoItems;
