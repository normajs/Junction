
casper.test.begin "DOM Testing", 1, (test) ->


  casper.start()

    # ADD -----------------------------------------------------------------

    .then ->

      # resultWrapper = @evaluate(->
      #   wrapper = {}
      #   try
      #     junction("<div id=\"second\"></div>").appendTo("#test")
      #
      #     # store your return values in the wrapper
      #   catch error
      #     wrapper.error = error
      #   wrapper
      # )
      #
      # # Handle the result and possible errors:
      # if resultWrapper.error
      #   error = resultWrapper.error
      #   @echo "An error occurred: " + JSON.stringify(error.message)

      # else
      #   result = JSON.stringify(resultWrapper.result)
      #   @echo result

      @evaluate ->
        junction("body").append "<div id=\"second\"></div>"



      test.assertExists "#second", ["Append is successful"]


      return


    # ADD-CLASS -----------------------------------------------------------

    # .then ->
    #
    #   @.evaluate ->
    #     junction("#test").addClass("second")
    #
    #   test.assertExists ".second", ["Add Class is successful"]
    #
    #   return



  casper.run ->
    test.done()
    return

  return
