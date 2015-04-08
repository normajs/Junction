
###

  Replace each element in the current set with that argument HTML string or HTMLElement.

  @param {string|HTMLElement} fragment The value to assign.
  @return junction
  @this junction

###
junction.fn.replaceWith = (fragment) ->

  if typeof fragment is "string"
    fragment = junction fragment

  returns = []

  if fragment.length > 1
    framgent = framgent.reverse()

  @each (index) ->

    clone = @.cloneNode true

    returns.push clone

    if not @.parentNode
      return

    if fragment.length is 1

      insertEl = (if index > 0 then fragment[0].cloneNode(true) else fragment[0])

      @.parentNode.replaceChild insertEl, @

    else

      for piece in fragment
        insertEl = (if index > 0 then piece.cloneNode(true) else piece)

        @.parentNode.insertBefore insertEl, @.nextSibling
        return

      @.parentNode.removeChild @


  junction returns
