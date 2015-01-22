
casper.test.begin "Event Methods Testing", 1, (test) ->

	casper.start()

		.then ->

			test.assertEquals 1, 1, ["Write some EVENT tests"]

			return

		# BIND ----------------------------------------------------------------------

		# The BIND event binds a callback to an event for the current set of
		# elements.

		# No CLICK method?

		# IE10SUPPORT ---------------------------------------------------------------

		# MUTATIONS -----------------------------------------------------------------

		# ONE -----------------------------------------------------------------------

		# The ONE event will bind a callback to an event for the current set of
		# elements and then unbind after one occurence.

		# TRIGGER -------------------------------------------------------------------

		# The TRIGGER event actually triggers an event on each of the DOM elements
		# in the current set.

		# TRIGGERHANDLER ------------------------------------------------------------

		# The TRIGGERHANDLER event triggers an event on the first element in the
		# set.

		# UNBIND --------------------------------------------------------------------

		# The UNBIND event unbinds a previously bound callback for an event.

  casper.run ->
    test.done()
    return

  return
