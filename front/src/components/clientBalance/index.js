import React, { useState, useContext } from "react";
import { OrbitProgress } from "react-loading-indicators";
import UserContext from "../../contexts/UserContext";
import { Client, setToken } from "../../api/client";
import { setPermissions } from "../../service/PermissionService";
import { setDataUser } from "../../service/UserService";
import { Container, Title } from "./style";

export default function Balance() {
  const [load, setLoad] = useState(false);
  const [view, setView] = useState(false);
  const [data, setData] = useState("");

  Client.get("/auth/viewAccount")
    .then((res) => {
      const accountData = res.data.data;
      setData(accountData.balance);
    })
    .catch(function (error) {
      setView(true);
      console.log(error);
    })
    .finally(() => {
      setLoad(false);
    });

  return (
    <Container>
      <Title>Saldo disponível</Title>
      {load ? (
        <Container className="d-flex justify-content-center mt-5">
          <OrbitProgress
            variant="spokes"
            color="#32cd32"
            size="medium"
            text=""
            textColor=""
          />
        </Container>
      ) : (
        <Container className="mt-2">
          <p>{data}</p>
        </Container>
      )}
    </Container>
  );
}
