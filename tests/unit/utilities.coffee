
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

    return

  # ISELEMENT -----------------------------------------------------------------

  # The ISELEMENT function determines if the HTMLElement is an actual element.

  it 'ISELEMENT method should work', ->

    casper.then ->

      thing = @.evaluate ->
        junction("body").append("<div id='isElement'>HELLO</div>")
        testThing = junction("#isElement")
        return junction.isElement(testThing[0])

      thing.should.be.true

    return

  # ISELEMENTINVIEW -----------------------------------------------------------

  # The ISELEMENTINVIEW function determines if the element is in the view.

  it 'ISELEMENTINVIEW method should work', ->

    # casper.then ->
    casper.viewport(1024, 768).then ->

      @.capture("../images/test.png")
      testing = @.evaluate ->
        testThing = junction("#isElement")
        __utils__.echo testThing
        return junction.isElementInView testThing

      @.echo testing
      testing.should.be.true

    return

  # ISMOBILE ------------------------------------------------------------------

  it 'ISMOBILE method should work', ->

    casper.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 8_1_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B466 Safari/600.1.4')

    casper.then ->

      isThisMobile = @.evaluate ->
        __utils__.echo navigator.userAgent
        casper.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 8_1_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B466 Safari/600.1.4')
        return junction.isMobile()
      @.echo isThisMobile

      isThisMobile.should.be.true

    return

  #     casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)')
  #
  #     casper.thenOpen 'http://google.com/', () ->
  #       @.echo("I'm a Mac.")
  #       isThisMobile = @.evaluate ->
  #         return junction.isMobile()
  #       @.echo isThisMobile
  #       @.capture("../images/mac.png")
  #       test.assertEquals isThisMobile, false, ["ISMOBILE correctly identifies non-mobile user agents."]
  #       @.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 8_1_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B466 Safari/600.1.4')
  #
  #     casper.thenOpen 'http://google.com/', () ->
  #       @.echo "I'm an iPhone 5S on iOS 8.1.3"
  #       isThisMobile = @.evaluate ->
  #         return junction.isMobile()
  #       @.echo isThisMobile
  #       @.capture("../images/iphone.png")
  #       @.evaluate ->
  #         __utils__.echo window.navigator.userAgent
  #       @.echo JSON.stringify @.options.pageSettings.userAgent
  #       test.assertEquals isThisMobile, true, ["ISMOBILE correctly identifies mobile user agents."]
  #
  #     # casper.on 'resource.requested', (resource) ->
  #     #   for obj of resource.headers
  #     #     name = resource.headers[obj].name
  #     #     value = resource.headers[obj].value
  #     #     if name == 'User-Agent'
  #     #       @echo value
  #     #   return
  #
    return

  # LAST ----------------------------------------------------------------------

  # The LAST function returns the last value of array or value certain length
  # from end

  it 'LAST method should work', ->

    casper.then ->

      theLastOne = @.evaluate ->
        myArray = [1,2,3,4,5]
        return junction(myArray).last()

      theLastOne[0].should.equal(5)

    return

  # TRUTHFUL ------------------------------------------------------------------

  # the TRUTHFUL function takes an array with true and false values and returns
  # only the truthful ones.

  it 'TRUTHFUL method should work', ->

    casper.then ->

      theTrueOnes = @.evaluate ->

        myArray = [true,false,true,false,true]
        return junction.truthful(myArray)

      theTrueOnes.length.should.equal(3)

    return

  return
