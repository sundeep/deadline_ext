$(document).ready( function() {
	
	// defaults
	
	// bindings
	$('#set_values').bind('click', addDeadline);
	
	// list current deadlines
	listCurrentDeadlines();
});


var addDeadline = function() {
		
	// get values
	var title = $("#title_value").val();
	var date = new Date($("#datepicker").val());
	var diff = calculate_days(date);
	
	// add to localstorage
	addItemToLocalStorage(title,date);
	
	// add to view
	$("#d_list").append("<li> " + title + " : " + diff + " days left </li>");
	
	// clear out fields 
	$("#title_value").val();
	
};


var calculate_days = function(picked_date) {
	var now = new Date();
	var diff = Math.ceil((picked_date - new Date())/ (1000*60*60*24));
	return diff;
}

var listCurrentDeadlines = function() {
	
};


var addItemToLocalStorage = function(name,date) {
	var current_count = parseInt(localStorage.getItem("current_count"));
	if(!current_count) {current_count=1; alert ("zero count!");}
	var deadline = {"title":name, "deadline":date};
	var name = "deadline-" + current_count;
	localStorage.setItem(name,JSON.stringify(deadline));
	current_count += 1;
	localStorage.removeItem("current_count");
	localStorage.setItem("current_count", current_count);
};