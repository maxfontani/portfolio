let currentScreenProj = getCurrentScreenProj();
const HOME = window.location.pathname;
const main = document.getElementById("main");
const mainScreenProj = document.getElementById("screen-proj-main");
const screenProjects = document.getElementsByClassName("proj screen");
const myName = document.getElementById("my-name");

for (let i = 0; i < screenProjects.length; i++) {
  const proj = screenProjects[i];
  proj.addEventListener("click", () => onScreenProjClick(proj));
}

function onScreenProjClick(proj) {
  const subDir = proj.dataset["folder"];
  const totalImages = proj.dataset["images"];
  const titleText = proj.dataset["title"];
  const url = new URL(window.location);

  const title = document.createElement("h1");

  title.innerHTML = titleText;
  mainScreenProj.appendChild(title);

  window.history.pushState({ proj: subDir }, "", url);
  currentScreenProj = subDir;

  mainScreenProj.classList.remove("hidden");
  main.classList.add("hidden");

  const dir = `./images/${subDir}`;

  for (let i = 1; i <= totalImages; i++) {
    const wrapper = document.createElement("div");
    const img = document.createElement("img");

    wrapper.className = "project-image-wrapper";

    img.className = "project-image";
    img.src = `${dir}/${i}.png`;
    img.alt = "Screenshot";

    wrapper.appendChild(img);
    mainScreenProj.appendChild(wrapper);
  }
}

async function getNumFiles(dir) {
  const files = await fs.readdir(dir);
  return files.length;
}

window.addEventListener("popstate", goHome);

myName.addEventListener("click", goHome);

function getCurrentScreenProj() {
  const url = new URL(window.location);
  return url.searchParams.get("proj");
}

function goHome() {
  if (currentScreenProj) {
    currentScreenProj = null;

    mainScreenProj.replaceChildren();

    mainScreenProj.classList.add("hidden");
    main.classList.remove("hidden");
  }
}
