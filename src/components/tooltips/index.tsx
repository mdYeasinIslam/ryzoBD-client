import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  children: React.ReactNode;
  message: string;
};

export function TooltipMessage(props: Props) {
  const { children, message } = props;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="bg-muted text-muted-foreground text-sm">
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
