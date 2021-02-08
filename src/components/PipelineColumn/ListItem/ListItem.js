import format from 'date-fns/format'
import { FaBirthdayCake, FaAt, FaPercentage } from 'react-icons/fa'
import { Container, Title, Caption, Paragraph } from './styles'

const ListItem = ({
  data: { nin, lastName, firstName, birthdate, email, score },
}) => {
  return (
    <Container>
      <Title>{`${firstName} ${lastName}`}</Title>
      <Caption>
        <Paragraph>
          <FaAt style={{ marginRight: 12 }} />{email}
        </Paragraph>
        <Paragraph>
          <FaBirthdayCake style={{ marginRight: 12 }} />
          {format(new Date(birthdate), 'MMM dd yyyy')}
        </Paragraph>
        {score && (
          <Paragraph>
            <FaPercentage style={{ marginRight: 12 }} />{score}
          </Paragraph>
        )}
      </Caption>
    </Container>
  )
}

export default ListItem
