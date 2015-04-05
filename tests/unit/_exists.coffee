
describe 'Junction existence tests', ->

  before ->
    casper.start 'http://localhost:3000'
    return

  it 'should be pointed at http://localhost:3000', ->
    casper.then ->
      expect(/localhost:3000/).to.matchCurrentUrl
    return

  it 'matches the current url given by casper', ->
    casper.then ->
      expect(casper.getCurrentUrl()).to.matchCurrentUrl
    return

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
