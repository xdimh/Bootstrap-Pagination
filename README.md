Bootstrap-Pagination
===================

#####Bind events on Bootstrap pagination and you can custom getItemsAjax

######How to use it.

    $('.pagination').BTPagination(totalRecords,opts);

######Parameters:

* totalRecords  --- The number of records

* opts --- A object which has properties as follows:

> 1. items_per_page : 10 (default)
2. num_display_pageno : 10 (default)
3. prev_text : 'Prev' (default)
4. next_text : 'Next' (default)
5. getItemsAjax : function() {return false;}

<b>you can provide your own value of above properties.</b>



