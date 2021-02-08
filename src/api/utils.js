export const getValidNationalRegistry = async (leads, api) => {
  const validatingNationalRegistry = leads.map(lead =>
    api.validateNationalRegistry(lead)
  )
  const resultsNationalRegistry = await Promise.allSettled(
    validatingNationalRegistry
  )
  return resultsNationalRegistry.reduce((acum, result) => {
    const { value } = result
    if (!value) {
      return acum
    }
    return [...acum, { ...value }]
  }, [])
}

export const getValidJudicialRecord = async (leads, api) => {
  const validatingJudicialRecord = leads.map(lead =>
    api.validateJudicialRecord(lead)
  )
  const resultsJudicialRecord = await (
    await Promise.allSettled(validatingJudicialRecord)
  ).reduce((acum, result) => {
    const { value } = result
    if (!value) return acum
    return [...acum, value]
  }, [])

  return leads.filter(lead => !resultsJudicialRecord.includes(lead.nin))
}
