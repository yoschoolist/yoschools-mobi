// GraphQL Queries for YoSchools Mobile App

export const AUTH_QUERIES = {
  LOGIN: `
    mutation Login($email: String!, $password: String!) {
      login(loginInput: { email: $email, password: $password }) {
        access_token
        refresh_token
        user {
          id
          email
          firstName
          lastName
          role
          profile {
            avatar
          }
        }
      }
    }
  `,
  
  REGISTER: `
    mutation Register($registerInput: RegisterDto!) {
      register(registerInput: $registerInput) {
        access_token
        refresh_token
        user {
          id
          email
          firstName
          lastName
          role
          profile {
            avatar
          }
        }
      }
    }
  `,
  
  ME: `
    query Me {
      me {
        id
        email
        firstName
        lastName
        role
        profile {
          avatar
        }
        createdAt
        updatedAt
      }
    }
  `,
  
  GET_USER_PROFILE: `
    query GetUserProfile {
      userProfile {
        id
        email
        name
        role
        avatarUrl
      }
    }
  `,
};

export const SCHOOL_QUERIES = {
  GET_SCHOOLS: `
    query GetSchools($limit: Int, $offset: Int) {
      schools(limit: $limit, offset: $offset) {
        id
        name
        address
        phone
        email
        logo
        description
        createdAt
        updatedAt
      }
    }
  `,
  
  GET_SCHOOL_BY_ID: `
    query GetSchoolById($id: ID!) {
      school(id: $id) {
        id
        name
        address
        phone
        email
        logo
        description
        createdAt
        updatedAt
      }
    }
  `,
};

export const STUDENT_QUERIES = {
  GET_STUDENTS: `
    query GetStudents($schoolId: ID, $limit: Int, $offset: Int) {
      students(schoolId: $schoolId, limit: $limit, offset: $offset) {
        id
        firstName
        lastName
        email
        dateOfBirth
        grade
        schoolId
        parentId
        avatar
        createdAt
        updatedAt
      }
    }
  `,
  
  GET_STUDENT_BY_ID: `
    query GetStudentById($id: ID!) {
      student(id: $id) {
        id
        firstName
        lastName
        email
        dateOfBirth
        grade
        schoolId
        parentId
        avatar
        createdAt
        updatedAt
      }
    }
  `,
};

export const TEACHER_QUERIES = {
  GET_TEACHERS: `
    query GetTeachers($schoolId: ID, $limit: Int, $offset: Int) {
      teachers(schoolId: $schoolId, limit: $limit, offset: $offset) {
        id
        firstName
        lastName
        email
        subjects
        schoolId
        avatar
        createdAt
        updatedAt
      }
    }
  `,
  
  GET_TEACHER_BY_ID: `
    query GetTeacherById($id: ID!) {
      teacher(id: $id) {
        id
        firstName
        lastName
        email
        subjects
        schoolId
        avatar
        createdAt
        updatedAt
      }
    }
  `,
};

export const COURSE_QUERIES = {
  GET_COURSES: `
    query GetCourses($schoolId: ID, $teacherId: ID, $limit: Int, $offset: Int) {
      courses(schoolId: $schoolId, teacherId: $teacherId, limit: $limit, offset: $offset) {
        id
        name
        description
        subject
        grade
        teacherId
        schoolId
        createdAt
        updatedAt
      }
    }
  `,
  
  GET_COURSE_BY_ID: `
    query GetCourseById($id: ID!) {
      course(id: $id) {
        id
        name
        description
        subject
        grade
        teacherId
        schoolId
        createdAt
        updatedAt
      }
    }
  `,
};

export const ASSIGNMENT_QUERIES = {
  GET_ASSIGNMENTS: `
    query GetAssignments($courseId: ID, $studentId: ID, $limit: Int, $offset: Int) {
      assignments(courseId: $courseId, studentId: $studentId, limit: $limit, offset: $offset) {
        id
        title
        description
        dueDate
        courseId
        teacherId
        createdAt
        updatedAt
      }
    }
  `,
  
  GET_ASSIGNMENT_BY_ID: `
    query GetAssignmentById($id: ID!) {
      assignment(id: $id) {
        id
        title
        description
        dueDate
        courseId
        teacherId
        createdAt
        updatedAt
      }
    }
  `,
};

export const GRADE_QUERIES = {
  GET_GRADES: `
    query GetGrades($studentId: ID, $assignmentId: ID, $limit: Int, $offset: Int) {
      grades(studentId: $studentId, assignmentId: $assignmentId, limit: $limit, offset: $offset) {
        id
        studentId
        assignmentId
        score
        maxScore
        feedback
        createdAt
        updatedAt
      }
    }
  `,
};