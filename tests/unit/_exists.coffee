
describe 'Junction existence tests', ->

  before ->
    casper.start()

  it 'junction library should be present', ->
    casper.then ->
      @.page.injectJs("./out/junction.js")
      junctionType = @.evaluate ->
        return typeof junction
      junctionType.should.equal("function")
    return

  it 'junction library should have methods', ->
    casper.then ->
      numberOfMethods = @.evaluate ->
        return Object.keys(junction).length
      numberOfMethods.should.be.at.least(1)
    return

  return
