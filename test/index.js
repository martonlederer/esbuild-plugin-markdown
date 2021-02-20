const { markdownPlugin } = require("../dist"),
  { assert } = require("chai"),
  { build } = require("esbuild");

describe("Markdown esbuild tests", () => {
  it("Loads .md files", (done) => {
    test("basic")
      .then((res) => {
        assert(res);
        done();
      })
      .catch(done);
  });
  it("Applies marked.MarkedOptions", (done) => {
    test("options", {
      markedOptions: {
        highlight(code, language) {
          const hljs = require("highlight.js");
          const validLanguage = hljs.getLanguage(language)
            ? language
            : "plaintext";
          return hljs.highlight(validLanguage, code).value;
        }
      }
    })
      .then((res) => {
        assert(res);
        done();
      })
      .catch(done);
  });
});

function test(test, options) {
  return build({
    entryPoints: [`tests/basic.ts`],
    bundle: true,
    outfile: `dist/${test}.js`,
    plugins: [markdownPlugin(options)]
  }).catch(() => process.exit(1));
}
