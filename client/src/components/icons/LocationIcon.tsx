import React, { SVGProps } from 'react';

const LocationIcon = ({
    height = '31px',
    width = '23px',
    color = '#3D95FF',
    ...props
}: SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height}
      viewBox="0 0 23 31" 
      fill="none"
      {...props}
    >
        <path d="M10.0805 30.3034C6.95391 26.4062 0 16.9607 0 11.6552C0 5.21811 5.14865 0 11.5 0C17.849 0 23 5.21811 23 11.6552C23 16.9607 15.9922 26.4062 12.9195 30.3034C12.1828 31.2322 10.8172 31.2322 10.0805 30.3034ZM11.5 15.5402C13.6143 15.5402 15.3333 13.798 15.3333 11.6552C15.3333 9.51231 13.6143 7.77011 11.5 7.77011C9.38568 7.77011 7.66667 9.51231 7.66667 11.6552C7.66667 13.798 9.38568 15.5402 11.5 15.5402Z" fill={color} />
    </svg>
)

export default LocationIcon;