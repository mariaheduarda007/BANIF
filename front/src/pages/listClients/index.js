import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { Container } from "react-bootstrap";
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from "../../components/navigationbar";
import DataTable from "../../components/datatable";
import { Client } from "../../api/client";
import { getDataUser } from "../../service/UserService";
import { getPermissions } from "../../service/PermissionService";

export default function ListClients() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const dataUser = getDataUser();
  const permissions = getPermissions();

  function fetchData() {
    setLoad(true);
    setTimeout(() => {
      Client.get("/auth/listClients")
        .then((res) => {
          const clients = res.data.data;
          console.log(JSON.stringify(clients));
          const formattedData = clients.map((client) => ({
            ...client,
            accountNumber: client.account?.accountNumber || "",
          }));
          setData(formattedData);

        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          setLoad(false);
        });
    }, 1000);
  }

  function verifyPermission() {
    if (!dataUser) navigate("/login");
    else if (permissions.listStatement === 0) navigate(-1);
  }

  useEffect(() => {
    verifyPermission();
    fetchData();
  }, []);

  return (
    <>
      <NavigationBar />
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
          <DataTable
            title="Clientes Cadastrados"
            rows={["Nome", "CPF", "Email", "Número da Conta"]}
            hide={[true, false, true, false]}
            data={data}
            keys={["name", "cpf", "email", "accountNumber"]}
            resource="clients"
            crud={["listClients"]}
          />
        </Container>
      )}
    </>
  );
}
