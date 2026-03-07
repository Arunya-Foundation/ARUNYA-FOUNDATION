"use client"

import { Moon, Sun } from "lucide-react"

interface ThemeToggleProps {
    className?: string;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export function ThemeToggle({ className, theme, toggleTheme }: ThemeToggleProps) {
    const isDark = theme === "dark"

    return (
        <div
            className={[
                "relative flex items-center w-14 h-7 rounded-full cursor-pointer transition-all duration-500 ease-in-out",
                className
            ].filter(Boolean).join(" ")}
            onClick={toggleTheme}
            role="button"
            tabIndex={0}
            aria-label="Toggle theme"
            style={{
                background: isDark
                    ? 'linear-gradient(135deg, #1e293b, #0f172a)'
                    : 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}`,
                boxShadow: isDark
                    ? 'inset 0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)'
                    : 'inset 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)',
            }}
        >
            {/* Sliding indicator */}
            <div
                className="absolute w-6 h-6 rounded-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] flex items-center justify-center"
                style={{
                    left: isDark ? 'calc(100% - 26px)' : '2px',
                    background: isDark
                        ? 'linear-gradient(135deg, #38bdf8, #0ea5e9)'
                        : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    boxShadow: isDark
                        ? '0 0 12px rgba(56, 189, 248, 0.5), 0 2px 4px rgba(0,0,0,0.3)'
                        : '0 0 12px rgba(245, 158, 11, 0.4), 0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                {isDark ? (
                    <Moon className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                ) : (
                    <Sun className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                )}
            </div>
        </div>
    )
}
