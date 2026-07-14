import { queryOptions } from "@tanstack/react-query";
import { getClaudeCliStatus, listClaudeAgentViews } from "./claude-code-client";

export const claudeCliStatusQueryOptions = queryOptions({
  queryKey: ["claude", "status"],
  queryFn: getClaudeCliStatus,
  staleTime: 5_000,
});

export function claudeAgentViewsQueryOptions(cwd: string) {
  return queryOptions({
    queryKey: ["claude", "agent-views", cwd],
    queryFn: () => listClaudeAgentViews({ cwd }),
    enabled: cwd.length > 0,
    staleTime: 2_000,
  });
}
