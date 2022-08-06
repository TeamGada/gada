export const getDday = (startDate: string) => {
    const start = Date.parse(startDate);
    const now = Date.now();
    const diffTime = now - start;
    const dDay = Math.ceil(diffTime / ( 1000 * 60 * 60 * 24));
    let returnVal;
    
    if (dDay === 0) returnVal = 'D-day'
    else if (dDay < 0) returnVal = `D${dDay}`
    else returnVal = `D+${dDay}`

    return returnVal;
}

export const getTerm = (startDate: string, lastDate: string) => {
    return `${date2Kor(startDate)} ~ ${date2Kor(lastDate)}`
}

const date2Kor = (_date: string) => {
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const parseDate = new Date(_date);
    const month = parseDate.getMonth() + 1;
    const date = parseDate.getDate();
    const day = week[parseDate.getDay()];

    return `${month}.${date}(${day})`;
}

export const boardCustomStyles = {
    control: (styles: any) => ({
        ...styles,
        color: "white",
        backgroundColor: "#60A5F8",
        borderRadius: "5px",
        "&:hover": { borderColor: "white" },
        border: "none",
        boxShadow: "none",
        height: "30px",
        fontSize: "15px",
        cursor: "pointer",
    }),
    option: (base: any, { isFocused }: any) => ({
        ...base,
        cursor: "pointer",
        backgroundColor: isFocused ? "#ECF3FD" : "",
        color: isFocused ? "#444" : "",
        ":hover": {
            backgroundColor: "#ECF3FD"
        },
    }),
    menuList: (base: any) => ({
        ...base,
        transition: "all .2s",
        "::-webkit-scrollbar": {
            width: "6px",
            height: "0px"
        },
        "::-webkit-scrollbar-thumb": {
            background: "#aaa",
            borderRadius: "10px"
        },
        "::-webkit-scrollbar-thumb:hover": {
            background: "#ccc"
        },
    }),
    singleValue: (base: any) => ({
        ...base,
        color: "white"
    }),
    placeholder: (base: any) => ({
        ...base,
        color: "white"
    }),
    dropdownIndicator: (base: any) => ({
        ...base,
        color: "white",
        ":hover": {
            color: "white"
        },
    }),
};

export const selectOptions = [
    "전체",
    "전국",
    "강원",
    "제주",
    "부산",
    "서울",
    "경기",
    "인천",
    "울산",
    "대전",
    "광주",
    "충북",
    "충남",
    "경북",
    "경남"
];

export const tags = [
    "전체",
    "맛집",
    "힐링",
    "포토",
    "명소",
    "자연"
]

export const newPlanSelectOptions = [
    "전국",
    "강원",
    "제주",
    "부산",
    "서울",
    "경기",
    "인천",
    "울산",
    "대전",
    "광주",
    "충북",
    "충남",
    "경북",
    "경남"
];

export const newPlanCustomStyles = {
    control: (styles: any) => ({
        ...styles,
        color: "#444",
        backgroundColor: "#ECF3FD",
        borderRadius: "5px",
        "&:hover": { borderColor: "gray" },
        border: "none",
        boxShadow: "none",
        height: "30px",
        fontSize: "15px",
        cursor: "pointer",
        paddingLeft: "10px"
    }),
    option: (base: any, { isFocused }: any) => ({
        ...base,
        cursor: "pointer",
        backgroundColor: isFocused ? "#ECF3FD" : "",
        color: isFocused ? "#444" : "",
        ":hover": {
            backgroundColor: "#ECF3FD"
        }
    }),
    menuList: (base: any) => ({
        ...base,
        "::-webkit-scrollbar": {
            width: "6px",
            height: "0px"
        },
        "::-webkit-scrollbar-thumb": {
            background: "#aaa",
            borderRadius: "10px"
        },
        "::-webkit-scrollbar-thumb:hover": {
            background: "#ccc"
        }
    }),
    singleValue: (base: any) => ({
        ...base
    })
};