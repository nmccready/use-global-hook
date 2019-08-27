import React from 'react';
import Logo from './_logo';

export default ({ size = 1024 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 12"
    width={size}
    height={size / 2}
    fill="none"
    stroke="currentcolor"
  >
    <rect width={24} height={12} stroke="none" fill="black" />
    <g transform="translate(8, 2)">
      <Logo size={8} />
    </g>
  </svg>
);
