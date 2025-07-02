// configuration for form validation: array for each field will contain the validation that field will go through
export type ValidationRule = "isRequired" | "isEmailFormat";
const VALIDATION_CONFIG : Record<string, ValidationRule[]> = {
    "name": ["isRequired"],
    "email": ["isRequired", "isEmailFormat"],
    "date": ["isRequired"],
    "doctor": ["isRequired"],
    "slot": ["isRequired"],
    "purpose": [],
}

// doctor list
const DOCS = [
  "Aarya Sharma",
  "Rohan Mehta",
  "Meera Nair",
  "Vihaan Kapoor",
  "Kavya Sinha",
  "Arjun Patel",
  "Isha Reddy",
  "Dev Malhotra",
  "Ananya Iyer",
  "Neil Deshmukh",
  "Tara Joshi",
  "Kunal Bansal",
  "Riya Choudhury",
  "Yash Verma",
  "Sneha Bhatt",
  "Aryan Singh",
  "Pooja Das",
  "Rahul Jain",
  "Nikita Roy",
  "Aditya Chauhan"
];

// global variables
type slot = "10:00"| "11:00"| "12:00"| "1:00"
const SLOTS : slot[]= ["10:00", "11:00", "12:00", "1:00"];

export { VALIDATION_CONFIG, DOCS, SLOTS };