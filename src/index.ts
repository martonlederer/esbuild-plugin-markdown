import { Plugin } from "esbuild";
import { TextDecoder } from "util";
import path from "path";
import fs from "fs-extra";
import marked, { MarkedOptions } from "marked";

interface MarkdownPluginOptions {
  markedOptions?: MarkedOptions;
}

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
      const markdownContent = new TextDecoder().decode(
          await fs.readFile(args.path)
        ),
        markdownHTML = marked(markdownContent, options?.markedOptions);

      return {
        contents: JSON.stringify({
          html: markdownHTML,
          raw: markdownContent,
          filename: path.basename(args.path)
        }),
        loader: "json"
      };
    });
  }
});
