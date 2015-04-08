
do ->

  _nameSpace = (target, attribute, obj, force) ->

    originalAttr = attribute.replace(/[\[\]']+/g,'')

    # get id for namespace
    params = target.attributes[originalAttr].value.split(',')

    # clean up whitespace
    params = params.map (param) -> param.trim()

    # set attribute name
    attribute = originalAttr.split '-'

    # add to core object
    if !@[attribute[1]]
      @[attribute[1]] = {}


    # Create new object and bind it to its nameSpace
    if !@[attribute[1]][params[0]] or force
      @[attribute[1]][params[0]] = null
      @[attribute[1]][params[0]] = new obj target, originalAttr



  _addModel = (scope, model, attr, force, cb) ->

    # force is optional
    if typeof force is "function"
      force = false
      cb = force

    for target in scope.querySelectorAll(attr)
      _nameSpace target, attr, model, force

    if scope.querySelectorAll(attr).length
      if typeof cb is "function"
        cb()

  junction._addModel = _addModel


  junction.addPlugin = (name, obj, attr, cb) ->

    savePlugin = (name, obj, attr, cb) =>

      @['plugins'][name] =
        _id: name
        model: obj
        attr: attr
        callback: cb


    if @.plugins.length

      for plugin in @.plugins
        unless plugin._id isnt obj.name
          savePlugin(name, obj, attr, cb)

        _addModel document, obj, attr, cb
        return

    else
      savePlugin(name, obj, attr, cb)


    _addModel document, obj, attr, cb
