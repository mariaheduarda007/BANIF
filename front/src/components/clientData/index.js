import React, { useState, useEffect } from "react";
import { OrbitProgress } from "react-loading-indicators";
import UserContext from "../../contexts/UserContext";
import { Client, setToken } from "../../api/client";
import { setPermissions } from "../../service/PermissionService";
import { setDataUser } from "../../service/UserService";
import { Container, Title } from "./style";

export default function Data() {
  const [load, setLoad] = useState(false);
  const [view, setView] = useState(false);
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    Client.get("/auth/me")
      .then((res) => {
        const clientData = res.data.user;
        setName(clientData.name);
        setCpf(clientData.cpf);
        setEmail(clientData.email);
        const date = new Date(clientData.createdAt);
        const formattedDate = date.toLocaleDateString("pt-BR");
        setCreatedAt(formattedDate);
      })
      .catch(function (error) {
        setView(true);
        console.log(error);
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);

  return (
    <Container>
      <Title>Informações pessoais</Title>
        <Container className="mt-2">
          <h3>{name}</h3>
          <h3>CPF: {cpf}</h3>
          <h3>{email}</h3>
          <h3>Data de criação da conta: {createdAt}</h3>
        </Container>
    </Container>
  );
}
