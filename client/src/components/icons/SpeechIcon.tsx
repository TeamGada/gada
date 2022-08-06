import React, { SVGProps } from 'react';

const SpeechIcon = ({
    width = '20px',
    height = '20px',
    ...props
}: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 244 199"
        fill="none"
        {...props}
    >
        <path
            d="M119.782 13.4103C39.3302 14.7531 7.18301 48.939 7.08809 91.0167C7.04318 114.516 26.1007 134.571 55.0735 146.588C69.2243 154.416 52.8246 180.855 39.5182 187.721C39.5182 187.721 86.8235 184.53 99.5376 157.499C106.753 158.259 114.17 158.607 121.77 158.512C184.536 157.725 234.913 130.237 234.385 88.167C233.858 46.097 201.006 12.073 119.782 13.4103Z"
            fill="black"
            stroke="black"
            strokeWidth="6"
            strokeMiterlimit="10"
            strokeLinejoin="round"
        />
    </svg>
);

export default SpeechIcon;
