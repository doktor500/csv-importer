# Coding Test

We’ve got some data in a CSV file and we want to transfer it over to a database and add validation and checks to any
changes made to the data. We should be able to add/edit/delete any rows added.

You have been given a sample CSV to test with.

We want you to build a full-stack app using the requirements below and attach a README file. Your README file should
contain a brief overview of the approach you took and instructions on how to run it locally. Please also include a small
section on how you would set this up and deploy in a cloud environment and why.

We encourage you to spend no more than 3 hours on this test.

## Requirements

- Use nodejs and typescript
- Create a UI for uploading the CSV and performing the above mentioned operations
- Create an backend for handling persistence
- We should be able to run the app locally with your given instructions
- Your code should be hosted on a github repo and shared with us, if you have any issues with this, you can also submit
  a Google drive link to your code.

You are free to choose whatever framework and tools you wish to use, you can if you wish, use sqllite DB for simplicity.

## What are we looking for

- Tech decisions and any assumptions you made
- Readable and maintanable code
- Approaches to error handling
- Code structure

Technical details:

- I chose Next.js as the framework for this project as it allows to build the frontend and backend in a single codebase.
- I created an API endpoint that uses streams to prevent having to load the entire CSV file into memory.
- Since this is using Next.js this could be easily deployed to Vercel or similar providers such as Netlify.
- I implemented basic error handling and validation for the CSV upload and parsing process as well as the actions to
  create and update a product. Using tools such as Sentry or
  DataDog have been considered as out of scope for this project.
- I assumed the amount of stores is small enough to be able to do a `getAll()` query
- The query to get the list of products is limited to 1000 products, implementing pagination and product search
  functionality has been considered as out of scope for this project.

## Getting Started

Install project dependencies

```bash
npm install
```

Generate migrations (This will create SQL files inside drizzle/migrations)

```bash
npm run db:generate
```

Apply Migrations

```bash
npm run db:migrate
```

Run the development server

```bash
npm run dev
```

Run tests

```bash
npm run test
```

Run browser tests

```bash
npm run test:browser
```