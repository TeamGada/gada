import React, { FC } from 'react';
import PageInfo from 'components/PageInfo';

const titles = {
    mainTitle: '프로필',
    subTitle1: '내 정보를 조회하고,',
    subTitle2: '내 정보를 수정해보세요!'
}

const ProfileHeader: FC = () => {
    return (
        <PageInfo titles={titles}/>
    )

}

export default ProfileHeader;