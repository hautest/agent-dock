import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ClaudeBypassPermissionsModal } from "./ClaudeBypassPermissionsModal";
import { ClaudeDialog } from "./ClaudeDialog";

describe("ClaudeDialog", () => {
  it("closes with Escape and exposes an accessible close button", () => {
    const onClose = vi.fn();

    render(
      <ClaudeDialog isOpen onClose={onClose} title="test dialog">
        dialog content
      </ClaudeDialog>,
    );

    expect(screen.getByRole("button", { name: "close" })).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("requires an explicit confirmation for bypassPermissions", () => {
    const onConfirm = vi.fn();

    render(
      <ClaudeBypassPermissionsModal
        cwd="/workspace/agent-dock"
        isOpen
        onCancel={() => undefined}
        onConfirm={onConfirm}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "confirm launch" }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });
});
