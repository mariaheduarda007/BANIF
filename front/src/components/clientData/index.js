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
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

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

        Client.get(`auth/users/${clientData.id}/address`)
          .then((resAddress) => {
            const addressData = resAddress.data.address;
            setStreet(addressData.street);
            setHouseNumber(addressData.house_number);
            setNeighborhood(addressData.neighborhood);
            setCity(addressData.city);
            setState(addressData.state);
          })
          .catch((error) => {
            console.log(error);
          });
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
    <div>
      <Container className="mt-2">
        <Title>Informações pessoais</Title>
        <h3>{name}</h3>
        <h3>CPF: {cpf}</h3>
        <h3>{email}</h3>
        <h3>Data de criação da conta: {createdAt}</h3>
        <h3>Endereço: {street}, {houseNumber}, {neighborhood}</h3>
        <h3>{city}, {state}</h3>
      </Container>
    </div>
  );
}
