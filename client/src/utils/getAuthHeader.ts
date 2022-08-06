import { useCookies } from 'react-cookie';

const getAuthHeader: any = () => {
    const [cookies] = useCookies(['accessToken']);
    const { accessToken } = cookies;
    
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    }

    return headers;
}

export default getAuthHeader;