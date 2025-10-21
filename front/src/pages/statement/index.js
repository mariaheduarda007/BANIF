import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router";
import { Container } from "react-bootstrap";
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from "../../components/navigationbar";
import DataTable from "../../components/datatable";
import { Client } from "../../api/client";
import { getDataUser } from "../../service/UserService";
import { getPermissions } from "../../service/PermissionService";

export default function Statement() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const dataUser = getDataUser();
  const permissions = getPermissions();

  const location = useLocation();

  const clientFromView = location.state?.clientGeneratingStatement?.id;
  console.log("ID do cliente para extrato:", clientFromView);

  function fetchData() {
    setLoad(true);
    setTimeout(() => {
      Client.get(`/auth/statement/${clientFromView}`)
        .then((res) => {
          const statement = res.data.data || [];
          console.log("Extrato:", statement);
          setData(statement);
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
            title="Extrato Bancário"
            rows={["Valor", "Origem", "Data"]}
            hide={[false, false, true]}
            data={data}
            keys={["value", "origin", "created_at"]}
            resource="statement"
            crud={["listStatement"]}
            showMoreInfo={false}
          />
        </Container>
      )}
    </>
  );
}
