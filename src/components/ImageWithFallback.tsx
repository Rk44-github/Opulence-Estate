import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  priority?: boolean;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackTitle,
  priority = false,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200 text-neutral-500 p-6 text-center ${className}`}
      >
        <Building2 className="w-8 h-8 mb-2 stroke-[1.5] text-neutral-400" aria-hidden="true" />
        <span className="text-xs font-medium text-neutral-600">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
