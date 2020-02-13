const calc_btn = document.querySelector('.form-group');
let loading = document.querySelector('.loading');
let results = document.querySelector('.result');
const errorMsg = document.querySelector('.errorMsg');

calc_btn.addEventListener('submit', showloading);

function showloading(e) {
	loading.style.display = 'block';
	results.style.display = 'none';

	setTimeout(calc_result, 3000);
	e.preventDefault();
}

function calc_result() {
	const amount = document.querySelector('#loan-amount');
	const interest = document.querySelector('#interest');
	const years = document.querySelector('#Years');
	const monthlyPayment = document.querySelector('.monthly-payment');
	const totalPayment = document.querySelector('.total-payment');
	const totalInterest = document.querySelector('.total-interest');

	const calculatedInterest = parseFloat(interest.value) / 100 / 12; //rate
	const calculatedPayments = parseFloat(years.value) * 12; //time
	const principal = parseFloat(amount.value); //principal amount

	// Calculations
	//Fixed Monthly payment
	const x = Math.pow(1 + calculatedInterest, calculatedPayments);
	const monthly = principal * x * calculatedInterest / (x - 1);

	if (isFinite(monthly)) {
		monthlyPayment.textContent = monthly.toFixed(2);
		totalPayment.textContent = (monthly * calculatedPayments).toFixed(2);
		totalInterest.innerText = (monthly * calculatedPayments - principal).toFixed(2);

		loading.style.display = 'none';
		results.style.display = 'block';
	} else {
		loading.style.display = 'none';
		results.style.display = 'none';
		//show error
		errorMsg.style.display = 'block';

		//hide after 3 seconds
		setTimeout(hideError, 3000);
	}
}
function hideError() {
	errorMsg.style.display = 'none';
}
