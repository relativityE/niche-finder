# AI Niche Finder Dashboard

This project is a React application that provides a dashboard for discovering profitable digital product opportunities. It uses AI-powered trend analysis to provide insights into various niches.

## Features

*   **Niche Discovery:** Browse a list of niches with key metrics like profitability, competition, and revenue potential.
*   **Trend Analysis:** Visualize search and engagement trends for different niches over time.
*   **Platform Insights:** Get data from TikTok, Reddit, and Google to understand the potential of each niche.
*   **Opportunity Scoring:** Each niche is assigned an opportunity score to help you identify the most promising ones.
*   **Modern UI:** A clean and modern user interface built with React and Tailwind CSS.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1.  Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```sh
    cd <project-directory>
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

To run the application in development mode, use the following command:

```sh
npm start
```

This will open the application in your browser at [http://localhost:3000](http://localhost:3000).

### Running Tests

To run the automated tests for this project, use the following command:

```sh
npm test
```

**Note:** There are currently known issues with the test environment that cause the tests to time out. This is a known issue and is being tracked. For now, manual testing is recommended.

### Manual Testing

As per the project guidelines, manual testing is the recommended way to verify the functionality of the application. Here's how you can do it:

1.  **Run the application:** `npm start`
2.  **Open the application in your browser.**
3.  **Interact with the UI:**
    *   Use the search bar to filter niches by name, category, or keyword.
    *   Select different time ranges from the dropdown to see how it affects the data (Note: this is currently mock data).
    *   Select different analysis types from the dropdown.
    *   Click on a niche to expand it and see more details.
    *   Hover over the charts to see tooltips with more information.

## Built With

*   [React](https://reactjs.org/) - The web framework used.
*   [TypeScript](https://www.typescriptlang.org/) - For static typing.
*   [Tailwind CSS](https://tailwindcss.com/) - For styling.
*   [Recharts](https://recharts.org/) - For charts.
*   [Lucide React](https://lucide.dev/guide/packages/lucide-react) - for icons.
