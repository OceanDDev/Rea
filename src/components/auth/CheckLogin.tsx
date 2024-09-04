import StorageKeys from '../../constants/storage-keys';

const CheckLogin = () => {
  const isLoggedIn = localStorage.getItem(StorageKeys.USER);
  if (isLoggedIn) {
    return JSON.parse(isLoggedIn); // Phải có thông tin người dùng bao gồm role
  }
  return null;
}

export default CheckLogin;
