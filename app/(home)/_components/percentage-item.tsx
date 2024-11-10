import { ReactNode } from "react";

interface PercentageItemProps {
  value: number;
  title: string;
  icon: ReactNode;
}
const PercentageItem = ({ value, title, icon }: PercentageItemProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="bg-white bg-opacity-[3%] rounded-lg p-2">{icon}</div>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <p className="text-sm font-bold">{value}%</p>
    </div>
  );
};

export default PercentageItem;