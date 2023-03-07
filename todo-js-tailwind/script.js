const getform = document.getElementById("form");
const getinput = document.getElementById("list");
const getlistgroup = document.getElementById("list-group");
const getcheckallbtn = document.getElementById("checkAll");

getlists = JSON.parse(localStorage.getItem("todos")); // []

if (getlists) {
  for (let i = 0; i < getlists.length; i++) {
    addnew(getlists[i]);
  }
}
getform.addEventListener("submit", function (e) {
  addnew();
  e.preventDefault();
});

function addnew(list) {
  let gettext = getinput.value.trim();

  if (list) {
    gettext = list.text;
  }

  if (gettext) {
    let newli = document.createElement("li");
    let newspan = document.createElement("span");
    let newi = document.createElement("i");
    let newcheckbox = document.createElement("input");

    newcheckbox.type = "checkbox";

    newi.id = "remove";
    newspan.classList.add("context");
    newli.classList.add("list-group-item");

    if (list && list.done) {
      newcheckbox.checked = true;
      newli.classList.add("del");
    }

    newspan.appendChild(document.createTextNode(gettext));
    newi.innerHTML = "&times";

    newli.appendChild(newcheckbox);
    newli.appendChild(newspan);
    newli.appendChild(newi);

    getlistgroup.appendChild(newli);

    updatelocalstorage();

    //----------------
    newspan.addEventListener("dblclick", function () {
      const val = this.innerHTML;
      var input = document.createElement("input");
      input.classList.add("form-control-edit");
      input.value = val;

      this.innerHTML = "";
      this.appendChild(input);
      input.focus();

      input.addEventListener("blur", function () {
        var getval = this.value;
        if (getval.trim() != "") {
          this.parentNode.innerHTML = getval;
          updatelocalstorage();
        } else {
          this.parentNode.innerHTML = val;
        }
      });
    });
    //----------------

    newi.addEventListener("click", function () {
      newli.remove();
      updatelocalstorage();
    });

    newcheckbox.addEventListener("click", function () {
      if (this.checked == true) {
        newli.classList.add("del");
      } else {
        newli.classList.remove("del");
      }
      updatelocalstorage();
    });
  }

  getinput.value = "";
}

function updatelocalstorage() {
  const getlis = document.querySelectorAll(".list-group-item");
  const getcontext = document.querySelectorAll(".context");

  const todos = [];

  if (getcontext) {
    for (let i = 0; i < getlis.length; i++) {
      todos.push({
        text: getcontext[i].textContent,
        done: getlis[i].classList.contains("del"), // true false
      });
    }
  }

  // --------------------
  var somethingunique = todos.filter(function (getlist) {
    return getlist.done == false;
  });
  document.getElementById("zero").innerHTML = somethingunique.length;
  //-------------------------

  //--------checkallbtn------
  const getZero = document.getElementById("zero");
  if (getZero.innerHTML == "0") {
    getcheckallbtn.innerHTML = "Uncheck All";
  } else {
    getcheckallbtn.innerHTML = "Check All";
  }
  //--------checkallbtn------

  localStorage.setItem("todos", JSON.stringify(todos));
}

const getdonebtn = document.getElementById("done");
const getnotdonebtn = document.getElementById("notdone");
const getallbtn = document.getElementById("all");

getdonebtn.addEventListener("click", function () {
  let getlists = document.querySelectorAll(".list-group-item");

  if (getlists) {
    for (let i = 0; i < getlists.length; i++) {
      getlists[i].classList.add("remove");
      if (getlists[i].classList.contains("del")) {
        getlists[i].classList.remove("remove");
      }
    }
  }
});

getnotdonebtn.addEventListener("click", function () {
  let getlists = document.querySelectorAll(".list-group-item");

  if (getlists) {
    for (let i = 0; i < getlists.length; i++) {
      getlists[i].classList.add("remove");
      if (!getlists[i].classList.contains("del")) {
        getlists[i].classList.remove("remove");
      }
    }
  }
});

getallbtn.addEventListener("click", function () {
  let getlists = document.querySelectorAll(".list-group-item");

  if (getlists) {
    for (let i = 0; i < getlists.length; i++) {
      getlists[i].classList.remove("remove");
    }
  }
});

const getcleardonebtn = document.getElementById("cleardone");
getcleardonebtn.addEventListener("click", function () {
  let getlists = document.querySelectorAll(".list-group-item"); //

  if (getlists) {
    for (let i = 0; i < getlists.length; i++) {
      if (getlists[i].classList.contains("del")) {
        getlists[i].remove();
        updatelocalstorage();
      }
    }
  }
});

//------------checkallbtn------------
getcheckallbtn.addEventListener("click", function () {
  let getlists = document.querySelectorAll(".list-group-item"); //

  if (getlists) {
    if (getcheckallbtn.innerHTML == "Check All") {
      for (let i = 0; i < getlists.length; i++) {
        if (!getlists[i].classList.contains("del")) {
          getlists[i].classList.add("del");
        }
        getlists[i].firstElementChild.checked = true;
        this.innerHTML = "Uncheck All";
        updatelocalstorage();
      }
    } else {
      for (let i = 0; i < getlists.length; i++) {
        if (getlists[i].classList.contains("del")) {
          getlists[i].classList.remove("del");
        }
        getlists[i].firstElementChild.checked = false;
        this.innerHTML = "Check All";
        updatelocalstorage();
      }
    }
  }
});
//------------checkallbtn------------
