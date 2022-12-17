import { FunctionComponent, IframeHTMLAttributes, useState } from "react";

interface Props extends IframeHTMLAttributes<HTMLIFrameElement> {
  loader: JSX.Element;
}

const LoadableIFrame: FunctionComponent<Props> = ({
  loader,
  title,
  src,
  height,
  style = {},
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
    console.log("Loaded");
  };

  return (
    <>
      {isLoading ? loader : null}
      <iframe
        title={title}
        src={src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        width="100%"
        height={isLoading ? 0 : height}
        style={{ border: 0, ...style }}
        onLoad={handleLoad}
      />
    </>
  );
};

export default LoadableIFrame;
