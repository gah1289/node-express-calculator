function mean(nums) {
	return nums.reduce((a, b) => a + b) / nums.length;
}

function median(nums) {
	nums = nums.sort(function(a, b) {
		return a - b;
	});
	// sort integers in correct order, not alphabetically

	let i = Math.floor(nums.length / 2);
	if (nums.length % 2 === 1) {
		return nums[i];
	}
	else {
		return (nums[i - 1] + nums[i]) / 2;
	}
}

function mode(nums) {
	let obj = {};
	nums.forEach((num) => (obj[num] = (obj[num] || 0) + 1));
	let mode = Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
	return mode;
}

module.exports = { mean, median, mode };
