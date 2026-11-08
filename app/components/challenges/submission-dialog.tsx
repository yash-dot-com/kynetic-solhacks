"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, FileArchive, ShieldCheck, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Challenge } from "@/app/lib/challenges/data";

export function SubmissionDialog({
  challenge,
  onClose,
  onPrepared,
}: {
  challenge: Challenge;
  onClose: () => void;
  onPrepared: (name: string) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [prepared, setPrepared] = useState(false);

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setError("Choose a ZIP dataset archive first.");
      return;
    }
    if (!file.name.toLowerCase().endsWith(".zip")) {
      setError("Choose a .zip archive containing images and COCO annotations.");
      return;
    }
    if (file.size > 250 * 1024 * 1024) {
      setError("The preview accepts archives up to 250 MB.");
      return;
    }
    setError("");
    setPrepared(true);
    onPrepared(name.trim());
  }

  return (
    <dialog
      ref={ref}
      className="submission-dialog"
      onCancel={onClose}
      onClose={onClose}
      aria-labelledby="submission-title"
    >
      <div className="dialog-heading">
        <div>
          <p className="text-muted-foreground">
            {challenge.id} · Submission preview
          </p>
          <h2 id="submission-title" className="text-heading font-semibold">
            {prepared ? "Dataset prepared" : "Prepare your dataset"}
          </h2>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Close submission"
          onClick={onClose}
        >
          <X />
        </Button>
      </div>
      {prepared ? (
        <div className="submission-success">
          <span className="ui-icon-tile">
            <Check />
          </span>
          <p>
            <strong>{name}</strong> is ready in this preview.
          </p>
          <p className="text-muted-foreground">
            The archive stays on your device. No SOL has been staked and no
            dataset has been uploaded.
          </p>
          <Button onClick={onClose}>Back to challenge</Button>
        </div>
      ) : (
        <form onSubmit={submit} className="submission-form">
          <p className="market-notice">
            <ShieldCheck />
            Entry stake: {challenge.stake.toFixed(2)} SOL. Returned at challenge
            end, even without a positive improvement.
          </p>
          <label htmlFor="dataset-name">
            Dataset name
            <Input
              id="dataset-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              maxLength={80}
              placeholder="e.g. Reflective warehouse scenes v1"
            />
          </label>
          <label className="dataset-dropzone" htmlFor="dataset-file">
            <Upload />
            <strong>{file ? file.name : "Choose a dataset archive"}</strong>
            <span>ZIP · COCO annotations + images · Up to 250 MB</span>
            <input
              id="dataset-file"
              type="file"
              accept=".zip,application/zip"
              onChange={(event) => {
                setFile(event.target.files?.[0] ?? null);
                setError("");
              }}
            />
          </label>
          {file && (
            <p className="flex items-center gap-2 text-muted-foreground">
              <FileArchive className="size-4" />
              {(file.size / 1024 / 1024).toFixed(1)} MB selected
            </p>
          )}
          <label className="submission-check">
            <input type="checkbox" required />I have permission to contribute
            this dataset and its annotations.
          </label>
          {error && (
            <p role="alert" className="text-destructive">
              {error}
            </p>
          )}
          <p className="text-muted-foreground">
            Preview only. Preparing a dataset does not transfer funds or submit
            files to the host.
          </p>
          <Button type="submit">Prepare submission</Button>
        </form>
      )}
    </dialog>
  );
}
