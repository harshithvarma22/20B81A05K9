const express = require('express');
const axios = require('axios');
const app = express();

app.listen(8008);


function bubbleSort(array) {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }
    return array
}

app.get('/numbers', async (req, res) => {
    try {
        const queryParams = Object.values(req.query);
        const mainArray = [];
        for (const e of queryParams[0]) {
            try {
                const response = await axios.get(e);
                const nums = response.data.numbers;

                for (let j = 0; j < nums.length; j++) {
                    if( !mainArray.includes(nums[j]) ) mainArray.push(nums[j]);
                }
            } catch (error) {
                console.error(`Error fetching ${e}:`, error.message);
            }
        }

        const result = bubbleSort(mainArray);
        let obj = {
            "numbers" : result
        }
        res.send(obj);
    } catch (error) {
        console.error('An error occurred:', error.message);
        res.status(500).send('Internal Server Error');
 }
});