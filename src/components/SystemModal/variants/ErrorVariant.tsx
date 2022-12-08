interface Props {
  errorMessage: string;
}

function ErrorVariant({ errorMessage }: Props) {
  return (
    <>
      <h2 style={{ marginBottom: 2 }}>Something went wrong</h2>
      <p style={{ textTransform: "capitalize" }}>{errorMessage}</p>
    </>
  );
}

export default ErrorVariant;
