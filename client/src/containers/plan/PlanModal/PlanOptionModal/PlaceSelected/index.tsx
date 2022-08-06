import React from 'react';
import styled from 'styled-components';
import { CancelDetailIcon } from 'components/icons';

import { RootState } from 'store/modules';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSelectedPlaces } from 'store/modules/plan/search';
import SlickSlider from 'components/SlickSlider';
import { Place } from 'store/modules/plan';

const selectedPlaces = (state: RootState) => state.search.selectedPlaces;
const PlanPlaceSelected = () => {
    const dispatch = useDispatch();
    const userPlaces = useSelector(selectedPlaces);

    return (
        <SelectedContainer>
            <SlickSlider
                width={920}
                speed={450}
                slidesToShow={8}
                slidesToScroll={5}
                arrowPadding={0}
                arrowSize={20}
                itemCursor="default"
                boxShadow={false}
            >
                {userPlaces.map((place: Place) => (
                    <PlaceCard className="dasfasawfds" key={place.id}>
                        <button
                            type="button"
                            onClick={() =>
                                dispatch(deleteSelectedPlaces(place.id))
                            }
                        >
                            <span>
                                <CancelDetailIcon />
                            </span>
                        </button>
                        <Image src={place.imgUrl} alt={place.name} />
                        <P>{place.name}</P>
                    </PlaceCard>
                ))}
            </SlickSlider>
        </SelectedContainer>
    );
};

const Image = styled.img`
    margin-left: 23px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: inline-block;
`;

const P = styled.p`
    margin: 0 auto !important;
    display: block;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;

    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    margin-top: 2px;
`;

const SelectedContainer = styled.div`
    box-sizing: border-box;
    margin: 5px 0 28px 0;
    width: 920px;
    height: 110px;
    padding: 8px 0px;
    .slick-track {
        margin-left: 0;
    }

    div.slick-slider {
        padding: 0px;
    }

    svg.slick-next.slick-arrow {
        margin-right: -15px;
    }

    svg.slick-prev.slick-arrow {
        margin-left: -15px;
    }

    box-shadow: 0px 0px 6px rgb(0 0 0 / 20%);
    border-radius: 5px;
`;
const PlaceCard = styled.div`
    margin: 0 auto;
    width: 45px;
    height: 90px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;

    &:hover > button {
        display: block;
    }

    & > button {
        display: inline-block;
        cursor: pointer;
        position: absolute;
        top: 0px;
        right: -2%;
        border: 0px;
        background: none;
        display: none;
        opacity: 0.8;

        :hover {
            opacity: 1;
        }
    }
`;
export default PlanPlaceSelected;
