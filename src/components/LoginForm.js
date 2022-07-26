import { useState } from "react";

export const LoginForm = ({
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
  handleSubmit,
  handleCancel,
}) => {
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <p>
          username:{" "}
          <input
            type="text"
            name="username"
            aria-labelledby="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </p>
        <p>
          password{" "}
          <input
            type="password"
            name="password"
            aria-labelledby="password"
            autoComplete="on"
            value={password}
            onChange={handlePasswordChange}
          />
        </p>
        <button type="submit">login</button>
        <button onClick={handleCancel}>cancel</button>
      </form>
    </div>
  );
};
