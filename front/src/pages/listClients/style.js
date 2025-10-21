import styled from "styled-components";

export const Container = styled.div`
  box-sizing: border-box;
  padding-top: 20px;
  padding-left: 30px;
  margin-left: -20px;
  padding-bottom: 15px;
  margin-bottom: 20px;
  background-color: #76797638;
  white-space: nowrap;
  color: #4b4b55ff;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #4b4b55ff;
  margin-bottom: 5px;
`;
export const Submit = styled.input.attrs({ type: "submit" })`
  box-sizing: border-box;
  width: 250px;
  height: 50px;
  background-color: orange;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border-radius: 8px;
  margin-top: 20px;
  border: 0px;
  cursor: grab;
  margin-right: 25px;
  margin-bottom: 40px;
  &:hover {
    background-color: #0f3b39ff;
  }
`;

