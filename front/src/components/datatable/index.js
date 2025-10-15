import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { Title } from "./style";
import { VIEW, CREATE} from "../../utils/crud";
import { getPermissions } from "../../service/PermissionService";
import { getDataUser } from "../../service/UserService";

export default function DataTable(props) {
  const navigate = useNavigate();
  const permissions = getPermissions();


  function view(item) {
    navigate("read", { state: { item: item } });
  }


  return (
    <>
      <>
        <Title>{props.title}</Title>
        <Table striped hover>
          <thead>
            <tr>
              {props.rows.map((item, index) =>
                props.hide[index] ? (
                  <th className="d-none d-md-table-cell" key={index}>
                    {item.toUpperCase()}
                  </th>
                ) : (
                  <th key={index}>{item.toUpperCase()}</th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {props.data.map((element, index) => (
              <tr key={index}>
                {props.keys.map((key, index) =>
                  props.hide[index] ? (
                    <td className="d-none d-md-table-cell" key={index}>
                      {element[key]}
                    </td>
                  ) : (
                    <td key={index}>{element[key]}</td>
                  )
                )}

                <td>
                  {permissions[props.crud[VIEW]] ? (
                    <Button
                      variant="info"
                      className="me-1"
                      onClick={() => view(element)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="#FFF"
                        className="bi bi-info-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                      </svg>
                    </Button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
      {/* <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remoção - Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>Operação Efetuda com Sucesso!!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}
