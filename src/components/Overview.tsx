type Props = {
  basics: ProjectBasics;
};

const Overview = ({ basics }: Props) => {
  return (
    <div className="mt-2">
      <a href={basics.url} className="text-slate-200 text-2xl font-semibold hover:underline" target="_blank">
        {basics.owner}
        <span className="text-slate-600 text-xl px-2">/</span>
        {basics.name}
      </a>
    </div>
  );
};

export default Overview;
