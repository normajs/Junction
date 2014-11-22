###

  Junction Object Constructor


###


do ->

  ###

    @param {string, object} selector
      The selector to find or element to wrap
    @param {object} context
      The context in which to match the selector
    @returns junction
    @this window

  ###
  junction = (selector, context) ->

    selectorType = typeof selector
    returnElements = []

    if !selector
      return

    # Multi method object typing
    isObject = Object.prototype
      .toString
      .call( selector ) is '[object Array]' or

      selectorType is 'object' and selector instanceof window.NodeList


    # if passed a string starting with <, make HTML
    if selectorType is "string" and selector.indexOf("<") is 0

      domFragment = document.createElement "div"

      domFragment.innerHTML = selector

      return junction(domFragment).children().each( ->

        domFragment.removeChild this

      )

    else if selectorType is "function"
      return junction.ready selector

    # if string, use qsa unless id is given
    else if selectorType is "string"

      if context
        return junction(context).find selector


      # Try to get elements
      if selector.indexOf("#") is 0

        try
          element = document.getElementByID selector
          elements = [element]
        catch e
          junction.error 'Id selector', selector

      else

        try
          elements = document.querySelectorAll selector
        catch e
          junction.error 'Query selector', selector

      returnElements = (element for element in elements)

    else if isObject

      returnElements = (element for element in selector)

    else
      returnElements = returnElements.concat selector


    returnElements = junction.extend returnElements, junction.fn

    returnElements.selector = selector

    returnElements


  junction.fn = {}

  junction.extend = (first, second) ->

    for key of second
      if second.hasOwnProperty(key)
        first[key] = second[key]

    first

  window["junction"] = junction
