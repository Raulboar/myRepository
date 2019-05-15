const students = require('./students.json');
const fs = require('fs');

for (let i = 0; i < students.length; i++) {
    students[i].startYear = 2019;
}

students.forEach((student, index) => {
    student.endYear = 2023;

    student.address = {
        country: 'ROMANIA',
        address: 'Some street name, no. ' + index,
        zipCode: index % 2 === 0 ? '785678' : null, // ? - if; left of ':'if true ; right of ':' false
    }

    student.fullAddress =
        Object.keys(student.address) // obtain all object propreties
        .map(key => {
            return student.address[key];
        }) // obtain values
        .filter(value => !!value)
        .join(', ');
})

fs.writeFile('students.json',
         

      'students.json', 
    JSON.stringify(students, null, 4), 
    (err) => {
      if (err) console.log(err);
       
        console.log('The file has been saved!');
    }
);


// if (1) {
// // intra in if
// }

// if ('vlad') {
// // intra in if
// }

// if ('') {
//     // nu intra in if
// }

// if (undefined) {
//  // nu intra
// }

/**
 * 1. For each student add gender
 * 2. For each student add high school (title, location, profile (real/human)) into educations ARRAY
 *    --for each student create a random number (0, 1)
 *    --if number is closer to 1 the high school is real
 *    --if number is closer to 0 => human
 * 3. For each student add height 1.60 - 2.00 m with random - use math.floor also
 * 4. Write a function that returns all the girls that have over 1.80m
 * 5. Write a function that returns all the students that finished a real high school
 */

