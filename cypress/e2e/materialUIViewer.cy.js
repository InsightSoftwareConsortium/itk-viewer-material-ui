describe('The Material-UI Viewer', () => {
  // Load the viewer
  before(() => {
    cy.visit('/')
    cy.wait(10000)
    cy.waitForReact(10000, '.uiContainer')

  })

  beforeEach(() => {
    // TODO: Figure out why we need to do this. For some reason when testing in
    // headless mode the drawer is randomly hidden making all tests fail.
    cy.get('.drawer').children().then(($drawerElems) => {
      if(!$drawerElems.is(':visible')) {
        cy.get('#toggleDrawer').click()
      }
    })
  })

  it('has the correct default options and values', { defaultCommandTimeout: 30000 }, () => {
    // Default to drawer open
    cy.get('.drawer').children().should('be.visible')
    cy.react('MainInterface').should('be.visible')
    // Should have two rows of icons
    cy.react('MainInterface').children().should('have.length', 2)
    cy.get('.mainUIRow > button').should('have.length', 8)
    cy.get('.viewModeButtons > button').should('have.length', 4)
    cy.react('LayersInterface').then(($layers) => {
      cy.wrap($layers).should('be.visible')
      cy.react('WidgetsInterface').should('have.length', 1)
      cy.react('ImagesInterface').should('be.visible')
    })
  })

  it('hides unused widgets', () => {
    // We currently only have a single image, no label
    cy.react('LayersInterface').should('have.length', 1)
    // Only displayed for 2D images, we're currently viewing a volume
    cy.react('WidgetsInterface').children('.uiRow').should('be.hidden')
    // No label loaded so no label widgets should be added
    cy.react('LabelImageColorWidget').should('not.exist')
    cy.react('LabelMapWeightWidget').should('not.exist')
    // Should be hiding the component selector
    cy.react('ComponentSelector').should('be.hidden')
  })

  it('supports changing the data range', () => {
    // Change the maximum
    cy.get('[type="number"]').last().type('{selectAll}100').should('have.value', '100')
    // Change the minimum
    cy.get('[type="number"]').first().type('{selectAll}10').should('have.value', '10')
  })

  it('prevents changing the data range below or above bounds', () => {
    // Change the maximum
    cy.get('[type="number"]').last().type('{selectAll}256').should('have.value', '255')
    // Change the minimum
    cy.get('[type="number"]').first().type('{selectAll}-1').should('have.value', '0')
  })

  it('hides all widgets when drawer is closed', () => {
    cy.get('#toggleDrawer').click().then(($drawer) => {
      cy.wrap($drawer).children().should('be.hidden')
      cy.get('#toggleDrawer').click()
    })
  })

  it('displays distance widget for 2D plane', () => {
    cy.get('.viewModeButtons').children('button').first().click().then(() => {
      cy.react('DistanceWidget').should('be.visible')
      cy.get('.viewModeButtons').children('button').last().click()
    })
  })

  it('can succesfully change the view', () => {
    // Toggle the axes on
    cy.react('AxesButton').click()
    // Toggle all of the planes on
    cy.react('ViewPlanesToggle').click()
    // Toggle the z plane off
    cy.get('.planeSliders').last().children('button').first().click()
    // Change the x plane slider value
    cy.get('.planeSliders').first().children('button').last().click().then(($xplay) => {
      cy.wrap($xplay).click()
    })
    // Change the colormap
    cy.react('ColorMapIconSelector').click().get('ul > li[data-value="rainbow"]').click()
  })
})
