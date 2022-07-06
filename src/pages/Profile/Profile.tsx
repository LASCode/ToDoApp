import React from 'react';
import './Profile.scss';
import { useAppSelector } from '../../redux/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { defaultUserAvatar } from '../../fakeBackend/variables';
import { Button } from '../../components/Button/Button';

const Profile = () => {
  const { id } = useParams();
  const redirect = useNavigate();
  const isAuthorized = useAppSelector(state => state.authReducer.authorized);
  const userdata = useAppSelector(state => state.authReducer.userData);
  const isOp = id === undefined;


  // if (!isAuthorized && isOp) { redirect('/login') }
  return (
    <div className='ProfilePage'>
      <div className='ProfilePage__grid-wrapper'>
        <div className='ProfilePage__grid-item'>
          <div className='ProfilePage__container'>
            <img
              className='ProfilePage__photo'
              src={userdata ? userdata.avatar : defaultUserAvatar}
              alt='Аватар пользователя'
            />
            <div className='ProfilePage__actions'>
              { isOp && <Button>Редактировать</Button>}
              { !isOp && <><Button>Сообщение</Button><Button>Добавить в друзья</Button></>}
            </div>
          </div>
        </div>
        <div className='ProfilePage__grid-item'>
          <div className='ProfilePage__container'>
            <div className='ProfilePage__userdata'>
              <div className=''>
                <span className='ProfilePage__username'>{userdata ? userdata.username : 'Dima 228'}</span>
                <span className='ProfilePage__online'>Online</span>
              </div>
              <div>
                <span className='ProfilePage__status'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, voluptate!</span>
              </div>
            </div>
          </div>
        </div>








      </div>
    </div>
  );
};

export { Profile };