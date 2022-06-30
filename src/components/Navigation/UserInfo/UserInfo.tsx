import './UserInfo.scss';
import React from 'react';
import { useAppSelector } from '../../../redux/hooks';
import ContentLoader from 'react-content-loader';
import defaultUserAvatar from '../../../assets/img/defaultUserAvatar.png';

const UserInfo = () => {
  const { userData, isFetching} = useAppSelector(state => state.authReducer);

  if (isFetching) {
    return (
      <ContentLoader viewBox="0 0 150 35" backgroundColor='#C4C4C4FF' foregroundColor='#e0e0e0'>
        <rect x="0" y="0" rx="5" ry="5" width="35" height="35" />
        <rect x="40" y="5" rx="4" ry="4" width="100" height="10" />
        <rect x="40" y="20" rx="3" ry="3" width="60" height="7" />
      </ContentLoader>
    )
  }

  return (
    <div className='Navigation-accountData'>
      <img className='Navigation-accountData__img' src={userData ? userData.avatar : defaultUserAvatar} alt='userAvatar'/>
      <div className='Navigation-accountData__userdata'>
            <span className='Navigation-accountData__userdata-item Navigation-accountData__userdata-item--with-username'>
              {userData ? userData.username : 'Unregistered'}
            </span>
        <span className='Navigation-accountData__userdata-item Navigation-accountData__userdata-item--with-tokens'>
            Tokens: {userData ? userData.id : 0}
          </span>
      </div>
    </div>
  )
};

export default UserInfo;