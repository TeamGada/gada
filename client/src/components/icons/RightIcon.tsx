import React, { SVGProps } from 'react';

const RightIcon = ({
    height = '24px',
    width = '15px',
    color = '#666666',
    ...props
}: SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height}
      viewBox="0 0 15 24" 
      fill="none"
      {...props}
    >
        <path d="M0 22.2857L9.375 13L0 3.71429L1.875 0L15 13L1.875 26L0 22.2857Z" fill={color}/>
    </svg>
)

export default RightIcon;