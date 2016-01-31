$(document).ready(function(){
	//making all those div-s for bootstrap 
	var $body = $('body');
		$body.append("<div></div>");
	var $div = $('div');
		$div.addClass("container-fluid");
		$div.append("<div class='row'></div>");
	var $div1 = $('.row');
		$div1.append("<div class= 'col-md-8'></div>");
	$('.col-md-8').append("<div class= 'text-left' > </div>");
	var $divCenter = $('.text-left');
	$divCenter.append("<form></form>");
	// creating form 
	var $form = $('form');
	$form.append("<h1>Homework</h1>")
	.append("<div class='col-sm-8'><h4>UserName</h4><input type='text' placeholder = 'User Name'></div>")
	.append("<div class='col-sm-8'><h4>Password</h4><div class='form-group has-feedback'><input type='password' placeholder = 'Password'></div></div>")
	.append("<div class='col-sm-8'><h4>Confirm Password</h4><div class='form-group has-feedback'><input type='password' placeholder = 'Retype Password'></div></div>")
	.append("<div class='col-sm-8'><h4>e-mail</h4><div class='form-group has-feedback'><input type='text' placeholder = 'example@something.com'></div></div>")
	.append("<div class='col-sm-8'><h4>Year Born</h4><select class='col-sm-3'></select></div>")
	.append("<div class='col-sm-8'><h4 id='age'>Age</h4></div>")
	.append("<div class='col-sm-8'><button class='col-sm-3 btn  btn-primary'>Submit</button></div>");

	$('input').addClass("form-control ");
	//adding ID-s to each input
	$('input').each(function(i){
		$(this).attr('id','input'+i);
	});
	// adding glyphicons for passwords
	$('#input2').before('<i class="glyphicon glyphicon-ok form-control-feedback icoS"></i>');
	$('#input1').before('<i class="glyphicon glyphicon-ok form-control-feedback icoS"></i>');
	$('#input3').before('<i class="glyphicon glyphicon-ok form-control-feedback icoES" id="emailIcoS"></i>');
	$('#input2').before('<i class="glyphicon glyphicon-remove form-control-feedback icoF"></i>');
	$('#input1').before('<i class="glyphicon glyphicon-remove form-control-feedback icoF"></i>');
	$('#input3').before('<i class="glyphicon glyphicon-ok form-control-feedback icoEF" id="emailIcoF"></i>');
	var $succIco = $('.icoS');
	var $failIco = $('.icoF'); 
	$('h4').addClass('col-md-12')
	// loading select box 

	for(var i = 1950; i < 2012; i++){
		$('select').append("<option>"+ i + "</option>");
	}

	//password on change for second input
	$('#input2').change(function(){
		if($('#input2').val() == $('#input1').val()){
			if($('#input2').hasClass('failed') && $('#input1').hasClass('failed')){
				$('#input2').removeClass('failed');
				$('#input1').removeClass('failed');

			}
			$failIco.css('display','none');
			$succIco.css('display','inline');
			$('#input2').addClass('success');
			
			$('#input1').addClass('success');
			
		}
		else if($('#input2').val() != $('#input1').val()){
			if($('#input2').hasClass('success') && $('#input1').hasClass('success')){
				$('#input2').removeClass('success');
				$('#input1').removeClass('success');
			}
			$failIco.css('display','inline');
			$succIco.css('display','none');
			$('#input2').addClass('failed');
			
			$('#input1').addClass('failed');
			
		}
		

	});
	// password changed for first input
	$('#input1').change(function(){
		var pass = $('#input1').val()
		var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
		if(reg.test(pass)){
			if($('#input2').val() == $('#input1').val()){
				if($('#input2').hasClass('failed') && $('#input1').hasClass('failed')){
					$('#input2').removeClass('failed');
					$('#input1').removeClass('failed');

				}
				$failIco.css('display','none');
				$succIco.css('display','inline');
				$('#input2').addClass('success');
				
				$('#input1').addClass('success');
				
			}
			else if($('#input2').val() != $('#input1').val()){
				if($('#input2').hasClass('success') && $('#input1').hasClass('success')){
					$('#input2').removeClass('success');
					$('#input1').removeClass('success');
				}
				$failIco.css('display','inline');
				$succIco.css('display','none');
				$('#input2').addClass('failed');
				
				$('#input1').addClass('failed');
			}
		}
		else{
			alert('Plese make sure that your password is Minimum 8 characters at least 1 Uppercase Alphabet,'+
			 '1 Lowercase Alphabet, 1 Number and 1 Special Character:')
		}
	});
	// checking e-mail
	$('#input3').change(function(){
		var email = $(this).val();
		console.log(email);
		var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(reg.test(email)){
			if($('#input3').hasClass('failed')){
				$('#input3').removeClass('failed');
			}
			$('.icoES').css('display','inline');
			$('#input3').addClass('success');
		}
		else{
			alert('Make sure you enetered your e-mail propertly like "example@something.com"');
			if($('#input3').hasClass('success')){
				$('#input3').removeClass('success');	
		}
		$('.icoEF').css('display','inline');
		}
	});
	// declaring age in age div 

	$('select').change(function(){
		var age = 2016 - $('select').val();
		$('#age').text('Age '+ age);
	});

	
});
