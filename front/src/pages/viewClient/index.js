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

export default function ViewClient() {
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();
  const dataUser = getDataUser();
  const permissions = getPermissions();
  
  // pega o ID do cliente vindo da tela de lista, se houver
  const location = useLocation();
  const clientIdFromList = location.state?.client.id;
  console.log("ID do cliente vindo da lista:", clientIdFromList);
  console.log(ClientDataFromList);

  useEffect(() => {
    if (!dataUser) {
      navigate("/login");
    } else if (permissions.listStatement === 0 && clientIdFromList) {
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
        {clientIdFromList ? (
          <>
            <ClientBalanceFromList clientId={clientIdFromList} />
            <ClientDataFromList clientId={clientIdFromList} />
          </>
        ) : (
          // 👇 cliente logado vendo seus próprios dados
          <>
            <Balance />
            <Data />
          </>
        )}
      </Container>
    </>
  );
}
