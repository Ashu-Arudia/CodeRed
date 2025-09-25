export default function profile() {
  return (
    <div className="min-h-screen flex w-full">
      <div className="items-center justify-center">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">What is your name?</legend>
          <input type="text" className="input" placeholder="Type here" />
          <p className="label">Optional</p>
        </fieldset>
      </div>
    </div>
  );
}
