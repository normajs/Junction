
casper.test.begin "DOM Testing", 29, (test) ->


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

      test.assertEquals theThing, null, ["Attr returns null if the item doesn't exist"]

      # should get the attribute
      theThing = @.evaluate ->

        junction("#test").attr("class")

      test.assertEquals theThing, "testing", ["Attr successfully get the attribute"]

      # should set the attribute
      theThing = @.evaluate ->

        junction("#test").attr("class", "foo").attr("class")

      test.assertEquals theThing, "foo", ["Attr successfully sets an attribute"]

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

    # The CHILDREN function gets the children of the current element

    .then ->

      numOfChildren = @.evaluate ->

        test = junction("#before")
        test.html("<div id='el'></div>")
        element = junction("#el")
        return test.children().length

      test.assertEquals numOfChildren, 1, ["Children is successful"]

      return


    # CLONE -------------------------------------------------------------------

    # The CLONE function creates a new junction object containing the currently
    # selected elements

    .then ->

      @.evaluate ->

        junction("body").append("<div id='clone'></div>")
        junction("#clone").addClass("clone")

      clonedClass = @.evaluate ->

        element = junction("#clone").clone()
        element.attr("class", "foo").attr("class")
        return element.attr("class")

      originalClass = @.evaluate ->

        element = junction("#clone")
        return element.attr("class")

      test.assertEquals clonedClass, "foo", ["Clone is successful"]
      test.assertEquals originalClass, "clone", ["Clone doesn't modify original set"]

      return


    # CLOSEST -----------------------------------------------------------------

    # The CLOSEST function looks in the current set of elements and it's
    # parents for the first element that matches.

    .then ->

      @.evaluate ->

        junction("body").append("<div id='closest'></div>")
        junction("#closest").append("<div id='closestChildOne'></div>")
        junction("#closest").append("<div id='closestChildTwo'></div>")

      closestDiv = @.evaluate ->

        return junction("#closestChildOne").closest("#closest")

      test.assertEquals closestDiv[0].id, "closest", ["Closest is successful"]

      return


    # CSS ---------------------------------------------------------------------

    # The CSS function gets and/or sets the style from the selected element

    .then ->

      @.evaluate ->

        junction("body").append("<div id='css'></div>")
        junction("#css").css("margin-top", "2px")

      testThing = @.evaluate ->

        test = junction("#css")
        return junction._getStyle(test[0], "margin-top")

      test.assertEquals testThing, "2px", ["Css is successful"]

      return


    # EQ ----------------------------------------------------------------------

    # The EQ function returns the item at the specified index in a junction object

    .then ->

      @.evaluate ->

        junction("body").append("<div id='eq'></div>")

      testThing = @.evaluate ->

        return junction("#eq")

      testThing2 = @.evaluate ->

        return junction("#eq").eq(0)

      testThing3 = @.evaluate ->

        return junction("#eq").eq(100000)

      test.assertEquals testThing2[0], testThing[0], ["Eq is successful"]

      test.assertEquals testThing3[0], undefined, ["Eq out of range is undefined"]

      return


    # FILTER ------------------------------------------------------------------

    # The FILTER function filters out the selected set if it does NOT match
    # the specified element.

    .then ->

      @.evaluate ->

        junction("body").append("<div id='filter'></div>")
        junction("#filter").append("<div id='filterChild'></div>")

      numberOfDivs = @.evaluate ->

        test = junction("div")
        return test.filter("#filterChild").length

      test.assertEquals numberOfDivs, 1, ["Filter is successful"]

      return


    # FIND --------------------------------------------------------------------

    # The FIND function finds the selected item.

    .then ->

      testThing = @.evaluate ->

        return junction("body").find("#test").attr("class")

      test.assertEquals testThing, "foo", ["Find is successful"]

      return


    # FIRST -------------------------------------------------------------------

    # The FIRST function returns the first element of the set.

    .then ->

      @.evaluate ->

        junction("body").append("<div id='firstOne' class='first'></div>")
        junction("body").append("<div id='firstTwo' class='first'></div>")

      testThing = @.evaluate ->

        return junction(".first").first()[0]

      test.assertEquals testThing.id, "firstOne", ["First is successful"]

      return


    # GET ---------------------------------------------------------------------

    # The GET function returns the DOM node at the passed index.

    .then ->

      testThing = @.evaluate ->

        return junction("#test")

      getThing = @.evaluate ->

        return junction("#test").get(0)

      test.assertEquals getThing.id, testThing[0].id, ["Get is successful"]

      return


    # HASCLASS ----------------------------------------------------------------

    # The HASCLASS function tells you if a particular element has the specified
    # class.

    .then ->

      hasFooClass = @.evaluate ->

        return junction("#test").hasClass("foo")

      test.assertEquals hasFooClass, true, ["Hasclass is successful"]

      return


    # HEIGHT ------------------------------------------------------------------

    # The HEIGHT function gets the height of the first element, or sets the
    # height for everything in the set.

    .then ->

      setHeight = @.evaluate ->

        junction("body").append("<div id='height'></div>")
        junction("#height").height(300)
        return junction("#height").height()

      test.assertEquals setHeight, 300, ["Height is successful"]

      return


    # HTML --------------------------------------------------------------------

    # The HTML function gets/sets the innerHTML attribute for all the elements.

    .then ->


      @.evaluate ->

        junction("body").append("<div id='html'></div>")
        junction("#html").append("<div id='htmlChildOne'></div>")
        junction("#html").append("<div id='htmlChildTwo'></div>")

      htmlOne = @.evaluate ->

        htmlOne = junction("#htmlChildOne")
        htmlOne.innerHTML = "<div id=\"htmlTest\"></div>"
        return htmlOne.innerHTML

      htmlTwo = @.evaluate ->

        htmlTwo = junction("#htmlChildTwo").html("<div id=\"htmlTest\"></div>")
        return htmlTwo.html()

      test.assertEquals htmlTwo, htmlOne, ["Html is successful"]

      return


    # INDEX -------------------------------------------------------------------

    # The INDEX function returns the index of the current element in the set.
    # If you don't specify the selector it will return the first node.

    .then ->

      testThing = @.evaluate ->

        junction("body").append("<div id='index'><div id='indexChild'></div></div>")
        junction("#indexChild").attr("class", "first second")

        return junction("#index").index()

      @.echo testThing

      test.assertEquals 1, 1, ["Index isn't finished yet."]

      return


    # INSERTAFTER -------------------------------------------------------------

    # The INSERTAFTER function inserts the current set of things AFTER the
    # matching selector.

    .then ->

      @.evaluate ->

        junction("body").append("<div id='insertAfter'></div>")
        junction("<div id='insertAfter2'></div>").insertAfter("#insertAfter")

      testElement = @.evaluate ->

        te = document.getElementById("insertAfter")
        temp = te.nextSibling
        return temp

      test.assertEquals testElement.attributes[0].textContent,
                        "insertAfter2",
                        ["InsertAfter is successful."]

      return


    # INSERTBEFORE ------------------------------------------------------------

    # The INSERTBEFORE function inserts the current set of things BEFORE the
    # matching selector.

    .then ->

      @.evaluate ->

        junction("body").append("<div id='insertBefore'></div>")
        junction("<div id='insertBefore2'></div>").insertBefore("#insertBefore")

      testElement = @.evaluate ->

        te = document.getElementById("insertBefore")
        temp = te.previousSibling
        return temp

      test.assertEquals testElement.attributes[0].textContent,
                        "insertBefore2",
                        ["InsertBefore is successful."]

      return


    # IS ----------------------------------------------------------------------

    # The IS function checks to see if anything in the current set of elements
    # matches the selector.

    .then ->

      testThing = @.evaluate ->

        return junction("#test").is("#test")

      test.assertEquals testThing, true, ["Is is success."]

      return


    # LAST --------------------------------------------------------------------

    # The LAST function returns the last element of a set.

    .then ->

      @.evaluate ->

        junction("body").append("<div id='lastOne' class='last'></div>")
        junction("body").append("<div id='lastTwo' class='last'></div>")

      testThing = @.evaluate ->

        return junction(".last").last()[0]

      test.assertEquals testThing.id, "lastTwo", ["Last is successful"]

      return


    # NEXT --------------------------------------------------------------------

    # The NEXT function returns an object with the set of siblings of each
    # element in the original set.

    .then ->

      @.evaluate ->

        junction("body").append("<div class='next'></div>")
        junction(".next").append("<div class='one'></div>")
        junction(".next").append("<div class='two'></div>")
        junction(".next").append("<div class='three'></div>")

        thing = junction("body").find(".next")
        __utils__.echo thing.length
        __utils__.echo thing.next().length

      testElement = @.evaluate ->

        return junction(".next").next()

      @.echo testElement[0]

      test.assertEquals 1, 1, ["Next is not finished."]

      return


    # NOT ---------------------------------------------------------------------
    # OFFSET ------------------------------------------------------------------
    # OUTERWIDTH --------------------------------------------------------------
    # ------------------ GET TO HERE ------------------------------------------
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
