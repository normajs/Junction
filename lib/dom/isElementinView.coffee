###

@function isElementInView()

@param {Element} element to check against

@return {Boolean} if element is in view

###
junction.fn.isElementInView = () ->

  element = @[0]


  if jQuery? and element instanceof jQuery
    element = element.get(0)

  if element instanceof junction
    element = element.get(0)


  coords = element.getBoundingClientRect()

  (
    Math.abs(coords.left) >= 0 and
    Math.abs(coords.top)
  ) <= (
    window.innerHeight or
    document.documentElement.clientHeight
  )
