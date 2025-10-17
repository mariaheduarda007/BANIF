import styled from "styled-components";

export const Container = styled.div`
  box-sizing: border-box;
  padding-top: 30px;
  padding-left: 90px;
  padding-bottom: 50px;
`;
export const DataDivider = styled.div`
  box-sizing: border-box;
  display: flex; /* coloca os filhos em linha */
  flex-wrap: wrap; /* permite quebrar linha se não couber tudo */
  margin-bottom: 20px;
`;

export const BoxIcon = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  width: 90%;
  margin-top: 30px;
`;

export const BoxItem = styled.div`
  text-align: center;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 20px;
  color: #111;
  margin-top: 15px;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  display: inline-block;
  width: 100%;
  height: 40px;
  border: 1.5px solid #140e85ff;
  border-radius: 5px;
  margin-bottom: 10px;
  padding-left: 10px;

  &:focus {
    outline: none;
    border: 3px solid #140e85ff;
  }
`;

export const LabelAndInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin-right: 50px;
`;
export const InputPassword = styled.input.attrs({ type: "password" })`
  display: inline-block;
  width: 100%;
  height: 30px;
  height: 40px;
  border: 1.5px solid #140e85ff;
  border-radius: 5px;
  margin-bottom: 10px;
  padding-left: 10px;

  &:focus {
    outline: none;
    border: 3px solid #140e85ff;
  }
`;

export const SendBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  width: 90%;
  padding-bottom: 30px;
  border-bottom: 1px solid #555;
`;

export const MsgBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
  width: 90%;
  padding-top: 10px;
  color: red;
`;

export const Submit = styled.input.attrs({ type: "submit" })`
  box-sizing: border-box;
  width: 180px;
  height: 35px;
  background-color: #ff9b29ff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  margin-top: 20px;
  margin-left: 80%;
  border: 0px;
  cursor: grab;
`;
