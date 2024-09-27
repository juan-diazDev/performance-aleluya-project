type ErrorProps = {
  errorMessage?: string;
};

export default function ErrorBoundaryView({ errorMessage }: ErrorProps) {
  return (
    <div className="flex ">
      {errorMessage ? (
        <div>
          <h2>Error</h2>
          <p>{errorMessage}</p>
        </div>
      ) : (
        <div>
          <h1>Unknown Error</h1>
        </div>
      )}
    </div>
  );
}
