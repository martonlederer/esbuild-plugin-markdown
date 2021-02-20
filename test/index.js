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
});

function test(test, options) {
  return build({
    entryPoints: [`tests/basic.ts`],
    bundle: true,
    outfile: `dist/${test}.js`,
    plugins: [markdownPlugin(options)]
  }).catch(() => process.exit(1));
}
