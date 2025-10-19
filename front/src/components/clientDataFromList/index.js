import React, { useState, useEffect } from "react";
import { OrbitProgress } from "react-loading-indicators";
import { Client } from "../../api/client";
import { Container, Title } from "./style";

export default function ClientDataFromList({ clientId }) {
  const [load, setLoad] = useState(true);
  const [view, setView] = useState(false);

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
    if (!clientId) {
      console.error("❌ Nenhum ID de cliente fornecido como prop.");
      setLoad(false);
      return;
    }

    // Buscar dados do cliente
    Client.get(`/auth/me/${clientId}`)
      .then((res) => {
        const clientData = res.data.user;
        console.log(res.data.message)
        setName(clientData.name);
        setCpf(clientData.cpf);
        setEmail(clientData.email);

        const date = new Date(clientData.createdAt);
        const formattedDate = date.toLocaleDateString("pt-BR");
        setCreatedAt(formattedDate);

        // Buscar endereço
        return Client.get(`/auth/users/${clientId}/address`);
      })
      .then((resAddress) => {
        console.log("RES ADDRESS:", resAddress);
        const addressData = resAddress.data.address;
        setStreet(addressData.street);
        setHouseNumber(addressData.house_number);
        setNeighborhood(addressData.neighborhood);
        setCity(addressData.city);
        setState(addressData.state);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do cliente:", error);
        setView(true);
      })
      .finally(() => setLoad(false));
  }, [clientId]);

  if (load) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <OrbitProgress
          variant="spokes"
          color="#32cd32"
          size="medium"
          text=""
          textColor=""
        />
      </Container>
    );
  }

  return (
    <div>
      <Container className="mt-2">
        <Title>Informações do Cliente</Title>
        <h3>{name}</h3>
        <h3>CPF: {cpf}</h3>
        <h3>{email}</h3>
        <h3>Data de criação da conta: {createdAt}</h3>
        <h3>
          Endereço: {street}, {houseNumber}, {neighborhood}
        </h3>
        <h3>
          {city}, {state}
        </h3>
      </Container>
    </div>
  );
}
