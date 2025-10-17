import React, { useState } from "react";
import { Client } from "../../api/client";
import {
  Container,
  Input,
  Label,
  Submit,
  MsgBox,
  InputPassword,
  DataDivider,
  LabelAndInput,
} from "./style";

export default function FormRegister() {
  // dadinhos normais
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // endereço
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [house_number, setHouseNumber] = useState("");

  //conta corrente
  const [account_number, setAccountNumber] = useState("");
  const [agency_number, setAgencyNumber] = useState("");

  // carregamento e mensagens
  const [load, setLoad] = useState(false);
  const [message, setMessage] = useState("");

  function registerClient() {
    setLoad(true);
    setMessage("");

    const newClient = {
      name,
      cpf,
      email,
      password,
      address: {
        city,
        state,
        neighborhood,
        street,
        house_number,
      },
      account: {
        account_number,
        agency_number,
      },
    };

    Client.post("/auth/register", newClient)
      .then(() => {
        setMessage("Cliente cadastrado com sucesso!");
        setName("");
        setCpf("");
        setEmail("");
        setPassword("");
        setCity("");
        setState("");
        setNeighborhood("");
        setStreet("");
        setHouseNumber("");
        setAccountNumber("");
        setAgencyNumber("");
      })
      .catch(() => setMessage("Erro ao cadastrar cliente"))
      .finally(() => setLoad(false));
  }

  return (
    <Container>
      <h3>Dados Primários</h3>
      <DataDivider>
        <LabelAndInput>
          <Label>Nome completo</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </LabelAndInput>

        <LabelAndInput>
          <Label>CPF</Label>
          <Input value={cpf} onChange={(e) => setCpf(e.target.value)} />
        </LabelAndInput>

        <LabelAndInput>
          <Label>E-mail</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </LabelAndInput>

        <LabelAndInput>
          <Label>Senha (min. 8 caracteres) </Label>
          <InputPassword
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabelAndInput>
      </DataDivider>
      <h3>Endereço</h3>
      <DataDivider>
        <LabelAndInput>
          <Label>Cidade</Label>
          <Input value={city} onChange={(e) => setCity(e.target.value)} />
        </LabelAndInput>
        <LabelAndInput>
          <Label>Estado</Label>
          <Input value={state} onChange={(e) => setState(e.target.value)} />
        </LabelAndInput>
        <LabelAndInput>
          <Label>Bairro</Label>
          <Input
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          />
        </LabelAndInput>
        <LabelAndInput>
          <Label>Rua</Label>
          <Input value={street} onChange={(e) => setStreet(e.target.value)} />
        </LabelAndInput>
        <LabelAndInput>
          <Label>Número</Label>
          <Input
            value={house_number}
            onChange={(e) => setHouseNumber(e.target.value)}
          />
        </LabelAndInput>
      </DataDivider>
      <h3>Dados da conta corrente</h3>
      <DataDivider>
        <LabelAndInput>
          <Label>Número da conta</Label>
          <Input
            value={account_number}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </LabelAndInput>
        <LabelAndInput>
          <Label>Número da agência</Label>
          <Input
            value={agency_number}
            onChange={(e) => setAgencyNumber(e.target.value)}
          />
        </LabelAndInput>
      </DataDivider>
      {message && <MsgBox>{message}</MsgBox>}

      <Submit
        value={load ? "Cadastrando..." : "Cadastrar"}
        onClick={registerClient}
        disabled={load}
      />
    </Container>
  );
}
