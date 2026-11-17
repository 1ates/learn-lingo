import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
  color?: string;
  onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({ name, className, size = 24, color, onClick }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      fill={color || 'currentColor'}
      stroke={color || 'currentColor'}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default', verticalAlign: 'middle' }}
    >
      <use href={`/icons.svg#icon-${name}`} />
    </svg>
  );
};
