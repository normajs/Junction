
describe 'Events tests', ->

  # BIND ----------------------------------------------------------------------

  # The BIND event binds a callback to an event for the current set of
  # elements.

  it 'BIND method should work', ->

    casper.then ->

      testThing = @.evaluate ->
        junction("body").append("<div id='bindTest'></div>")
        junction("#bindTest").bind("click", () ->
          junction("#bindTest").addClass("bindTest")
        )
        return junction("#bindTest")

      i = 1
      @.click("#" + testThing[0].id)

      ".bindTest".should.be.inDOM

    return

  # ONE -----------------------------------------------------------------------

  # The ONE event will bind a callback to an event for the current set of
  # elements and then unbind after one occurence.

  it 'ONE method should work', ->

    casper.then ->

      testThing = @.evaluate ->

        junction("body").append("<div id='foobar'></div>")
        junction("#foobar").one("click", () ->
          junction("#foobar").addClass("foobar")
        )
        return junction("#foobar")

      i = 1
      @.click("#" + testThing[0].id)

      ".foobar".should.be.inDOM



    return

  # TRIGGER -------------------------------------------------------------------

  # The TRIGGER event actually triggers an event on each of the DOM elements
  # in the current set.

  it 'TRIGGER method should work', ->

    casper.then ->

      @.evaluate ->
        junction("body").append("<div id='triggerTest'></div>")

        junction("#triggerTest").bind("click", () ->
          junction("#triggerTest").addClass("triggerTest")
        )

        junction("#triggerTest").trigger("click")

        return


      ".triggerTest".should.be.inDOM

    return


  # UNBIND --------------------------------------------------------------------

  # The UNBIND event unbinds a previously bound callback for an event.

  it 'UNBIND method should work', ->

    casper.then ->

      testThing = @.evaluate ->
        junction("body").append("<div id='unbindTest'></div>")

        junction("#unbindTest").bind("click", () ->
          junction("#unbindTest").addClass("unbindTest")
        )

        junction("#unbindTest").unbind("click")

        return junction("#unbindTest")


      @.click("#" + testThing[0].id)

      ".unbindTest".should.not.be.inDOM

    return

  return
