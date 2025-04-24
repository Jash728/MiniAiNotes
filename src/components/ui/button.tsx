'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'destructive'
}

const buttonStyles = {
  default: 'bg-blue-600 hover:bg-blue-700 text-white',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
  destructive: 'bg-red-500 hover:bg-red-600 text-white',
}

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
    className={cn(
      'cursor-pointer px-4 py-2 rounded-lg font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      buttonStyles[variant],
      className
    )}
    
      {...props}
    />
  )
}


Button.displayName = 'Button'
