
###

  Find descendant elements of the current collection.

  @param {string} selector The selector used to find the children
  @return junction
  @this junction

###
junction.fn.find = (selector) ->
  
  returns = []

  @each ->

    try
      finds = this.querySelectorAll(selector)

    catch e
      junction.error "queryselector", selector
      return false

    for found in finds
      returns = returns.concat found

  junction returns
