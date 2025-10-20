import { useNavigate, useLocation } from "react-router";
import { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from "../../components/navigationbar";
import { Label, Input, Select, Submit } from "./style";
import { Client } from "../../api/client";
import { getPermissions } from "../../service/PermissionService";
import { getDataUser } from "../../service/UserService";

export default function Transfer() {
  const [accountNumberReceivingTransfer, setAccountNumberReceivingTransfer] =
    useState("");
  const [agencyNumberReceivingTransfer, setAgencyNumberReceivingTransfer] =
    useState("");
  const [value, setValue] = useState(0);

  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const permissions = getPermissions();
  const dataUser = getDataUser();

  const [message, setMessage] = useState("");

  const location = useLocation();

  const clientFromView = location.state?.clientMakingTransfer;

  function verifyPermission() {
    // Não Autenticado
    if (!dataUser) navigate("/login");
    // Não Autorizado (rota anterior)
    else if (permissions.createTransfer === 0) navigate(-1);
  }

  useEffect(() => {
    verifyPermission();
  }, []);

  function sendData() {
    const transaction = {
      agencyNumberMakingTransfer: clientFromView.agencyNumber,
      accountNumberMakingTransfer: clientFromView.accountNumber,
      agencyNumberReceivingTransfer: agencyNumberReceivingTransfer,
      accountNumberReceivingTransfer: accountNumberReceivingTransfer,
      value: value,
    };

    Client.post("/auth/transaction", transaction)
      .then((response) => {
        setMessage("Transferência realizada com sucesso!");
        setValue(0);
        setAccountNumberReceivingTransfer("");
        setAgencyNumberReceivingTransfer("");
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Erro ao tentar realizar a transferência.");
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
          <Label>Número da Agência (****-*)</Label>
          <Input
            type="text"
            id="agencyNumbeReceivingTransferr"
            name="agencyNumberReceivingTransfer"
            value={agencyNumberReceivingTransfer}
            onChange={(e) => setAgencyNumberReceivingTransfer(e.target.value)}
          />
          <Label>Número da Conta (*****-*)</Label>
          <Input
            type="text"
            id="accountNumberReceivingTransfer"
            name="accountNumberReceivingTransfer"
            value={accountNumberReceivingTransfer}
            onChange={(e) => setAccountNumberReceivingTransfer(e.target.value)}
          />
          <Label>Valor</Label>
          <Input
            type="number"
            id="value"
            name="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Submit value="Transferir" onClick={() => sendData()} />
          <Submit value="Voltar" onClick={() => navigate(-1)} />
          {message && (
            <div
              style={{
                color: message.includes("sucesso") ? "green" : "red",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {message}
            </div>
          )}
        </Container>
      )}
    </>
  );
}
