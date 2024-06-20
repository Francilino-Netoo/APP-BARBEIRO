import React, { useState, useEffect } from "react";
import Api from "../../Api";
import { RefreshControl } from "react-native";

import BarberItem from "../../components/BarberItem";

import {
  Container,
  HeaderArea,
  HeaderTitle,
  Scroller,
  LoadingIcon,
  ListArea,
  EmptyWarning,
} from "./styles";

export default () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    setLoading(true);
    setList([]);

    try {
      const res = await Api.getFavorites();
      if (res.error === "") {
        setList(res.list);
      } else {
        alert("Erro:" + res.error);
      }
    } catch (error) {
      alert("Ocorreu um erro ao buscar os favoritos");
    }

    setLoading(false);
  };

  return (
    <Container>
      <HeaderArea>
        <HeaderTitle>Favoritos</HeaderTitle>
      </HeaderArea>

      <Scroller
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getFavorites} />
        }
      >
        {!loading && list.length === 0 && (
          <EmptyWarning>Não há favoritos.</EmptyWarning>
        )}

        <ListArea>
          {list.map((item, k) => (
            <BarberItem key={k} data={item} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  );
};
