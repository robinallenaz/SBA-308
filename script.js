// Course information
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// Assignment group

const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15", // Future date for testing
      points_possible: 500,
    },
  ],
};

//learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];
//Function to check if course id of assignment group correct. Throws an error if not.

function getLearnerData(course, assignmentGroup, submissions) {
    // Validate course_id
    if (assignmentGroup.course_id !== course.id) {
      throw new Error("Invalid assignment group: course_id does not match.");
    }

//Declaring an empty object to store results

const results = {};

// Process each submission using a for loop (1 loop type)
for (const submission of submissions) {
    const assignment = assignmentGroup.assignments.find(a => a.id === submission.assignment_id);

 // Check if assignment exists and is due
 if (assignment && new Date(assignment.due_at) >= new Date()) {
    const learnerId = submission.learner_id;
    const pointsPossible = assignment.points_possible;
    continue;
 }

 // Calculate score
 let score = submission.submission.score;
 if (new Date(submission.submission.submitted_at) > new Date(assignment.due_at)) {
   score -= pointsPossible * 0.1; // Deduct 10% for late submission
 }

 // Calculate percentage
 const percentage = (score / pointsPossible);

 // Store the percentage score
 results[learnerId].assignments[assignment.id] = percentage;
 results[learnerId].totalScore += score;
 results[learnerId].totalPoints += pointsPossible;
}
}
 // Calculate average for each learner
 for (const learnerId in results) {
    const learnerData = results[learnerId];
    learnerData.avg = learnerData.totalPoints > 0 ? (learnerData.totalScore / learnerData.totalPoints) : 0;
  }
  return Object.values(results).map(learner => {
    const { id, avg, assignments } = learner;
    return {
      id,
      avg,
      ...assignments
    };
  });
}
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);