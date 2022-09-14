const express = require('express');
const ExpressError = require('./expressErrors');
const { mean, median, mode } = require('./calcFunctions');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function arrFromQuery(nums) {
	nums = nums[0].split(',');
	numArr = [];

	for (let [
		i,
		num
	] of nums.entries()) {
		num = parseInt(num);
		if (isNaN(num)) {
			throw new ExpressError(`${nums[i]} is not a number`, 400);
		}
		numArr.push(num);
	}
	console.log(numArr);
	return numArr;
}

const operations = {
	mean   : mean,
	median : median,
	mode   : mode
};

app.get('/:operation', (req, res) => {
	const operation = req.params.operation;
	const func = operations[operation];
	let nums = Object.values(req.query);
	nums = arrFromQuery(nums);
	let value = func(nums);
	let response = { operation, value };

	return res.json({ response: response });
});

app.use(function(err, req, res, next) {
	let status = err.status || 500;
	let message = err.message;

	return res.status(status).json({
		error : { message, status }
	});
});

app.listen(3000, () => {
	console.log('Server running on port 3000');
});
