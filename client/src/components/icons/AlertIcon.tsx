import React, { SVGProps } from 'react';

const AlertlIcon = ({
    height = '62px',
    width = '65px',
    color = '#F86960',
    ...props
}: SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height}
      viewBox="0 0 65 62" 
      fill="none"
      {...props}
    >
        <path d="M32.5 23.25V36.1667M32.5 45.2083V46.5" stroke="white" strokeWidth="4.16667" strokeLinecap="round"/>
        <path d="M6.04506 49.1247L28.0313 7.88433C29.9624 4.25991 35.0459 4.25991 36.9742 7.88433L58.9578 49.1247C60.8021 52.5967 58.3484 56.8333 54.4809 56.8333H10.5165C6.65173 56.8333 4.19527 52.5967 6.04777 49.1247H6.04506Z" stroke="white" strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export default AlertlIcon;