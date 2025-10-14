import styled from 'styled-components';
// import logo_depen from '../../images/logo_depen.png';
import logo_bank from '../../images/logoBanco.png';

export const Container = styled.div`
    
    background-image: url( ${logo_bank});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-left: 1px solid #CCC;

    @media (max-width: 800px) {
        display: none;
    }
`