import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 5000,
        className:
          "bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white border border-border rounded-lg p-4 shadow-lg",
        success: {
          className:
            "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 border border-green-500",
        },
        error: {
          className:
            "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 border border-red-500",
        },
      }}
    />
  );
}
