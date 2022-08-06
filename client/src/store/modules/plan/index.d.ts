export interface SearchedPlaceInfo {
    name: string;
    imgUrl?: string | undefined;
    address: string;
    latitude: string;
    longitude: string;
}
export interface Place extends SearchedPlaceInfo {
    id: string;
}

export interface Position {
    lat: number;
    lng: number;
}
