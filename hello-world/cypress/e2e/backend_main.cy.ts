describe('Node Version', () => {
  it('uses the system Node version', () => {
    expect(process.version == 'v22.2.0')
  })
})

describe('The Hello World', () => {
  beforeEach(() => {
    cy.task('resetDatabase')

    cy.request('POST', '/api/form-handler', {
      person_name: 'Bob',
      person_bio: 'Test Bio',
    })
  })

  it('successfully responds', () => {
    cy.visit('/')
  })

  it('posts a new user', () => {
    cy.request('POST', '/api/form-handler', {
      person_name: 'Skyler',
      person_bio: 'Second Test',
    }).then((response) => {
      expect(response.body).to.eq('New user added')
    })
  })

  it('returns test data', () => {
    cy.request('GET', '/api/form-handler?person_name=Bob').then((response) => {
      expect(JSON.parse(response.body).bio).to.eq('Test Bio')
    })
  })
})
