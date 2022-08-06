import React, { SVGProps } from 'react';

const LeftIcon = ({
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
        <path d="M15 3.42857L5.625 12L15 20.5714L13.125 24L0 12L13.125 0L15 3.42857Z" fill={color}/>
    </svg>
)

export default LeftIcon;