
###

  Add elements matching the selector to the current set.

  @param {string} selector The selector for the elements to add from the DOM
  @return junction
  @this junction

###

junction.fn.add = (selector) ->

  ret = []

  @each ->
    ret.push this
    return

  if junction(selector)[0]
    junction(selector).each ->
      ret.push this
      return


  return junction ret
