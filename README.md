Bootstrap-Pagination
===================

Bind events on Bootstrap pagination and you can custom getItemsAjax

How to use it.
$('.pagination').BTPagination(totalRecords,opts);


totalRecords  --- The number of records

opts --- A object which has properties as follows:

items_per_page : 10 (default)
num_display_pageno : 10 (default)
prev_text : 'Prev' (default)
next_text : 'Next' (default)
getItemsAjax : function() {return false;}

you can provide your own value of above properties.



