
casper.test.begin "Plugin Methods Testing", 1, (test) ->

	casper.start()

		.then ->

			test.assertEquals 1, 1, ["Write some PLUGIN tests"]

			return

  casper.run ->
    test.done()
    return

  return
