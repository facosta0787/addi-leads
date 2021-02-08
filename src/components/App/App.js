import { useState, useEffect, useCallback } from 'react'
import unionBy from 'lodash.unionby'
import { FaPlay } from 'react-icons/fa'
import Api from '../../api'
import { getValidNationalRegistry, getValidJudicialRecord } from '../../api/utils'

import Button from '../Button'
import PipelineContainer from '../PipelineContainer'
import PipelineColumn from '../PipelineColumn'

import { Container, Actions } from './styles'

const api = new Api()

function App() {
  const [leads, setLeads] = useState([])
  const [prospectLeads, setProspectLeads] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const leadsResponse = await api.fetchLeads()
      setLeads(leadsResponse)
    }
    fetchData()
  }, [])

  const getVisibleLeads = useCallback(() => {
    if(!prospectLeads.length) return leads
    return leads.filter(lead => !prospectLeads.map(prospect => prospect.nin).includes(lead.nin))
  }, [leads, prospectLeads])

  const handleProcessingLeads = useCallback(async () => {
    const validNationalRegistry = await getValidNationalRegistry(leads, api)
    const validJudicialRecord = await getValidJudicialRecord(leads, api)
    const merged = unionBy(validNationalRegistry, validJudicialRecord, item => item.nin)
    const prospectLeads = api.prospectQualificationScore(merged)
    setProspectLeads(prospectLeads)
  },[leads])

  return (
    <Container>
      <Actions>
        <Button onClick={handleProcessingLeads}><FaPlay style={{ marginRight: 5 }} /> PROCESS</Button>
      </Actions>
      <PipelineContainer>
        <PipelineColumn title="Leads" data={getVisibleLeads()} />
        <PipelineColumn title="Leads Prospect" data={prospectLeads} />
      </PipelineContainer>
    </Container>
  )
}

export default App
