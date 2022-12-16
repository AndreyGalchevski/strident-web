interface Props {
  errorMessage: string;
}

function ErrorVariant({ errorMessage }: Props) {
  return (
    <>
      <h2 style={{ marginBottom: 2 }}>Oops! &#128558;</h2>
      <p style={{ textTransform: "capitalize" }}>{errorMessage}</p>
    </>
  );
}

export default ErrorVariant;
