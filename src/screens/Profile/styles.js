import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background-color: #63c2d1;
  flex: 1;
`;
export const Scroller = styled.ScrollView`
  flex: 1;
`;

export const TextoEditarPerfil = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #ffffffff;
  margin-top: 20px;
`;

export const EditProfile = styled.View`
  align-items: center;
  background-color: #0093dd;
  margin-bottom: 20px;
`;

export const UserImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-bottom: 30px;
  margin-top: 20px;
`;
//Texto dados do perfil
export const TextoDosDados = styled.View`
  flex: 1;
  align-items: center;
`;
export const TextoDosDadosPerfil1 = styled.Text`
  color: #0093dd;
  border-radius: 5px;
  font-size: 25px;
  margin-left: 5px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
`;
export const TextoDosDadosPerfil = styled.Text`
  color: #ffffff;
  font-size: 25px;
  font-weight: bold;
  margin-left: 5px;
`;
//Botao para editar perfil
export const AreatDoBotaoEitar = styled.View`
  margin-top: 50px;
  align-items: center;
`;
export const EditartButton = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 5px;
  width: 30%;
  height: 50px;
  justify-content: center;
  margin-bottom: 10px;
  align-items: center;
  background-color: aliceblue;
`;
export const EditartButtonText = styled.Text`
  color: #0093dd;
  font-size: 25px;
  font-weight: bold;
`;

export const LogoutButton = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

export const LogoutButtonText = styled.Text`
  color: #0093dd;
  font-size: 25px;
  font-weight: bold;
`;
