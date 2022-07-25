import { useState, useEffect } from "react";
import { BlogForm } from "./components/BlogForm";
import { Blog } from "./components/Blog";
import { Filter } from "./components/Filter";
import { LoginForm } from "./components/LoginForm";
import { Notification } from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    style: "",
  });

  useEffect(() => {
    blogService.getAll().then((initialPersons) => {
      setBlogs(initialPersons);
    });
  }, []);

  const modifyPhoneNumber = (person, newNumber) => {
    const changedPerson = { ...person, number: newNumber };
    blogService
      .update(person.id, changedPerson)
      .then((returnedPerson) => {
        setBlogs(blogs.map((p) => (p.id !== person.id ? p : returnedPerson)));
      })
      .then(() => {
        setNotification({ message: "Number changed", style: "info" });
      })
      .then(() => {
        setTimeout(() => {
          setNotification({ message: null });
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.error.includes("Validation failed")) {
          setNotification({
            message: `${error.response.data.error}`,
            style: "error",
          });
        } else {
          setNotification({
            message: `Person '${person.name}' was already deleted from server`,
            style: "error",
          });
          setBlogs(blogs.filter((p) => p.id !== person.id));
        }
      })
      .then(() => {
        setTimeout(() => {
          setNotification({ message: null });
        }, 5000);
      });
  };

  const addBlog = (event) => {
    event.preventDefault();
    if (newTitle.length === 0 || newAuthor.length === 0) {
      setNotification({ message: "Name or number missing", style: "error" });
      return;
    }

    const existing = blogs.filter((person) => person.name === newTitle);
    if (existing.length > 0) {
      if (window.confirm(`Replace ${newTitle} phone number?`)) {
        modifyPhoneNumber(existing[0], newAuthor);
        return;
        // TODO: What happens when user presses cancel?
      }
    }
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setNewTitle("");
        setNewAuthor("");
        setNewUrl("");
        showNotification({ message: "New blog added", style: "success" });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.error.includes("validation failed")) {
          showNotification({
            message: `${error.response.data.error}`,
            style: "error",
          });
        }
      });
  };

  const showNotification = ({ message, style }) => {
    setNotification({
      message,
      style,
    });
    setTimeout(() => {
      setNotification({ message: null });
    }, 5000);
  };

  const blogsToShow =
    newFilter === ""
      ? blogs
      : blogs.filter((blog) =>
          blog.title.toLowerCase().includes(newFilter.toLowerCase())
        );

  const handleDeleteClick = ({ person }) => {
    if (window.confirm(`Delete ${person.name}`)) {
      blogService
        .deletePerson(person.id)
        .then((response) => {
          setBlogs(blogs.filter((p) => p.id !== person.id));
        })
        .then(() => {
          setNotification({
            message: "Person deleted",
            style: "info",
          });
        })
        .then(() => {
          setTimeout(() => {
            setNotification({ message: null });
          }, 5000);
        });
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("login");
    if (username.length === 0 || password.length === 0) {
      showNotification({
        message: "insert username and password",
        style: "error",
      });
      return;
    }

    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log(user);
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      showNotification({ message: "wrong credentials", style: "error" });
    }
  };

  const loginForm = () => {
    return (
      <LoginForm
        username={username}
        handleUsernameChange={(event) => setUsername(event.target.value)}
        password={password}
        handlePasswordChange={(event) => setPassword(event.target.value)}
        onLogin={handleLogin}
      />
    );
  };

  const blogForm = () => {
    return (
      <BlogForm
        onSubmit={addBlog}
        title={newTitle}
        handleTitleChange={(event) => setNewTitle(event.target.value)}
        author={newAuthor}
        handleAuthorChange={(event) => setNewAuthor(event.target.value)}
        url={newUrl}
        handleUrlChange={(event) => setNewUrl(event.target.value)}
      />
    );
  };

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notification.message} style={notification.style} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p> {blogForm()}
        </div>
      )}

      <h2>Blogs</h2>
      <Filter
        value={newFilter}
        onChange={(event) => setNewFilter(event.target.value)}
      />
      {/* <Persons newFilter={newFilter} personsToShow={personsToShow} /> */}
      <p>
        {newFilter.length === 0 ? (
          <></>
        ) : blogsToShow.length === 0 ? (
          <>No results</>
        ) : (
          <span>Filter in use</span>
        )}
      </p>
      <ul>
        {blogsToShow.map((blog) => (
          <li key={blog.id}>
            <Blog title={blog.title} author={blog.author} url={blog.url} />{" "}
            <button onClick={() => handleDeleteClick({ person: blog })}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
