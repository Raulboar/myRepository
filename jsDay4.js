const students = require('./students.json');
const fs = require('fs'); // external library

/**
 * Write the fallowing functions:
 * 1. Get student by ID - use array.find
 * 2. Create a function that receives a student as a param and add's this student to our student's list
 * 3. Create a function that removes a student from the list based on it's ID; - array.findIndex +  array.s.....removes n elements from a specific position.
 * 4. Create a function that updates a student's first name and last name based on the student's id
 * 
 *Vlad T: Create a function that generally updates students props
 */

const listAllStudents = () => {
    console.log(students);
}

const writeStudentsToJSON = () => {
    fs.writeFile(
        'students.json',
        JSON.stringify(students, null, 4),
        (err) => {
            if (err) console.log(err);

            '[--d);
}

const getStudentIndexByID = (id) => {
    const found = students.findIndex(students => students.id === id);
    
    return found;
    // return students.find(students => students.id === id);
}

const addStudent = (item) => {
    const id = students.length + 1;
    if (!item.name) {
        return 'Name is required for item ' + id;
    }

    if (item.name.length < 3) {
        return 'Name is to short'
    }


    student.id = students.length + 1;
    students.push(student);

    return 'Item was saved';
};

const item1 = {
    "name": "Boar",
    "description": "Alex",
    "price": -21,
};

const item2 = {
    "name": "Do",
    "description": "Alex",
    "price": 21,
};

const resultAddItem1 = addItem(item1);
console.log(resultAddItem1);

const resultAddItem2 = addItem(item2);
console.log(resultAddItem2);

console.log(getStudent(4));

addStudent(newStudent);




// function Student(firstName, lastName, age, gender, cv, startYear, endYear, height, address, highSchool, highSchoolProfile, highSchoolLocations) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.age = age;
//     this.gender = gender;
//     this.cv = cv;
//     this.startYear = startYear;
//     this.endYear = endYear;
//     this.height = height;
//     this.address = address;
//     this.highSchool = highSchool;
//     this.highSchoolProfile = highSchoolProfile;
//     this.highSchoolLocations = highSchoolLocations;
// }

// students.push(new Student("Boar", "Daniel", 16, "masculin", false, 2023, 2027, "Cugir, Alexandru Sahia nr.24", "CNDP", "real", "Cugir"));

//console.log(students);

function deleteStudent(id) {
    const index = students.findIndex(students => students.id === id);
    students.splice(index, 1);
}

//deleteStudent(1,3);
//console.log(students);

function update(id, firstName, lastName) {
    const studentIndex = getStudentIndexByID(id);
    students[studentIndex].firstName = firstName;
    students[studentIndex].lastName = lastName;
}

update(1, 'dddsadsadsadsa', 'iiioohbidsa');

writeStudentsToJSON(students);
//console.log(students);