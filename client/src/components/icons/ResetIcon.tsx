import React, { SVGProps } from 'react';

const ResetIcon = ({
    width = '20px',
    height = '20px',
    ...props
}: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 17 18"
        fill="none"
        {...props}
    >
        <path
            d="M1.578 5.48732C2.55072 3.80853 4.1004 2.54046 5.93848 1.91922C7.77657 1.29798 9.77779 1.3659 11.5695 2.11035C13.3613 2.8548 14.8214 4.22504 15.678 5.96592C16.5347 7.7068 16.7294 9.69968 16.2261 11.5735C15.7227 13.4473 14.5556 15.0743 12.9419 16.1516C11.3282 17.2289 9.378 17.683 7.45441 17.4294C5.53082 17.1758 3.76494 16.2318 2.48557 14.7731C1.20621 13.3145 0.500552 11.4406 0.5 9.50032"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M5.5 5.5H1.5V1.5"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default ResetIcon;
