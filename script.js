// [Previous code remains unchanged until quadrants initialization]

const quadrants = [
  { courseSelect: document.getElementById('courseSelect1'), lessonCard: document.getElementById('lessonCard1'), pageSelect: document.getElementById('pageSelect1'), prevPage: document.getElementById('prevPage1'), nextPage: document.getElementById('nextPage1'), lessons: [], currentPage: 1, defaultCourse: 'https://raw.githubusercontent.com/kappter/curriculabrowser/main/Yearbook_DigitalMedia1_LessonPlan.csv' },
  { courseSelect: document.getElementById('courseSelect2'), lessonCard: document.getElementById('lessonCard2'), pageSelect: document.getElementById('pageSelect2'), prevPage: document.getElementById('prevPage2'), nextPage: document.getElementById('nextPage2'), lessons: [], currentPage: 1, defaultCourse: 'https://raw.githubusercontent.com/kappter/curriculabrowser/main/GameDevelopment1_LessonPlan.csv' },
  { courseSelect: document.getElementById('courseSelect3'), lessonCard: document.getElementById('lessonCard3'), pageSelect: document.getElementById('pageSelect3'), prevPage: document.getElementById('prevPage3'), nextPage: document.getElementById('nextPage3'), lessons: [], currentPage: 1, defaultCourse: 'https://raw.githubusercontent.com/kappter/curriculabrowser/main/ComputerProgrammingAdvanced_LessonPlan.csv' },
  { courseSelect: document.getElementById('courseSelect4'), lessonCard: document.getElementById('lessonCard4'), pageSelect: document.getElementById('pageSelect4'), prevPage: document.getElementById('prevPage4'), nextPage: document.getElementById('nextPage4'), lessons: [], currentPage: 1, defaultCourse: 'https://raw.githubusercontent.com/kappter/curriculabrowser/main/Yearbook_DigitalMedia1_LessonPlan.csv' }
];

// [Rest of the previous code remains unchanged until updateAllQuadrantsByDate]

function updateAllQuadrantsByDate() {
  const selectedDate = new Date(datePicker.value);
  if (!datePicker.value) return;
  const lessonDay = getLessonDay(selectedDate);
  quadrants.forEach(quadrant => {
    quadrant.currentPage = lessonDay;
    if (quadrant.lessons.length > 0) {
      populatePageSelect(quadrant);
      renderLesson(quadrant);
      if (lessonDay === 40 && selectedDate > new Date(SEMESTER_START)) {
        quadrant.lessonCard.innerHTML += '<p class="text-yellow-600 dark:text-yellow-300 mt-2">Note: This date exceeds the 40-lesson plan. Displaying Lesson 40.</p>';
      }
    }
    // Preload specific courses for August 13
    if (selectedDate.toISOString().split('T')[0] === '2025-08-13') {
      quadrant.courseSelect.value = quadrant.defaultCourse;
      loadCSV(quadrant, quadrant.defaultCourse);
    }
  });
}

// [Rest of the code remains unchanged]

// Initialize quadrants
quadrants.forEach(quadrant => {
  loadCSV(quadrant, quadrant.defaultCourse); // Load default courses on startup
  quadrant.courseSelect.addEventListener('change', () => {
    loadCSV(quadrant, quadrant.courseSelect.value);
  });
  // [Rest of event listeners remain unchanged]
});

// Set default date to August 13 for testing
datePicker.value = '2025-08-13';
updateAllQuadrantsByDate();