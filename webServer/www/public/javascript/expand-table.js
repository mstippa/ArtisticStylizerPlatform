function expandReportsTable() {

  // Find a <table> element with id="myTable":
  var table = document.getElementById("reports-table");
  var numRows;

  if (table.rows === null) {
    numRows = 0;
  } else {
    numRows = table.rows.length;
  }


  // Create an empty <tr> element and add it to the 1st position of the table:
  var row = table.insertRow(numRows);

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);

  // Add some text to the new cells:
  cell1.innerHTML = "NEW CELL1";
  cell2.innerHTML = "NEW CELL2";
  cell3.innerHTML = "NEW CELL3";
  cell4.innerHTML = "NEW CELL4";
  cell5.innerHTML = "NEW CELL5";
}

function expandQueueTable() {

  // Find a <table> element with id="myTable":
  var table = document.getElementById("queue-table");
  var numRows;

  if (table.rows === null) {
    numRows = 0;
  } else {
    numRows = table.rows.length;
  }


  // Create an empty <tr> element and add it to the 1st position of the table:
  var row = table.insertRow(numRows);

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);

  // Add some text to the new cells:
  cell1.innerHTML = "NEW CELL1";
  cell2.innerHTML = "NEW CELL2";
  cell3.innerHTML = "NEW CELL3";
  cell4.innerHTML = "NEW CELL4";
  cell5.innerHTML = "NEW CELL5";
  cell6.innerHTML = "NEW CELL6";
}


function expandLogsTable() {

  // Find a <table> element with id="myTable":
  var table = document.getElementById("logs-table");
  var numRows;

  if (table.rows === null) {
    numRows = 0;
  } else {
    numRows = table.rows.length;
  }


  // Create an empty <tr> element and add it to the 1st position of the table:
  var row = table.insertRow(numRows);

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);

  // Add some text to the new cells:
  cell1.innerHTML = "NEW CELL1";
  cell2.innerHTML = "NEW CELL2";
  cell3.innerHTML = "NEW CELL3";
  cell4.innerHTML = "NEW CELL4";
  cell5.innerHTML = "NEW CELL5";
}

$(function () { $("td").dblclick(function () { var OriginalContent = $(this).text(); $(this).addClass("cellEditing"); $(this).html("<input type='text' value='" + OriginalContent + "' />"); $(this).children().first().focus(); $(this).children().first().keypress(function (e) { if (e.which == 13) { var newContent = $(this).val(); $(this).parent().text(newContent); $(this).parent().removeClass("cellEditing"); } }); $(this).children().first().blur(function(){ $(this).parent().text(OriginalContent); $(this).parent().removeClass("cellEditing"); }); }); });


 
