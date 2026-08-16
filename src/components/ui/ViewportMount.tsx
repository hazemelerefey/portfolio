'use client';

import { useEffect, useRef, useState } from 'react';

interface ViewportMountProps {
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
  rootMargin?: string;
}

/**
 * Mounts expensive content shortly before it enters the viewport. The wrapper
 * reserves its intended space so the surrounding portfolio composition does
 * not jump while the deferred client component loads.
 */
export function ViewportMount({
  children,
  className,
  minHeight,
  rootMargin = '900px 0px',
}: ViewportMountProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsNearViewport(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={!isNearViewport && minHeight ? { minHeight } : undefined}
    >
      {isNearViewport ? children : null}
    </div>
  );
}
