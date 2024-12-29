import { cn } from "@/lib/utils";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";

type Props = {
  targetId: string;
};

const CodeCopyBtn = ({ targetId }: Props) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    const target = document.getElementById(targetId);

    if (target && !copied) {
      navigator.clipboard.writeText(target.innerText);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <button
      className={cn(
        "absolute right-1.5 top-1.5 p-1.5 bg-zinc-900 bg-opacity-50 rounded-md opacity-0 group-hover:opacity-100 transition-all text-zinc-400 hover:text-zinc-300 active:scale-90",
        copied && "!opacity-100 scale-[1.15] active:scale-[1.1]"
      )}
      onClick={copy}
    >
      {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
    </button>
  );
};

export default CodeCopyBtn;
