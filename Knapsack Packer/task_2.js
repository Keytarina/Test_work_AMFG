//
//The program was implemented by Yakubych Katerina 
//

let value = [60, 100, 120];
let weights = [10, 20, 30];
let capacity = 50;

console.log("Input:	value:", value);
console.log("		weights:", weights);
console.log("		capacity:", capacity);

function dynamicProgramming(value, weights, capacity) {  //Dynamic programming method

	let k = weights.length; // amount of items
	let A = new Array; // create the array
  
	for (let i = 0; i <= capacity; i++) 
	{	
	  A[i] = new Array(k + 1).fill(0); // fill the array with zeros
	}
  
	for (let i = 1; i <= k; i++) {     // for each k, we iterate over all capacities
	  for (let j = 1; j <= capacity; j++) 
	  {         
		if (weights[i - 1] <= j) // if the item k has got into the backpack 
		{ 
		  A[j][i] = Math.max(A[j][i - 1], A[j - weights[i - 1]][i - 1] + value[i-1]);  // add the max value to the array
		} 
		else   // if the item k did not get into the backpack
		{
		  A[j][i] = A[j][i - 1]; // take the value of previous element of the array
		}
	  }
	  
	}

	console.log('-------------------------------');
	
	return 'Output: maximum value that can be obtained: ' + A[capacity][k];
}

console.log(dynamicProgramming(value, weights, capacity));


	// function findItems(capacity, k) { //find the set of items included in the backpack using a recursive function
	// 	let items = []; // create array for answer

	// if (A[capacity][k] == 0) return; //check items for availability

	// 	if (A[capacity][k - 1] == A[capacity][k]) 
	// 	{
	// 		findItems(capacity, k - 1);
	// 	} else if (capacity - weights[k] > 0, k - 1 > 0) 
	// 	{ 
	// 		findItems(capacity - weights[k], k - 1);
	// 		items.push(k);
	// 	}

	// 	return items;
	// }

	// return findItems(capacity, k);
