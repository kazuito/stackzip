import { Loader2Icon } from "lucide-react";

const Loading = async () => {
  return (
    <div className="h-[100dvh] grid place-content-center">
      <div className="flex items-center gap-2">
        <Loader2Icon className="size-4 animate-spin" />
        Loading packages...
      </div>
    </div>
  );
};

export default Loading;
