const datePicker = document.getElementById('datePicker');
const darkModeToggle = document.getElementById('darkModeToggle');
const errorMessage = document.getElementById('errorMessage');
const carouselModal = document.getElementById('carouselModal');
const carouselTitle = document.getElementById('carouselTitle');
const carouselContent = document.getElementById('carouselContent');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const closeCarousel = document.getElementById('closeCarousel');
const standardModal = document.getElementById('standardModal');
const standardTitle = document.getElementById('standardTitle');
const standardContent = document.getElementById('standardContent');
const standardPrev = document.getElementById('standardPrev');
const standardNext = document.getElementById('standardNext');
const closeStandard = document.getElementById('closeStandard');

const quadrants = [
  { courseSelect: document.getElementById('courseSelect1'), lessonCard: document.getElementById('lessonCard1'), pageSelect: document.getElementById('pageSelect1'), prevPage: document.getElementById('prevPage1'), nextPage: document.getElementById('nextPage1'), lessons: [], currentPage: 1 },
  { courseSelect: document.getElementById('courseSelect2'), lessonCard: document.getElementById('lessonCard2'), pageSelect: document.getElementById('pageSelect2'), prevPage: document.getElementById('prevPage2'), nextPage: document.getElementById('nextPage2'), lessons: [], currentPage: 1 },
  { courseSelect: document.getElementById('courseSelect3'), lessonCard: document.getElementById('lessonCard3'), pageSelect: document.getElementById('pageSelect3'), prevPage: document.getElementById('prevPage3'), nextPage: document.getElementById('nextPage3'), lessons: [], currentPage: 1 },
  { courseSelect: document.getElementById('courseSelect4'), lessonCard: document.getElementById('lessonCard4'), pageSelect: document.getElementById('pageSelect4'), prevPage: document.getElementById('prevPage4'), nextPage: document.getElementById('nextPage4'), lessons: [], currentPage: 1 }
];

// Semester start date and holidays
const SEMESTER_START = new Date('2025-09-01');
const HOLIDAYS = [
  '2025-11-27', // Thanksgiving
  '2025-11-28', // Day after Thanksgiving
  '2025-12-24', // Winter break
  '2025-12-25',
  '2025-12-31',
  '2026-01-01'
];

// Initialize dark mode
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  darkModeToggle.checked = true;
}

darkModeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
});

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

  return Math.min(Math.max(1, days), 40); // Cap at 40
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
      <h2 class="day-title text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2" data-quadrant="${quadrant.courseSelect.id}">${lesson.Day}: ${lesson.Title}</h2>
      <p class="text-gray-600 dark:text-gray-100"><strong>Strand/Standard:</strong> <span class="standard-link" data-quadrant="${quadrant.courseSelect.id}" data-standard="${lesson['Strand/Standard']}">${lesson['Strand/Standard']}</span></p>
      <p class="text-gray-600 dark:text-gray-100 mt-2"><strong>Concepts:</strong> ${lesson.Concepts}</p>
      <p class="text-gray-600 dark:text-gray-100 mt-2"><strong>Starter:</strong> ${lesson.Starter}</p>
      <p class="text-gray-600 dark:text-gray-100 text-base sm:text-lg mt-2"><strong>Description:</strong> ${lesson.Description}</p>
    </div>
  `;

  quadrant.prevPage.disabled = quadrant.currentPage === 1;
  quadrant.nextPage.disabled = quadrant.currentPage === quadrant.lessons.length;

  quadrant.lessonCard.querySelector('.day-title').addEventListener('click', () => {
    openCarousel(quadrant, quadrant.currentPage);
  });

  const standardLink = quadrant.lessonCard.querySelector('.standard-link');
  if (standardLink) {
    standardLink.addEventListener('click', () => {
      console.log(`Opening standard carousel for quadrant: ${quadrant.courseSelect.id}, standard: ${standardLink.dataset.standard}`);
      openStandardCarousel(quadrant, standardLink.dataset.standard);
    });
  }
}

function openCarousel(quadrant, startPage) {
  carouselTitle.textContent = `Lessons for ${quadrant.courseSelect.options[quadrant.courseSelect.selectedIndex].text}`;
  carouselContent.innerHTML = '';
  carouselContent.dataset.quadrant = quadrant.courseSelect.id;
  quadrant.currentCarouselPage = startPage - 1;
  renderCarouselLesson(quadrant);
  carouselModal.classList.remove('hidden');
}

function renderCarouselLesson(quadrant) {
  const lesson = quadrant.lessons[quadrant.currentCarouselPage];
  if (!lesson) return;

  carouselContent.innerHTML = `
    <div class="border-l-4 border-blue-500 pl-4">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">${lesson.Day}: ${lesson.Title}</h2>
      <p class="text-gray-600 dark:text-gray-100 mt-2"><strong>Strand/Standard:</strong> ${lesson['Strand/Standard']}</p>
      <p class="text-gray-600 dark:text-gray-100 mt-2"><strong>Concepts:</strong> ${lesson.Concepts}</p>
      <p class="text-gray-600 dark:text-gray-100 mt-2"><strong>Starter:</strong> ${lesson.Starter}</p>
      <p class="text-gray-600 dark:text-gray-100 text-base sm:text-lg mt-2"><strong>Description:</strong> ${lesson.Description}</p>
    </div>
  `;

  carouselPrev.disabled = quadrant.currentCarouselPage === 0;
  carouselNext.disabled = quadrant.currentCarouselPage === quadrant.lessons.length - 1;
}

function openStandardCarousel(quadrant, standard) {
  const normalizedStandard = standard.trim();
  console.log(`Filtering lessons for standard: "${normalizedStandard}"`);
  const filteredLessons = quadrant.lessons.filter(lesson => {
    const lessonStandard = lesson['Strand/Standard'].trim();
    console.log(`Comparing lesson standard: "${lessonStandard}" with "${normalizedStandard}"`);
    return lessonStandard === normalizedStandard;
  });
  console.log(`Found ${filteredLessons.length} lessons for standard: "${normalizedStandard}"`);

  if (filteredLessons.length === 0) {
    errorMessage.textContent = `No lessons found for standard: ${normalizedStandard}`;
    errorMessage.classList.remove('hidden');
    return;
  }

  quadrant.currentStandardLessons = filteredLessons;
  quadrant.currentStandardPage = 0;
  standardTitle.textContent = `Lessons for ${normalizedStandard}`;
  standardContent.dataset.quadrant = quadrant.courseSelect.id;
  renderStandardLesson(quadrant);
  standardModal.classList.remove('hidden');
  standardModal.style.display = 'block';
}

function renderStandardLesson(quadrant) {
  const lesson = quadrant.currentStandardLessons[quadrant.currentStandardPage];
  if (!lesson) {
    standardContent.innerHTML = '<p class="text-center text-gray-500">No lesson available.</p>';
    return;
  }

  standardContent.innerHTML = `
    <div class="border-l-4 border-blue-500 pl-4">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">${lesson.Day}: ${lesson.Title}</h2>
      <p class="text-gray-600 dark:text-gray-100 mt-2"><strong>Strand/Standard:</strong> ${lesson['Strand/Standard']}</p>
      <p class="text-gray-600 dark:text-gray-100 mt-2"><strong>Concepts:</strong> ${lesson.Concepts}</p>
      <p class="text-gray-600 dark:text-gray-100 mt-2"><strong>Starter:</strong> ${lesson.Starter}</p>
      <p class="text-gray-600 dark:text-gray-100 text-base sm:text-lg mt-2"><strong>Description:</strong> ${lesson.Description}</p>
    </div>
  `;

  standardPrev.disabled = quadrant.currentStandardPage === 0;
  standardNext.disabled = quadrant.currentStandardPage === quadrant.currentStandardLessons.length - 1;
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
      // Display a message for days beyond 40
      if (lessonDay === 40 && selectedDate > new Date(SEMESTER_START)) {
        quadrant.lessonCard.innerHTML += '<p class="text-yellow-600 dark:text-yellow-300 mt-2">Note: This date exceeds the 40-lesson plan. Displaying Lesson 40.</p>';
      }
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

// Carousel navigation
carouselPrev.addEventListener('click', () => {
  const quadrant = quadrants.find(q => q.courseSelect.id === carouselContent.dataset.quadrant);
  if (quadrant && quadrant.currentCarouselPage > 0) {
    quadrant.currentCarouselPage--;
    renderCarouselLesson(quadrant);
  }
});

carouselNext.addEventListener('click', () => {
  const quadrant = quadrants.find(q => q.courseSelect.id === carouselContent.dataset.quadrant);
  if (quadrant && quadrant.currentCarouselPage < quadrant.lessons.length - 1) {
    quadrant.currentCarouselPage++;
    renderCarouselLesson(quadrant);
  }
});

closeCarousel.addEventListener('click', () => {
  carouselModal.classList.add('hidden');
});

// Standard carousel navigation
standardPrev.addEventListener('click', () => {
  const quadrant = quadrants.find(q => q.courseSelect.id === standardContent.dataset.quadrant);
  if (quadrant && quadrant.currentStandardPage > 0) {
    quadrant.currentStandardPage--;
    renderStandardLesson(quadrant);
  }
});

standardNext.addEventListener('click', () => {
  const quadrant = quadrants.find(q => q.courseSelect.id === standardContent.dataset.quadrant);
  if (quadrant && quadrant.currentStandardPage < quadrant.currentStandardLessons.length - 1) {
    quadrant.currentStandardPage++;
    renderStandardLesson(quadrant);
  }
});

closeStandard.addEventListener('click', () => {
  standardModal.classList.add('hidden');
  standardModal.style.display = 'none';
});

// Date picker event
datePicker.addEventListener('change', updateAllQuadrantsByDate);

// Set default date to today
datePicker.value = new Date().toISOString().split('T')[0];
updateAllQuadrantsByDate();