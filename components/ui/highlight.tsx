import { cn } from "@/lib/utils";

type HightlightProps = React.HTMLAttributes<HTMLSpanElement>;

const Highlight: React.FunctionComponent<HightlightProps> = ({
  className,
  ...attr
}) => {
  return (
    <span
      className={cn(
        "bg-indigo-50 py-0.5 px-1 rounded-sm text-indigo-600",
        className
      )}
      {...attr}
    >
      {attr?.children}
    </span>
  );
};

export default Highlight;
