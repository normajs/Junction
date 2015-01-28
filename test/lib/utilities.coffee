
casper.test.begin "Utility Methods Testing", 4, (test) ->

	casper.start()

		.then ->

			test.assertEquals 1, 1, ["Write some UTILITIES tests"]

			return

		# DEBOUNCE ------------------------------------------------------------------
		# FLATTEN -------------------------------------------------------------------

		# The FLATTEN function takes any array and returns a new array with all the
		# elements flattened into one dimension.
		
		###
			@Rich
			
			These test don't always need to use DOM elements. Many of them interact
			with native arrays or objects
		###
		
		.then ->

			testArray = @.evaluate ->

				junction("body").append("<div id='flattenTest'></div>")
				junction("#flattenTest").append("<div id='flattenChild1'></div>")
				junction("#flattenTest").append("<div id='flattenChild2'></div>")

				testThing = junction("#flattenTest").children()
				arr = junction.flatten(testThing)
				return arr

			test.assertEquals testArray.length, 2, ["FLATTEN is successful."]

			return


		# FLATTENOBJECT -------------------------------------------------------------

		# The FLATTENOBJECT function works the same as FLATTEN except it accepts
		# and object and turns it into a flattened array.

		.then ->

			testArray = @.evaluate ->

				junction("body").append("<div id='flattenObjectTest'></div>")
				junction("#flattenObjectTest").append("<div id='flattenChild1'></div>")
				junction("#flattenObjectTest").append("<div id='flattenChild2'></div>")

				testObject = []
				testThing = junction("#flattenObjectTest").children()
				testThing.each ->
					element = {}
					element.id = @.id
					testObject.push element

				arr = junction.flattenObject(testObject)
				return arr

			test.assertEquals testArray.length, 2, ["FLATTENOBJECT is successful."]

			return


		# GETKEYS -------------------------------------------------------------------

		# The GETKEYS function returns an array of keys that match a certain value.

		.then ->

			test.assertEquals 1, 1, ["Working on GETKEYS."]

			return


		# GETQUERYVARIABLE ----------------------------------------------------------
		# ISELEMENT -----------------------------------------------------------------
		# ISELEMENTINVIEW -----------------------------------------------------------
		# ISMOBILE ------------------------------------------------------------------
		# LAST ----------------------------------------------------------------------
		# TRUTHFUL ------------------------------------------------------------------

  casper.run ->
    test.done()
    return

  return
