import { cn } from "@/lib/utils";

type HightlightProps = React.HTMLAttributes<HTMLSpanElement>;

const Highlight: React.FunctionComponent<HightlightProps> = ({
  className,
  ...attr
}) => {
  return (
    <span
      className={cn(
        "rounded-sm bg-indigo-50 px-1 py-0.5 text-indigo-600",
        className
      )}
      {...attr}
    >
      {attr?.children}
    </span>
  );
};

export default Highlight;
