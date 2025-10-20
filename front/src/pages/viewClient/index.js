import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Container } from "react-bootstrap";
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from "../../components/navigationbar";
import { getDataUser } from "../../service/UserService";
import { getPermissions } from "../../service/PermissionService";
import Balance from "../../components/clientBalance";
import Data from "../../components/clientData";
import ClientBalanceFromList from "../../components/clientBalanceFromList";
import ClientDataFromList from "../../components/clientDataFromList";
import { Label, Input, Select, Submit } from "./style";

export default function ViewClient() {
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();
  const dataUser = getDataUser();
  const permissions = getPermissions();

  const location = useLocation();
  const clientFromList = location.state?.client;
  console.log("ID do cliente vindo da lista:", clientFromList.id);

  function createTransfer(clientMakingTransfer) {
    navigate("/transfer", { state: { clientMakingTransfer } });
  }

  useEffect(() => {
    if (!dataUser) {
      navigate("/login");
    } else if (permissions.listStatement === 0 && clientFromList.id) {
      // se for um gerente sem permissão pra ver dados de outros clientes
      navigate(-1);
    } else {
      setLoad(false);
    }
  }, []);

  if (load) {
    return (
      <>
        <NavigationBar />
        <Container className="d-flex justify-content-center mt-5">
          <OrbitProgress
            variant="spokes"
            color="#32cd32"
            size="medium"
            text=""
            textColor=""
          />
        </Container>
      </>
    );
  }

  return (
    <>
      <NavigationBar />
      <Container className="mt-2">
        {clientFromList.id ? (
          <>
            <ClientBalanceFromList clientId={clientFromList.id} />
            <ClientDataFromList clientId={clientFromList.id} />
            <Submit value="Gerar Extrato"></Submit>
            <Submit
              value="Realizar Transferência"
              onClick={() => createTransfer(clientFromList)}
            ></Submit>
            <Submit value="Consultar Poupança"></Submit>
            <Submit value="Fazer Aplicação"></Submit>
          </>
        ) : (
          // 👇 cliente logado vendo seus próprios dados
          <>
            <Balance />
            <Data />
            <Submit value="Gerar Extrato"></Submit>
            <Submit value="Realizar Transferência"></Submit>
            <Submit value="Consultar Poupança"></Submit>
            <Submit value="Fazer Aplicação"></Submit>
          </>
        )}
      </Container>
    </>
  );
}
