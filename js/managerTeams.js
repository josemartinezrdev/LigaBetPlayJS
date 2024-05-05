const divDetailPlayer = document.querySelector(".details-player");

const modelTeam = {
  nameTeam: "",
  logoTeam: "",
  cityTeam: "",
  nameTec: "",
  playersTeam: [],
};

const modelPlayer = {
  namePlayer: "",
  posPlayer: "",
  dorsalPlayer: "",
};

let betplay = [];

let playerTeam = modelPlayer;

//

document.addEventListener("DOMContentLoaded", (e) => {
  betplay = JSON.parse(localStorage.getItem("data"));
  if (betplay) {
  } else {
    betplay = [];
  }
});

document.querySelector("#addPlayer").addEventListener("click", (e) => {
  divDetailPlayer.insertAdjacentHTML("beforeend", crearItemHTML());
});

divDetailPlayer.addEventListener("click", (e) => {
  if (e.target.id == "delPlayer") {
    deleteItemList(e.target.dataset.id);
  }
});

const crearItemHTML = () => {
  let id = Date.now().toString(16);
  let suiteHTML = /* html */ `
    <div class="row justify-content-md-center" id="team${id}" >
        <div class="col-md-4">
            <label for="namePlayer" class="form-label">Nombre del Jugador</label>
            <input type="text" class="form-control" name="namePlayer${id}" id="namePlayer${id}"/>
        </div>
        <div class="col-md-4">
            <label for="posPlayer" class="form-label">Posición</label>
            <select name="posPlayer${id}" id="posPlayer${id}" class="form-select">
                <option selected>Elegir Posición...</option>
            </select>
        </div>
        <div class="col-md-2">
            <label for="dorsalPlayer" class="form-label">Dorsal</label>
            <input type="number" class="form-control" name="dorsalPlayer${id}" id="dorsalPlayer${id}"/>
        </div>
        <div class="col-md-1 position-relative">
            <button
                type="button"
                class="btn btn-danger position-absolute bottom-0 start-0"
                data-id="${id}"
                id="delPlayer">
                -
            </button>
        </div>
    </div>`;
  return suiteHTML;
};

const deleteItemList = (idDel) => {
  let player = document.querySelector(`#team${idDel}`);
  player.remove();
};

document.querySelector("#saveTeam").addEventListener("click", (e) => {
  let teamLet = { ...modelTeam };
  const frmTeam = document.querySelector("#frmTeam");
  const data = Object.fromEntries(new FormData(frmTeam).entries());
  const team = JSON.parse(JSON.stringify(data));
  const { nameTeam, logoTeam, cityTeam, nameTec, ...resto } = team;
  teamLet.nameTeam = nameTeam;
  teamLet.logoTeam = logoTeam;
  teamLet.cityTeam = cityTeam;
  teamLet.nameTec = nameTec;

  teamLet.playersTeam = [];
  let cont = 1;

  Object.entries(resto).forEach((item) => {
    if (item[0].includes("namePlayer")) {
      let playerId = item[0].replace("namePlayer", "");
      let playerName = item[1];
      let playerPosition = document.querySelector(
        `#posPlayer${playerId}`
      ).value;
      let playerDorsal = document.querySelector(
        `#dorsalPlayer${playerId}`
      ).value;

      let player = { ...modelPlayer };
      player.namePlayer = playerName;
      player.posPlayer = playerPosition;
      player.dorsalPlayer = playerDorsal;

      teamLet.playersTeam.push(player);

      cont++;
    } else {
      cont++;
    }
  });

  betplay.push(teamLet);
  localStorage.setItem("data", JSON.stringify(betplay));
  console.table(betplay);
});

//
