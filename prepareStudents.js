const fs = require('fs');

let nume = ["Boar", "Craciun", "Miclea", "Dicu", "Dan", "Popa", "Pereanu", "Pasca", "Presecan", "Ovidiu", "Halalai", "Crisan", "Longodor", "Blaga", "Paraschiv"];
let prenume = ["Alex", "Raul", "Daniel", "Robert", "Razvan", "Marius", "Adelina", "Ana", "Iuia", "Andrei", "Mihai", "Andreea", "Dragos", "Alexandra", "Ioana"];
let gender = ["masculin", "masculin", "mascuin", "masculin", "masculin", "masculin", "feminin", "feminin", "feminin", "masculin", "masculin", "feminin", "masculin", "feminin", "feminin"];
let varsta = [21, 19, 20, 21, 21, 20, 20, 20, 20, 21, 21, 20, 21, 20, 21];
let highSchool = ["CNDP", "CNDP", "IDL", "HCC", "CNDP", "HCC", "HCC", "IDL", "CNDP", "HCC", "IDL", "CNDP", "CNDP", "HCC", "IDL"];
let highSchoolLocation = ["Cugir", "Cugir", "Cugir", "Alba-Iulia", "Cugir", "Alba-Iulia", "Alba-Iulia", "Cugir", "Cugir", "Alba-Iulia", "Cugir", "Cugir", "Cugir", "Alba-Iulia", "Cugir"];
let profil = []; // a new Array - Empty
for (let i = 0; i < nume.length; i++) {
    let x = Math.random();
    if (x < 0.5) {
        profil[i] = "human";
    } else {
        profil[i] = "real";
    }
}
let height = [];
for (let i = 0; i < nume.length; i++) {
    height[i] = Math.floor(((Math.random() * 40) + 160)) / 100;
}
let cv = [true, true, false, true, true, true, true, false, true, false, false, false, true, true, false];
let students = []; // a new Array - Empty

for (let i = 0; i < nume.length; i++) {
    var student = {
        prenume: prenume[i],
        nume: nume[i],
        varsta: varsta[i],
        inaltime: height[i],
        gender: gender[i],
        liceu: { //Object in object;
            numeLiceu: highSchool[i],
            profil: profil[i],
            oras: highSchoolLocation[i],
        },

        cv: cv[i],

    };

    students.push(student)
}

students.forEach((student, index) => { //(**)Secventa copiata din studentsEntry.js
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
}) //(**)Secventa copiata din studentsEntry.js


//console.log(student);

fs.writeFile(
    'students.json',
    JSON.stringify(students, null, 4),
    (err) => {
        if (err) console.log(err);

        console.log('The file has been saved!');
    }
);


function girlsOver180m(students) {
    let nume = []; // a new array- Empty
    let elev = 0;
    
    for (let i = 0; i < students.length; i++) {
        if (students[i].gender === "feminin" && students[i].inaltime > 1.80) {
            nume.push(students[i].nume + " " + students[i].prenume);
            elev++;
        }
    }
    if (elev === 0)
        nume.push("Nu exista!");

    return nume;


}
console.log("Fetele care au inaltimea peste 180m: ");
console.log(girlsOver180m(students));

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
console.log(real(students));