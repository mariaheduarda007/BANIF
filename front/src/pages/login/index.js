import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Container } from "./style";
import FormLogin from "../../components/formlogin";
import ImageLogin from "../../components/imagelogin";
import { Client } from "../../api/client";
import { OrbitProgress } from "react-loading-indicators";
import { getDataUser } from "../../service/UserService";
import { Alert } from "react-bootstrap";

export default function Login() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const user = getDataUser();

  function fetchData() {
    setLoad(true);
    setTimeout(() => {
      Client.get("/auth/me")
        .then((res) => {
          alert("entrou")
          // if (res.data.user.id_role_fk == 1) {
          //   navigate("/listClients");
          // } else {
          //   navigate("/viewClient");
          // }
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          setLoad(false);
        });
    }, 1000);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return load ? (
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
    <Container>
      <FormLogin />
      <ImageLogin />
    </Container>
  );
}
