import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import NavigationBar from "../../components/navigationbar";
import { getDataUser } from "../../service/UserService";
import { getPermissions } from "../../service/PermissionService";
import { Container } from './style';
import { Client } from '../../api/client'
import { OrbitProgress } from "react-loading-indicators";
import FormRegister from '../../components/formregister';

export default function NewClient() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
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
          <p>Insira as informações do cliente nos campos abaixo</p>
          <FormRegister/>
        </Container>
      )}
    </>
  );
}
