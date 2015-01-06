
casper.test.begin "Core Methods", 1, (test) ->


  casper.start()

    # Junction is ready
    .then ->

      @.page.injectJs("./test/js/junction.js")

      test.assertEvalEquals (->

        ready = false
        junction(document).ready( ->
          ready = true
        )

        return ready
      ), true, "Junction is ready"

      return

    # # inArray
    # .then ->
    #
    #   @evaluate ->
    #
    #     junction(document)
    #       .append("<div><ul><li>test></li></ul></div>")
    #
    #   test.assertEvalEquals (->
    #
    #     inArray = false
    #
    #     list = junction "ul"
    #     listItem = junction "div"
    #
    #     if junction.inArray(listItem, list) > -1
    #       inArray = true
    #
    #     console.log "foobar"
    #
    #     return inArray
    #   ), true, "inArray works"
    #
    #   return



  casper.run ->
    test.done()
    return

  return
