const initialStorageName = 'DataBase';
const initialDataBase = {
  users: [
    {
      "id": 1,
      "login": "admin",
      "password": "admin",
      "authToken": "pge2lbszugh4tw3rp1gv3s",
      "username": "admin",
      "avatar": "https://i.ibb.co/w6c7gjL/default-User-Avatar.png",
      "tokens": 0,
      "tasks": []
    }
  ],
};
const initialTimeOut = 200;

const defaultUserAvatar = 'https://i.ibb.co/w6c7gjL/default-User-Avatar.png';
const defaultUserName = 'Неавторизованный пользователь';
const defaultUserId = 0;
const defaultUserLogin = '';
const defaultUserToken = 'null'
const rejectChance = 0.2;


export {
  initialStorageName,
  initialTimeOut,
  initialDataBase,
  defaultUserAvatar,
  defaultUserId,
  defaultUserLogin,
  defaultUserName,
  defaultUserToken,
  rejectChance,
}