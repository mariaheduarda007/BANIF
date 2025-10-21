import { useNavigate, useLocation } from "react-router";
import { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from "../../components/navigationbar";
import { Label, Input, Select, Submit } from "./style";
import { Client } from "../../api/client";
import { getPermissions } from "../../service/PermissionService";
import { getDataUser } from "../../service/UserService";

export default function Create() {
  const [clientId, setClientId] = useState("");
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const permissions = getPermissions();
  const dataUser = getDataUser();
  const location = useLocation();
  const clientFromView = location.state?.client;

  // function fetchData() {

  //     setLoad(true)
  //     setTimeout(() => {

  //         Client.get('disciplinas/create').then(res => {
  //             const cursos = res.data
  //             console.log(cursos)
  //             setData(cursos.data)
  //         })
  //         .catch(function(error) {
  //             console.log(error)
  //         })
  //         .finally( () => {
  //             setLoad(false)
  //         })

  //     }, 1000)
  // }

  function verifyPermission() {
    // Não Autenticado
    console.log("tela!!");
    if (!dataUser) navigate("/login");
    // Não Autorizado (rota anterior)
    else if (permissions.createInvestments === 0) navigate(-1);
  }

  useEffect(() => {
    verifyPermission();
    //   sendData()
  }, []);

  function sendData() {
    const investments = {
      id: clientFromView?.id,
      accountNumber: clientFromView?.accountNumber,
      value: value,
    };

    if (!clientFromView) {
      setClientId(dataUser.id);
    } else {
      setClientId(clientFromView.id);
    }

    Client.put("auth/investments/update/" + clientFromView?.id, investments)
      .then((response) => {
        alert("Transação realizada com sucesso!");
        navigate(-1);
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          console.error(error);
        }
      });
  }

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
          <Label>Valor</Label>
          <Input
            type="number"
            id="value"
            name="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Submit
            id="submit"
            value="Transferir para Investimentos"
            onClick={() => sendData()}
          />
          <Submit value="Voltar" onClick={() => navigate(-1)} />
        </Container>
      )}
    </>
  );
}
