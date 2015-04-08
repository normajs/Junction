
junction.addModel = (scope, model, attr, force, cb) ->

  # force is optional
  if typeof force is "function"
    force = false
    cb = force

  for target in scope.querySelectorAll(attr)
    @.nameSpace target, attr, model, force

  if scope.querySelectorAll(attr).length
    if typeof cb is "function"
      cb()
