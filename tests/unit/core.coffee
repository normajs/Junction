
describe 'Core method tests', ->

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
      @.evaluate ->
        div = document.createElement "div"
        div.id = "test"
        document.body.appendChild div

      thereIsAnArrayOfNodes = @.evaluate ->
        test = junction "#test"
        for item in test
          if item is document.getElementById("test")
            return true
        return false
      thereIsAnArrayOfNodes.should.be.true
    return

  return
