import './App.css';


import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import Main from './components/Main';
import {useState } from 'react';
//import {gapiLoaded, gisLoaded, authG} from './services/googleServices';
import { googleLogout } from '@react-oauth/google';
import {useGoogleLogin,} from '@react-oauth/google';
import {getGUserInfo, getFilesMetaFromNameOnDrive, addObjectToDrive, createPassword, getObjectFromDrive, deleteFileFromDrive} from './services/googleServices';
import { register, login, logout } from './services/userService';


function App() {
  const [user, setUser] = useState(null);

  const onLoginClick = useGoogleLogin({
    onSuccess: tokenResponse =>  
    {
      
      

      onLogin();
      setUser(user =>(user = {username: 'stamat@gmail.com', gtoken:tokenResponse}));
    }
  });

  async function onLogin() {
    const guserInfo = await getGUserInfo();

    const credentialsId = await getFilesMetaFromNameOnDrive();

    if(credentialsId.length === 0 || credentialsId.length > 1) {
      const email = guserInfo.emailAddress;
      const password = createPassword();
      const responce = await addObjectToDrive({email, password});
      console.log(`created credentials on drive: `, responce);
    }

    const credentials = await getObjectFromDrive(credentialsId[0].id)
    console.log(`obtained credentials from drive: `, credentials);

    try {
      const user = await login(credentials.email, credentials.password);
      console.log('loged in', user);
    } catch (e) {
      console.log('error logging: ', e.message);
      const user = await register(credentials.email, credentials.password)
      console.log('from user sessionStorage:', sessionStorage.getItem('user'));
      console.log('registered', user);
    }
  }

  function onLogoutClick() {
    googleLogout();
    logout();
    setUser(user => (user = null))
  }
  // googleLogout();

  // const hasAccess = hasGrantedAllScopesGoogle(
  //   tokenResponse,
  //   'google-scope-1',
  //   'google-scope-2',
  // );



  

  return (
    <>
      <Header user={user}
              onLoginClick={onLoginClick}
              onLogoutClick={onLogoutClick} 
      />

      <Aside user={user} />

      <Main />
      
      <Footer />
    </>
  );
}

export default App;
