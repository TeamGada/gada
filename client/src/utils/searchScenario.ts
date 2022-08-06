import { SearchedPlaceInfo, Position } from 'store/modules/plan';

const ps = new kakao.maps.services.Places();

const searchImageByKakaoAPI = async (
    keyword: string,
): Promise<string | undefined> => {
    try {
        const res = await fetch(
            `https://dapi.kakao.com/v2/search/image?query=${keyword}&size=1&sort=accuracy`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'KakaoAK 893bfbac1c7f570ab519588089eea08c',
                },
            },
        );

        const data = await res.json();
        return data.documents[0]?.thumbnail_url;
    } catch (e) {
        return '';
    }
};

const searchByKeyword = async (
    keyword: string | undefined,
): Promise<SearchedPlaceInfo[]> => {
    return new Promise((resolve, reject) => {
        ps.keywordSearch(`${keyword}`, async (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const list: any = data.map(
                    async (place): Promise<SearchedPlaceInfo> => {
                        const placeImgUrl = await searchImageByKakaoAPI(
                            `${place.place_name}&${place.address_name} 건물사진&장소사진`,
                        );
                        return {
                            name: place.place_name,
                            imgUrl: placeImgUrl,
                            address: place.address_name,
                            latitude: place.y,
                            longitude: place.x,
                        };
                    },
                );
                resolve(await Promise.all(list));
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                reject(new Error('검색 결과가 존재하지 않습니다.'));
            } else if (status === kakao.maps.services.Status.ERROR) {
                reject(new Error('검색 결과 중 오류가 발생했습니다.'));
            }
        });
    });
};

/**
 *
 * @param keyword
 * @returns
 */
const pickByKeyword = async (
    keyword: string | undefined,
): Promise<Position> => {
    return new Promise((resolve, reject) => {
        ps.keywordSearch(`${keyword}`, async (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const place = data[0];
                resolve({ lat: Number(place.y), lng: Number(place.x) });
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                reject(new Error('검색 결과가 존재하지 않습니다.'));
            } else if (status === kakao.maps.services.Status.ERROR) {
                reject(new Error('검색 결과 중 오류가 발생했습니다.'));
            }
        });
    });
};

/**
 * Author: ParkAward
 * CreateAt : 22-07-11
 *
 * 카카오 API 위도 경도 기반으로 주소를 반환
 * @param position Position
 * @returns 주소 정보
 */
const position2DetailAddressByGeocoder = (
    position: Position,
): Promise<string> => {
    const geocoder = new kakao.maps.services.Geocoder();
    return new Promise((resolve, reject) => {
        geocoder.coord2Address(position.lng, position.lat, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                resolve(result[0].address.address_name);
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                reject(new Error('주소가 존재하지 않습니다.'));
            } else if (status === kakao.maps.services.Status.ERROR) {
                reject(new Error('주소 찾기가 오류가 발생했습니다.'));
            }
        });
    });
};

export { searchByKeyword, pickByKeyword, position2DetailAddressByGeocoder };
