

casper.test.begin "Junction is present", 3, (test) ->


  casper.start()

    # Library is present
    .then ->

      @.page.injectJs("./test/js/junction.js")

      test.assertEvalEquals (->
        return typeof junction
      ), "function", "Junction is present"

    # Library has methods
    .then ->

      test.assertEvalEquals (->
        return Object.keys(junction).length > 0
      ), true, "Junction has methods"

      return

    .then ->


      @evaluate ->
        div = document.createElement "div"
        div.id = "test"

        document.body.appendChild div


      test.assertEvalEquals (->

        test = junction "#test"

        for item in test
          if item is document.getElementById("test")
            return true

        return false

      ), true, "Junction returns array of nodes"


  casper.run ->
    test.done()
    return

  return
