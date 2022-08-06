import React, { SVGProps } from 'react';

const PlusIcon = ({
    height = '36px',
    width = '36px',
    color = '#4A8AF7',
    ...props
}: SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height}
      viewBox="0 0 36 36" 
      fill="none"
      {...props}
    >
        <path d="M18 34V18M18 18V2M18 18H34M18 18H2" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    </svg>
)

export default PlusIcon;
