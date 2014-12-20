casper.test.begin "index.html contains stuff", 1, (test) ->
  casper.start "./test/index.html", ->
    test.assertTitle "Junction"
    return

  casper.run ->
    test.done()
    return

  return
