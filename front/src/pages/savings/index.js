import { useNavigate } from "react-router";
import { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from "../../components/navigationbar";
import { Label, Input, Select, Submit } from "./style";
import { Client } from "../../api/client";
import { getPermissions } from "../../service/PermissionService";
import { getDataUser } from "../../service/UserService";

export default function Create() {
  const [accountNumber, setAccountNumber] = useState("");
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const permissions = getPermissions()
  const dataUser  = getDataUser()

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
      if(!dataUser) navigate('/login')
      // Não Autorizado (rota anterior)
      else if(permissions.createSavings === 0) navigate(-1)
  }

  useEffect(() => {
      verifyPermission()
    //   sendData()
  }, []);

  function sendData() {
    const savings = { account_number_fk: accountNumber, value: value };

    Client.post("auth/savings", savings)
      .then((response) => {
        alert(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error(error);
      });

    navigate("/home");
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
          <Label>Número da Conta</Label>
          <Input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <Label>Valor</Label>
          <Input
            type="number"
            id="value"
            name="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Submit id="submit" value="Transferir para Poupança" onClick={() => sendData()} />
          <Submit value="Voltar" onClick={() => navigate("/home")} />
        </Container>
      )}
    </>
  );
}
