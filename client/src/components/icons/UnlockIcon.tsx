import React, { SVGProps } from 'react';

const UnlockIcon = ({
    height = '24px',
    width = '24px',
    color = '#666666',
    ...props
}: SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height}
      viewBox="0 0 24 24" 
      fill="none"
      {...props}
    >
        <path d="M10 13C10.5304 13 11.0391 13.2107 11.4142 13.5858C11.7893 13.9609 12 14.4696 12 15C12 16.11 11.11 17 10 17C8.89 17 8 16.11 8 15C8 13.89 8.9 13 10 13ZM18 1C15.24 1 13 3.24 13 6V8H4C2.9 8 2 8.9 2 10V20C2 21.1 2.9 22 4 22H16C17.1 22 18 21.1 18 20V10C18 8.9 17.1 8 16 8H15V6C15 4.34 16.34 3 18 3C19.66 3 21 4.34 21 6V8H23V6C23 3.24 20.76 1 18 1ZM16 10V20H4V10H16Z" fill={color}/>
    </svg>
)

export default UnlockIcon;