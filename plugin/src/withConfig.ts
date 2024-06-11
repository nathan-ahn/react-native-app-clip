import type { ConfigPlugin } from "expo/config-plugins";

export const withConfig: ConfigPlugin<{
  targetName: string;
  bundleIdentifier: string;
}> = (config, { targetName, bundleIdentifier }) => {
  let configIndex: null | number = null;
  config.extra?.eas?.build?.experimental?.ios?.appExtensions?.forEach(
    (ext: { targetName: string }, index: number) => {
      if (ext.targetName === targetName) {
        configIndex = index;
      }
    },
  );

  if (!configIndex) {
    config.extra = {
      ...config.extra,
      eas: {
        ...config.extra?.eas,
        build: {
          ...config.extra?.eas?.build,
          experimental: {
            ...config.extra?.eas?.build?.experimental,
            ios: {
              ...config.extra?.eas?.build?.experimental?.ios,
              appExtensions: [
                ...(config.extra?.eas?.build?.experimental?.ios
                  ?.appExtensions ?? []),
                {
                  targetName,
                  bundleIdentifier,
                },
              ],
            },
          },
        },
      },
    };
    configIndex = 0;
  }

  if (configIndex !== null && config.extra) {
    const appClipConfig =
      config.extra.eas.build.experimental.ios.appExtensions[configIndex];

    appClipConfig.entitlements = {
      ...appClipConfig.entitlements,
      // ...getAppClipEntitlements(config.ios, {
      //   appleSignin,
      //   // groupIdentifier, // Throws an error in EAS
      // }),
    };
  }

  // Entitlements
  config.ios = {
    ...config.ios,
    entitlements: {
      // ...addApplicationGroupsEntitlement(
      //   config.ios?.entitlements ?? {},
      //   groupIdentifier,
      // ),
      "com.apple.developer.associated-appclip-app-identifiers": [
        `$(AppIdentifierPrefix)${bundleIdentifier}`,
      ],
    },
  };

  return config;
};
