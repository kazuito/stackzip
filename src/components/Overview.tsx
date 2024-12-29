import Image from "next/image";

type Props = {
  repo?: GitHubRepo;
};

const Overview = ({ repo }: Props) => {
  return (
    <>
      <div className="pt-4 pb-4 sticky top-0 bg-gradient-to-b from-slate-950 to-transparent text-slate-200 text-2xl font-semibold flex items-center">
        <a
          href={repo?.owner?.html_url}
          className="flex items-center"
          target="_blank"
        >
          <Image
            src={repo?.owner?.avatar_url ?? ""}
            alt=""
            className="w-8 h-8 rounded-full mr-3"
            width={124}
            height={124}
          />
          {repo?.owner.login}
        </a>
        <span className="text-slate-600 text-xl px-2">/</span>
        <a href={repo?.html_url} target="_blank">
          {repo?.name}
        </a>
      </div>
      <div className="">
        <p className="text-slate-200 text-sm">
          {repo?.description ?? "No description"}
        </p>
      </div>
    </>
  );
};

export default Overview;
