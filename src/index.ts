import { Plugin } from "esbuild";
import path from "path";
import fs from "fs-extra";
import { TextDecoder } from "util";

interface MarkdownPluginOptions {}

export const markdownPlugin = (options: MarkdownPluginOptions): Plugin => ({
  name: "markdown",
  setup(build) {
    // resolve .md files
    build.onResolve({ filter: /\.md$/ }, (args) => {
      if (args.resolveDir === "") return;

      return {
        path: path.isAbsolute(args.path)
          ? args.path
          : path.join(args.resolveDir, args.path),
        namespace: "markdown"
      };
    });

    // load files with "markdown" namespace
    build.onLoad({ filter: /.*/, namespace: "markdown" }, async (args) => {
      return {
        contents: JSON.stringify(parsed),
        loader: "json"
      };
    });
  }
});
