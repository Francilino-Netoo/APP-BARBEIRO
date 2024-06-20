import React, {useState, useEffect, useContext} from 'react';
import {Alert, KeyboardAvoidingView, ScrollView, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Api';
import {UserContext} from '../../contexts/UserContext';

import {
  Container,
  UserImage,
  EditProfile,
  TextoEditarPerfil,

  /////////////
  TextoDosDados,
  TextoDosDados1,
  TextoDosDados2,
  TextoDosDados3,
  TextoDosDadosPerfil,
  AreatDoBotaoEitar,
  EditartButton,
  EditartButtonText,
} from './styles';

export default () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    password: '',
  });
  const {state: user} = useContext(UserContext);
  const [namelField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [passwordlField, setpasswordlField] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignClick = async () => {
    const updatedData = {};

    // Obter os valores atuais do AsyncStorage
    const currentName = await AsyncStorage.getItem('userName');
    const currentEmail = await AsyncStorage.getItem('userEmail');

    if (namelField !== '' && namelField !== currentName) {
      updatedData.name = namelField;
    }

    if (emailField !== '' && emailField !== currentEmail) {
      updatedData.email = emailField;
    }

    if (passwordlField !== '' && confirmPassword !== '') {
      if (passwordlField === confirmPassword) {
        updatedData.password = passwordlField;
        updatedData.password_confirm = confirmPassword;
      } else {
        Alert.alert('Erro', 'As senhas não coincidem.');
        return;
      }
    }

    if (Object.keys(updatedData).length > 0) {
      try {
        const updatedUser = await Api.updateUser(updatedData);

        if (updatedData.name) {
          await AsyncStorage.setItem('userName', namelField);
          Alert.alert('Sucesso', 'Nome atualizado com sucesso!');
        }
        if (updatedData.email) {
          await AsyncStorage.setItem('userEmail', emailField);
          Alert.alert('Sucesso', 'E-mail atualizado com sucesso!');
        }

        if (updatedData.password && updatedData.password_confirm) {
          Alert.alert('Sucesso', 'Senha atualizada com sucesso!');
        }

        if (
          updatedUser &&
          updatedUser.name !== undefined &&
          updatedUser.email !== undefined &&
          updatedUser.password !== undefined &&
          updatedUser.password_confirm !== undefined
        ) {
          setUserData({email: updatedUser.email, name: updatedUser.name});

          Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        }
      } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao atualizar o perfil.');
      }
    } else {
      Alert.alert('Aviso', 'Nenhuma alteração foi feita.');
    }
  };

  useEffect(() => {
    getUserDataFromStorage();
  }, []);

  const getUserDataFromStorage = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('userEmail');
      const userName = await AsyncStorage.getItem('userName');

      if (userEmail !== null && userName !== null) {
        setUserData({email: userEmail, name: userName});
      } else {
        console.log('Email or name not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  const handleLogoutClick = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={100}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Container>
          <EditProfile>
            <TextoEditarPerfil>Editar Perfil</TextoEditarPerfil>
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
            <View>
              <TextoDosDados>
                <TextoDosDadosPerfil
                  placeholder={userData.name}
                  value={namelField}
                  onChangeText={t => setNameField(t)}
                />
              </TextoDosDados>

              <TextoDosDados1>
                <TextoDosDadosPerfil
                  placeholder={userData.email}
                  value={emailField}
                  onChangeText={t => setEmailField(t)}
                />
              </TextoDosDados1>

              <TextoDosDados2>
                <TextoDosDadosPerfil
                  placeholder="***********"
                  value={passwordlField}
                  onChangeText={t => setpasswordlField(t)}
                  password={true}
                />
              </TextoDosDados2>
              <TextoDosDados3>
                <TextoDosDadosPerfil
                  placeholder="Confime sua senha"
                  value={confirmPassword}
                  onChangeText={t => setConfirmPassword(t)}
                />
              </TextoDosDados3>
            </View>
          )}

          <AreatDoBotaoEitar>
            <EditartButton onPress={handleSignClick}>
              <EditartButtonText>SALVAR</EditartButtonText>
            </EditartButton>
            <EditartButton onPress={handleLogoutClick}>
              <EditartButtonText>CANCELAR</EditartButtonText>
            </EditartButton>
          </AreatDoBotaoEitar>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
