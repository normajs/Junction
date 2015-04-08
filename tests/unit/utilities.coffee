
describe 'Utilities tests', ->

  # DEBOUNCE ------------------------------------------------------------------

  # FLATTEN -------------------------------------------------------------------

  # The FLATTEN function takes any array and returns a new array with all the
  # elements flattened into one dimension.

  it 'FLATTEN method should work', ->

    casper.then ->

      testArray = @.evaluate ->
        junction("body").append("<div id='flattenTest'></div>")
        junction("#flattenTest").append("<div id='flattenChild1'></div>")
        junction("#flattenTest").append("<div id='flattenChild2'></div>")

        testThing = junction("#flattenTest").children()
        arr = junction.flatten(testThing)
        return arr

      testArray.length.should.equal(2)

    return

  # FLATTENOBJECT -------------------------------------------------------------

  # The FLATTENOBJECT function works the same as FLATTEN except it accepts
  # and object and turns it into a flattened array.

  it 'FLATTENOBJECT method should work', ->

    casper.then ->

      testArray = @.evaluate ->
        junction("body").append("<div id='flattenObjectTest'></div>")
        junction("#flattenObjectTest").append("<div id='flattenChild1'></div>")
        junction("#flattenObjectTest").append("<div id='flattenChild2'></div>")

        testObject = []
        testThing = junction("#flattenObjectTest").children()
        testThing.each ->
          element = {}
          element.id = @.id
          testObject.push element

        arr = junction.flattenObject(testObject)
        return arr

      testArray.length.should.equal(2)

    return

  # GETKEYS -------------------------------------------------------------------

  # The GETKEYS function returns an array of keys that match a certain value.

  it 'GETKEYS method should work', ->

    casper.then ->

      testArray = @.evaluate ->
        junction("body").append("<div id='getKeysTest'></div>")
        junction("#getKeysTest").append("<div id='getKeysChild1'></div>")
        junction("#getKeysTest").append("<div id='getKeysChild2'></div>")

        testObject = []
        testThing = junction("#getKeysTest").children()
        testThing.each ->
          element = {}
          element.id = @.id
          element.zanzabar = "zulu"
          testObject.push element

        arr = junction.getKeys testObject[0], "zulu"
        return arr

      testArray[0].should.equal("zanzabar")

    return

  # GETQUERYVARIABLE ----------------------------------------------------------

  # The GETQUERYVARIABLE function returns an array of query variables in the
  # URL string matching the value.

  it 'GETQUERYVARIABLE method should work', ->

    casper.thenOpen 'http://localhost:3000?testing=all&thething=all&theotherthing=three', () ->

      testThing = @.evaluate ->
        return junction.getQueryVariable "testing"

      testThing[0].should.equal("testing=all")

    casper.back()

    return


  # ISMOBILE ------------------------------------------------------------------

  it 'ISMOBILE method should work', ->

    casper.then ->

      casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)')


      casper.then ->
        @.echo("I'm a Mac.")
        isThisMobile = @.evaluate ->
          return junction.isMobile()
        @.echo isThisMobile
        @.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 8_1_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B466 Safari/600.1.4')

      casper.then ->
        @.echo "I'm an iPhone 5S on iOS 8.1.3"
        isThisMobile = @.evaluate ->
          return junction.isMobile()
        @.echo isThisMobile


      # casper.on 'resource.requested', (resource) ->
      #   for obj of resource.headers
      #     name = resource.headers[obj].name
      #     value = resource.headers[obj].value
      #     if name == 'User-Agent'
      #       @echo value
      #   return

    return

  # LAST ----------------------------------------------------------------------
  # TRUTHFUL ------------------------------------------------------------------

  return
