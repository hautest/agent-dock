import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseSuspenseQueryResult } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { overlay } from "overlay-kit";
import { useEffect } from "react";
import {
  claudeOperationResultAtom,
  claudePermissionModeAtom,
  claudeWorkingDirectoryAtom,
} from "../../features/claude-code/claude-code-atoms";
import { launchClaudeAgentView } from "../../features/claude-code/claude-code-client";
import { claudeAgentViewsQueryOptions } from "../../features/claude-code/claude-code-queries";
import type { ClaudeCliStatus } from "../../features/claude-code/types";
import { ClaudeAgentLauncherPanel } from "./ClaudeAgentLauncherPanel";
import { ClaudeAgentViewsPanel } from "./ClaudeAgentViewsPanel";
import { ClaudeBypassPermissionsModal } from "./ClaudeBypassPermissionsModal";
import { ClaudeCommandLog } from "./ClaudeCommandLog";
import { ClaudeContextPanel } from "./ClaudeContextPanel";
import { ClaudeLoginModal } from "./ClaudeLoginModal";
import { ClaudeStatusPanel } from "./ClaudeStatusPanel";
import { permissionModes, requiresPermissionConfirmation } from "./permission-modes";

interface ClaudeDashboardProps {
  statusQuery: UseSuspenseQueryResult<ClaudeCliStatus, Error>;
}

function errorMessage(error: unknown): string | null {
  if (!error) {
    return null;
  }

  return error instanceof Error ? error.message : String(error);
}

export function ClaudeDashboard({ statusQuery }: ClaudeDashboardProps) {
  const queryClient = useQueryClient();
  const [selectedMode, setSelectedMode] = useAtom(claudePermissionModeAtom);
  const [workingDirectory, setWorkingDirectory] = useAtom(claudeWorkingDirectoryAtom);
  const [operationResult, setOperationResult] = useAtom(claudeOperationResultAtom);
  const status = statusQuery.data;
  const cwd = workingDirectory.trim();
  const agentViewsQuery = useQuery(claudeAgentViewsQueryOptions(cwd));
  const launchMutation = useMutation({
    mutationFn: launchClaudeAgentView,
    onSuccess: (result) => {
      setOperationResult(result);
      void queryClient.invalidateQueries({ queryKey: ["claude", "agent-views", cwd] });
    },
  });

  useEffect(() => {
    if (!workingDirectory) {
      setWorkingDirectory(status.defaultCwd);
    }
  }, [setWorkingDirectory, status.defaultCwd, workingDirectory]);

  const selectedModeOption =
    permissionModes.find((mode) => mode.value === selectedMode) ?? permissionModes[0];
  const auth = status.auth;
  const launchPending = launchMutation.isPending;
  const agentLaunchDisabled =
    launchPending || !status.available || !auth.loggedIn || cwd.length === 0;
  const statusTone = status.available ? "ok" : "warn";
  const authTone = auth.loggedIn ? "ok" : "warn";
  const currentError = errorMessage(launchMutation.error ?? agentViewsQuery.error);

  function openLoginModal() {
    overlay.open(({ isOpen, close, unmount }) => (
      <ClaudeLoginModal
        isOpen={isOpen}
        onClose={() => {
          close();
          unmount();
        }}
      />
    ));
  }

  async function confirmBypassPermissions(): Promise<boolean> {
    return overlay.openAsync<boolean>(({ isOpen, close, unmount }) => (
      <ClaudeBypassPermissionsModal
        cwd={cwd}
        isOpen={isOpen}
        onCancel={() => {
          close(false);
          unmount();
        }}
        onConfirm={() => {
          close(true);
          unmount();
        }}
      />
    ));
  }

  async function handleLaunchAgentView() {
    if (requiresPermissionConfirmation(selectedMode) && !(await confirmBypassPermissions())) {
      return;
    }

    launchMutation.mutate({ cwd, mode: selectedMode });
  }

  return (
    <>
      <ClaudeStatusPanel
        loading={statusQuery.isFetching}
        onRefresh={() => void statusQuery.refetch()}
        status={status}
        statusTone={statusTone}
      />
      <ClaudeAgentLauncherPanel
        agentLaunchDisabled={agentLaunchDisabled}
        cwd={workingDirectory}
        onCwdApply={setWorkingDirectory}
        onLaunch={() => void handleLaunchAgentView()}
        onModeChange={setSelectedMode}
        onOpenLogin={openLoginModal}
        selectedMode={selectedMode}
        selectedModeOption={selectedModeOption}
      />
      <ClaudeContextPanel
        auth={auth}
        authTone={authTone}
        selectedMode={selectedMode}
        status={status}
      />
      <ClaudeAgentViewsPanel
        agentViews={agentViewsQuery.data ?? []}
        loading={agentViewsQuery.isFetching}
        onRefresh={() => void agentViewsQuery.refetch()}
      />
      <ClaudeCommandLog
        authLoggedIn={auth.loggedIn}
        authTone={authTone}
        errorMessage={currentError}
        loading={launchPending || agentViewsQuery.isFetching || statusQuery.isFetching}
        operationResult={operationResult}
        statusAvailable={status.available}
        statusTone={statusTone}
      />
    </>
  );
}
