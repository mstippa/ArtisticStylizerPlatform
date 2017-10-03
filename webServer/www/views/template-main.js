/*
The first thing we are doing here is joining an array of strings, placing
a new line �n� between them. This creates one long string of HTML that will
render on separate lines leaving the source code more readable. This string is
the basis of our template, and contains a number of placeholders for the
content items {title}, {pagetitle} and {content}.
*/
exports.build = function(title, pagetitle, content){
	return ['<!doctype html>',
		'<html lang="en"><meta charset=="utf-8"><title>{title}</title>',
		'<link rel ="stylesheet" href="/assets/style.css" />',
		'<h1>{pagetitle}</h1>',
	'<div id="content">{content}</div>']
	.join('')
	.replace(/{title}/g, title)
	.replace(/{pagetitle}/g, pagetitle)
	.replace(/{content}/g, content);
};
