 const cheerio = require('cheerio');
 const rp = require('request-promise');

var options = {
   headers: {
     'Referer': 'https://www.kbb.com/',
     'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.80 Mobile Safari/537.36'
   }
 };

function searchCars(cars){
cars.forEach(function(c,i){
// formated as .com/make/model/year
 options['url'] = `https://www.kbb.com/${cars[i].split(' ')[1]}/${cars[i].split(' ')[2]}/${cars[i].split(' ')[0]}/`;
 rp(options)
 .then(function(html){
   $ = cheerio.load(html);
   var e = parseFloat($('.rating-text').eq(0).text().split('/')[0].trim());
   var c = parseFloat($('.rating-text').eq(1).text().split('/')[0].trim());

   console.table({
     'Car': $('.title-one').eq(0).text(),
     'Price': $('.title-three').eq(1).text(),
     'Expert Rating': $('.rating-text').eq(0).text(),
     'Consumer Rating': $('.rating-text').eq(1).text(),
     'Average Rating': `${((e+c)/2).toFixed(1)} / 5`
   })
 })
 .catch(console.log)
  })
}

var cars = [
  '2019 hyundai kona',
  '2019 hyundai accent',
  '2019 hyundai Ioniq-Electric',
  '2019 hyundai Sonata'
]
searchCars(cars);
