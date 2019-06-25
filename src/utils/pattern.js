// @https://stackoverflow.com/questions/7543818/regex-javascript-to-match-both-rgb-and-rgba
exports.rgb = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:,\s*(\d*(?:\.\d+)?))?\)/;

exports.onlyRgb = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:,\s*(\d*(?:\.\d+)?))?\)$/;

exports.hex = /(^#[\w\d]{3}$)|(^#[\w\d]{6}$)|(^#[\w\d]{8}$)/;
