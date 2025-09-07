# TODO: Changes Viewer MVP

This task list outlines the steps to build the "Changes Viewer" web application. Follow each step sequentially. The QA steps are crucial to ensure the application is working as expected before moving on.

---

### Phase 1: Project Setup

**Task 1: Initialize the React Project with Vite**
- [x] Open your terminal.
- [x] Run `npm create vite@latest changes-viewer -- --template react`.
- [x] `cd changes-viewer` to enter the project directory.
- [x] Run `npm install` to install the default dependencies.
- [x] Run `npm run dev` to start the development server and ensure the default React app loads in your browser.

**Task 2: Add and Configure Tailwind CSS**
- [x] Stop the development server (`Ctrl + C`).
- [x] Follow the official Vite guide to install and configure Tailwind CSS: [Install Tailwind CSS with Vite](https://tailwindcss.com/docs/guides/vite).
- [x] Make sure to update `tailwind.config.js` and `index.css` as per the guide.
- [x] Start the dev server again (`npm run dev`) and test a Tailwind class (e.g., add `className="bg-blue-500"` to the `App.jsx` main div) to confirm it's working.

**Task 3: Install Radix UI Components**
- [x] Stop the development server.
- [x] In your terminal, run `npm install @radix-ui/react-button @radix-ui/react-slot`.
- [x] In your terminal, run `npm install @radix-ui/react-table`.
- [x] No further configuration is needed for Radix UI.

**QA Step 1: Verify Project Setup**
- [ ] Your project should have React, Vite, Tailwind CSS, and Radix UI installed.
- [ ] Running `npm run dev` should successfully start the application without errors.
- [ ] A test Tailwind class should apply correctly.

---

### Phase 2: Building the UI Components

**Task 4: Create the Initial "Empty State" View**
- [x] Open `src/App.jsx`.
- [x] Clear out the boilerplate content inside the main `div`.
- [x] Use Tailwind CSS to make the main `div` a flex container that fills the screen (`h-screen`, `flex`, `items-center`, `justify-center`).
- [x] Import the Radix UI `Button` component: `import { Button } from '@radix-ui/react-button';`.
- [x] Add the `<Button>` to the page with the text "Upload File".

**QA Step 2: Verify Empty State**
- [ ] The browser should display a full-height page with a single, centered button labeled "Upload File".

**Task 5: Create a Static Table Structure for the "Post-Upload State"**
- [ ] Create a new component file: `src/components/ChangesTable.jsx`.
- [ ] Import the Radix UI Table components: `import { Table } from '@radix-ui/react-table';`.
- [ ] In `ChangesTable.jsx`, build a basic, static table structure using the Radix components: `Table.Root`, `Table.Header`, `Table.Row`, `Table.ColumnHeaderCell`, `Table.Body`, and `Table.Cell`.
- [ ] Add some placeholder static data (e.g., 2-3 rows and columns) to see the structure.
- [ ] In `App.jsx`, import and render this `<ChangesTable />` component. For now, it will appear alongside the button.

**QA Step 3: Verify Static Table**
- [ ] The `ChangesTable` component should render a basic, unstyled table on the screen below the upload button.

---

### Phase 3: Implementing Core Logic

**Task 6: Implement File Upload and State Management**
- [ ] In `App.jsx`, import the `useState` hook from React: `import { useState } from 'react';`.
- [ ] Create a state to hold the combined table data: `const [tableData, setTableData] = useState([]);`.
- [ ] Create a file input element: `<input type="file" accept=".json" />`. To keep the UI clean, you can hide this input and trigger its click from the Radix UI Button.
    - Add `display: 'none'` to the input via an inline style or a CSS class.
    - Create a `useRef` to reference the input element.
    - Add an `onClick` handler to the Radix Button that calls `fileInputRef.current.click()`.
- [ ] Add an `onChange` event handler to the file input to process the selected file.

**Task 7: Parse the JSON File**
- [ ] Inside the file input's `onChange` handler:
    - Get the selected file from the event object.
    - Use `FileReader` to read the file content as text.
    - When the file is loaded (`reader.onload`), parse the text content using `JSON.parse()`.
    - Extract the `differences` and `data` arrays from the parsed JSON.
- [ ] Create a new combined array:
    - Map over the `differences` array to create objects that include a `status` key (e.g., `{ ...record, status: record.type }`).
    - Map over the `data` array to create objects with a `status` of `'unchanged'`.
    - Concatenate these two arrays into a single array.
    - Update the `tableData` state with this new combined array using `setTableData()`.

**QA Step 4: Verify File Parsing**
- [ ] Prepare a sample `changes.json` file locally that matches the PRD's data model.
- [ ] Click the "Upload File" button and select your `changes.json`.
- [ ] Use `console.log(tableData)` or React DevTools to inspect the `tableData` state.
- [ ] Verify that the state now contains a single array with all records from both `data` and `differences`, and that each record has a `status` of `'added'`, `'removed'`, or `'unchanged'`.

**Task 8: Render Data Dynamically in the Table**
- [ ] In `App.jsx`, modify the rendering logic:
    - If `tableData.length === 0`, show the "Upload File" button.
    - If `tableData.length > 0`, show the `<ChangesTable />` component.
- [ ] Pass the `tableData` array as a prop to `<ChangesTable data={tableData} />`.
- [ ] In `ChangesTable.jsx`:
    - **Dynamic Columns:**
        - If `data` is not empty, get the column headers from the keys of the first object (`Object.keys(data[0])`).
        - Filter out the `type` and `status` keys from the headers array.
        - In the `Table.Header`, map over this filtered headers array to render the `Table.ColumnHeaderCell`s.
    - **Dynamic Rows:**
        - In the `Table.Body`, map over the `data` prop to render a `Table.Row` for each record.
        - Inside that map, map over your filtered headers array again to render a `Table.Cell` for each column in the row, using the header key to get the cell value (e.g., `record[header]`).

**QA Step 5: Verify Dynamic Table Rendering**
- [ ] Upload your `changes.json` file again.
- [ ] The "Upload File" button should disappear, and the table should appear.
- [ ] The table columns should correctly match the fields in your JSON file (excluding `type`).
- [ ] The table rows should correctly display all records from your JSON file.

**Task 9: Implement Row Highlighting and Link Rendering**
- [ ] In `ChangesTable.jsx`, inside the `map` for rendering `Table.Row`:
    - Create a variable for the row's class name.
    - Use a `switch` statement or `if/else` on `record.status`:
        - if `'added'`, set the class to `bg-green-100`.
        - if `'removed'`, set the class to `bg-red-100`.
        - otherwise, the class is empty.
    - Apply this class to the `<Table.Row className={rowClass}>`.
- [ ] In the `map` for rendering `Table.Cell`:
    - Check if the current header is named `'link'`.
    - If it is, render an anchor tag `<a>` instead of plain text.
    - The `<a>` tag should have:
        - `href={record.link}`
        - `target="_blank"`
        - `rel="noopener noreferrer"`
    - Otherwise, render the cell data as plain text.

**QA Step 6: Verify Final Styling and Functionality**
- [ ] Upload your `changes.json` file.
- [ ] Rows with `status: 'added'` should have a green background (`bg-green-100`).
- [ ] Rows with `status: 'removed'` should have a red background (`bg-red-100`).
- [ ] Unchanged rows should have the default background.
- [ ] Any value in a column named `link` should be a clickable link that opens in a new browser tab.

---

### Phase 4: Deployment

**Task 10: Deploy to Vercel**
- [ ] Create a new, empty repository on GitHub.
- [ ] Push your local project code to the new GitHub repository.
- [ ] Sign up for a Vercel account (you can use your GitHub account).
- [ ] From your Vercel dashboard, click "Add New... -> Project".
- [ ] Import your new GitHub repository.
- [ ] Vercel should automatically detect it's a Vite project. Keep the default settings and click "Deploy".
- [ ] Wait for the deployment to finish.

**QA Step 7: Final Production Check**
- [ ] Open the Vercel deployment URL.
- [ ] The application should load to the "Empty State".
- [ ] Perform a final end-to-end test: Upload your `changes.json` file and verify all requirements from the PRD are met on the live URL.
    - Table renders correctly.
    - Rows are highlighted correctly.
    - Links work correctly.

---
**MVP Complete**
---
