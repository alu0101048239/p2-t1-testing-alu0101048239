'use strict';
 	const cheerio = require('cheerio');
 	
 	module.exports = rdf => {
 	  const $ = cheerio.load(rdf);
 	  const book = {};
    book.id = +$('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', '');
    book.title = $('dcterms\\:title').text();
    book.authors = $('pgterms\\:agent pgterms\\:name')
     .toArray().map(elem => $(elem).text());

    book.subjects = $('[rdf\\:resource$="/LCC"]')
 	  .parent().find('rdf\\:value')
 	  .toArray().map(elem => $(elem).text());
    
     if ($('pgterms\\:file').attr('rdf:about$=.jpg'))
      console.log("holi");

     book.link = $('pgterms\\:file').toArray().map(elem => 
      $(elem).attr('rdf:about'));
      
    book.links = [];      
    book.link.forEach(element => {
      if (!element.includes('.jpg'))
        book.links.push(element);
    });
    
      return book;
   };