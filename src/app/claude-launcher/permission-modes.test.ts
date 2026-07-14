import { describe, expect, it } from "vitest";
import { requiresPermissionConfirmation } from "./permission-modes";

describe("requiresPermissionConfirmation", () => {
  it("requires a second confirmation only for bypassPermissions", () => {
    expect(requiresPermissionConfirmation("default")).toBe(false);
    expect(requiresPermissionConfirmation("auto")).toBe(false);
    expect(requiresPermissionConfirmation("bypassPermissions")).toBe(true);
  });
});
