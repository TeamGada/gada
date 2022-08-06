import React, { SVGProps } from 'react';

const ClockIcon = ({
    height = '12px',
    width = '12px',
    color = '#9C9C9C',
    ...props
}: SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height}
      viewBox="0 0 12 12" 
      fill="none"
      {...props}
    >
        <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke={color} strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 3V5.66667L7 7" stroke={color} strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export default ClockIcon;