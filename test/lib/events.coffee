
casper.test.begin "Event Methods Testing", 1, (test) ->

	casper.start()

		.then ->

			test.assertEquals 1, 1, ["Write some EVENT tests"]

			return

  casper.run ->
    test.done()
    return

  return
