import { toast as hotToast } from "react-hot-toast";

export function toast({
  title,
  description,
  variant = "default",
}: {
  title: string;
  description?: string;
  variant?: "default" | "success" | "error";
}) {
  const content = (
    <div className="flex flex-col gap-1">
      <span className="font-semibold">{title}</span>
      {description && (
        <span className="text-sm text-muted-foreground">{description}</span>
      )}
    </div>
  );

  switch (variant) {
    case "success":
      hotToast.success(content);
      break;
    case "error":
      hotToast.error(content);
      break;
    default:
      hotToast(content);
      break;
  }
}
