import React, { useState, useEffect } from "react";
import Api from "../../Api";
import { RefreshControl } from "react-native";

import AppointmentsItem from "../../components/AppointmentsItem";

import { Container, Scroller, ListArea, EmptyWarning } from "./styles";

export default () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    setLoading(true);
    setList([]);

    try {
      const res = await Api.getAppointments();
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
      <Scroller
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getAppointments} />
        }
      >
        {!loading && list.length === 0 && (
          <EmptyWarning>Não há agendamentos.</EmptyWarning>
        )}

        <ListArea>
          {list.map((item, k) => (
            <AppointmentsItem key={k} data={item} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  );
};
