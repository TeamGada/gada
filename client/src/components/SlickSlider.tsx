import React, { PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    LeftIcon,
    RightIcon
} from 'components/icons';

interface SlickSliderProps {
    width: number;
    infinite?: boolean;
    speed?: number;
    slidesToShow: number;
    slidesToScroll: number;
    arrowPadding: number;
    arrowSize: number;
    itemCursor?: string | undefined;
    boxShadow?: boolean | undefined;
    children: any;
}

interface styledProps {
    width: number;
    arrowPadding: number;
    arrowSize: number;
    itemCursor: string | undefined;
    boxShadow: boolean | undefined;
}

// 이렇게 안하면 오류남
const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: any) => (
    <LeftIcon
      {...props}
      className={`
        slick-prev slick-arrow ${(currentSlide === 0 ? " slick-disabled" : "")}`
      }
      aria-hidden="true"
    />
  );
  const SlickArrowRight = ({ slidesToShow, currentSlide, slideCount, ...props }: any) => (
    <RightIcon
      {...props}
      className={`
        slick-next slick-arrow ${(currentSlide === slideCount - slidesToShow ? " slick-disabled" : "")}`
      }
    />
  );

const SlickSlider = ({
    width,
    infinite,
    speed,
    slidesToShow,
    slidesToScroll,
    arrowPadding,
    arrowSize,
    itemCursor,
    boxShadow,
    children,
}: PropsWithChildren<SlickSliderProps>) => {
    const settings = {
        infinite,
        speed,
        slidesToShow,
        slidesToScroll,
        arrow: false,
        nextArrow: <SlickArrowRight slidesToShow={slidesToShow}/>,
        prevArrow: <SlickArrowLeft />
    }

    return (
        <PlanCardContainer
            width={width}
            arrowPadding={arrowPadding}
            arrowSize={arrowSize}
            itemCursor={itemCursor}
            boxShadow={boxShadow}
            {...settings}
        >
            {children}
        </PlanCardContainer>
    );
}

SlickSlider.defaultProps = {
    infinite : false,
    speed : 500,
    itemCursor : "pointer",
    boxShadow: false,
};

const PlanCardContainer = styled(Slider)<styledProps>`
    width: ${({ width }) => width}px;
    padding-left: ${({ arrowPadding }) => arrowPadding}px;
    padding-right: ${({ arrowPadding }) => arrowPadding}px;
    margin-left: auto;
    margin-right: auto;

    .slick-next,
    .slick-prev {
        width: ${({ arrowSize }) => arrowSize}px;
        height: ${({ arrowSize }) => arrowSize}px;
    }

    .slick-disabled {
        opacity: 0;
    }

    & > div > div > div {
        border-radius: 10px;
        cursor: ${({ itemCursor }) => itemCursor};
    }

    ${({ boxShadow }) => 
        boxShadow &&
        css`
        & > div > div > div:hover {
            box-shadow: inset 0 0 9px rgba(0,0,0,0.1);
        }
      `}
`;

export default SlickSlider;