import {
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { Alert, AlertDescription } from "./ui/alert";

export default function BFAlert({
  variant,
  text,
  show,
}: {
  variant: "default" | "destructive" | null | undefined;
  text: string;
  show: boolean;
}) {
  return show ? (
    <Alert variant={variant} className="p-2 flex items-center mb-2">
      <div className="mr-2">
        {variant === "destructive" && (
          <ExclamationTriangleIcon className="h-4 w-4" />
        )}
        {variant === "default" && <InfoCircledIcon />}
      </div>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  ) : null;
}
