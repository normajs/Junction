
describe 'Core method tests', ->
  
  before ->
    # casper.start 'http://localhost:3000'
    # casper.start
    return

  it 'junction library should be ready', ->
    casper.then ->
      junctionIsReady = @.evaluate ->
        ready = false
        junction(document).ready( ->
          ready = true
        )
        return ready
      junctionIsReady.should.be.true
    return

  it 'junction library should return an array of nodes', ->
    casper.then ->
      thereIsAnArrayOfNodes = @.evaluate ->
        test = junction "#test"
        for item in test
          __utils__.echo item
          __utils__.echo item is document.getElementById("test")
          __utils__.echo "@jbaxleyiii I don't understand how this works."
          __utils__.echo "item is 'null', but 'item is document.getElementById('test')' is true"
          if item is document.getElementById("test")
            return true
        return false
      thereIsAnArrayOfNodes.should.be.true
    return

  return
