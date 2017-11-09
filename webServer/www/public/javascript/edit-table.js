$(document).ready(function(){

  $('#editable-table').editableTableWidget();
  $('#editable-table').editableTableWidget({editor: $('<textarea>')});
  $('#editable-table').editableTableWidget({
    cloneProperties: ['background', 'border', 'outline']
  });


}) 