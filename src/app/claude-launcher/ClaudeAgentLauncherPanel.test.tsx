import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ClaudeAgentLauncherPanel } from "./ClaudeAgentLauncherPanel";
import { permissionModes } from "./permission-modes";

describe("ClaudeAgentLauncherPanel", () => {
  it("reports an explicitly edited repo path", () => {
    const onCwdApply = vi.fn();

    render(
      <ClaudeAgentLauncherPanel
        agentLaunchDisabled={false}
        cwd="/workspace/agent-dock"
        onCwdApply={onCwdApply}
        onLaunch={() => undefined}
        onModeChange={() => undefined}
        onOpenLogin={() => undefined}
        selectedMode="default"
        selectedModeOption={permissionModes[0]}
      />,
    );

    fireEvent.change(screen.getByLabelText("repo path"), {
      target: { value: "/workspace/another-repo" },
    });
    fireEvent.click(screen.getByRole("button", { name: "use repo" }));

    expect(onCwdApply).toHaveBeenCalledWith("/workspace/another-repo");
  });

  it("shows the danger warning for bypassPermissions", () => {
    render(
      <ClaudeAgentLauncherPanel
        agentLaunchDisabled={false}
        cwd="/workspace/agent-dock"
        onCwdApply={() => undefined}
        onLaunch={() => undefined}
        onModeChange={() => undefined}
        onOpenLogin={() => undefined}
        selectedMode="bypassPermissions"
        selectedModeOption={permissionModes[2]}
      />,
    );

    expect(screen.getByText(/permission prompt를 건너뛰는/)).toBeInTheDocument();
  });
});
