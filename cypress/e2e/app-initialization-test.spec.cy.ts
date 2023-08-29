describe( 'Application Health Checks', function () {

  beforeEach( () => {
    cy.visit( '/' )
  } )

  it( 'No console errors on main page', function () {
    cy.window().then( ( win ) => {
      cy.spy( win.console, 'error' )
    } )
    cy.window().its( 'console.error' ).should( 'not.have.been.called' )
  } )

} )

export { }
