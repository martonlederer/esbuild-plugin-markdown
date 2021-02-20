// .md declarations
declare module "*.md" {
  const content: {
    html: string;
    raw: string;
    filename: string;
  };

  export default content;
}
