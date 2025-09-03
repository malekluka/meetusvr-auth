import React from "react"
import clsx from "clsx"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  fullWidth?: boolean
}

export function Button({ loading, fullWidth, className, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded px-4 py-2 font-semibold bg-indigo-600 text-white shadow hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors",
        fullWidth && "w-full",
        className
      )}
    >
      {loading && (
        <svg
          className="h-4 w-4 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}
