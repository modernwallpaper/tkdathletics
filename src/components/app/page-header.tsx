export const PageHeader = ({ label }: { label: string }) => {
  return <p className="text-2xl font-semibold">{label}</p>;
};

export const SmallPageHeader = ({ label }: { label: string }) => {
  return <p className="text-xl font-semibold">{label}</p>;
};
