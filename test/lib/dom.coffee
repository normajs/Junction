
casper.test.begin "DOM Testing", 1, (test) ->


  casper.start()

    # ADD -----------------------------------------------------------------

    .then ->

      @.evaluate ->
        junction("body")
          .append("<div id=\"second\"></div>")


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
