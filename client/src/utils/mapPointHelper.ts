// lat : X lng: Y

import { PlanDetailModel } from 'store/modules/plan/plan.model';

// https://genius3k.tistory.com/entry/%EA%B5%AC%EC%97%90%EC%84%9C-%EB%91%90-%EC%A2%8C%ED%91%9C%EC%9D%98-%EA%B1%B0%EB%A6%AC-%EA%B5%AC%ED%95%98%EA%B8%B0
export function getDistance(pos1: PlanDetailModel, pos2: PlanDetailModel) {
    const lat1 = Number(pos1.latitude);
    const lng1 = Number(pos1.longitude);
    const lat2 = Number(pos2.latitude);
    const lng2 = Number(pos2.longitude);

    function deg2rad(deg: number) {
        return deg * (Math.PI / 180);
    }
    const r = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = r * c;
    return Math.round(d * 1000);
}

export function changePosition2DistanceArray(positions: PlanDetailModel[]) {
    const distance: number[] = [];
    if (positions && positions.length > 0) {
        positions.reduce((pre, cur) => {
            const result = getDistance(pre, cur);
            distance.push(result);
            return cur;
        });
    }
    return distance;
}

export function changePosition2DistanceCenter(positions: PlanDetailModel[]) {
    const nodeCenter: { lng: number; lat: number }[] = [];
    if (positions && positions.length > 0) {
        positions.reduce((pre, cur) => {
            const preLat = Number(pre.latitude);
            const preLng = Number(pre.longitude);
            const curLat = Number(cur.latitude);
            const curLng = Number(cur.longitude);
            const lat: number = (preLat + curLat) / 2;
            const lng: number = (preLng + curLng) / 2;
            const result: { lng: number; lat: number } = { lat, lng };
            nodeCenter.push(result);
            return cur;
        });
    }

    return nodeCenter;
}

export function getPosition2bound(place: PlanDetailModel[]) {
    const bound = new kakao.maps.LatLngBounds();
    if (place) {
        place.forEach((value) => {
            const lat = Number(value.latitude);
            const lng = Number(value.longitude);
            bound.extend(new kakao.maps.LatLng(lat, lng));
        });
    }
    return bound;
}

export const setDistanceText = (meter: number): string => {
    if (meter < 1000) return `${meter}m`;
    if (meter < 100000) return `${(meter / 1000).toFixed(1)}km`;
    return `${Math.round(meter / 1000)}km`;
};
