


junction.updateModels = (scope, force) ->

  for plugin in @.flattenObject @['plugins']
    @._addModel scope, plugin.model, plugin.attr, false, force
