
$(function(){
	var aarr = [];
	 $.ajax({
			type: 'get',
	        contentType: 'application/json',
	        url: '/forms/',						
	        success: function(response) {
	            aarr = aarr.concat(response);
	            pushArray();
	        }
	    });
	
    $("#Save").click(function(){
	   
	    var obj = {};
	    obj.name = $("#name").val();
		obj.phonenumber = $("#phonenumber").val();
		obj.address = $("#address").val();
		obj.email = $("#email").val();
		console.log(obj);
		
	    $.ajax({
			type: 'POST',
			data: JSON.stringify(obj),
	        contentType: 'application/json',
	        url: '/forms/form',						
	        success: function(response) {
	            console.log('success',response);

	        }
	    });
	});
	    pushArray = function(){
		  	var columns = ['name', 'phone', 'address', 'email']
			var table_html = '';
			for (var i = 0; i < aarr.length; i++){
				table_html += '<tr>';
				for( var j = 0; j < columns.length; j++ ){
	    			table_html += '<td class="' +columns[j]+ '" >' + aarr[i][columns[j]] + '</td>'
				}

	    		table_html += ' <td><a href="../customers/edit/<%=data[i].id%>">Edit</a><a href="../customers/delete/<%=data[i].id%>">Delete</a></td></tr>'
			}
			$( "#t_body" ).append(  table_html );
	    	
	    }

});



	// $("#Save").click(function(){

// });



//data for get



// $(function(){				
//     $('#singlebutton').click(function(){
// 	    var obj = {};
// 	    obj.input1 = $("#textinput1").val();
// 		obj.input2 = $("#textinput2").val();
// 		obj.input3 = $("#textinput3").val();
// 		console.log(obj);
// 	    $.ajax({
// 			type: 'GET',
// 			// data: JSON.stringify(obj),
// 	        contentType: 'application/json',
// 	        url: '/api/forms',						
// 	        success: function(data) {
// 	            console.log('success');
// 	            console.log(data);
// 	        }
// 	    });
// 	});
// });
