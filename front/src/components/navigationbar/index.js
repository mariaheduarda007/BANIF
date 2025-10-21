import { useContext } from "react";
import { useNavigate } from "react-router";
import { Image } from "./style";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import DropTitle from "../droptitle";
import logo_bank from "../../images/logoBanco.png";

import UserContext from "../../contexts/UserContext";
import { Client, removeToken } from "../../api/client";
import { removePermissions } from "../../service/PermissionService";
import { getDataUser, removeDataUser } from "../../service/UserService";

function NavigationBar() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const dataUser = getDataUser();

  function logout() {
    setTimeout(() => {
      Client.post("auth/logout")
        .then((res) => {
          removeToken();
          // removePermissions();
          // removeDataUser();
          navigate("/login");
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    }, 1000);
  }

  function myProfile() {
    setTimeout(() => {
      Client.post("auth/profile")
        .then((res) => {
          navigate("/profile");
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {});
    }, 1000);
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">
          <Image src={logo_bank} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
          </Nav>
          <NavDropdown
            title={
              <DropTitle text={dataUser.name} />
            }
            id="navbarScrollingDropdown"
            className="me-4"
          >
            <NavDropdown.Item
              onClick={() => myProfile()}
              href="/viewClient"
              className="me-5"
            >
              Minha Conta
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => logout()} className="me-5">
              Sair
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
