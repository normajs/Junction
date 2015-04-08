
describe 'DOM tests', ->

  # ADD ---------------------------------------------------------------------

  # The ADD function adds the item to the current set of items that can have
  # other actions taken on them. For example, after performing an ADD you
  # may want to add a css class to all the items in the set.

  it 'ADD method should work', ->

    casper.then ->

      bodyLength = @.evaluate ->
        return junction("body").length

      testLength = @.evaluate ->
        el = document.createElement("DIV");
        el.id = "test"
        document.body.appendChild(el);
        return junction("#test").length

      combinedLength = @.evaluate ->
        return junction("body").add("#test").length

      firstTwo = bodyLength + testLength
      firstTwo.should.equal(combinedLength)

    return

  # ADD-CLASS ---------------------------------------------------------------

  # The ADD-CLASS function adds a css class to the item selected.

  it 'ADD-CLASS method should work', ->

    casper.then ->

      @.evaluate ->
        junction("#test").addClass("testing")

      ".testing".should.be.inDOM

    return

  # AFTER -------------------------------------------------------------------

  # The AFTER function adds the designated markup AFTER the selected item.

  it 'AFTER method should work', ->

    casper.then ->

      @.evaluate ->
        junction("#test").append("<div id='foo-before'></div>")
        junction("#foo-before").after("<div id='foo-after'></div>")

      testElement = @.evaluate ->
        te = document.getElementById("foo-before")
        nextSibling = te.nextSibling
        return nextSibling

      testElement.attributes[0].textContent.should.equal("foo-after")

    return

  # APPEND ------------------------------------------------------------------

  # The APPEND function adds the element as the last child of the selected item

  it 'APPEND method should work', ->

    casper.then ->

      @.evaluate ->
        junction("#test").append("<div id='append-test'></div>")

      testElement = @.evaluate ->
        te = document.getElementById("test")
        lastChildOfTest = te.lastChild
        return lastChildOfTest

      testElement.attributes[0].textContent.should.equal("append-test")

    return

  # APPENDTO ----------------------------------------------------------------

  # The APPENDTO function works the same as the APPEND function...just
  # is written backwards.

  it 'APPENDTO method should work', ->
    casper.then ->

      @.evaluate ->
        junction("<div id='appendto-test'></div>").appendTo("#test")

      testElement = @.evaluate ->
        te = document.getElementById("test")
        lastChildOfTest = te.lastChild
        return lastChildOfTest

      testElement.attributes[0].textContent.should.equal("appendto-test")

    return

  # ATTR --------------------------------------------------------------------

  # The ATTR function gets the value of the first element of the set or
  # sets the value of all the elements in the set.

  it 'ATTR method should return null if the item does not exist', ->

    casper.then ->

      elementAttribute = @.evaluate ->
        # try to get the class attribute of a thing that doesn't exist
        return junction("#this-does-not-exist").attr("class")

      expect(elementAttribute).to.be.null

    return

  it 'ATTR method should correctly get the attribute', ->

    casper.then ->

      elementAttribute = @.evaluate ->
        # try to get the class attribute of the test div
        junction("#test").attr("class")

      elementAttribute.should.equal("testing")

    return

  it 'ATTR method should correctly set the attribute', ->

    casper.then ->

      elementAttribute = @.evaluate ->
        # try to set the class attribute on the test div
        junction("#test").attr("class", "attr-test").attr("class")

      elementAttribute.should.equal("attr-test")

    return

  # BEFORE ------------------------------------------------------------------

  # The BEFORE function adds the designated markup BEFORE the selected item.

  it 'BEFORE method should work', ->

    casper.then ->

      @.evaluate ->
        junction("body").append("<div id='before-test'></div>")
        junction("#before-test").append("<div id='before-test-after'></div>")
        junction("#before-test-after").before("<div id='before-test-before'></div>")

      testElement = @.evaluate ->
        te = document.getElementById("before-test-after")
        beforeElement = te.previousSibling
        return beforeElement

      testElement.attributes[0].textContent.should.equal("before-test-before")

    return

  # CHILDREN ----------------------------------------------------------------

  # The CHILDREN function gets the children of the current element

  it 'CHILDREN method should work', ->

    casper.then ->

      childrenOfBefore = @.evaluate ->
        junction("#before-test").children()

      childrenOfBefore.length.should.equal(2)

    return

  # CLONE -------------------------------------------------------------------

  # The CLONE function creates a new junction object containing the currently
  # selected elements

  it 'CLONE method should work', ->

    casper.then ->

      @.evaluate ->
        junction("body").append("<div id='clone-test'></div>")
        junction("#clone-test").addClass("original")

      clonedClass = @.evaluate ->
        element = junction("#clone-test").clone()
        element.attr("class", "clone")
        return element.attr("class")

      # if this passes then the clone was successful
      clonedClass.should.equal("clone")

    return

  it 'CLONE method should not modify the original', ->

    casper.then ->

      originalClass = @.evaluate ->
        element = junction("#clone-test")
        return element.attr("class")

      # if this passes then the original wasn't modified by the clone
      originalClass.should.equal("original")

    return

  # CLOSEST -----------------------------------------------------------------

  # The CLOSEST function looks in the current set of elements and it's
  # parents for the first element that matches.

  it 'CLOSEST method should work', ->

    casper.then ->

      @.evaluate ->
        junction("body").append("<div id='closest-test'></div>")
        junction("#closest-test").append("<div id='closestChildOne'></div>")
        junction("#closest-test").append("<div id='closestChildTwo'></div>")

      closestDiv = @.evaluate ->
        return junction("#closestChildOne").closest("#closest-test")

      closestDivId = closestDiv[0].id

      closestDivId.should.equal("closest-test")

    return

  # CSS ---------------------------------------------------------------------

  # The CSS function gets and/or sets the style from the selected element

  it 'CSS method should set and get the style', ->

    casper.then ->

      @.evaluate ->
        junction("body").append("<div id='css-test'></div>")
        junction("#css-test").css("margin-top", "2px")

      marginTopValue = @.evaluate ->
        return junction("#css-test").css("margin-top")

      marginTopValue.should.equal("2px")

    return

  # EQ ----------------------------------------------------------------------

  # The EQ function returns the item at the specified index in a junction object

  it 'EQ method should work', ->

    casper.then ->

      cssTestElement = @.evaluate ->
        return junction("#css-test")

      eqElement = @.evaluate ->
        return junction("#css-test").eq(0)

      cssTestElementId = cssTestElement[0].id
      eqElementId = eqElement[0].id

      eqElementId.should.equal(cssTestElementId)

    return

  it 'EQ method should return empty array if index is out of range', ->

    casper.then ->

      eqElement = @.evaluate ->
        return junction("#css-test").eq(100)

      expect(eqElement).to.be.empty

    return


  # FILTER ------------------------------------------------------------------

  # The FILTER function filters out the selected set if it does NOT match
  # the specified element.

  it 'FILTER method should work', ->

    casper.then ->

      @.evaluate ->

        junction("body").append("<div id='filter'></div>")
        junction("#filter").append("<div id='filterChild'></div>")

      numberOfDivs = @.evaluate ->

        allTheDivs = junction("div")
        return allTheDivs.filter("#filterChild").length

      numberOfDivs.should.equal(1)

    return

  # FIND --------------------------------------------------------------------

  # The FIND function finds the selected item.

  it 'FIND method should work', ->

    casper.then ->

      testClassAttribute = @.evaluate ->
        return junction("body").find("#test").attr("class")

      testClassAttribute.should.equal("attr-test")

    return

  # FIRST -------------------------------------------------------------------

  # The FIRST function returns the first element of the set.

  it 'FIRST method should work', ->

    casper.then ->

      @.evaluate ->
        junction("body").append("<div id='firstOne' class='first'></div>")
        junction("body").append("<div id='firstTwo' class='first'></div>")

      testThing = @.evaluate ->
        return junction(".first").first()

      testThingId = testThing[0].id

      testThingId.should.equal("firstOne")

    return

  # GET ---------------------------------------------------------------------

  # The GET function returns the DOM node at the passed index.

  it 'GET method should work', ->

    casper.then ->

      testThing = @.evaluate ->
        return junction("#test")

      getThing = @.evaluate ->
        return junction("#test").get(0)

      testThingId = testThing[0].id
      getThingId = getThing.id

      getThingId.should.equal(testThingId)

    return

  # HASCLASS ----------------------------------------------------------------

  # The HASCLASS function tells you if a particular element has the specified
  # class.

  it 'HASCLASS method should work', ->

    casper.then ->

      hasAttrClass = @.evaluate ->
        return junction("#test").hasClass("attr-test")

      hasAttrClass.should.be.true

    return

  # HEIGHT ------------------------------------------------------------------

  # The HEIGHT function gets the height of the first element, or sets the
  # height for everything in the set.

  it 'HEIGHT method should work', ->

    casper.then ->

      setHeight = @.evaluate ->
        junction("body").append("<div id='height'></div>")
        junction("#height").height(300)
        return junction("#height").height()

      setHeight.should.equal(300)

    return

  # HTML --------------------------------------------------------------------

  # The HTML function gets/sets the innerHTML attribute for all the elements.

  it 'HTML method should work', ->

    casper.then ->

      @.evaluate ->

        junction("body").append("<div id=\"html\"></div>")
        junction("#html").append("<div id=\"htmlChildOne\"></div>")
        junction("#html").append("<div id=\"htmlChildTwo\"></div>")

      htmlOne = @.evaluate ->

        htmlOne = junction("#htmlChildOne")
        htmlOne.innerHTML = "<div id=\"htmlTest\"></div>"
        return htmlOne.innerHTML

      htmlTwo = @.evaluate ->

        htmlTwo = junction("#htmlChildTwo").html("<div id=\"htmlTest\"></div>")
        return htmlTwo.html()

      htmlOne.should.be.equal(htmlTwo)

    return

  # INDEX -------------------------------------------------------------------

  # The INDEX function returns the index of the current element in the set.
  # If you don't specify the selector it will return the first node.

  it 'INDEX method should work', ->

    casper.then ->

      @.evaluate ->
        junction("body").append("<div id='index-test'></div>")
        junction("#index-test").append("<div class='childOne'></div>")
        junction("#index-test").append("<div class='childTwo'></div>")

      testThing = @.evaluate ->
        thing = junction("#index-test div").index(".childOne")
        return thing

      testThing.should.equal(0)

    return

  # INSERTAFTER -------------------------------------------------------------

  # The INSERTAFTER function inserts the current set of things AFTER the
  # matching selector.

  it 'INSERTAFTER method should work', ->

    casper.then ->

      @.evaluate ->
        junction("body").append("<div id='insertAfter'></div>")
        junction("<div id='insertAfter2'></div>").insertAfter("#insertAfter")

      testElement = @.evaluate ->
        te = document.getElementById("insertAfter")
        temp = te.nextSibling
        return temp

      testElement.attributes[0].textContent.should.equal("insertAfter2")

    return

  # INSERTBEFORE ------------------------------------------------------------

  # The INSERTBEFORE function inserts the current set of things BEFORE the
  # matching selector.

  it 'INSERTBEFORE method should work', ->

    casper.then ->

      @.evaluate ->
        junction("body").append("<div id='insertBefore'></div>")
        junction("<div id='insertBefore2'></div>").insertBefore("#insertBefore")

      testElement = @.evaluate ->
        te = document.getElementById("insertBefore")
        temp = te.previousSibling
        return temp

      testElement.attributes[0].textContent.should.equal("insertBefore2")

    return

  # IS ----------------------------------------------------------------------

  # The IS function checks to see if anything in the current set of elements
  # matches the selector.

  it 'IS method should work', ->

    casper.then ->

      testThing = @.evaluate ->
        return junction("#test").is("#test")

      testThing.should.be.true

    return

  # ISELEMENT -----------------------------------------------------------------

  # The ISELEMENT function determines if the HTMLElement is an actual element.

  it 'ISELEMENT method should work', ->

    casper.then ->

      thing = @.evaluate ->
        junction("body").append("<div id='isElement'>HELLO</div>")
        return junction("#isElement").isElement()

      thing.should.be.true

    return

  # ISELEMENTINVIEW -----------------------------------------------------------

  # The ISELEMENTINVIEW function determines if the element is in the view.

  it 'ISELEMENTINVIEW method should work', ->

    casper.viewport(1024, 768).then ->

      testing = @.evaluate ->
        junction("body").append('<div id="seeMe" style="width: 10px; height: 10px; margin-top:10000px">Can you see me</div>')

        return junction("#seeMe").isElementInView()

      testing.should.be.false

    return


  # LAST --------------------------------------------------------------------

  # The LAST function returns the last element of a set.

  it 'LAST method should work', ->

    casper.then ->

      @.evaluate ->
        junction("body").append("<div id='lastOne' class='last'></div>")
        junction("body").append("<div id='lastTwo' class='last'></div>")

      testThing = @.evaluate ->
        return junction(".last").last()

      testThingId = testThing[0].id

      testThingId.should.equal("lastTwo")

    return

  # NEXT --------------------------------------------------------------------

  # The NEXT function returns an object with the set of siblings of each
  # element in the original set.

  it 'NEXT method should work', ->

    casper.then ->

      nextLength = @.evaluate ->

        junction("body").append("<div class='next'></div>")
        junction(".next").append("<div class='one'></div>")
        junction(".next").append("<div class='two'></div>")
        junction(".next").append("<div class='three'></div>")

        thing = junction("body").find(".next > div")
        return thing.next().length

      nextLength.should.equal(2)

    return

  # NOT ---------------------------------------------------------------------

  # The NOT function removes the selected elements from the current set

  it 'NOT method should work', ->

    casper.then ->

      isSoCount = @.evaluate ->
        junction("body").append("<div class='not'></div>")
        junction(".not").append("<div class='is-not'></div>")
        junction(".not").append("<div class='is-so'></div>")
        junction(".not").append("<div class='is-not'></div>")

        thing = junction(".not > div")
        return thing.not(".is-not").length

      isSoCount.should.equal(1)

    return

  # OFFSET ------------------------------------------------------------------

  # The OFFSET function returns an object with the "top" and "left" properties
  # of the first elements offsets

  it 'OFFSET method should work', ->

    casper.then ->

      offsetItems = @.evaluate ->
        return junction("#test").offset()

      offsetItems.top.should.equal(8)
      offsetItems.left.should.equal(8)

    return

  # PARENT ------------------------------------------------------------------

  # The PARENT function returns the first parents for each element in the set.

  # TODO: Add a second test for the second child

  it 'PARENT method should work', ->

    casper.then ->

      parent = @.evaluate ->
        junction("body").append("<div class='parent'></div>")
        junction(".parent").append("<div class='child'></div>")
        junction(".parent").append("<div class='child'></div>")
        return junction(".parent")[0]

      childOneParent = @.evaluate ->
        children = junction(".child")
        return children.parent()[0]

      childOneParentText = childOneParent.attributes[0].textContent
      parentText = parent.attributes[0].textContent

      childOneParentText.should.equal(parentText)

  # PARENTS -----------------------------------------------------------------

  # The PARENTS functions returns the set of all parents matching the selector
  # for each element in the set.

  # TODO: create tests for the rest of the parents array. See "echo" for the
  # rest of the items.

  it 'PARENTS method should work', ->

    casper.then ->

      @.evaluate ->
        junction("body").append("<div class='parents'></div>")
        junction(".parents").append("<div class='parentOne'></div>")
        junction(".parentOne").append("<div class='child'></div>")
        junction(".parents").append("<div class='parentTwo'></div>")
        junction(".parentTwo").append("<div class='child'></div>")

        parents = junction(".parents")
        children = parents.find(".child")

      index0 = @.evaluate ->
        indexThing = junction(".parents").find(".child").parents()[0]
        return indexThing.attributes[0].textContent

      index1 = @.evaluate ->
        indexThing = junction(".parents").find(".child").parents()[1]
        return indexThing.attributes[0].textContent

      index0.should.equal("parentOne")
      index1.should.equal("parents")

    return

  # PREPEND -----------------------------------------------------------------

  # The PREPEND function adds the element or HTML string before the children
  # of each element in the set.

  it 'PREPEND method should work', ->

    casper.then ->

      @.evaluate ->
        junction("body").append("<div id='prepend-test'></div>")
        junction("#prepend-test").append("<div id='prepend-test-one'></div>")
        junction("#prepend-test").prepend("<div id='prepend-test-two'></div>")

      testThing = @.evaluate ->
        te = document.getElementById("prepend-test")
        temp = te.firstChild
        return temp

      testThing.attributes[0].textContent.should.equal("prepend-test-two")

    return

  # PREPENDTO ---------------------------------------------------------------

  # The PREPENDTO function adds each element of the current set BEFORE the
  # children of the selected elements.

  it 'PREPENDTO method should work', ->

    casper.then ->

      @.evaluate ->
        junction("body").append("<div id='prependTo-test'></div>")
        junction("#prependTo-test").append("<div id='prependTo-test-one'></div>")
        junction("<div id='prependTo-test-two'></div>").prependTo("#prependTo-test")

      testThing = @.evaluate ->
        te = document.getElementById("prependTo-test")
        temp = te.firstChild
        return temp


      testThing.attributes[0].textContent.should.equal("prependTo-test-two")

    return

  # PREV --------------------------------------------------------------------

  # The PREV function returns an object containing one sibling before each
  # element in the original set.

  it 'PREV method should work', ->

    casper.then ->

      prevLength = @.evaluate ->

        junction("body").append("<div class='prev'></div>")
        junction(".prev").append("<div class='prevOne'></div>")
        junction(".prev").append("<div class='prevTwo'></div>")
        junction(".prev").append("<div class='prevThree'></div>")

        thing = junction(".prev div.prevThree")

        return thing.prev().length

      prevLength.should.equal(1)

    return

  # PREVALL -----------------------------------------------------------------

  # The PREVALL function returns an object with the set of ALL siblings before
  # each element in the original set.

  it 'PREVALL method should work', ->

    casper.then ->

      prevAllLength = @.evaluate ->

        junction("body").append("<div class='prevall'></div>")
        junction(".prevall").append("<div class='prevallOne'></div>")
        junction(".prevall").append("<div class='prevallTwo'></div>")
        junction(".prevall").append("<div class='prevallThree'></div>")

        thing = junction(".prevall div.prevallThree")

        return thing.prevAll().length


      prevAllLength.should.equal(2)

    return

  # PROP --------------------------------------------------------------------

  # The PROP function gets the property value on the first element or sets
  # the property value on all the elements in the set.

  it 'PROP method should get the property', ->

    casper.then ->

      property = @.evaluate ->
        junction("body").append("<div class='prop'></div>")
        return junction(".prop").prop("class")

      property.should.equal("prop")

    return

  it 'PROP method should set the property', ->

    casper.then ->

      property = @.evaluate ->
        junction(".prop").prop("class", "bar")
        return junction(".bar").prop("class")

      property.should.equal("bar")

    return

  # REMOVE ------------------------------------------------------------------

  # The REMOVE function removes the current set of elements from the DOM.

  it 'REMOVE method should work', ->

    casper.then ->

      @.evaluate ->
        junction("body").append("<div class='remove'></div>")
        junction(".remove").remove()

      ".remove".should.be.notInDOM

    return

  # REMOVEATTR --------------------------------------------------------------

  # The REMOVEATTR function removes an attribute from each element in the
  # current set

  it 'REMOVEATTR method should work', ->

    casper.then ->

      before = @.evaluate ->
        junction("body").append("<div class='removeattr' data-foo='bar'></div>")
        return junction(".removeattr")[0]

      after = @.evaluate ->
        junction(".removeattr").removeAttr("data-foo")
        return junction(".removeattr")[0]

      afterAttributes = after.attributes[1]

      expect(afterAttributes).to.be.empty

    return

  # REMOVECLASS -------------------------------------------------------------

  # The REMOVECLASS function removes the class from the DOM for each element
  # in the set.

  it 'REMOVECLASS method should work', ->

    casper.then ->

      before = @.evaluate ->
        junction("body").append("<div class='removeClass foo'></div>")
        return junction(".removeClass")[0]

      after = @.evaluate ->
        junction(".removeClass").removeClass("foo")
        return junction(".removeClass")[0]

      after.className.should.not.equal(before.className)

    return

  # REMOVEPROP --------------------------------------------------------------

  # The REMOVEPROP function removes a property from each element of the
  # current set.

  it 'REMOVEPROP method should work', ->

    casper.then ->

      before = @.evaluate ->
        junction("body").append("<div class='removeProp'></div>")
        return junction(".removeProp")

      after = @.evaluate ->
        junction(".removeProp").removeProp("class")
        return junction(".removeProp")

      expect(after).to.be.empty

    return

  # REPLACEWITH -------------------------------------------------------------

  # The REPLACEWITH function replaces each element in the current set with
  # the element or string specified.

  it 'REPLACEWITH method should work', ->

    casper.then ->

      before = @.evaluate ->
        junction("body").append("<div class='replaceWith'></div>")
        return junction(".replaceWith")[0]

      after = @.evaluate ->
        testThing = junction(".replaceWith")
        thisOtherThing = testThing.replaceWith("<div class='replacement'></div>")
        return junction(".replacement")[0]

      after.className.should.not.equal(before.className)

      # TODO: When this test passes, write a test to check the before and after.

    return

  # SERIALIZE ---------------------------------------------------------------

  # The SERIALIZE function serializes child input element values into
  # an object

  it 'SERIALIZE method should work', ->

    casper.then ->

      data = @.evaluate ->
        junction("body").append("<div class='serialize'></div>")
        testThing = junction(".serialize")
        i = 0

        while i < junction.inputTypes.length
          type = junction.inputTypes[i]
          input = "<input type='" + type + "'" + " name='" + type + "'" + " value='" + type + "'></input>"
          testThing.append input
          i++

        otherThing = testThing.serialize()
        return otherThing

      data["color"].should.equal("color")

    return

  # SIBLINGS ----------------------------------------------------------------

  # The SIBLINGS function gets all of the sibling elements for each element
  # in the current set.

  it 'SIBLINGS method should work', ->

    casper.then ->

      siblingCount = @.evaluate ->
        junction("body").append("<div class='siblings'></div>")
        junction(".siblings").append("<div class='siblingOne'></div>")
        junction(".siblings").append("<div class='siblingTwo'></div>")
        junction(".siblings").append("<div class='siblingThree'></div>")
        return junction(".siblingTwo").siblings().length

      siblingCount.should.equal(2)

    return

  # TEXT --------------------------------------------------------------------

  # The TEXT function recursively retrieves the text content of each element
  # in the current set.

  it 'TEXT method should work', ->

    casper.then ->

      containerText = @.evaluate ->
        junction("body").append("<div class='text'>Some Test Text</div>")
        return junction(".text").text()

      testText = "Some Test Text"

      containerText.should.equal(testText)

    return

  # TOGGLECLASS -------------------------------------------------------------

  # The TOGGLECLASS function should add a class to the selected element if
  # it isn't found or remove the class if it is found.

  # Note: This is only in this library. Not in SHOESTRING.

  it 'TOGGLECLASS method should correctly remove the class', ->

    casper.then ->

      before = @.evaluate ->
        junction("body").append("<div class='toggleClass someClass'></div>")
        return junction(".toggleClass").prop("class")

      after = @.evaluate ->
        junction(".toggleClass").toggleClass("someClass")
        return junction(".toggleClass").prop("class")

      after.should.not.equal(before)

    return

  it 'TOGGLECLASS method should correctly add the class', ->

    casper.then ->

      before = @.evaluate ->
        return junction(".toggleClass").prop("class")

      addClass = @.evaluate ->
        junction(".toggleClass").toggleClass("someClass")
        return junction(".toggleClass").prop("class")

      addClass.should.not.equal(before)

    return

  # VAL ---------------------------------------------------------------------

  # The VAL function gets the value of the first element or sets the value
  # of all the elements in the current set.

  it 'VAL method should correctly get the value', ->

    casper.then ->

      # Check to see that the function gets the value of the first element
      itemValue = @.evaluate ->
        junction("body").append("<input type='color' name='color' value='blue' class='val'></input>")
        valItem = junction(".val")
        return valItem.val()

      itemValue.should.equal("blue")

    return

  it 'VAL method should correctly set the value', ->

    casper.then ->

      # Check to see that the function sets the value on the elements.
      itemSetValue = @.evaluate ->
        valItem = junction(".val")
        valItem.val("orange")
        return valItem.val()

      itemSetValue.should.equal("orange")

    return

  # WIDTH -------------------------------------------------------------------

  # The WIDTH function gets the width value of the first element or sets the
  # width for all the elements in the current set.

  it 'WIDTH method should work', ->

    casper.then ->

      widthValue = @.evaluate ->
        junction("body").append("<div class='width'></div>")
        widthItem = junction(".width")
        widthItem.width("400px")
        return widthItem.width()

      widthValue.should.equal(400)

    return

  # WRAPINNER ---------------------------------------------------------------

  # The WRAPINNER function wraps the child elements in the provided HTML

  # TODO: Write a test to check if the function actually wrapped .inner
  # with .wrapper

  it 'WRAPINNER method should work', ->

    casper.then ->

      @.evaluate ->
        junction("body").append("<div class='wrapinner'></div>")
        junction(".wrapinner").append("<div class='inner'></div>")
        wrapInnerItem = junction(".wrapinner")
        wrapInnerItem.wrapInner("<div class='wrapper'></div>")

      ".wrapper".should.be.inDOM

    return

  return
