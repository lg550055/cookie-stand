'use strict';
let locations = [];

function Store(name, min, max, avg) {
  this.name = name;
  this.minCust = min;
  this.maxCust = max;
  this.avgPurch = avg;
  this.eachHour = [];
  locations.push(this);
}

let seattle = new Store('Seattle',23,65,6.3);
let tokyo = new Store('Tokyo',3,24,1.2);
let dubai = new Store('Dubai',11,38,3.7);
let paris = new Store('Paris',20,38,2.3);
let lima = new Store('Lima',2,16,4.6);

function randomCount(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min)
}

function headings(total=true, tableid) {
  let row = document.createElement('tr');
  row.appendChild(document.createElement('th'));
  for (let i=6; i<20; i++) {
    if (i<13) {
      let th = document.createElement('th');
      th.innerHTML = `${i}am`;
      row.appendChild(th);
    } else {
      let th = document.createElement('th');
      th.innerHTML = `${i-12}pm`;
      row.appendChild(th);
    }
  }
  if (total) {
    let th = document.createElement('th');
    th.innerHTML = 'Day Total';
    row.appendChild(th);
  }
  document.getElementById(tableid).appendChild(row);
}

let hour = Array(14).fill(0);
function hourlySales(store) {
  let row = document.createElement('tr');
  let th = document.createElement('th');
  th.innerHTML = store.name;
  row.appendChild(th);
  let n = 0, count = 0;
  for (let i=6; i<20; i++) {
    n = store.avgPurch*randomCount(store.minCust,store.maxCust);
    store.eachHour.push(Math.round(n/store.avgPurch));
    n = Math.round(n);
    count += n;
    hour[i-6] += n;
    let td = document.createElement('td');
    td.innerHTML = n;
    row.appendChild(td);
  }
  let td = document.createElement('td');
  td.innerHTML = count;
  row.appendChild(td);
  document.getElementById("sales").appendChild(row);
}

function footings() {
  let row = document.createElement('tr');
  let th = document.createElement('th');
  th.innerHTML = 'Total';
  row.appendChild(th);
  for (let i=6; i<20; i++) {
    let td = document.createElement('td');
    td.innerHTML = hour[i-6];
    row.appendChild(td);
  }
  let td = document.createElement('td');
  td.innerHTML = hour.reduce((a,b)=>a+b);
  row.appendChild(td);
  let tfoot = document.createElement('tfoot')
  tfoot.appendChild(row);
  document.getElementById("sales").appendChild(tfoot);
}

function renderLocations(storesList) {
  headings(true, "sales");
  storesList.forEach(store => hourlySales(store));
  footings();
}

function staff(store) {
  let row = document.createElement('tr');
  let th = document.createElement('th');
  th.innerHTML = store.name;
  row.appendChild(th);
  store.eachHour.forEach(e => {
    if (e<=40) {
      let td = document.createElement('td');
      td.innerHTML = 2;
      row.appendChild(td);
    } else {
      let td = document.createElement('td');
      td.innerHTML = 3;
      row.appendChild(td);
    }
  })
  document.getElementById("staff").appendChild(row);
}

function renderStaff(storesList) {
  headings(false, "staff");
  storesList.forEach(store => staff(store));
}

function renderStoreButton(storesList) {
  storesList.forEach(store => document.write("<button>"+store.name+"</button>"));
}

setTimeout(()=>{
  const myform = document.getElementById('store-form');
  if (myform) {
    function handleSubmit(event) {
      event.preventDefault();
      let newLocation = event.target.location.value;
      newLocation = new Store(newLocation, +event.target.minCust.value, +event.target.maxCust.value, +event.target.avgPurch.value);
      document.getElementById("sales").innerHTML='';
      document.getElementById("staff").innerHTML='';
      hour = Array(14).fill(0);
      locations.forEach(store => store.eachHour=[]);
      renderLocations(locations);
      renderStaff(locations);
      myform.reset();
    }
  
    myform.addEventListener('submit', handleSubmit);  
  }  
},1000);
