const SignUpPage = () => {
  return (
    <div className="flex flex-col max-w-md space-y-5 > * + *">
      <h1> SIGN UP </h1>
      <input className="text-black" placeholder="Username" />
      <input className="text-black" placeholder="Password" />
      <div className="border-solid border-2 border-sky-500 hover:border-dotted">
        Continue
      </div>
      {/* <span> Forgot password? </span> */}
    </div>
  );
};

export default SignUpPage;
