/* eslint-disable react/jsx-no-bind */
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import ReactDOM from 'react-dom';
import { AbstractOverlay, useMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import CustomMarker from 'components/CustomMarker';

type Latlng = { lat: number; lng: number };
type node = { x: number; y: number };

type Props = {
    position: Latlng;
    name: string;
    img: string;
    index: number;
    color: string;
};

// eslint-disable-next-line react/function-component-definition
function TooltipMarker({ position, name, img, index, color }: Props) {
    const map = useMap();
    const node = useRef(document.createElement('div'));
    const [visible, setVisible] = useState(false);
    const [tracerPosition, setTracerPosition] = useState({ x: 0, y: 0 });
    const [tracerAngle, setTracerAngle] = useState(0);

    const positionLatlng: kakao.maps.LatLng = useMemo(
        () => new kakao.maps.LatLng(position.lat, position.lng),
        [position.lat, position.lng],
    );

    function onAdd(this: any) {
        // eslint-disable-next-line react/no-this-in-sfc
        const panel = this.getPanels().overlayLayer;
        panel.appendChild(node.current);
    }

    function onRemove() {
        if (node.current.parentNode)
            node.current.parentNode.removeChild(node.current);
    }

    function draw(this: any) {
        // 화면 좌표와 지도의 좌표를 매핑시켜주는 projection객체
        // eslint-disable-next-line react/no-this-in-sfc
        const projection: kakao.maps.MapProjection = this.getProjection();
        // overlayLayer는 지도와 함께 움직이는 layer이므로
        // 지도 내부의 위치를 반영해주는 pointFromCoords를 사용합니다.
        const point = projection.pointFromCoords(positionLatlng);
        // 내부 엘리먼트의 크기를 얻어서

        const width = node.current.offsetWidth;
        const height = node.current.offsetHeight;

        // 해당 위치의 정중앙에 위치하도록 top, left를 지정합니다.
        node.current.style.left = `${point.x - width / 2}px`;
        node.current.style.top = `${point.y - height / 2}px`;
    }

    // 클리핑을 위한 outcode
    const OUTCODE = {
        INSIDE: 0, // 0b0000
        TOP: 8, // 0b1000
        RIGHT: 2, // 0b0010
        BOTTOM: 4, // 0b0100
        LEFT: 1, // 0b0001
    };

    // viewport 영역을 구하기 위한 buffer값
    // target의 크기가 60x60 이므로
    // 여기서는 지도 bounds에서 상하좌우 30px의 여분을 가진 bounds를 구하기 위해 사용합니다.
    const BOUNDS_BUFFER = 30;

    // 클리핑 알고리즘으로 tracker의 좌표를 구하기 위한 buffer값
    // 지도 bounds를 기준으로 상하좌우 buffer값 만큼 축소한 내부 사각형을 구하게 됩니다.
    // 그리고 그 사각형으로 target위치와 지도 중심 사이의 선을 클리핑 합니다.
    // 여기서는 tracker의 크기를 고려하여 40px로 잡습니다.
    const CLIP_BUFFER = 40;

    // eslint-disable-next-line react/no-unstable-nested-components
    const Marker = () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
            <MarkerContainer>
                {isOpen && (
                    <MarkerInfoBox>
                        <img
                            src={
                                img ??
                                'https:1.daumcdn.net/localimg/localimages/07/mapapidoc/sign-info-64.png'
                            }
                            alt={name}
                        />
                        <p className="place">{name ?? '제목'}</p>
                    </MarkerInfoBox>
                )}
                <MarkerIcon
                    color={color}
                    onClick={() => {
                        setIsOpen((f) => !f);
                        map.setCenter(positionLatlng);
                        map.setLevel(3);
                    }}
                >
                    <CustomMarker
                        size={30}
                        border={20}
                        color={color}
                        text={index + 1}
                    />
                </MarkerIcon>
            </MarkerContainer>
        );
    };

    // eslint-disable-next-line react/no-unstable-nested-components
    const Tracker = ({
        position,
        angle,
    }: {
        position: node;
        angle: number;
    }) => {
        return (
            // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <PlaceTracker
                url={img}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                }}
                onClick={() => {
                    map.setCenter(positionLatlng);
                    setVisible(false);
                }}
            >
                <div
                    className="balloon"
                    style={{
                        transform: `rotate(${angle}deg)`,
                    }}
                />
                <div className="icon" />
            </PlaceTracker>
        );
    };

    // Cohen–Sutherland clipping algorithm
    // 자세한 내용은 아래 위키에서...
    // https://en.wikipedia.org/wiki/Cohen%E2%80%93Sutherland_algorithm
    const getClipPosition = useCallback(
        (
            top: number,
            right: number,
            bottom: number,
            left: number,
            inner: node,
            outer: node,
        ) => {
            const calcOutcode = (x: number, y: number) => {
                let outcode: number = OUTCODE.INSIDE;

                if (x < left) {
                    // eslint-disable-next-line no-bitwise
                    outcode |= OUTCODE.LEFT;
                } else if (x > right) {
                    // eslint-disable-next-line no-bitwise
                    outcode |= OUTCODE.RIGHT;
                }

                if (y < top) {
                    // eslint-disable-next-line no-bitwise
                    outcode |= OUTCODE.TOP;
                } else if (y > bottom) {
                    // eslint-disable-next-line no-bitwise
                    outcode |= OUTCODE.BOTTOM;
                }

                return outcode;
            };

            const ix = inner.x;
            const iy = inner.y;
            let ox = outer.x;
            let oy = outer.y;

            let code = calcOutcode(ox, oy);

            while (true) {
                if (!code) {
                    break;
                }

                // eslint-disable-next-line no-bitwise
                if (code & OUTCODE.TOP) {
                    ox += ((ix - ox) / (iy - oy)) * (top - oy);
                    oy = top;
                    // eslint-disable-next-line no-bitwise
                } else if (code & OUTCODE.RIGHT) {
                    oy += ((iy - oy) / (ix - ox)) * (right - ox);
                    ox = right;
                    // eslint-disable-next-line no-bitwise
                } else if (code & OUTCODE.BOTTOM) {
                    ox += ((ix - ox) / (iy - oy)) * (bottom - oy);
                    oy = bottom;
                    // eslint-disable-next-line no-bitwise
                } else if (code & OUTCODE.LEFT) {
                    oy += ((iy - oy) / (ix - ox)) * (left - ox);
                    ox = left;
                }

                code = calcOutcode(ox, oy);
            }

            return { x: ox, y: oy };
        },
        [
            OUTCODE.BOTTOM,
            OUTCODE.INSIDE,
            OUTCODE.LEFT,
            OUTCODE.RIGHT,
            OUTCODE.TOP,
        ],
    );

    const getAngle = (center: node, target: node) => {
        const dx = target.x - center.x;
        const dy = center.y - target.y;
        const deg = (Math.atan2(dy, dx) * 180) / Math.PI;

        // eslint-disable-next-line no-bitwise
        return ((-deg + 360) % 360 | 0) + 90;
    };

    const tracking = useCallback(() => {
        const proj = map.getProjection();

        // 지도의 영역을 구합니다.
        const bounds = map.getBounds();

        // 지도의 영역을 기준으로 확장된 영역을 구합니다.
        const extBounds = extendBounds(bounds, proj);

        // target이 확장된 영역에 속하는지 판단하고
        if (extBounds.contain(positionLatlng)) {
            // 속하면 tracker를 숨깁니다.
            setVisible(false);
        } else {
            // target이 영역 밖에 있으면 계산을 시작합니다.

            // 지도 bounds를 기준으로 클리핑할 top, right, bottom, left를 재계산합니다.
            //
            //  +-------------------------+
            //  | Map Bounds              |
            //  |   +-----------------+   |
            //  |   | Clipping Rect   |   |000000000000000000000000000000
            //  |   |                 |   |
            //  |   |        *       (A)  |     A
            //  |   |                 |   |
            //  |   |                 |   |
            //  |   +----(B)---------(C)  |
            //  |                         |
            //  +-------------------------+
            //
            //        B
            //
            //                                       C
            // * 은 지도의 중심,
            // A, B, C가 TooltipMarker의 위치,
            // (A), (B), (C)는 각 TooltipMarker에 대응하는 tracker입니다.
            // 지도 중심과 각 TooltipMarker를 연결하는 선분이 있다고 가정할 때,
            // 그 선분과 Clipping Rect와 만나는 지점의 좌표를 구해서
            // tracker의 위치(top, left)값을 지정해주려고 합니다.
            // tracker 자체의 크기가 있기 때문에 원래 지도 영역보다 안쪽의 가상 영역을 그려
            // 클리핑된 지점을 tracker의 위치로 사용합니다.
            // 실제 tracker의 position은 화면 좌표가 될 것이므로
            // 계산을 위해 좌표 변환 메소드를 사용하여 모두 화면 좌표로 변환시킵니다.

            // TooltipMarker의 위치
            const pos = proj.containerPointFromCoords(positionLatlng);

            // 지도 중심의 위치
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const center = proj.containerPointFromCoords(map.getCenter());

            // 현재 보이는 지도의 영역의 남서쪽 화면 좌표
            const sw = proj.containerPointFromCoords(bounds.getSouthWest());

            // 현재 보이는 지도의 영역의 북동쪽 화면 좌표
            const ne = proj.containerPointFromCoords(bounds.getNorthEast());

            // 클리핑할 가상의 내부 영역을 만듭니다.
            const top = ne.y + CLIP_BUFFER;
            const right = ne.x - CLIP_BUFFER;
            const bottom = sw.y - CLIP_BUFFER;
            const left = sw.x + CLIP_BUFFER;

            // 계산된 모든 좌표를 클리핑 로직에 넣어 좌표를 얻습니다.
            const clipPosition = getClipPosition(
                top,
                right,
                bottom,
                left,
                center,
                pos,
            );

            // 클리핑된 좌표를 tracker의 위치로 사용합니다.
            setTracerPosition(clipPosition);

            // 말풍선의 회전각을 얻습니다.
            const angle = getAngle(center, pos);

            // 회전각을 CSS transform을 사용하여 지정합니다.
            // 브라우저 종류에따라 표현되지 않을 수도 있습니다.
            // https://caniuse.com/#feat=transforms2d
            setTracerAngle(angle);

            // target이 영역 밖에 있을 경우 tracker를 노출합니다.

            setVisible(true);
        }
    }, [getClipPosition, map, positionLatlng]);

    const hideTracker = useCallback(() => {
        setVisible(false);
    }, []);

    useEffect(() => {
        node.current.style.position = 'absolute';
        node.current.style.whiteSpace = 'nowrap';
    }, []);

    // 상하좌우로 BOUNDS_BUFFER(30px)만큼 bounds를 확장 하는 함수
    //
    //  +-----------------------------+
    //  |              ^              |
    //  |              |              |
    //  |     +-----------------+     |
    //  |     |                 |     |
    //  |     |                 |     |
    //  |  <- |    Map Bounds   | ->  |
    //  |     |                 |     |
    //  |     |                 |     |
    //  |     +-----------------+     |
    //  |              |              |
    //  |              v              |
    //  +-----------------------------+
    //
    // 여기서는 TooltipMaker가 완전히 안보이게 되는 시점의 영역을 구하기 위해서 사용됩니다.
    // TooltipMarker는 60x60 의 크기를 가지고 있기 때문에
    // 지도에서 완전히 사라지려면 지도 영역을 상하좌우 30px만큼 더 드래그해야 합니다.
    // 이 함수는 현재 보이는 지도 bounds에서 상하좌우 30px만큼 확장한 bounds를 리턴합니다.
    // 이 확장된 영역은 TooltipMarker가 화면에서 보이는지를 판단하는 영역으로 사용됩니다.
    const extendBounds = (
        bounds: kakao.maps.LatLngBounds,
        proj: kakao.maps.MapProjection,
    ) => {
        const sw = proj.pointFromCoords(bounds.getSouthWest());
        const ne = proj.pointFromCoords(bounds.getNorthEast());

        sw.x -= BOUNDS_BUFFER;
        sw.y += BOUNDS_BUFFER;

        ne.x += BOUNDS_BUFFER;
        ne.y -= BOUNDS_BUFFER;

        return new kakao.maps.LatLngBounds(
            proj.coordsFromPoint(sw),
            proj.coordsFromPoint(ne),
        );
    };

    useEffect(() => {
        kakao.maps.event.addListener(map, 'zoom_start', hideTracker);
        kakao.maps.event.addListener(map, 'zoom_changed', tracking);
        kakao.maps.event.addListener(map, 'center_changed', tracking);
        tracking();

        return () => {
            kakao.maps.event.removeListener(map, 'zoom_start', hideTracker);
            kakao.maps.event.removeListener(map, 'zoom_changed', tracking);
            kakao.maps.event.removeListener(map, 'center_changed', tracking);
            setVisible(false);
        };
    }, [map, hideTracker, tracking]);

    return (
        <>
            <AbstractOverlay onAdd={onAdd} onRemove={onRemove} draw={draw} />
            {visible
                ? ReactDOM.createPortal(
                      <Tracker position={tracerPosition} angle={tracerAngle} />,

                      map.getNode(),
                  )
                : ReactDOM.createPortal(<Marker />, node.current)}
        </>
    );
}

