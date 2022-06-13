declare module "*.jpg";
declare module "*.png";

type SvgComponent = React.StatelessComponent<React.SVGAttributes<SVGElement>>;
declare module "*.svg" {
  const content: SvgComponent;
  export default content;
}