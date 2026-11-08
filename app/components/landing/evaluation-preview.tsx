"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
export function EvaluationPreview() {
  const [role, setRole] = useState<"host" | "curator">("host");
  useEffect(() => {
    const sync = () => {
      if (location.hash === "#host-demo") setRole("host");
      if (location.hash === "#curator-demo") setRole("curator");
    };
    const initial = requestAnimationFrame(sync);
    const click = (event: MouseEvent) => {
      const href = (event.target as HTMLElement)
        .closest("a")
        ?.getAttribute("href");
      if (href === "#host-demo") setRole("host");
      if (href === "#curator-demo") setRole("curator");
    };
    addEventListener("hashchange", sync);
    document.addEventListener("click", click);
    return () => {
      cancelAnimationFrame(initial);
      removeEventListener("hashchange", sync);
      document.removeEventListener("click", click);
    };
  }, []);
  return (
    <div className="k-product-preview">
      <div
        className="k-preview-tabs"
        role="tablist"
        aria-label="Application preview"
      >
        <button
          id="host-tab"
          role="tab"
          aria-selected={role === "host"}
          aria-controls="preview-panel"
          onClick={() => setRole("host")}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              setRole("curator");
              document.getElementById("curator-tab")?.focus();
            }
          }}
        >
          Host view
        </button>
        <button
          id="curator-tab"
          role="tab"
          aria-selected={role === "curator"}
          aria-controls="preview-panel"
          onClick={() => setRole("curator")}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              setRole("host");
              document.getElementById("host-tab")?.focus();
            }
          }}
        >
          Curator view
        </button>
      </div>
      <div
        id="preview-panel"
        role="tabpanel"
        aria-labelledby={role === "host" ? "host-tab" : "curator-tab"}
      >
        <p>
          {role === "host"
            ? "Create bounties. Fund rewards. Track improvements."
            : "Find challenges. Contribute data. Earn SOL."}
        </p>
        <div className="k-image-crop">
          <Image
            key={role}
            src={
              role === "host"
                ? "/images/workspace-preview.png"
                : "/images/curator-preview.png"
            }
            alt={`${role === "host" ? "Host challenge setup" : "Curator contribution"} application interface. Sample data and illustrative evaluation results.`}
            width={1776}
            height={1100}
          />
        </div>
      </div>
      <p className="k-preview-disclosure">
        Application preview · Sample data · Live participation coming soon
      </p>
    </div>
  );
}
