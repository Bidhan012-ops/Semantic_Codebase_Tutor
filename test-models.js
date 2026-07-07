async function run() {
  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyCzhrYxCvG1H3GhCK2JDM0HJsyC3Ok4XmU");
  const data = await res.json();
  console.log(data);
}
run();
