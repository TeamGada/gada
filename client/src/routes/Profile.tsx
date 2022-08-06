import React, { FC } from 'react';
import ProfileHeader from 'containers/profile/ProfileHeader';
import ProfileBody from 'containers/profile/ProfileBody';

const Profile: FC = () => {
    return (
        <>
            <ProfileHeader />
            <ProfileBody />
        </>
    );
};

export default Profile;