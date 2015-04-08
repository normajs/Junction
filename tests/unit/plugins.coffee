
describe "Plugins tests", ->

  # class Test
  #
  #   constructor: (@data, attr) ->
  #
  #     window.pluginTest = true
  #
  #
  # junction.addPlugin('Test', Test, '[data-test]')


  # ADDPLUGIN ----------------------------------------------------------------

  it "ADD-PLUGIN should set up adding a plugin to the global junction", ->

    casper.then ->

      _junction = @.evaluate ->

        class Test

          constructor: ->

            window.pluginTest = true


        junction.addPlugin('test', Test, '[data-test]')

        return junction

      _junction.plugins.should.include.keys "test"


  # UPDATEMODELS -------------------------------------------------------------

  it "UPDATE-MODELS should bind a plugin to html on the page", ->

    casper.then ->

      updated = @.evaluate ->

        junction("body").append("<div data-test='false'></div>")

        junction.updateModels()

        return window.pluginTest

      @.echo updated

      updated.should.equal true


  return
