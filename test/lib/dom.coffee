
casper.test.begin "DOM Testing", 4, (test) ->


  casper.start()

    # ADD ---------------------------------------------------------------------

    # The ADD function adds the item to the current set of items that can have
    # other actions taken on them. For example, after performing an ADD you
    # may want to add a css class to all the tiems in the set.

    .then ->

      originalCount = 0
      testCount = 0
      combinedThingCount = 0

      @.evaluate ->

        originalCount = junction("body").length
        testCount = junction("#test").length
        combinedThing = junction("body").add("#test")
        combinedThingCount = thing.length

      test.assertEquals originalCount + testCount,
                        combinedThingCount,
                        ["Add is successful"]

      return


    # ADD-CLASS ---------------------------------------------------------------

    # The ADD-CLASS function adds a css class to the item selected.

    .then ->

      @.evaluate ->

        junction("#test").addClass("testing")

      test.assertExists ".testing", ["AddClass is successful"]

      return


    # AFTER -------------------------------------------------------------------

    # The AFTER function adds the designated markup AFTER the selected item.

    .then ->

      @.evaluate ->

        junction("#test").append("<div id='foo-before'></div>")
        junction("#foo-before").after("<div id='foo-after'></div>")

        # $fixture.children().each (i) ->
        #   if shoestring(this).is(".after")
        #     equal $fixture.children()[i + 1].className, "foo-after"
        #     equal $fixture.children()[i + 2].className, "foo-after2"
        #   return

      testElement = @.evaluate ->
        te = document.getElementById("foo-before")
        temp = te.nextSibling
        return temp

      test.assertEquals testElement.attributes[0].textContent, "foo-after", ["After is successful"]

      # test.assertExists "#foo-after", ["After is successful"]

      return


    # APPEND ------------------------------------------------------------------

    .then ->

      # resultWrapper = @evaluate(->
      #   wrapper = {}
      #   try
      #     junction("<div id=\"second\"></div>").appendTo("#test")
      #
      #     # store your return values in the wrapper
      #   catch error
      #     wrapper.error = error
      #   wrapper
      # )
      #
      # # Handle the result and possible errors:
      # if resultWrapper.error
      #   error = resultWrapper.error
      #   @echo "An error occurred: " + JSON.stringify(error.message)

      # else
      #   result = JSON.stringify(resultWrapper.result)
      #   @echo result

      @.evaluate ->
        junction("body").append "<div id=\"second\"></div>"

      test.assertExists "#second", ["Append is successful"]

      return


    # APPENDTO ----------------------------------------------------------------

    # .then ->
    #
    #   @.evaluate ->
    #
    #     junction("body")

    # ATTR --------------------------------------------------------------------
    # BEFORE ------------------------------------------------------------------
    # CHILDREN ----------------------------------------------------------------
    # CLONE -------------------------------------------------------------------
    # CLOSEST -----------------------------------------------------------------
    # /CSS/EXCEPTIONS ---------------------------------------------------------
    # /CSS/GETCOMPUTEDSTYLE ---------------------------------------------------
    # /CSS/GETSTYLE -----------------------------------------------------------
    # /CSS/SETSTYLE -----------------------------------------------------------
    # CSS ---------------------------------------------------------------------
    # DIMENSION ---------------------------------------------------------------
    # EQ ----------------------------------------------------------------------
    # FILTER ------------------------------------------------------------------
    # FIND --------------------------------------------------------------------
    # FIRST -------------------------------------------------------------------
    # GET ---------------------------------------------------------------------
    # HASCLASS ----------------------------------------------------------------
    # HEIGHT ------------------------------------------------------------------
    # HIDE --------------------------------------------------------------------
    # HTML --------------------------------------------------------------------
    # INDEX -------------------------------------------------------------------
    # INSERTAFTER -------------------------------------------------------------
    # INSERTBEFORE ------------------------------------------------------------
    # IS ----------------------------------------------------------------------
    # LAST --------------------------------------------------------------------
    # MAP ---------------------------------------------------------------------
    # NEXT --------------------------------------------------------------------
    # NOT ---------------------------------------------------------------------
    # OFFSET ------------------------------------------------------------------
    # OUTERWIDTH --------------------------------------------------------------
    # PARENT ------------------------------------------------------------------
    # PARENTS -----------------------------------------------------------------
    # PREPEND -----------------------------------------------------------------
    # PREPENDTO ---------------------------------------------------------------
    # PREV --------------------------------------------------------------------
    # PREVALL -----------------------------------------------------------------
    # PROP --------------------------------------------------------------------
    # PROPFIX -----------------------------------------------------------------
    # REMOVE ------------------------------------------------------------------
    # REMOVEATTR --------------------------------------------------------------
    # REMOVECLASS -------------------------------------------------------------
    # REMOVEPROP --------------------------------------------------------------
    # REPLACEWITH -------------------------------------------------------------
    # SERIALIZE ---------------------------------------------------------------
    # SHOW --------------------------------------------------------------------
    # SIBLINGS ----------------------------------------------------------------
    # TEXT --------------------------------------------------------------------
    # VAL ---------------------------------------------------------------------
    # WIDTH -------------------------------------------------------------------
    # WRAPINNER ---------------------------------------------------------------



  casper.run ->
    test.done()
    return

  return
