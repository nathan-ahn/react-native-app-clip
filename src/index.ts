import ReactNativeAppClipModule from "./ReactNativeAppClipModule";

export function isClip(bundleIdSuffix = "Clip"): boolean {
  const bundleIdentifier = ReactNativeAppClipModule.getBundleIdentifier() as
    | string
    | undefined;
  const isClip =
    bundleIdentifier?.slice(bundleIdentifier.lastIndexOf(".") + 1) ===
    bundleIdSuffix;

  return isClip;
}

export function getContainerURL(groupIdentifier: string): string {
    throw new Error("Only available on iOS");
}

export function getBundleIdentifier(): string {
    throw new Error("Only available on iOS");
}

export function displayOverlay(): void {
}

export function setSharedCredential(
  groupIdentifier: string,
  credential: string
): void {
}

export function getSharedCredential(groupIdentifier: string): string | null {
    return null;
}
