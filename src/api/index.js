export default class Api {
  constructor() {
    this.baseUrl = 'http://localhost:3001'
    this.nationalRegistry = []
    this.judicialRecord = []
  }

  fetcher = async endpoint => {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`)
      const resource = await response.json()
      return resource
    } catch (err) {
      console.error(err)
    }
  }

  fetchLeads = () => {
    const leads = this.fetcher('/leads')
    return leads
  }

  validateNationalRegistry = async lead => {
    if (this.nationalRegistry.length === 0) {
      this.nationalRegistry = await this.fetcher('/nationalRegistry')
    }
    return this.nationalRegistry.find(
      registry => JSON.stringify(registry) === JSON.stringify(lead)
    )
  }

  validateJudicialRecord = async lead => {
    if (this.judicialRecord.length === 0) {
      this.judicialRecord = await this.fetcher('/judicialRecord')
    }
    return this.judicialRecord.find(record => record === lead.nin)
  }

  prospectQualificationScore = leads => {
    const prospectLeads = leads.reduce((acum, lead) => {
      return [
        ...acum,
        {
          ...lead,
          score: Math.floor(Math.random() * 101),
        },
      ]
    }, [])
    return prospectLeads.filter(prospect => prospect.score > 60)
  }
}
