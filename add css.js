/* String  Number Boolean Oject Array
let fname = "John"; // String
console.log("Name:", fname);
const PI = 3.14; // Number
/*
// Number
let age = 30; // Number
let height = 175.5; // Number

fname = "Bob";
PI = 3.14159;
console.log("Name:", fname);
console.log("Age:", age);
console.log("Height:", height);

/*
+ = บวก
- = ลบ
* = คูณ
/ = หาร
% = หารเอาเศษ


let nn1 = '10';
let nn2 = '3';

let result1 = nn1 + nn2;
console.log("ผลบวก:", result1);

/**
 == เท่ากับ
 != ไม่เท่ากับ
 > มากกว่า
 < น้อยกว่า
 >= มากกว่าหรือเท่ากับ
 <= น้อยกว่าหรือเท่ากับ
 

 let n1 = 10
 let number2 = 20;
 let condition = n1 < number2;
 console.log("condition", condition)

 // if-else codition
 if (number1 > number2) {
    console.log("number is greater than or eqal to number2");
 } else if (number1 < number2) {
    console.log("this is else if");
 } else {
    console.log('this is else')
 }

 /**
  Grade
  >= 80 เป็นเกรด A
    >= 70 เป็นเกรด B
    >= 60 เป็นเกรด C
    >= 50 เป็นเกรด D
    < 50 เป็นเกรด F
  
 let score =75;
 
if (score >= 80) {
    console.log('Grade A');
} else if (score >= 70) {
    console.log('Grade B');
} else if (score >= 60) {
    console.log('Grade C');
} else if (score >= 50) {
    console.log('Grade D');
} else {
    console.log('Grade F');
}

/*
&& และ
|| หรือ
! not หรือ ไม่


Grade
let s1 = 5;
let s2 = 10;

let condition1 = (s1 > 0 && s2 > 0); //true && false
console.log("condition1:", condition1); 

let age = 25
let gender = "female"
if (age >= 18 && gender =="female" || age >=20) {
    console.log("คุณสามารถเข้าร่วมกิจกรรมได้")
}

let number1 = 5

if (number1 % 2 == 0) {
    console.log("เป็นเลขคู่")
} else {
    console.log("เป็นเลขคี่")
}

/**
 while
 for
 

 let conter = 0;
 while (conter <=5) { //true
conter = conter +1;
console.log("while:", conter);
 }
 
 for (let i = 0; i <=4; i = i +1) {
    console.log("for:",i);
 }
 */
/*
Function
*/

let score1 = 10
let score2 = 80

function calculation_grade(score){
    if (score >=80){
    grade = 'A'
    }else if (score >= 70){
    grade = 'B'
    }else if (score >=60){
    grade = 'C'
    }else if (score >=50){
    grade = 'D'
    }else {
    grade = 'F'
}
return grade
}
/*
//เรียกใช้ฟังก์ชัน calculation_grade เพื่อหาค่าเกรดจากคะแนนที่กำหนด
let grade1 = calculation_grade(score1)
let grade2 = calculation_grade(score2)
console.log('Score1: ', + score1 + ',Grade:' + grade1)
console.log('Score2: ', + score2 + ',Grade:' + grade2)

/*
array
*/
/*
let scores = [90, 80 ,70 ,60 ,50];

for (let i = 0; i < score.length; i++){
    console.log(`Score ${i+1}: ${scores[i]}`);
}

/* scores[0] = scores[0] * 2;
scores[1] = scores[1] * 2;

scores = scores.map((s) => {
    return s - 10;
})
scores.forEach((s) => {
    //console.log('score:', s);
    console.log(`Score: ${s}`)
})


//map, filter

let scores = let scores = [90, 80 ,70 ,60 ,50];
let newScores = []

for(let i =: i < scores.length; i++){
    console.log(score[i]);
    if (score[i] >= 60){
        newScores.push(scores[i]);
    }
}

let newScores = scores.filter(function(score){
    return score >=70;
})

newScores.forEach((ns) => {
    console.log('new score:' +ns);
})

/*
object function
*/

let student = [
    {name: "John",age: 20, grade: "A"},
    {name: "Jane",age: 22, grade: "B"},
    {name: "Jim",age: 21, grade: "C"},
]
console.log('Student',students[0]);

let student = student.find((s) => {
    if (s.name === "Jim"){
        return true;
    }else {
        return false;
    }
    // return s.name === "Jane";
})

let dubblescoreStudents = student.map((s) => {
    s.age = s.age * 2;
    return s;
});

let highGradeStudents = students.filter((s) => {
    return s.grade === 'A'
})

console.log('Student ',student);
console.log('Dubble Score Students'dubblescoreStudents);
console.log('High Grade Students'hightGradeStudents);
