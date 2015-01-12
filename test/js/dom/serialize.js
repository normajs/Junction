junction.inputTypes = ["text", "hidden", "password", "color", "date", "datetime", "email", "month", "number", "range", "search", "tel", "time", "url", "week"];

junction.inputTypeTest = new RegExp(junction.inputTypes.join("|"));


/*

  Serialize child input element values into an object.

  @return junction
  @this junction
 */

junction.fn.serialize = function () {
    var data;
    data = {};
    junction("input, select", this).each(function () {
        var name, type, value;
        type = this.type;
        name = this.name;
        value = this.value;
        if (junction.inputTypeTest.test(type) || (type === "checkbox" || type === "radio") && this.checked) {
            data[name] = value;
        } else if (this.nodeName === "select") {
            data[name] = this.options[this.selectedIndex].nodeValue;
        }
    });
    return data;
};