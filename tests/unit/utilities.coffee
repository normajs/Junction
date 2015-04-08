
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

    casper.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 8_1_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B466 Safari/600.1.4')

    casper.then ->

      isThisMobile = @.evaluate ->
        __utils__.echo navigator.userAgent
        casper.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 8_1_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B466 Safari/600.1.4')
        return junction.isMobile()
      @.echo isThisMobile

      isThisMobile.should.be.true

    return


  # LAST ----------------------------------------------------------------------

  # The LAST function returns the last value of array or value certain length
  # from end

  it 'LAST method should work', ->

    casper.then ->

      theLastOne = @.evaluate ->
        myArray = [1,2,3,4,5]
        return junction.last(myArray)

      theLastOne.should.equal(5)

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
