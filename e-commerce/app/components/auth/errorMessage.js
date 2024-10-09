/**
* A functional component that renders an error message.
* If no message is provided, it returns null.
*
* @function ErrorMessage
* @param {object} props - The component's props
* @param {string} props.message - The error message to be displayed
* @returns {null|JSX.Element} - A div element with the error message or null if no message is provided
*/

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div style={{ color: "red" }}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;

