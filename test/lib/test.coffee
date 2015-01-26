	# casper.start('http://espn.com/', () ->
	# 	console.log('Opened page: "' + @.getTitle() + '"')
	# 	casper.capture("../images/espn-home.png")
	# ).run()

	# testCount = 2
	# casper.test.begin "Testing Reddit", testCount, redditTest = (test) ->
	# 	casper.start("http://reddit.com/r/programming", ->
	# 		test.assertTitleMatch /programming/, "Title is what we expect"
	# 		casper.click "a[href*='programming/new/']"
	# 		casper.waitForUrl /\/programming\/new\/$/, ->
	# 			test.assertElementCount "p.title", 26, "26 links on first page"
	# 			casper.capture "../images/reddit-programming-new.png"
	# 			return
	# 		return
	# 	).run ->
	# 		test.done()
	# 		return
	# 	return

casper.test.begin "Searching Reddit", 1, (test) ->

	casper.start "http://reddit.com/r/programming", ->
		casper.fill "form#search",
			q: "javascript"
			restrict_sr: true
		, true
		casper.then ->
			test.assertElementCount "p.title", 25, "25 links on first page"
			@capture "../images/Reddit-search.png"
			return
		return

	casper.run ->
		test.done()
		return

	return