import "normalize.css";
import styles from "./index.module.scss";
import $ from "jquery";
import huiIcon from "./images/huiIcon.png";
import huiIconSvg from "./images/huiIcon.svg";

function component() {
  const element = document.createElement("div");
  element.innerHTML = "Hello Webpack5";

  const imgElement = document.createElement("img");
  imgElement.src = huiIcon;
  imgElement.classList = styles.huiIcon;

  const svgElement = document.createElement("img");
  svgElement.src = huiIconSvg;
  svgElement.classList = styles.huiIcon;

  console.log(huiIcon);
  console.log(huiIconSvg);
  console.log(styles);
  element.appendChild(imgElement);
  element.appendChild(svgElement);

  element.classList = styles.helloWebpack;

  return element;
}

document.body.appendChild(component());

// console.log(${`.${styles.helloWebpack}`}.length);
