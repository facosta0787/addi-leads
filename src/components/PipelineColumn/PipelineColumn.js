import { Container, Title, List } from './styles'
import ListItem from './ListItem'

const PipelineColumn = ({ title, data }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <List>
        {data.map(lead => (
          <ListItem key={lead.nin} data={lead} />
        ))}
      </List>
    </Container>
  )
}

export default PipelineColumn
