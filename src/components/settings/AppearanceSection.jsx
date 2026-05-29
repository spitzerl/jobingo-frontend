import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export default function AppearanceSection() {
  const { highContrast, toggleHighContrast } = useTheme();

  return (
    <section className="space-y-4 border border-border/60 rounded-lg p-5">
      <div>
        <h2 className="text-[15px] font-medium">Accessibilité</h2>
        <p className="text-[13px] text-muted-foreground mt-0.5">
          Options pour améliorer la lisibilité de l’interface.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
        <div className="space-y-0.5">
          <p className="text-[13px] font-medium">Contraste élevé</p>
          <p className="text-[12px] text-muted-foreground">
            Renforce la lisibilité du thème actuel.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[12px] text-muted-foreground">
            {highContrast ? "Activé" : "Désactivé"}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={highContrast}
            onClick={toggleHighContrast}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full border transition-colors",
              highContrast
                ? "bg-primary border-primary"
                : "bg-muted border-border",
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-background shadow transition-transform",
                highContrast ? "translate-x-5" : "translate-x-1",
              )}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