const PlaceTracker = styled.div<{ url: string }>`
    position: absolute;
    margin: -35px 0 0 -30px;
    display: ;
    cursor: pointer;
    z-index: 9;

    .icon {
        position: absolute;
        left: 6px;
        top: 9px;
        width: 49px;
        height: 49px;
        background-image: url(${({ url }) =>
            url ??
            `https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/sign-info-48.png`});
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 50%;
    }

    .balloon {
        position: absolute;
        width: 60px;
        height: 60px;
        background-image: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/balloon.png);
        background-repeat: no-repeat;
        background-size: cover;
        -ms-transform-origin: 50% 34px;
        -webkit-transform-origin: 50% 34px;
        transform-origin: 50% 34px;
    }
`;

const MarkerContainer = styled.div`
    width: 220px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 170px;
`;

const MarkerInfoBox = styled.div`
    width: 100%;
    height: 75px;
    margin-bottom: 6px;
    background: white;
    border-radius: 40px;
    display: flex;
    align-items: center;

    border-radius: 50px;
    box-shadow: 0.1rem 0.1rem 0.6rem #3d3d3d;

    & > img {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        margin-left: 10px;
    }
    & > p.place {
        width: 110px;
        height: max-content;
        text-align: center;
        word-wrap: break-word;
        line-height: normal;
        margin-left: 10px;
        font-size: 18px;
        white-space: normal;
        text-overflow: ellipsis;
        overflow: hidden;
    }
`;

const MarkerIcon = styled.div`
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -user-select: none;
    & > img {
        display: absolute;
        width: 40px;
        height: 40px;
        padding: 3px 7px;
        pointer-events: none;
        margin: 0 auto;
        border-radius: 2px;
    }
`;
export default TooltipMarker;
