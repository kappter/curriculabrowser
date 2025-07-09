# Curriculum Browser

## Overview
The Curriculum Browser is a web application designed to help educators and students view lesson plans for Career and Technical Education (CTE) courses, specifically tailored for block scheduling. It displays lessons for up to four courses simultaneously, with support for navigating lessons by date, day, or Utah CTE Strand/Standard. The application is built with HTML, CSS (Tailwind), and JavaScript, using Papa Parse for CSV parsing and GitHub Pages for hosting.

## Features
- **Quad-View Display**: View lesson plans for up to four courses in a 2x2 grid (desktop) or single-column layout (mobile, <640px).
- **Date-Based Navigation**: Select a date to display lessons for a specific day (1–40), accounting for weekdays and holidays (e.g., Thanksgiving, winter break).
- **Lesson Carousel**: Click a lesson’s day title to view all lessons for a course in a navigable carousel.
- **Strand/Standard Carousel**: Click a Strand/Standard link to view all lessons for that standard (e.g., “Strand 2 / Standard 1” for Days 4–6 in Computer Programming 1).
- **Dark Mode**: Toggle dark mode for better readability, with high-contrast text (#f9fafb on #374151).
- **Mobile-Friendly**: Responsive design with touch-friendly navigation arrows (≥40px) and readable text (16px body, 18px headers).
- **CSV Integration**: Loads lesson plans from CSV files (e.g., `Master_ComputerProgramming1_LessonPlan.csv`) with fields: `Day`, `Strand/Standard`, `Title`, `Concepts`, `Starter`, `Description`.

## Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kappter/curriculabrowser.git
   cd curriculabrowser
   ```
2. **Serve Locally**:
   - Use a local server (e.g., `npx serve` or VS Code Live Server) to test the application.
   - Ensure `Master_ComputerProgramming1_LessonPlan.csv` is hosted at `https://raw.githubusercontent.com/kappter/curriculabrowser/main/Master_ComputerProgramming1_LessonPlan.csv`.
3. **Deploy to GitHub Pages**:
   - Push changes to the `main` branch.
   - Enable GitHub Pages in the repository settings (Settings → Pages → Source: `main` branch, `/` (root)).
   - Access at `https://kappter.github.io/curriculabrowser/`.

## Usage
- **Select Courses**: Choose a course (e.g., “Computer Programming 1”) in each quadrant’s dropdown.
- **Pick a Date**: Use the date picker to select a date (e.g., September 15, 2025, ~Day 10). Lessons adjust based on the semester start (September 1, 2025) and holidays.
- **Navigate Lessons**:
  - Use page select or prev/next buttons to view specific lessons.
  - Click the day title (e.g., “Day 10: Input/Output Basics”) to open a carousel of all 40 lessons.
  - Click a Strand/Standard (e.g., “Strand 2 / Standard 1”) to view lessons for that standard.
- **Dark Mode**: Toggle dark mode for low-light environments (saved to localStorage).
- **Mobile**: View lessons in a single-column layout with touch-friendly controls.

## File Structure
- `index.html`: Main HTML file with the quad-view layout, date picker, and modals.
- `script.js`: JavaScript logic for CSV parsing, lesson rendering, and carousel navigation.
- `styles.css`: Tailwind CSS for styling, including dark mode and responsive design.
- `Master_ComputerProgramming1_LessonPlan.csv`: Sample CSV with 40 lessons for Computer Programming 1, aligned with Utah CTE standards.

## Recent Updates
- **July 9, 2025**:
  - Fixed `Uncaught SyntaxError: Unexpected identifier 'Starting'` in `script.js` (line 68) by ensuring no stray console output was included.
  - Improved dark mode readability by changing text color to `#f9fafb` (from `#e5e7eb`) and increasing description font size to 16px (mobile) and 18px (desktop).
  - Fixed carousel navigation `TypeError` by adding `dataset.quadrant` to `carouselContent` and `standardContent`.
  - Added empty favicon link (`<link rel="icon" href="data:;base64,iVBORw0KGgo=">`) to suppress `favicon.ico` 404 error.
- **Prior**:
  - Added Day and Strand/Standard carousels for lesson navigation.
  - Implemented block schedule logic with holiday exclusions (e.g., Thanksgiving, winter break).

## Testing
- **Desktop (≥640px)**:
  - Verify 2x2 grid, lesson rendering (e.g., Day 10: “Input/Output Basics”), and carousel navigation (40 lessons for Day, variable for Strand/Standard).
  - Check dark mode text readability (#f9fafb on #374151).
  - Confirm console logs show 40 valid lessons with no `SyntaxError` or `TypeError`.
- **Mobile (<640px)**:
  - Confirm single-column layout, touch-friendly arrows (≥40px), and readable text (16px descriptions, 18px headers).
  - Test carousels and modals (90% width, scrollable).
- **Console**:
  - Expect: `Starting to load CSV...`, `Total rows received: 40`, `Filtered valid lessons: 40`.
  - Ensure no errors (`SyntaxError`, `TypeError`, or favicon 404).

## Known Issues
- If lessons don’t render, check `script.js` for syntax errors (e.g., unquoted strings) and ensure CSV is accessible.
- If dark mode text is unreadable, verify `dark:text-gray-100` is applied and no conflicting CSS exists.

## Future Improvements
- Add a search bar for lessons or standards.
- Integrate Canvas API for `.pde` file submissions (Processing projects).
- Support additional CTE courses (e.g., Digital Media 1/2 for yearbook).
- List unique strands/standards in a carousel instead of lessons per standard.

## Contributing
- Fork the repository, make changes, and submit a pull request.
- Report issues via GitHub Issues, including console output, screenshots, and steps to reproduce.

## License
MIT License. See `LICENSE` for details.