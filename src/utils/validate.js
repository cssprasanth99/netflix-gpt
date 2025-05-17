export const checkValidData = (fullname, email, password, isSignIn) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  if (!emailRegex.test(email)) return "Email ID is not valid";
  if (!passwordRegex.test(password)) return "Password is not valid";
  if (!isSignIn && !nameRegex.test(fullname)) return "Name is not valid";

  return null;
};
