# Block Schedule Lesson Plan Viewer

A web-based application for viewing lesson plans for Utah CTE computer science and robotics courses, designed for a four-class block schedule. Hosted at [https://kappter.github.io/curriculabrowser/](https://kappter.github.io/curriculabrowser/).

## Features
- **Date Picker**: Select a date to view lesson plans for all four classes on that day, mapped to a 40-lesson semester (~43 block days, skipping weekends and holidays).
- **Four Quadrants**: Each quadrant displays:
  - A dropdown to select a course (e.g., Computer Programming 1, Advanced, Robotics 1).
  - Lesson content (Day, Strand/Standard, Title, Concepts, Starter, Description).
  - Pagination dropdown and `<`/`>` buttons for navigating lessons independently.
- **Responsive Design**: Mobile-friendly (single-column layout <640px) and desktop-optimized (2x2 grid ≥640px).
- **Dark Mode**: Toggle in the footer for light/dark themes, with readable text (darkened dropdowns in dark mode) and `localStorage` persistence.
- **CSV Integration**: Loads lesson plans from CSV files hosted in the repository (e.g., `Master_ComputerProgrammingAdvanced_Semester1_LessonPlan.csv`).
- **Utah CTE Alignment**: Supports standards for computer science (Java, C++, Python, C#) and Robotics 1 (VEX components), with 40 lessons per semester course.

## Setup
1. **Access via GitHub Pages**:
   - Visit [https://kappter.github.io/curriculabrowser/](https://kappter.github.io/curriculabrowser/) to use the app directly.
2. **Local Development**:
   - Clone the repository: `git clone https://github.com/kappter/curriculabrowser.git`
   - Serve the `index.html` file using a local server (e.g., `python -m http.server 8000` or VS Code Live Server).
   - Ensure internet access for CDN dependencies (PapaParse, Tailwind CSS).
3. **Dependencies**:
   - [PapaParse](https://www.papaparse.com/) (v5.4.1, via CDN) for CSV parsing.
   - [Tailwind CSS](https://tailwindcss.com/) (v2.2.19, via CDN) for styling.
   - No build step required; all files (`index.html`, `styles.css`, `script.js`) are static.
4. **Adding CSVs**:
   - Place new CSV files in the repository root (e.g., `Master_NewCourse_LessonPlan.csv`).
   - Update `index.html` course dropdowns with the new CSV URL (e.g., `https://raw.githubusercontent.com/kappter/curriculabrowser/main/Master_NewCourse_LessonPlan.csv`).
   - Ensure CSVs have columns: `Day`, `Strand/Standard`, `Title`, `Concepts`, `Starter`, `Description`.

## Usage
1. **Select a Date**:
   - Use the date picker to choose a class day (default: today, e.g., July 8, 2025).
   - The app maps the date to a lesson day (1–40) based on a semester start (September 1, 2025) and skips weekends/holidays (e.g., Thanksgiving, winter break).
2. **Choose Courses**:
   - Select a course in each quadrant’s dropdown (e.g., Computer Programming Advanced Semester 1).
   - Each quadrant operates independently, allowing different courses or lessons.
3. **Navigate Lessons**:
   - Use the pagination dropdown or `<`/`>` buttons to view specific lessons (1–40).
   - Date picker selection overrides pagination to show the corresponding lesson day across all quadrants.
4. **Toggle Dark Mode**:
   - Click the “Dark Mode” checkbox in the footer to switch themes.
   - Theme preference persists across sessions via `localStorage`.
5. **View Lesson Plans**:
   - Each quadrant displays the lesson’s Day, Strand/Standard, Title, Concepts, Starter, and Description.
   - Aligned with Utah CTE standards, supporting programming (Java, C++, Python, C#) and Robotics 1 (VEX components).

## Contributing
- Fork the repository: `https://github.com/kappter/curriculabrowser`.
- Add new features, CSVs, or bug fixes via pull requests.
- Ensure CSVs follow the required format (see Setup).
- Test changes locally and on GitHub Pages, checking console for errors (e.g., CSV parsing, file loading).
- Contact the maintainer for curriculum-specific updates (e.g., new Utah CTE courses).

## License
MIT License. See [LICENSE](LICENSE) for details.

© 2025 Kappter Education