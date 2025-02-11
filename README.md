# ToDoList

A simple ToDoList web application built with **Node.js**, **Express**, **EJS**, and **CSS**. This project allows users to add and delete items from a list and also create custom lists by navigating to routes like `/<yourlist>`. The application uses **MongoDB** (via Mongoose) for data persistence and is deployed on **Vercel**.

## Features

- **Add Items:** Create new to-do items on your list.
- **Delete Items:** Remove items from your list.
- **Custom Lists:** Create and access custom lists by visiting `/<listName>` in your browser (e.g., `/work`).
- **MongoDB Integration:** Stores your tasks and lists in a MongoDB database using Mongoose.
- **Responsive UI:** Simple and clean design using CSS.

## Live Demo

Check out the live application on Vercel:  
[https://todolist-v1-two.vercel.app/](https://todolist-v1-two.vercel.app/)

## Getting Started

### Prerequisites

- **[Node.js](https://nodejs.org/)** (v14 or later recommended)
- **[MongoDB](https://www.mongodb.com/)** (local installation or hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git**

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Krishna200608/ToDoList.git
   cd ToDoList
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the project root with the following variables (adjust as needed):

   ```env
   MONGODB_URI=your-mongodb-connection-string
   PORT=3000
   ```

4. **Run the Application Locally:**

   ```bash
   npm start
   ```

   Alternatively, if you want to use Vercel's development environment:

   ```bash
   vercel dev
   ```

5. **Access the Application:**

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Project Structure

```
.
├── models
│   └── item.js           # Mongoose schemas for ToDo items and custom lists
├── public
│   └── css               # CSS files for styling the application
├── views
│   ├── list.ejs          # Main view template for displaying to-do lists
│   └── about.ejs         # About page template
├── app.js                # Main Express application file
├── date.js               # Utility functions for date handling
├── .env                  # Environment variables (not committed to version control)
├── package.json          # Project metadata and dependencies
└── vercel.json           # Vercel deployment configuration
```

## Technologies Used

- **[Node.js](https://nodejs.org/)** – JavaScript runtime environment.
- **[Express](https://expressjs.com/)** – Web framework for Node.js.
- **[EJS](https://ejs.co/)** – Templating engine to render dynamic HTML.
- **CSS** – For styling the user interface.
- **[MongoDB](https://www.mongodb.com/)** & **[Mongoose](https://mongoosejs.com/)** – NoSQL database and ODM for data storage.
- **[Vercel](https://vercel.com/)** – Cloud platform for deploying Node.js applications.

## Deployment

This project is deployed on Vercel. Every push to the repository triggers a new deployment.

- **Live Site:** [https://todolist-v1-i0btcebyr-krishna-sikheriyas-projects.vercel.app/](https://todolist-v1-i0btcebyr-krishna-sikheriyas-projects.vercel.app/)

### Vercel Configuration

The `vercel.json` file is configured to deploy the application as a serverless function:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "app.js"
    }
  ]
}
```

## Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built as part of learning full-stack web development with Node.js and Express.
- Thanks to the communities behind [Express](https://expressjs.com/), [EJS](https://ejs.co/), [MongoDB](https://www.mongodb.com/), and [Vercel](https://vercel.com/) for their amazing tools and documentation.

---

Happy coding! 🚀

