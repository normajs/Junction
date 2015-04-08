


junction.updateModels = (scope, force) ->

  if not scope
    scope = document

  if typeof scope is "boolean"
    force = scope
    scope = document


  for plugin in @.flattenObject @['plugins']
    @.addModel scope, plugin.model, plugin.attr, false, force
