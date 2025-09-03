import React from "react"

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export function Input({ label, error, ...props }: Props) {
  return (
    <label className="block space-y-1">
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
      <input
        className={`w-full rounded border px-3 py-2 ${
          error ? "border-red-400" : "border-gray-200"
        }`}
        {...props}
      />
      {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
    </label>
  )
}
