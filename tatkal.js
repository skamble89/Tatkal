(function(){	
	executeAction(getAction());

	function executeAction(action){
			var actions = {
			search: function(){
				var from = getItem('from'),
					to = getItem('to'),
					date = getItem('date');

				document.getElementById('jpform:fromStation').value = from;
				document.getElementById('jpform:toStation').value = to;
				document.getElementById('jpform:journeyDateInputDate').value = date;
				document.getElementById('jpform:jpsubmit').click();
			},


			book_now: function(){
				var train_no = getItem('train_no'),
					booking_class = getItem('class');

				//Click tatkal radio button
				$('input[type="radio"][value="CK"]').click();
				//Click on appropriate train booking class
				eval($('tr:contains(' + train_no + ') a:contains(' + booking_class + ')').attr('href').replace('javascript:',''));
				waitFor(function(){
					return !!$('#tabcontent').html();
				}).then(function(){
					eval($('#tabcontent table:first tr:last td:eq(1) a').attr('href').replace('javascript:',''));
				})
			},


			pax_details: function(){
				var passengers = getItem('passengers');
				for(var i=0;i<passengers.length;i++){
					var pax = passengers[i];
					$('.psgn-name:eq(' + i + ')').val(pax.name);
					$('.psgn-age:eq(' + i + ')').val(pax.age);
					$('.psgn-gender:eq(' + i + ')').val(pax.gender);
					if(pax.seat_preference) $('.psgn-psgn-berth-choice:eq(' + i + ')').val(pax.seat_preference);
				}
				$('.mobile-number').val(getItem('mobile'));
			},


			payment_selection: function(){
				var option_type = getItem('option_type'),
					payment_option = getItem('payment_option');

				//Select ICICI DEBIT card
				$('.paymentOption #' + option_type).click();
				$('input[name="' + option_type + '"][value="' + payment_option + '"]').click().change();
				$('#validate').click();
			}
		};

		actions[action]();
		//set next action
		switch(action){
			case 'search': sessionStorage.setItem('next_action','book_now'); break;
			case 'book_now': sessionStorage.setItem('next_action','pax_details'); break;
			case 'pax_details': sessionStorage.setItem('next_action','payment_selection'); break;
			case 'payment_selection': sessionStorage.removeItem('next_action'); break;
		}
	}

	function getAction(){
		return sessionStorage.getItem('next_action') || 'search';
	}

	function waitFor(fn){
		var d = $.Deferred();
		setTimeout(function timer(){
			var result = fn();
			if(result){
				d.resolve();
			}else{
				setTimeout(timer, 10);
			}
		}, 0);

		return d.promise();
	}

	function getItem(key){		
		return JSON.parse(localStorage.getItem(key));
	}
})()