# MIET Results Scraper

## Overview

MIET Results Scraper is a web application that fetches and displays the results of all students in MIET college. The backend of the project scrapes data from the college's result website, and the frontend is built using React to present this data in an easy-to-navigate interface.

## Features

- Scrapes student result data from the college website.
- Displays student data including roll number, name, branch, SGPA, and more.
- User-friendly interface built with React.
- Deployed on Vercel for easy access.

## Deployment

The project is deployed and accessible at [miet-results.devxoshakya.xyz](https://miet-results.devxoshakya.xyz).

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/devxoshakya/miet-results.git
    ```
2. Navigate to the project directory:
    ```sh
    cd miet-results
    ```
3. Install the dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

### Running the Scraper

To run the scraper and fetch the data:

1. Ensure you have the required packages installed:
    ```sh
    npm install axios cheerio qs fs path
    ```
2. Run the scraper script:
    ```sh
    node brute.js
    ```

### Running the Frontend

1. Start the development server:
    ```sh
    npm start
    # or
    yarn start
    ```
2. Open your browser and navigate to `http://localhost:3000` to view the application.


## Technologies Used

- **Backend:** Node.js, Axios, Cheerio
- **Frontend:** React, HTML, CSS
- **Deployment:** Vercel

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to MIET college for providing the data.

---

**Author**: [Dev Shakya](https://github.com/devxoshakya)

