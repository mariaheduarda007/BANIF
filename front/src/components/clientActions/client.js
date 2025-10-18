import React, { useState, useEffect } from "react";
import { OrbitProgress } from "react-loading-indicators";
import UserContext from "../../contexts/UserContext";
import { Client, setToken } from "../../api/client";
import { setPermissions } from "../../service/PermissionService";
import { setDataUser } from "../../service/UserService";
import { Container, Title } from "./style";

export default function Balance() {
  const [load, setLoad] = useState(false);
  const [view, setView] = useState(false);
  const [balance, setBalance] = useState(0);
  const [accountNumber, setAccountNumber] = useState("");
  const [agencyNumber, setAgencyNumber] = useState("");

  useEffect(() => {
    Client.get("/auth/viewAccount")
      .then((res) => {
        const accountData = res.data.data;
        setBalance(Number(accountData.balance));
        setAccountNumber(accountData.accountNumber);
        setAgencyNumber(accountData.agencyNumber);
      })
      .catch((error) => {
        setView(true);
        console.log(error);
      })
      .finally(() => setLoad(false));
  }, []);

  return (
    <Container>
      <Title>Saldo disponível</Title>
        <Container className="mt-2">
          <h1>R$ {balance.toFixed(2)}</h1>
          <br></br>
          <h2>Ag. {agencyNumber}</h2>
          <h2>Cc. {accountNumber}</h2>
        </Container>
    </Container>
  );
}
