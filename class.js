class Student {
    constructor(name, marks) {
        this.name = name;
        this.marks = marks;
    }

    getGrade() {
        if (this.marks >= 80) return "A";
        if (this.marks >= 70) return "B";
        if (this.marks >= 60) return "C";
        return "F";
    }
}

const students = [
    new Student("Ali", 85),
    new Student("Sara", 72),
    new Student("Ahmed", 45),
    new Student("Ayesha", 91),
    new Student("Hamza", 58),
    new Student("Zain", 67)
];

const passing = students.filter(s => s.marks >= 50);

const names = passing.map(s => s.name);

const average =
    students.reduce((sum, s) => sum + s.marks, 0) / students.length;

students.sort((a, b) => b.marks - a.marks);

const [topScorer] = students;

students.forEach(s => {
    const result = s.marks >= 50 ? "Pass" : "Fail";

    console.log(
        s.name,
        s.marks,
        s.getGrade(),
        result
    );
});

console.log("Passing Names:", names);
console.log("Class Average:", average);
console.log("Top Scorer:", topScorer.name);