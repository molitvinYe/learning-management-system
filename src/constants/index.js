export const validate = {
  emailValidate: value => /\S+@\S+\.\S+/.test(value),
  passwordValidate: value => value.length >= 8 && value.length <= 12,
  ticketValidate: value => value.length === 6,
  emptyValidate: value => value.length !== 0,
  courseValidate: value => value.length === 1 && value <= 6,
  groupValidate: value => value.length === 1 && value <= 3
}

export const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const httpUrl = 'http://localhost:8080/moli/a/rest'

export const facultyListUrl = `${httpUrl}/faculty/all`

export const specialityListUrl = `${httpUrl}/speciality/all`

export const studentUrl = `${httpUrl}/student`

export const teacherUrl = `${httpUrl}/teacher`

export const subjectUrl = `${httpUrl}/subject`

export const testUrl = `${httpUrl}/test/subject`

export const testListBySubject = `${httpUrl}/test/subject`

export const subjectsListUrl = `${httpUrl}/subject/all`

export const questionUrl = `${httpUrl}/question`

export const resultUrl = `${httpUrl}/result`