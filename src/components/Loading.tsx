import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  width?: number;
}

const Loading: React.FC<LoadingProps> = ({ width }) => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: Math.round((width ?? 600) / 1.375) }}
    >
      <Loader2 className="size-8 text-neutral-500 animate-spin" />
    </div>
  );
};

export default Loading;
