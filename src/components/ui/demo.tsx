import { ThemeToggle } from "@/components/ui/theme-toggle"

function DefaultToggle() {
    return (
        <div className="space-y-2 text-center">
            <div className="flex justify-center">
                <ThemeToggle theme="light" toggleTheme={() => { }} />
            </div>
        </div>
    )
}

export { DefaultToggle }
