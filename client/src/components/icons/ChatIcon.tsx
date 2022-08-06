import React, { SVGProps } from 'react';

const ChatIcon = ({
    height = '35px',
    width = '30px',
    color = '#4B2F1B',
    ...props
}: SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height}
      viewBox="0 0 47 40" 
      fill="none"
      {...props}
    >
        <path xmlns="http://www.w3.org/2000/svg" d="M23.5 37.5C36.4779 37.5 47 29.665 47 20C47 10.335 36.4779 2.5 23.5 2.5C10.5221 2.5 0 10.335 0 20C0 24.4 2.18256 28.425 5.78688 31.5C5.50194 34.04 4.56194 36.825 3.52206 38.915C3.29 39.38 3.73944 39.9 4.324 39.82C10.951 38.895 14.8902 37.475 16.6028 36.735C18.8526 37.2457 21.1715 37.5029 23.5 37.5Z" fill={color}/>
    </svg>
)

export default ChatIcon;