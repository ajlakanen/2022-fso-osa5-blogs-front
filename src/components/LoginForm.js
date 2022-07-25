export const LoginForm = ({
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
  onLogin,
}) => {
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onLogin}>
        <p>
          username:{" "}
          <input type="text" value={username} onChange={handleUsernameChange} />
        </p>
        <p>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </p>
        <button type="submit">login</button>
      </form>
    </div>
  );
};
