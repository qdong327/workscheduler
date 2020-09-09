Moment.js

Ex: var a = moment().format();

Format - 
"LLLL" returns Friday, July 7, 2017 3:59PM
"MM DD YYYY" returns 07 07 2017
"MMMM DD YYYY" returns July 7th, 2017
Escaping with square brackets [the great year of]

How much time has passed since a date?
var a = moment("20170110", "YYYYMMDD).fromNow(); returns 6 months ago
From beginning of this day?
var a = moment().startOf("day").fromNow(); returns 16 hours ago

Getters and Setters
moment().seconds(30) === new Date().setSeconds(30); --- setting (taking exact timestamp and setting the seconds to 30, no matter what it is actually)
moment().seconds(30) === new Date().setSeconds(); --- will get just seconds at any moment, currently
moment().seconds() === new Date().setSeconds(); --- getting

Durations - length of time
console.log(moment.duration(3000)) --- 3000 in milliseconds
console.log(moment.duration(3000)).humanize()) --- returns a few seconds
console.log(moment.duration(3600, "seconds")).hours()) --- returns 1 hour

Localization
moment.locale('de') --- language, es, us, en --- will return language
var march = moment("2017-03");
console.log(march.format("MMMM")) --- returns March
