"use client";

import clsx from "clsx";
import { ImSpinner10 } from "react-icons/im";
import Button, { ButtonProps } from "./Button";

// 1) Narrow ButtonProps to just the "button" variant
type ButtonOnlyProps = Extract<ButtonProps, { as?: "button" }>;

// 2) ActionButton extras
type ActionButtonBase = {
  isLoading?: boolean;
  loadingText?: string;
  overlay?: boolean; // dim container with overlay while loading
  wrapperClassName?: string; // classes for the outer wrapper
  buttonClassName?: string; // extra classes for the inner Button
};

// 3) Final props = button-only + extras
type ActionButtonProps = ActionButtonBase & ButtonOnlyProps;

function ActionButton({
  isLoading = false,
  loadingText = "Working…",
  overlay = false,
  wrapperClassName,
  buttonClassName,
  children,
  icon,
  // We force/assume the button variant; default to "button"
  as = "button",
  ...btnProps
}: ActionButtonProps) {
  // ButtonOnlyProps may include `disabled` already; combine with loading
  const externallyDisabled =
    (btnProps as { disabled?: boolean }).disabled ?? false;
  const effectiveDisabled = externallyDisabled || isLoading;

  // Respect fullWidth if your Button supports it
  const fullWidth = (btnProps as { fullWidth?: boolean }).fullWidth;
  const composedButtonClass = clsx(
    fullWidth && "w-full",
    buttonClassName,
    overlay && isLoading && "text-transparent", // 👈 hide label under overlay
  );

  return (
    <div className={clsx("relative", wrapperClassName)}>
      {/* Optional blocking overlay */}
      {overlay && isLoading && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-gray-200/60"
          aria-hidden
        >
          <span className="mr-2 text-hca-yellow-dark">{loadingText}</span>
          <ImSpinner10 className="h-5 w-5 animate-spin text-hca-yellow-dark" />
        </div>
      )}

      <Button
        {...(btnProps as ButtonOnlyProps)}
        as={as}
        disabled={effectiveDisabled}
        aria-disabled={effectiveDisabled}
        aria-busy={isLoading}
        className={composedButtonClass}
      >
        {isLoading ? (
          // 🔁 Loading state: show ONLY loading text
          <span className="inline-flex items-center">
            {/* If no overlay, show spinner next to text.
                If overlay, spinner is already in the overlay above. */}
            {!overlay && <ImSpinner10 className="mr-2 h-4 w-4 animate-spin" />}
            {loadingText}
          </span>
        ) : (
          // ✅ Normal state: show original content
          <>
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
          </>
        )}
      </Button>
    </div>
  );
}

export default ActionButton;
