import styled from 'styled-components'

export const Container = styled.main`
  max-width: 95%;
  margin: 0 auto;
  margin-top: 20px;

  @media screen and (min-width: 768px) {
    max-width: 90%;
  }

  @media screen and (min-width: 1024px) {
    max-width: 1024px;
  }
`

export const Actions = styled.div`
  margin-bottom: 10px;
`