import React from "react";

export type IWatchDimentionArg = {
  width: number;
  height: number;
};
export type IWatchDimentionsProps = {
  children?: (
    dms: IWatchDimentionArg
  ) => React.ReactNode | React.ReactElement | JSX.Element;
};

const WatchDimentions: React.FC<IWatchDimentionsProps> = ({ children }) => {
  const [allowRender, setAllowRender] = React.useState(false);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement | undefined>();

  let pid: any = null;
  const handleResize = () => {
    if (pid) clearTimeout(pid);
    pid = setTimeout(() => {
      if (containerRef.current) {
        const _width = containerRef.current.clientWidth;
        const _height = containerRef.current.clientHeight;

        setWidth(_width);
        setHeight(_height);

        setAllowRender(true);
      }
      clearTimeout(pid);
    }, 10);
  };

  const dispatchFakeEvent = () => {
    const _e = new Event("resize", { bubbles: true });
    window.dispatchEvent(_e);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);

    setTimeout(dispatchFakeEvent, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={containerRef as any} style={{ width: "100%", height: "100%" }}>
      {allowRender && children?.({ width, height })}
    </div>
  );
};

export default WatchDimentions;
