$(document).ready( function() {
	
	// bindings
    $('#set_values').bind('click', addDeadline);
    $('#d_list li a').live('click', removeDeadline);
	
	// setup defaults
	listCurrentDeadlines();
});


var addDeadline = function() {
		
	// get values
	var title = $("#title_value").val();
	var date = new Date($("#datepicker").val());
	var diff = calculate_days(date);
	var deadline = { "title": title, "deadline": date };

    // add to localstorage
	var id = addItemToLocalStorage(deadline);

	// add to view
	$("#d_list").append(lineItem(deadline,id));
	
	// clear out fields 
	$("#title_value").val("");
	$("#datepicker").val(getTodaysDate());
	
};

var removeDeadline = function () {
    console.info("deleting!!");
    localStorage.removeItem($(this).parent().attr("id"));
    $(this).parent().slideUp('slow', function () { $(this).remove(); });
};

var calculate_days = function(picked_date) {
	var now = new Date();
	var diff = Math.ceil((picked_date - new Date())/ (1000*60*60*24));
	return diff;
}

var listCurrentDeadlines = function() {
    var current_count = parseInt(localStorage.getItem("current_count"));
    console.info("current_count:" + current_count);
    if (current_count > 0) {
        for (i = 0; i < current_count; i++) {
            var item = JSON.parse(localStorage.getItem("deadline-" + i));
            if (!item) continue;
            console.info("item:deadline-" + i + " == " + item);
            $("#d_list").append(lineItem(item, i));
            //alert("item:" + item);
        }
    }
};

var addItemToLocalStorage = function(deadline_obj) {

    var name = deadline_obj.title;
    var date = deadline_obj.deadline;

    var current_count = parseInt(localStorage.getItem("current_count"));
	if(!current_count) {current_count=0;}
	var deadline = {"title":name, "deadline":date};
	var idfy = "deadline-" + current_count;
	localStorage.setItem(idfy, JSON.stringify(deadline));
	current_count += 1;
	localStorage.removeItem("current_count");
	localStorage.setItem("current_count", current_count);
	return current_count;
};

var lineItem = function (deadline_obj, i) {
    console.info("InLineItem:- deadline_obj=" + JSON.stringify(deadline_obj));
    var li = "<li id=deadline-" + i + ">" + deadline_obj.title + ":" + calculate_days(new Date(deadline_obj.deadline)) + " days left <a href='#'>x</a> </li>";

    console.info("lineitem: " + li);
    return li;
}


var getTodaysDate = function() {
    var now = new Date();
    var month = (now.getMonth() + 1);
    var day = now.getDate();
    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;
    var today = now.getFullYear() + '-' + month + '-' + day;

    return today;
};
