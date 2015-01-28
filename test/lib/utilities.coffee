
casper.test.begin "Utility Methods Testing", 5, (test) ->

	casper.start()

		# DEBOUNCE ------------------------------------------------------------------
		# FLATTEN -------------------------------------------------------------------

		# The FLATTEN function takes any array and returns a new array with all the
		# elements flattened into one dimension.

		###
			@Rich

			These test don't always need to use DOM elements. Many of them interact
			with native arrays or objects
		###
		###
			@James

			Now you tell me. ;)
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

			testArray = @.evaluate ->

				junction("body").append("<div id='getKeysTest'></div>")
				junction("#getKeysTest").append("<div id='getKeysChild1'></div>")
				junction("#getKeysTest").append("<div id='getKeysChild2'></div>")

				testObject = []
				testThing = junction("#getKeysTest").children()
				testThing.each ->
					element = {}
					element.id = @.id
					element.zanzabar = "zulu"
					testObject.push element

				arr = junction.getKeys testObject, "zulu"
				# arr = junction.getKeys testObject[0], "zulu" # <--- THIS WORKS
				return arr

			@.echo testArray
			@.echo "This doesn't work if I just pass the testObject object to the"
			@.echo "getKeys function. It DOES work if I pass just one specific item"
			@.echo "testObject doesn't work. testObject[0] does."
			@.echo "I would think I would be able to pass the whole object."
			test.assertEquals testArray[0], "zanzabar", ["GETKEYS is successful."]

			return


		# GETQUERYVARIABLE ----------------------------------------------------------

		# The GETQUERYVARIABLE function returns an array of query variables in the
		# URL string matching the value.

		.thenOpen 'http://localhost:3000?testing=all&thething=all&theotherthing=three', () ->

			@.echo "where the heck am i?"

			testThing = @.evaluate ->

				return junction.getQueryVariable "all"

			@.echo testThing
			@.echo "testThing is returning null. I think the problem is somewhere in"
			@.echo "setting the results in the function. Maybe. "

			test.assertEquals testThing[0], "testing", ["GETQUERYVARIABLE is successful."]

			return


		# ISELEMENT -----------------------------------------------------------------

		# The ISELEMENT function determines if the

		.then ->

			@.evaluate ->

				__utils__.echo window.location

			test.assertEquals 1, 1, ["Working on ISELEMENT."]

			return


		# ISELEMENTINVIEW -----------------------------------------------------------
		# ISMOBILE ------------------------------------------------------------------
		# LAST ----------------------------------------------------------------------
		# TRUTHFUL ------------------------------------------------------------------

  casper.run ->
    test.done()
    return

  return
