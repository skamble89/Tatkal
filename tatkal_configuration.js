(function(){

	var paymentOptions = [{
			name: 'NETBANKING',
			options:[
				{key:1,value:'State Bank of India'},
				{key:10,value:'State Bank of India and Associates'},
				{key:22,value:'Federal Bank'},
				{key:29,value:'Indian Bank'},
				{key:28,value:'Union Bank of India'},
				{key:31,value:'Andhra Bank'},
				{key:34,value:'Punjab National Bank'},
				{key:35,value:'Allahabad Bank'},
				{key:39,value:'AXIS Bank'},
				{key:36,value:'HDFC Bank'},
				{key:37,value:'Bank of Baroda'},
				{key:42,value:'Karnataka Bank'},
				{key:43,value:'Oriental Bank of Commerce'},
				{key:40,value:'Karur Vysya Bank'},
				{key:46,value:'Kotak Mahindra Bank'},
				{key:44,value:'ICICI Bank'},
				{key:45,value:'IndusInd Bank'},
				{key:50,value:'Central Bank of India'},
				{key:48,value:'Bank of India'},
				{key:54,value:'Syndicate Bank'},
				{key:53,value:'Bank of Maharashatra'},
				{key:52,value:'IDBI Bank'},
				{key:56,value:'Corporation Bank'},
				{key:60,value:'Yes Bank'},
				{key:64,value:'Nepal SBI Bank Ltd.'},
				{key:67,value:'South Indian Bank'}
			]
		},{
			name: 'CREDIT_CARD',
			options:[
				{key:4,value:'Visa/Master Card(Powered By ICICI BANK)'},
				{key:17,value:'Visa/Master Card(Powered By CITI BANK)'},
				{key:21,value:'Visa/Master Card(Powered By HDFC BANK)'},
				{key:27,value:'American Express'},
				{key:30,value:'Visa/Master Card(Powered By AXIS BANK)'},
				{key:58,value:'RuPay Card (Powered by Kotak Bank)'},
				{key:72,value:'International cards (Powered by ATOM)'}
			]
		},{
			name: 'DEBIT_CARD',
			options: [
				{key:3,value:'State Bank of India'},
				{key:5,value:'Indian Overseas Bank'},
				{key:9,value:'Punjab National Bank'},
				{key:15,value:'Indian Bank'},
				{key:16,value:'Union Bank of India'},
				{key:19,value:'Bank of India'},
				{key:25,value:'Andhra Bank'},
				{key:26,value:'Canara Bank'},
				{key:32,value:'CITI Bank'},
				{key:41,value:'ICICI Bank'},
				{key:57,value:'HDFC Bank'},
				{key:69,value:'Central Bank of India'},
				{key:66,value:'AXIS Bank'},
			]
		},{
			name: 'CASH_CARD',
			options:[
				{key:23,value:'ITZ Cash Card'},
				{key:33,value:'I Cash Card'},
				{key:55,value:'OXI Cash Card'},
				{key:68,value:'Mobikwik Wallet'},
				{key:70,value:'mRUPEE Wallet'},
				{key:71,value:'Paytm Wallet'},
			]
		},{
			name: 'IRCTC_PREPAID',
			options: [{key:59,value:'IRCTC Union Bank prepaid (RuPay)'}]
		}];
	var div = createContainer();
	renderConfig(div);
	bindEvents(div);
	populateConfig(div);

	function renderConfig(div){	
		var html = '<div><label style="display:inline-block;width:150px;">From Station</label><input data-key="from" type="text" class="tatkal-param" style="display:inline-block;width:150px;"/></div>'+
					'<div><label style="display:inline-block;width:150px;">To Station</label><input data-key="to" type="text" class="tatkal-param" style="display:inline-block;width:150px;"/></div>'+
					'<div><label style="display:inline-block;width:150px;">Date</label><input data-key="date" type="text" placeholder="dd-mm-yyyy" class="tatkal-param" style="display:inline-block;width:150px;"/></div>'+
					'<hr/>'+

					'<div><label style="display:inline-block;width:150px;">Train No</label><input data-key="train_no" type="text" class="tatkal-param" style="display:inline-block;width:150px;"/></div>'+
					'<div><label style="display:inline-block;width:150px;">Class</label><select data-key="class" class="tatkal-param" style="display:inline-block;width:150px;"><option value="">--Select--</option><option>2A</option><option>3A</option><option>SL</option></select></div>'+
					'<hr/>'+

					'<div><label style="display:inline-block;width:150px;">Mobile</label><input data-key="mobile" class="tatkal-param" style="display:inline-block;width:150px;"/></div>'+
					'<button id="addPax">Add Passenger</button>'+
					'<table id="paxList">'+
						'<tr>'+
							'<th>Name</th><th>Age</th><th>Gender</th>'+
						'</tr>'+
					'</table>'+					
					'<hr/>' +

					'<div>'+
						'<label style="display:inline-block;width:150px;">Payment Type</label>'+
						'<select data-key="option_type" class="tatkal-param" style="display:inline-block;width:150px;">'+
							'<option value="">--Select--</option>'+							
							(function(){
								return paymentOptions.map(function(e){return '<option>' + e.name + '</option>';});
							})()+
						'</select>'+
					'</div>'+
					'<div>'+	
						'<label style="display:inline-block;width:150px;">Payment Option</label>'+					
						'<select data-key="payment_option" class="tatkal-param" style="display:inline-block;width:150px;">'+
							'<option value="">--Select--</option>'+
						'</select>'+
					'</div>';

		div.innerHTML = html;
	}

	function bindEvents(div){
		var $div = $(div);
		$('.tatkal-param', $div).on('change', function(){
			var $this = $(this),
				key = $this.data('key'),
				value = $this.val();

			setItem(key, value);			
			if(key==='option_type'){
				var html = '<option value="">--Select--</option>';
				var options = paymentOptions.filter(function(e){return e.name===value;})[0];
				if(options){
					html+=options.options.map(function(e){return '<option value="'+e.key+'">'+e.value+'</option>';});
					$('select[data-key="payment_option"]', $div).html(html);
				}
			}
		});

		$('#addPax', $div).on('click', addPaxRow);

		$('#paxList').on('change', 'input,select', function(){
			var $this = $(this),
				key = $this.data('key'),
				value = $this.val(),
				passengers = getItem('passengers') || [],
				index = ($this.parents('tr').index() || 1)-1,
				pax = passengers[index] || {};

			pax[key] = value;
			passengers[index] = pax;
			setItem('passengers', passengers);
		});
	}

	function populateConfig(div){
		var $div = $(div);
		$('.tatkal-param', $div).each(function(){
			var $this = $(this),
				key = $this.data('key');

			$this.val(getItem(key));
		})

		var passengers = getItem('passengers') || [];
		if(passengers.length>0){
			for(var i=0;i<passengers.length;i++){
				var index = i+1;
				var pax = passengers[i];
				addPaxRow();
				$('#paxList tr:eq('+index+') input[data-key="name"]').val(pax.name);
				$('#paxList tr:eq('+index+') input[data-key="age"]').val(pax.age);
				$('#paxList tr:eq('+index+') select[data-key="gender"]').val(pax.gender);
			}
		}else{			
			addPaxRow();
		}
	}

	function addPaxRow(){
		$('#paxList').append('<tr><td><input type="text" data-key="name"/></td><td><input type="text" data-key="age"/></td><td><select data-key="gender"><option value="">--Gender--</option><option value="M">Male</option><option value="F">Female</option></select></td></tr>');		
	}

	function createContainer(){
		var div = document.createElement('div');
		div.style.position = 'absolute';
		div.style.top = '0';
		div.style.right = '0';		
		div.style.width = '500px'
		div.style.backgroundColor = '#aaa';
		div.style.zIndex = '10000';
		div.style.padding = '10px';
		document.body.appendChild(div);

		return div;
	}

	function setItem(key, value){
		localStorage.setItem(key, JSON.stringify(value));
	}

	function getItem(key){		
		return JSON.parse(localStorage.getItem(key));
	}
})();