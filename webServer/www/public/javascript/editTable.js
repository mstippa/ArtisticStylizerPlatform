$(document).ready(function(){

  $('#editable-table').editableTableWidget();
  $('#editable-table').editableTableWidget({editor: $('<textarea>')});
  $('#editable-table').editableTableWidget({
    cloneProperties: ['background', 'border', 'outline']
  });
  $('#editable-table td').on('validate', function(evt, newValue) {
    if (....) { 
      return false; // mark cell as invalid 
    }
  });
  $('#editable-table td').on('change', function(evt, newValue) {
  // do something with the new cell value 
  if (....) { 
    return false; // reject change
  }
});


}) 