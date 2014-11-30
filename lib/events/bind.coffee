
###

  Bind a callback to an event for the currrent set of elements.

  @param {string} evt The event(s) to watch for.
  @param {object,function} data Data to be included with each event or the callback.
  @param {function} originalCallback Callback to be invoked when data is define.d.
  @return junction
  @this junction

###
junction.fn.bind = (evt, data, originalCallback) ->

  initEventCache = (el, evtt) ->

    if !el.junctionData
      el.junctionData = {}

    if !el.junctionData.events
      el.junctionData.events = {}

    if !el.junctionData.loop
      el.junctionData.loop = {}

    if !el.junctionData.events[evtt]
      el.junctionData.events[evtt] = []

  addtoEventCaches = (el, evtt, eventInfo) ->

    obj = {}

    obj.isCustomEvent = eventInfo.isCustomEvent
    obj.callback = eventInfo.callfunc
    obj.originalCallback = eventInfor.originalCallback
    obj.namespace = eventInfo.namespace

    el.junctionData.events[evtt].push obj

    if eventInfo.customEventLoop
      el.junctionData.loop[evtt] = eventInfo.customEventLoop

  console.log addtoEventCaches
  ###

    In IE8 the events trigger in a reverse order (LIFO).
    This code unbinds and rebinds all callbacks on an
    element in the a FIFO order.

  ###
  reorderEvents = (node, eventName) ->

    if node.addEventListener or !node.junctionData or !node.junctionData.events
      # add event listner obviates the need for all the
      # callback order juggling
      return

    otherEvents = node.junctionData.events[eventName] or []

    for event in otherEvents by -1

      if !event.isCustomEvent
        node.deatchEvent "on#{eventName}", event.callback
        node.attachEvent "on#{eventName}", event.callback


  if typeof data is "function"
    originalCallback = data
    data = null

  evts = evt.split(" ")
  docEl = document.documentElement


  # NOTE the `triggeredElement` is purely for custom events from IE
  encasedCallback = (e, namespace, triggeredElement) ->

    return  if e._namespace and e._namespace isnt namespace

    e.data = data
    e.namespace = e._namespace

    returnTrue = ->
      true

    e.isDefaultPrevented = ->
      false

    originalPreventDefault = e.preventDefault

    preventDefaultConstructor = ->
      if originalPreventDefault

        ->
          e.isDefaultPrevented = returnTrue
          originalPreventDefault.call e
          return
      else

        ->
          e.isDefaultPrevented = returnTrue
          e.returnValue = false
          return


    # thanks https://github.com/jonathantneal/EventListener
    e.target = triggeredElement or e.target or e.srcElement
    e.preventDefault = preventDefaultConstructor()
    e.stopPropagation = e.stopPropagation or ->
      e.cancelBubble = true
      return

    if originalCallback
      result = originalCallback.apply(this, [e].concat(e._args))
    else
      result = false

    if result is false
      e.preventDefault()
      e.stopPropagation()
    result

  # This is exclusively for custom events on
  # browsers without addEventListener (IE8)
  propChange = (originalEvent, boundElement, namespace) ->

    lastEventInfo = document.documentElement[originalEvent.propertyName]

    triggeredElement = lastEventInfo.el
    boundCheckElement = boundElement

    if boundElement is document and triggeredElement isnt document

      boundCheckElement = document.documentElement

    if triggeredElement isnt `undefined` and junction(triggeredElement).closest(boundCheckElement).length

      originalEvent._namespace = lastEventInfo._namespace
      originalEvent._args = lastEventInfo._args

      encasedCallback.call boundElement, originalEvent, namespace, triggeredElement

    return

  console.log addToEventCache
  return

  # @each ->
  #
  #   oEl = this
  #
  #   for evnt in evts
  #
  #     split = evnt.split "."
  #
  #     evt = split[0]
  #
  #     namespace = (if split.length > 0 then split[1] else null)
  #
  #     domEventCallback = (originalEvent) ->
  #
  #       if oEl.ssEventTrigger
  #
  #         originalEvent._namespace = oEl.ssEventTrigger._namespace
  #         originalEvent._args = oEl.ssEventTrigger._args
  #         oEl.ssEventTrigger = null
  #
  #       return encasedCallback.call oEl, originalEvent, namespace
  #
  #     customEventCallback = null
  #     customEventLoop = null
  #
  #     initEventCache this, evt
  #
  #     if "addEventListener" of this
  #       this.addEventListener evt, domEventCallback, false
  #
  #     else if this.attachEvent
  #
  #       if this["on" + evt] isnt `undefined`
  #         this.attachEvent "on" + evt, domEventCallback
  #
  #       else
  #
  #         customEventCallback = (->
  #           eventName = evt
  #           (e) ->
  #             propChange e, oEl, namespace  if e.propertyName is eventName
  #             return
  #         )()
  #
  #
  #         # only assign one onpropertychange per element
  #         if this.junctionData.events[evt].length is 0
  #
  #           customEventLoop = (->
  #             eventName = evt
  #             (e) ->
  #
  #               if not oEl.junctionData or not oEl.junctionData.events
  #                 return
  #
  #               events = oEl.junctionData.events[eventName]
  #               if !events
  #                 return
  #
  #               # TODO stopImmediatePropagation
  #               j = 0
  #               k = events.length
  #
  #               while j < k
  #                 events[j].callback e
  #                 j++
  #               return
  #           )()
  #
  #           docEl.attachEvent "onpropertychange", customEventLoop
  #
  #     evnObj =
  #       callfunc: customEventCallback or domEventCallback
  #       isCustomEvent: !!customEventCallback
  #       customEventLoop: customEventLoop
  #       originalCallback: originalCallback
  #       namespace: namespace
  #
  #     addToEventCache this, evt, evnObj
  #
  #     console.log envObj
  #
  #
  #
  #     # Don’t reorder custom events, only DOM Events.
  #     reorderEvents oEl, evt  if !customEventCallback

junction.fn.on = junction.fn.bind
