const datePicker = document.getElementById('datePicker');
const darkModeToggle = document.getElementById('darkModeToggle');
const errorMessage = document.getElementById('errorMessage');
const quadrants = [
  { courseSelect: document.getElementById('courseSelect1'), lessonCard: document.getElementById('lessonCard1'), pageSelect: document.getElementById('pageSelect1'), prevPage: document.getElementById('prevPage1'), nextPage: document.getElementById('nextPage1'), lessons: [], currentPage: 1 },
  { courseSelect: document.getElementById('courseSelect2'), lessonCard: document.getElementById('lessonCard2'), pageSelect: document.getElementById('pageSelect2'), prevPage: document.getElementById('prevPage2'), nextPage: document.getElementById('nextPage2'), lessons: [], currentPage: 1 },
  { courseSelect: document.getElementById('courseSelect3'), lessonCard: document.getElementById('lessonCard3'), pageSelect: document.getElementById('pageSelect3'), prevPage: document.getElementById('prevPage3'), nextPage: document.getElementById('nextPage3'), lessons: [], currentPage: 1 },
  { courseSelect: document.getElementById('courseSelect4'), lessonCard: document.getElementById('lessonCard4'), pageSelect: document.getElementById('pageSelect4'), prevPage: document.getElementById('prevPage4'), nextPage: document.getElementById('nextPage4'), lessons: [], currentPage: 1 }
];

// Semester start date and holidays (configurable)
const SEMESTER_START = new Date('2025-09-01');
const HOLIDAYS = [
  '2025-11-27', // Thanksgiving
  '2025-11-28', // Day after Thanksgiving
  '2025-12-24', // Winter break (simplified)
  '2025-12-25',
  '2025-12-31',
  '2026-01-01'
];

// Initialize dark mode from localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  darkModeToggle.checked = true;
}

// Dark mode toggle event
darkModeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
});

// Calculate lesson day from selected date (1–40)
function getLessonDay(selectedDate) {
  const start = new Date(SEMESTER_START);
  let days = 0;
  let current = new Date(start);

  while (current <= selectedDate) {
    const isWeekday = current.getDay() !== 0 && current.getDay() !== 6;
    const isNotHoliday = !HOLIDAYS.includes(current.toISOString().split('T')[0]);
    if (isWeekday && isNotHoliday) {
      days++;
    }
    current.setDate(current.getDate() + 1);
  }

  // Cap at 40 lessons per semester
  return Math.min(Math.max(1, days), 40);
}

function loadCSV(quadrant, file) {
  quadrant.lessonCard.innerHTML = '<p class="text-center text-gray-500">Loading...</p>';
  console.log(`Starting to load CSV for quadrant: ${file}`);
  Papa.parse(file, {
    download: true,
    header: true,
    complete: function(results) {
      console.log(`CSV parsing complete for ${file}. Total rows received: ${results.data.length}`);
      quadrant.lessons = results.data.filter((lesson, index) => {
        const isValid = lesson.Day && lesson['Strand/Standard'] && lesson.Title && lesson.Concepts && lesson.Starter && lesson.Description;
        console.log(`Row ${index + 1}: ${isValid ? 'Valid' : 'Invalid'}, Data: ${JSON.stringify(lesson)}`);
        return isValid;
      });
      console.log(`Filtered valid lessons: ${quadrant.lessons.length}`);
      if (quadrant.lessons.length === 0) {
        showError(quadrant, 'No valid lessons found in the CSV file.');
        return;
      }
      populatePageSelect(quadrant);
      renderLesson(quadrant);
    },
    error: function(error) {
      console.error(`Error loading CSV: ${error.message}`);
      showError(quadrant, 'Error loading CSV file. Please check the file path or server configuration.');
    }
  });
}

function showError(quadrant, message) {
  quadrant.lessonCard.innerHTML = '';
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
  quadrant.pageSelect.innerHTML = '';
  quadrant.prevPage.disabled = true;
  quadrant.nextPage.disabled = true;
}

function populatePageSelect(quadrant) {
  quadrant.pageSelect.innerHTML = '';
  quadrant.lessons.forEach((_, index) => {
    const option = document.createElement('option');
    option.value = index + 1;
    option.textContent = `Lesson ${index + 1}`;
    quadrant.pageSelect.appendChild(option);
  });
  quadrant.pageSelect.value = quadrant.currentPage;
}

function renderLesson(quadrant) {
  const lesson = quadrant.lessons[quadrant.currentPage - 1];
  if (!lesson) {
    showError(quadrant, 'No lesson found for this page.');
    return;
  }

  quadrant.lessonCard.innerHTML = `
    <div class="border-l-4 border-blue-500 pl-4">
      <h2 class="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Day ${lesson.Day}: ${lesson.Title}</h2>
      <p class="text-gray-600"><strong>Strand/Standard:</strong> ${lesson['Strand/Standard']}</p>
      <p class="text-gray-600 mt-2"><strong>Concepts:</strong> ${lesson.Concepts}</p>
      <p class="text-gray-600 mt-2"><strong>Starter:</strong> ${lesson.Starter}</p>
      <p class="text-gray-600 mt-2"><strong>Description:</strong> ${lesson.Description}</p>
    </div>
  `;

  quadrant.prevPage.disabled = quadrant.currentPage === 1;
  quadrant.nextPage.disabled = quadrant.currentPage === quadrant.lessons.length;
  quadrant.pageSelect.value = quadrant.currentPage;
}

function updateAllQuadrantsByDate() {
  const selectedDate = new Date(datePicker.value);
  if (!datePicker.value) return;
  const lessonDay = getLessonDay(selectedDate);
  quadrants.forEach(quadrant => {
    quadrant.currentPage = lessonDay;
    if (quadrant.lessons.length > 0) {
      populatePageSelect(quadrant);
      renderLesson(quadrant);
    }
  });
}

// Initialize quadrants
quadrants.forEach(quadrant => {
  loadCSV(quadrant, quadrant.courseSelect.value);
  quadrant.courseSelect.addEventListener('change', () => {
    loadCSV(quadrant, quadrant.courseSelect.value);
  });
  quadrant.pageSelect.addEventListener('change', () => {
    quadrant.currentPage = parseInt(quadrant.pageSelect.value);
    renderLesson(quadrant);
  });
  quadrant.prevPage.addEventListener('click', () => {
    if (quadrant.currentPage > 1) {
      quadrant.currentPage--;
      renderLesson(quadrant);
    }
  });
  quadrant.nextPage.addEventListener('click', () => {
    if (quadrant.currentPage < quadrant.lessons.length) {
      quadrant.currentPage++;
      renderLesson(quadrant);
    }
  });
});

// Date picker event
datePicker.addEventListener('change', updateAllQuadrantsByDate);

// Set default date to today
datePicker.value = new Date().toISOString().split('T')[0];
updateAllQuadrantsByDate();