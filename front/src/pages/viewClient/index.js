import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { Container } from "react-bootstrap";
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from "../../components/navigationbar";
import { Client } from "../../api/client";
import { getDataUser } from "../../service/UserService";
import { getPermissions } from "../../service/PermissionService";
import Balance from "../../components/clientBalance";

export default function ViewClient() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const dataUser = getDataUser();
  const permissions = getPermissions();

  function verifyPermission() {
    if (!dataUser) navigate("/login");
    else if (permissions.listStatement === 0) navigate(-1);
  }

  useEffect(() => {
    verifyPermission();
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
            <Balance />
        </Container>
      )}
    </>
  );
}
 