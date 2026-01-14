import { ReactNode } from "react";

interface PagePlaceholderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

export function PagePlaceholder({
  title,
  description,
  icon,
}: PagePlaceholderProps) {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-20 md:py-32">
      <div className="flex flex-col items-center justify-center text-center">
        {icon && <div className="mb-6 text-6xl opacity-50">{icon}</div>}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            {description}
          </p>
        )}
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
      </div>
    </div>
  );
}
