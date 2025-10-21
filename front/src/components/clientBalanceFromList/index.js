import React, { useState, useEffect } from "react";
import { Client } from "../../api/client";
import { Container, Title } from "./style";

export default function BalanceFromList({ clientId }) {
  const [balance, setBalance] = useState(0);
  const [accountNumber, setAccountNumber] = useState("");
  const [agencyNumber, setAgencyNumber] = useState("");
  const [error, setError] = useState(false);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (!clientId) return; // evita requisição desnecessária

    Client.get(`auth/viewAccount/${clientId}`)
      .then((res) => {
        const accountData = res.data.data;
        setBalance(Number(accountData.balance));
        setAccountNumber(accountData.accountNumber);
        setAgencyNumber(accountData.agencyNumber);
      })
      .catch((err) => {
        console.error("Erro ao buscar conta do cliente:", err);
        setError(true);
      })
      .finally(() => setLoad(false));
  }, [clientId]);
  if (error) {
    return (
      <Container className="mt-2">
        <Title>Saldo disponível</Title>
        <h2>Não foi possível carregar os dados da conta.</h2>
      </Container>
    );
  }
  return (
    <div>
      <Container className="mt-2">
        <Title>Saldo disponível</Title>
        <h1>R$ {balance.toFixed(2)}</h1>
        <br />
        <h2>Ag. {agencyNumber}</h2>
        <h2>Cc. {accountNumber}</h2>
      </Container>
    </div>
  );
}
