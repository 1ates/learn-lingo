import React, { useEffect, useState } from 'react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  fill?: string;
  stroke?: string;
  onClick?: () => void;
}

// Global cache for sprite HTML content and parsed symbol data
let spriteHtmlCache: string | null = null;
const symbolCache: Record<string, { viewBox: string; innerHTML: string }> = {};

export const Icon: React.FC<IconProps> = ({
  name,
  className,
  size = 24,
  width,
  height,
  color,
  fill,
  stroke,
  onClick,
}) => {
  const w = width || size;
  const h = height || size;
  const [symbolData, setSymbolData] = useState<{ viewBox: string; innerHTML: string } | null>(
    symbolCache[name] || null
  );

  useEffect(() => {
    if (symbolCache[name]) {
      setSymbolData(symbolCache[name]);
      return;
    }

    const loadSprite = async () => {
      if (!spriteHtmlCache) {
        try {
          const res = await fetch('/icons.svg');
          spriteHtmlCache = await res.text();
        } catch (err) {
          console.error('Failed to load icons.svg', err);
          return;
        }
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(spriteHtmlCache, 'image/svg+xml');
      const symbol = doc.getElementById(`icon-${name}`);
      if (symbol) {
        const viewBox = symbol.getAttribute('viewBox') || '0 0 24 24';
        const innerHTML = symbol.innerHTML;
        const data = { viewBox, innerHTML };
        symbolCache[name] = data;
        setSymbolData(data);
      }
    };

    loadSprite();
  }, [name]);

  return (
    <svg
      className={className}
      width={w}
      height={h}
      viewBox={symbolData?.viewBox || '0 0 24 24'}
      fill={fill !== undefined ? fill : (color || 'none')}
      stroke={stroke !== undefined ? stroke : (color || 'none')}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default', verticalAlign: 'middle' }}
      dangerouslySetInnerHTML={symbolData ? { __html: symbolData.innerHTML } : undefined}
    />
  );
};
