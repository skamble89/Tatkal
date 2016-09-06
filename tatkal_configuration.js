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

	function renderConfig(div){	
		var html = '<div><label for="from">From Station</label><input id="from" type="text"/></div>'+
					'<div><label for="to">To Station</label><input id="to" type="text"/></div>'+
					'<div><label for="date">Date</label><input id="date" type="text" placeholder="dd-mm-yyyy"/></div>'+
					'<hr/>'+

					'<div><label for="train_no">Train No</label><input id="train_no" type="text"/></div>'+
					'<div><label for="class">Class</label><input id="class" type="text"/></div>'+
					'<hr/>'+

					'<div>'+
						'<label for="option_type">Payment Option</label>'+
						'<select id="option_type">'+
							'<option></option>'+
							'<option value="NETBANKING">Netbanking</option>'+
							'<option value="CREDIT_CARD">Credit Card</option>'+
							'<option value="DEBIT_CARD">Debit Card</option>'+
							'<option value="CASH_CARD">Cash card</option>'+
							'<option value="IRCTC_PREPAID">IRCTC Prepaid</option>'+
						'</select>'+
					'</div>'+
					'<div>'+
						'<label for="payment_option"></label>'+
						'<select id="payment_option"></select>'+
					'</div>';

		div.innerHTML = html;
	}

	function bindEvents(div){

	}

	function createContainer(){
		var div = document.createElement('div');
		div.style.position = 'absolute';
		div.style.top = '0';
		div.style.right = '0';
		div.style.height = '500px'
		div.style.width = '300px'
		div.style.backgroundColor = '#aaa';
		div.style.zIndex = '10000';
		document.body.appendChild(div);

		return div;
	}

	// setItem('from', 'PUNE JN - PUNE');
	// setItem('to', 'NAGPUR - NGP');
	// setItem('date', '09-09-2016');

	// setItem('train_no', '12129');
	// setItem('class', 'SL');

	// setItem('pax_details', {
	// 	passengers: [{
	// 		name: 'Saurabh Kamble',
	// 		age: '27',
	// 		gender: 'M'
	// 	}],
	// 	mobile: '9975132263'
	// });

	// setItem('option_type', 'DEBIT_CARD');
	// setItem('payment_option', '41')

	function setItem(key, value){
		localStorage.setItem(key, JSON.stringify(typeof value === 'object' ? value : {value: value}));
	}
})();