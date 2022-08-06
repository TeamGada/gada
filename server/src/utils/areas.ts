export function koreanChange(area: string): string {
    switch(area) {
        case "부산":
            return "busan";
        case "충북":
            return "chungbuk";
        case "충남": 
            return "chungnam";
        case "대전":
            return "daejeon";
        case "강원":
            return "gangwon";
        case "경기":
            return "geonggi";
        case "광주":
            return "guangju";
        case "경남":
            return "gyeongnam";
        case "경북":
            return "gyeongbuk";
        case "인천":
            return "incheon";
        case "제주":
            return "jeju";
        case "서울":
            return "seoul";
        case "울산":
            return "ulsan";
        default : 
            return "default";
    }
}

export function getLocationList():object {
    return {
        "전국": "https://storage.googleapis.com/gada-storage/images/default.jpg",
        "강원": "https://storage.googleapis.com/gada-storage/images/gangwon.jpg",
        "제주": "https://storage.googleapis.com/gada-storage/images/jeju.jpg",
        "부산": "https://storage.googleapis.com/gada-storage/images/busan.jpg",
        "서울": "https://storage.googleapis.com/gada-storage/images/seoul.jpg",
        "경기": "https://storage.googleapis.com/gada-storage/images/geonggi.jpg",
        "인천": "https://storage.googleapis.com/gada-storage/images/incheon.jpg",
        "울산": "https://storage.googleapis.com/gada-storage/images/ulsan.jpg",
        "대전": "https://storage.googleapis.com/gada-storage/images/daejeon.jpg",
        "광주": "https://storage.googleapis.com/gada-storage/images/guangju.jpg",
        "충북": "https://storage.googleapis.com/gada-storage/images/chungbuk.jpg",
        "충남": "https://storage.googleapis.com/gada-storage/images/chungnam.jpg",
        "경북": "https://storage.googleapis.com/gada-storage/images/gyeongbuk.jpg",
        "경남": "https://storage.googleapis.com/gada-storage/images/gyeongnam.jpg"
    }
}