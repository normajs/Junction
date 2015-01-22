
casper.test.begin "Utility Methods Testing", 1, (test) ->

	casper.start()

		.then ->

			test.assertEquals 1, 1, ["Write some UTILITIES tests"]

			return

  casper.run ->
    test.done()
    return

  return
