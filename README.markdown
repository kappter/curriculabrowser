# Computer Programming Lesson Plans Web Repository

## Overview

This project is a web-based application designed to display lesson plans for Computer Programming 1 and Computer Programming 2, aligned with Utah’s curriculum standards. The application features a single-page interface with a dropdown menu to select a course (Programming 1 or Programming 2) and a paginated table displaying lesson details, including Day, Strand/Standard, Title, Concepts, and Starter activity. The interface is styled with Tailwind CSS for a clean, responsive design and uses Papa Parse to parse CSV files containing the lesson plans.

The repository includes two CSV files:
- `Master_ComputerProgramming1_LessonPlan.csv`: 40-day lesson plan for Computer Programming 1.
- `Master_ComputerProgramming2_LessonPlan.csv`: 40-day lesson plan for Computer Programming 2.

Each CSV file contains 40 lessons, covering a semester of approximately 43 days with 90-minute sessions, split into two 20-day terms. The web application allows educators and students to easily navigate and view lesson details.

## Features

- **Dropdown Selection**: Choose between Computer Programming 1 or 2 lesson plans.
- **Paginated Display**: View 10 lessons per page, with Previous/Next buttons for navigation.
- **Responsive Design**: Clean, attractive table layout using Tailwind CSS, optimized for desktop and mobile.
- **CSV Parsing**: Papa Parse library handles CSV file parsing for dynamic content loading.
- **Error Handling**: Displays an error message if a CSV file fails to load.

## Repository Structure

```
programming-courses/
├── index.html
├── Master_ComputerProgramming1_LessonPlan.csv
├── Master_ComputerProgramming2_LessonPlan.csv
└── README.md
```

- `index.html`: The main web application file, containing HTML, JavaScript, and Tailwind CSS for rendering the lesson plans.
- `Master_ComputerProgramming1_LessonPlan.csv`: CSV file with 40 lessons for Computer Programming 1, including columns for Day, Strand/Standard, Title, Concepts, and Starter.
- `Master_ComputerProgramming2_LessonPlan.csv`: CSV file with 40 lessons for Computer Programming 2, with the same column structure.
- `README.md`: This file, providing project documentation.

## Setup Instructions

### Local Setup
1. **Clone or Download the Repository**:
   - Clone the repository using `git clone` or download the files as a ZIP and extract them.
2. **Place CSV Files**:
   - Ensure `Master_ComputerProgramming1_LessonPlan.csv` and `Master_ComputerProgramming2_LessonPlan.csv` are in the same directory as `index.html`.
3. **Open the Application**:
   - Open `index.html` in a modern web browser (e.g., Chrome, Firefox, Edge).
   - Note: Some browsers may restrict local file access due to security policies. If the CSV files fail to load, use a local server (see below).

### Hosted Setup
1. **Host on a Server**:
   - Upload the repository contents to a web server or a platform like GitHub Pages.
   - Ensure the CSV files are accessible at the same directory level as `index.html`.
2. **Verify File Access**:
   - Confirm that the server allows access to the CSV files for Papa Parse to fetch them.
3. **Access the Application**:
   - Navigate to the hosted URL in a browser.

### Local Server (Optional)
To avoid local file access issues:
1. Install a simple HTTP server, such as `http-server` for Node.js:
   ```bash
   npm install -g http-server
   ```
2. Navigate to the repository directory and run:
   ```bash
   http-server
   ```
3. Access the application at `http://localhost:8080`.

## Usage Instructions

1. **Open the Application**:
   - Load `index.html` in a browser (locally or hosted).
2. **Select a Course**:
   - Use the dropdown menu to choose either "Computer Programming 1" or "Computer Programming 2".
3. **View Lessons**:
   - The table displays 10 lessons per page, with columns for Day, Strand/Standard, Title, Concepts, and Starter.
4. **Navigate Pages**:
   - Use the "Previous" and "Next" buttons to move between pages.
   - The page indicator shows the current page and total pages (e.g., "Page 1 of 4").
5. **Troubleshooting**:
   - If the table shows an error (e.g., "Error loading lessons"), ensure the CSV files are in the correct directory and accessible.

## Dependencies

The application uses the following external libraries via CDNs:
- **Tailwind CSS**: For styling the interface (loaded via `https://cdn.tailwindcss.com`).
- **Papa Parse**: For parsing CSV files (loaded via `https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js`).

No local installation of these libraries is required, but an internet connection is needed unless the libraries are downloaded and hosted locally.

## Notes

- **CSV File Requirements**:
  - The CSV files must have the exact column headers: `Day`, `Strand/Standard`, `Title`, `Concepts`, and `Starter`.
  - Ensure the files are in the same directory as `index.html` or accessible via the correct path if hosted.
- **Browser Compatibility**:
  - The application is compatible with modern browsers (Chrome, Firefox, Edge, Safari).
  - Local file access may be restricted in some browsers due to CORS policies. Use a local server if issues arise.
- **Customization**:
  - To adjust pagination (e.g., lessons per page), modify the `lessonsPerPage` variable in the JavaScript code (default is 10).
  - Additional features like search or filtering by strand can be added by extending the JavaScript logic.
- **Standards Reference**:
  - The lesson plans are aligned with Utah’s Computer Programming 1 and 2 standards, available at the [Utah Education Network]([invalid url, do not cite]).

## License

This project is intended for educational use and is not licensed for commercial distribution. Ensure compliance with Utah’s curriculum standards and any associated licensing for educational materials.

## Contact

For questions or suggestions, contact the repository maintainer or refer to the Utah Education Network for curriculum-related inquiries.