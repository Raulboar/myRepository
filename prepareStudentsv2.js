const fs = require('fs');
const firstNames = ["Boar", "Craciun", "Miclea", "Dicu", "Dan", "Popa", "Pereanu", "Pasca", "Presecan", "Ovidiu", "Halalai", "Crisan", "Longodor", "Blaga", "Paraschiv"];
const lastNames = ["Alex", "Raul", "Daniel", "Robert", "Razvan", "Marius", "Adelina", "Ana", "Iuia", "Andrei", "Mihai", "Andreea", "Dragos", "Alexandra", "Ioana"];
const genders = ["masculin", "masculin", "mascuin", "masculin", "masculin", "masculin", "feminin", "feminin", "feminin", "masculin", "masculin", "feminin", "masculin", "feminin", "feminin"];
const ages = [21, 19, 20, 21, 21, 20, 20, 20, 20, 21, 21, 20, 21, 20, 21];
const highSchools = ["CNDP", "CNDP", "IDL", "HCC", "CNDP", "HCC", "HCC", "IDL", "CNDP", "HCC", "IDL", "CNDP", "CNDP", "HCC", "IDL"];
const highSchoolLocations = ["Cugir", "Cugir", "Cugir", "Alba-Iulia", "Cugir", "Alba-Iulia", "Alba-Iulia", "Cugir", "Cugir", "Alba-Iulia", "Cugir", "Cugir", "Cugir", "Alba-Iulia", "Cugir"];
const cvs = [true, true, false, true, true, true, true, false, true, false, false, false, true, true, false];

let students = [];

firstNames.forEach((element, index) => {
    const highSchoolProfile =  Math.random() < 0.5
        ? 'human'
        : 'real';

    const height = Math.floor(((Math.random() * 40) + 160)) / 100;

    const address = {
        country: 'ROMANIA',
        address: 'Some street name, no. ' + index,
        zipCode: index % 2 === 0 ? '785678' : null, // ? - if; left of ':'if true ; right of ':' false
    }

    const fullAddress =
        Object.keys(address) // obtain all object propreties
        .map(key => {
            return address[key];
        }) // obtain values
        .filter(value => !!value)
        .join(', ');

    var student = {
        id: index + 1,
        firstName: firstNames[index], // firstNames[index] could be replaced with element form forEach
        lastName: lastNames[index],
        age: ages[index],
        gender: genders[index],
        cv: cvs[index],
        startYear: 2019,
        endYear: 2023,
        height: height,
        address: address,
        fullAddress: fullAddress,
        // ToDo need to change 
        highSchool: { //Object in object;
            name: highSchools[index],
            highSchoolProfile: highSchoolProfile,
            city: highSchoolLocations[index],
        },
    };

    students.push(student)
});

// for (let i = 0; i < nume.length; i++) {
//     const theElement = nume[i];
//     let x = Math.random();
//     if (x < 0.5) {
//         profil[i] = "human";
//     } else {
//         profil[i] = "real";
//     }
// }
// let height = [];
// for (let i = 0; i < nume.length; i++) {
//     height[i] = Math.floor(((Math.random() * 40) + 160)) / 100;
// }
// let students = []; // a new Array - Empty
// for (let i = 0; i < nume.length; i++) {
//     var student = {
//         prenume: prenume[i],
//         nume: nume[i],
//         varsta: varsta[i],
//         inaltime: height[i],
//         gender: gender[i],
//         liceu: { //Object in object;
//             numeLiceu: highSchool[i],
//             profil: profil[i],
//             oras: highSchoolLocation[i],
//         },
//         cv: cv[i],
//     };
//     students.push(student)
// }
// students.forEach((student, index) => { //(**)Secventa copiata din studentsEntry.js
//     student.endYear = 2023;
//     student.address = {
//         country: 'ROMANIA',
//         address: 'Some street name, no. ' + index,
//         zipCode: index % 2 === 0 ? '785678' : null, // ? - if; left of ':'if true ; right of ':' false
//     }
//     student.fullAddress =
//         Object.keys(student.address) // obtain all object propreties
//         .map(key => {
//             return student.address[key];
//         }) // obtain values
//         .filter(value => !!value)
//         .join(', ');
// }) //(**)Secventa copiata din studentsEntry.js

const writeStudentsToJSON = () => {
    fs.writeFile(
        'students.json',
        JSON.stringify(students, null, 4),
        (err) => {
            if (err) console.log(err);
    
            console.log('The file has been saved!');
        }
    );
}

/** 
 * Return all the girls in our group that have over 1.80 height
 * Return an array 
 * Observations: Could be empty
*/
const getGirlsOver180m = () => {
    const filterdGirls = students.filter((student) => {
        return !!(student.gender === 'feminin' && student.height > 1.80);
        // return student.gender === 'feminin' && student.height > 1.80
        //     ?  true
        //     :  false;
    });

    return filterdGirls;
}


// function girlsOver180m(students) {
//     let nume = []; // a new array- Empty
//     let elev = 0;
    
//     for (let i = 0; i < students.length; i++) {
//         if (students[i].gender === "feminin" && students[i].inaltime > 1.80) {
//             nume.push(students[i].nume + " " + students[i].prenume);
//             elev++;
//         }
//     }
//     if (elev === 0)
//         nume.push("Nu exista!");

//     return nume;
// }
console.log("Fetele care au inaltimea peste 180m: ");
console.log(getGirlsOver180m());

function real(students) {
    let nume = []; // a new array- Empty
    let elev = 0;
    for (let i = 0; i < students.length; i++) {
        if (students[i].liceu.profil === "real") {
            nume.push(students[i].nume + " " + students[i].prenume);
            elev++;
        }

    }
    if (elev === 0)
        nume.push("Nu exista elevi care au terminat profilul real.");
    return nume;
}

console.log("Elevii care au absolvit un profil real: ");
// console.log(real(students));

writeStudentsToJSON();

/**
 * Write the fallowing functions:
 * 1. Get student by ID - use array.find
 * 2. Create a function that receives a student as a param and add's this student to our student's list
 * 3. Create a function that removes a student from the list based on it's ID; - array.findIndex +  array.s.....removes n elements from a specific position.
 * 4. Create a function that updates a student's first name and last name
 * 
 *Vlad T: Create a function that generally updates students props
 */


 