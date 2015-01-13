
casper.test.begin "DOM Testing", 9, (test) ->


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

      testElement = @.evaluate ->
        te = document.getElementById("foo-before")
        temp = te.nextSibling
        return temp

      test.assertEquals testElement.attributes[0].textContent,
                        "foo-after",
                        ["After is successful"]

      return


    # APPEND ------------------------------------------------------------------

    # The APPEND function adds the element as the last child of the selected item

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

    # The APPENDTO function works the same as the APPEND function...just
    # is written backwards.

    .then ->

      @.evaluate ->

        junction("<div id='appendTo'></div>").appendTo("body")

      test.assertExists "#appendTo", ["AppendTo is successful"]

      return


    # ATTR --------------------------------------------------------------------

    # The ATTR function gets the value of the first element of the set or
    # sets the value of all the elements in the set.

    .then ->

      # should return null if the item doesn't exist
      theThing = @.evaluate ->

        junction("#this_does_not_exist").attr("class")

      test.assertEquals theThing, null, ["Attr 1 is successful"]

      # should get the attribute
      theThing = @.evaluate ->

        junction("#test").attr("class")

      test.assertEquals theThing, "testing", ["Attr 2 is successful"]

      # should set the attribute
      theThing = @.evaluate ->

        junction("#test").attr("class", "foo").attr("class")

      test.assertEquals theThing, "foo", ["Attr 3 is successful"]

      return


    # BEFORE ------------------------------------------------------------------

    # The BEFORE function adds the designated markup BEFORE the selected item.

    .then ->

      @.evaluate ->

        junction("body").append("<div id='before'></div>")
        junction("#before").append("<div id='foo-after2'></div>")
        junction("#foo-after2").before("<div id='foo-before2'></div>")

      testElement = @.evaluate ->
        te = document.getElementById("foo-after2")
        temp = te.previousSibling
        return temp

      test.assertEquals testElement.attributes[0].textContent,
                        "foo-before2",
                        ["Before is successful"]

      return
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
