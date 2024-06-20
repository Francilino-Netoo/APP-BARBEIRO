import React, {useState, useEffect, useContext} from 'react';
import {RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Api';
import {UserContext} from '../../contexts/UserContext';

import {
  Container,
  Scroller,
  UserImage,
  EditProfile,
  TextoEditarPerfil,
  TextoDosDados,
  TextoDosDadosPerfil,
  TextoDosDadosPerfil1,
  AreatDoBotaoEitar,
  EditartButton,
  EditartButtonText,
} from './styles';

export default () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({email: '', name: ''});
  const {state: user} = useContext(UserContext);
  const [refreshing, setRefreshing] = useState(false);
  const {dispatch: userDispatch} = useContext(UserContext);

  useEffect(() => {
    getUserDataFromStorage();
  }, []);

  const getUserDataFromStorage = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('userEmail');
      const userName = await AsyncStorage.getItem('userName');
      console.log(userEmail);
      console.log(userName);
      if (userEmail !== null && userName !== null) {
        setUserData({email: userEmail, name: userName});
      } else {
        console.log('Email or name not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  const handleLogoutClick = async () => {
    await Api.logout();
    await AsyncStorage.removeItem('userEmail');
    await AsyncStorage.removeItem('userName');
    navigation.reset({
      routes: [{name: 'SignIn'}],
    });
  };

  const handleEditartClick = async () => {
    navigation.reset({
      routes: [{name: 'Edit'}],
    });
    await getUserDataFromStorage();
  };

  const onRefresh = async () => {
    setRefreshing(true);

    await getUserDataFromStorage();
    setRefreshing(false);
  };

  return (
    <Container>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <EditProfile>
          <TextoEditarPerfil>Perfil</TextoEditarPerfil>
          {user.avatar != '' ? (
            <UserImage source={{uri: user.avatar}} />
          ) : (
            <AccountIcon
              style={{opacity: state.index === 4 ? 1 : 0.5}}
              width="24"
              height="24"
              fill="#FFFFFF"
            />
          )}
        </EditProfile>
        {userData && (
          <TextoDosDados>
            <TextoDosDadosPerfil1>Usuário</TextoDosDadosPerfil1>
            <TextoDosDadosPerfil>{userData.name}</TextoDosDadosPerfil>
            <TextoDosDadosPerfil1>E-mail</TextoDosDadosPerfil1>
            <TextoDosDadosPerfil>{userData.email}</TextoDosDadosPerfil>
          </TextoDosDados>
        )}
        <AreatDoBotaoEitar>
          <EditartButton onPress={handleEditartClick}>
            <EditartButtonText>Editar</EditartButtonText>
          </EditartButton>
          <EditartButton onPress={handleLogoutClick}>
            <EditartButtonText>Sair</EditartButtonText>
          </EditartButton>
        </AreatDoBotaoEitar>
      </Scroller>
    </Container>
  );
};

/*Api.updateUser({
  name: 'Novo nome',
  email: 'E-mail novo@gmail.com',
  password: '123',
  password_confirm: '123'
})*/
