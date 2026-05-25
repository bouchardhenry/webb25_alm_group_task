const URL_REGEX = /^https?:\/\/.+/;

const isValidUrl = (str) => URL_REGEX.test(str);

const isPositiveNumber = (val) => typeof val === "number" && val > 0;

module.exports = { isValidUrl, isPositiveNumber };
